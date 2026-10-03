import { describe, expect, it } from "vitest";

import {
  ChoiceEventFlow,
  type EventDefinition,
  type EventNodeDefinition,
} from "../../../src/game/events/ChoiceEventFlow";
import { GameState } from "../../../src/game/state/GameState";

type TestNodeId =
  | "start"
  | "react_a"
  | "react_b"
  | "persistent_route"
  | "reconverged"
  | "complete";
type TestChoiceId = "option_a" | "option_b" | "option_c";

const TEST_FACT = "fact_test_choice_persistent";

const TEST_DEFINITION: EventDefinition<
  TestNodeId,
  TestChoiceId
> = {
  id: "evt_test_branch_reconverge",
  initialNodeId: "start",
  nodes: [
    {
      id: "start",
      type: "choice",
      choices: [
        { id: "option_a", nextNodeId: "react_a" },
        { id: "option_b", nextNodeId: "react_b" },
        {
          id: "option_c",
          nextNodeId: "persistent_route",
          persistentEffects: [
            {
              factId: TEST_FACT,
              value: true,
            },
          ],
        },
      ],
    },
    {
      id: "react_a",
      type: "stage",
      nextNodeId: "reconverged",
    },
    {
      id: "react_b",
      type: "stage",
      nextNodeId: "reconverged",
    },
    {
      id: "persistent_route",
      type: "stage",
      nextNodeId: "complete",
    },
    {
      id: "reconverged",
      type: "stage",
      nextNodeId: "complete",
    },
    {
      id: "complete",
      type: "complete",
    },
  ],
};

function createFlow(state = new GameState()) {
  return new ChoiceEventFlow({
    definition: TEST_DEFINITION,
    state,
  });
}

describe("ChoiceEventFlow", () => {
  it("selects options deterministically from the active choice node", () => {
    const flow = createFlow();

    expect(flow.status).toBe("idle");
    expect(flow.trigger()).toEqual({
      eventId: TEST_DEFINITION.id,
      fromNodeId: null,
      toNodeId: "start",
      cause: { type: "trigger" },
      changedPersistentFactIds: [],
      status: "active",
    });
    expect(
      flow.getAvailableChoices().map((choice) => choice.id),
    ).toEqual(["option_a", "option_b", "option_c"]);

    expect(flow.selectChoice("option_a")).toEqual({
      eventId: TEST_DEFINITION.id,
      fromNodeId: "start",
      toNodeId: "react_a",
      cause: {
        type: "choice",
        choiceId: "option_a",
      },
      changedPersistentFactIds: [],
      status: "active",
    });
    expect(flow.currentNodeId).toBe("react_a");
  });

  it("keeps local reactions distinct before reconverging", () => {
    const flowA = createFlow();
    const flowB = createFlow();

    flowA.trigger();
    flowB.trigger();
    flowA.selectChoice("option_a");
    flowB.selectChoice("option_b");

    expect(flowA.currentNodeId).toBe("react_a");
    expect(flowB.currentNodeId).toBe("react_b");

    flowA.advance();
    flowB.advance();

    expect(flowA.currentNodeId).toBe("reconverged");
    expect(flowB.currentNodeId).toBe("reconverged");
  });

  it("does not create persistent facts for local reactions", () => {
    const state = new GameState();
    const flow = createFlow(state);

    flow.trigger();
    const transition = flow.selectChoice("option_a");

    expect(transition.changedPersistentFactIds).toEqual([]);
    expect(state.getFact(TEST_FACT)).toBeUndefined();
  });

  it("applies only explicitly declared persistent effects", () => {
    const state = new GameState();
    const flow = createFlow(state);

    flow.trigger();
    const transition = flow.selectChoice("option_c");

    expect(transition.changedPersistentFactIds).toEqual([
      TEST_FACT,
    ]);
    expect(state.getFact(TEST_FACT)).toBe(true);
    expect(flow.currentNodeId).toBe("persistent_route");
  });

  it("rejects invalid nodes and choices clearly", () => {
    expect(
      () =>
        new ChoiceEventFlow({
          definition: TEST_DEFINITION,
          state: new GameState(),
          restoredSnapshot: {
            status: "active",
            nodeId: "missing" as TestNodeId,
          },
        }),
    ).toThrow("Unknown event node missing");

    const flow = createFlow();
    flow.trigger();

    expect(() =>
      flow.selectChoice("missing" as TestChoiceId),
    ).toThrow("Unknown choice missing");
  });

  it("does not rerun a completed event", () => {
    const flow = createFlow();

    flow.trigger();
    flow.selectChoice("option_a");
    flow.advance();
    flow.advance();

    expect(flow.isCompleted).toBe(true);
    expect(flow.snapshot()).toEqual({
      status: "completed",
      nodeId: "complete",
    });
    expect(flow.trigger()).toBeNull();
    expect(() => flow.advance()).toThrow(
      "is not active (status: completed)",
    );

    const restored = new ChoiceEventFlow({
      definition: TEST_DEFINITION,
      state: new GameState(),
      restoredSnapshot: flow.snapshot(),
    });

    expect(restored.isCompleted).toBe(true);
    expect(restored.trigger()).toBeNull();
  });

  it("restores local event state without replaying effects", () => {
    const state = new GameState();
    const first = createFlow(state);

    first.trigger();
    first.selectChoice("option_c");
    const snapshot = first.snapshot();

    const restored = new ChoiceEventFlow({
      definition: TEST_DEFINITION,
      state,
      restoredSnapshot: snapshot,
    });

    expect(restored.currentNodeId).toBe("persistent_route");
    expect(state.getFact(TEST_FACT)).toBe(true);
    expect(restored.advance().toNodeId).toBe("complete");
  });

  it("represents repeated branch-and-reconverge layers linearly", () => {
    const layerCount = 30;
    const nodes: EventNodeDefinition<string, string>[] = [];

    for (let index = 0; index < layerCount; index += 1) {
      const choiceNode = `choice_${index}`;
      const branchA = `branch_${index}_a`;
      const branchB = `branch_${index}_b`;
      const nextNode =
        index === layerCount - 1
          ? "complete"
          : `choice_${index + 1}`;

      nodes.push(
        {
          id: choiceNode,
          type: "choice",
          choices: [
            {
              id: `pick_${index}_a`,
              nextNodeId: branchA,
            },
            {
              id: `pick_${index}_b`,
              nextNodeId: branchB,
            },
          ],
        },
        {
          id: branchA,
          type: "stage",
          nextNodeId: nextNode,
        },
        {
          id: branchB,
          type: "stage",
          nextNodeId: nextNode,
        },
      );
    }
    nodes.push({ id: "complete", type: "complete" });

    const definition: EventDefinition<string, string> = {
      id: "evt_test_linear_reconvergence",
      initialNodeId: "choice_0",
      nodes,
    };
    const flow = new ChoiceEventFlow({
      definition,
      state: new GameState(),
    });

    flow.trigger();
    for (let index = 0; index < layerCount; index += 1) {
      flow.selectChoice(`pick_${index}_a`);
      flow.advance();
    }

    expect(nodes).toHaveLength(layerCount * 3 + 1);
    expect(flow.snapshot()).toEqual({
      status: "completed",
      nodeId: "complete",
    });
  });
});
