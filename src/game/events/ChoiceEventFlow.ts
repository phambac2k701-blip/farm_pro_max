import type { GameState } from "../state/GameState";
import type { FactId, FactValue } from "../state/types";

export type ChoiceEventStatus = "idle" | "active" | "completed";

export interface PersistentFactEffect {
  factId: FactId;
  value: FactValue;
}

export interface ChoiceOption<TNodeId extends string = string, TChoiceId extends string = string> {
  id: TChoiceId;
  nextNodeId: TNodeId;
  persistentEffects?: readonly PersistentFactEffect[];
}

export interface ChoiceNodeDefinition<TNodeId extends string = string, TChoiceId extends string = string> {
  id: TNodeId;
  type: "choice";
  choices: readonly ChoiceOption<TNodeId, TChoiceId>[];
}

export interface StageNodeDefinition<TNodeId extends string = string> {
  id: TNodeId;
  type: "stage";
  nextNodeId: TNodeId;
}

export interface CompleteNodeDefinition<TNodeId extends string = string> {
  id: TNodeId;
  type: "complete";
}

export type EventNodeDefinition<TNodeId extends string = string, TChoiceId extends string = string> =
  | ChoiceNodeDefinition<TNodeId, TChoiceId>
  | StageNodeDefinition<TNodeId>
  | CompleteNodeDefinition<TNodeId>;

export interface EventDefinition<TNodeId extends string = string, TChoiceId extends string = string> {
  id: string;
  initialNodeId: TNodeId;
  nodes: readonly EventNodeDefinition<TNodeId, TChoiceId>[];
}

export interface ChoiceEventFlowSnapshot<TNodeId extends string = string> {
  status: ChoiceEventStatus;
  nodeId: TNodeId | null;
}

export type ChoiceEventTransitionCause<TChoiceId extends string = string> =
  | { type: "trigger" }
  | { type: "choice"; choiceId: TChoiceId }
  | { type: "advance" };

export interface ChoiceEventTransition<TNodeId extends string = string, TChoiceId extends string = string> {
  eventId: string;
  fromNodeId: TNodeId | null;
  toNodeId: TNodeId;
  cause: ChoiceEventTransitionCause<TChoiceId>;
  changedPersistentFactIds: readonly FactId[];
  status: ChoiceEventStatus;
}

export interface ChoiceEventFlowOptions<TNodeId extends string = string, TChoiceId extends string = string> {
  definition: EventDefinition<TNodeId, TChoiceId>;
  state: GameState;
  restoredSnapshot?: ChoiceEventFlowSnapshot<TNodeId>;
}

export class ChoiceEventFlow<TNodeId extends string = string, TChoiceId extends string = string> {
  private readonly nodes = new Map<TNodeId, EventNodeDefinition<TNodeId, TChoiceId>>();
  private currentStatus: ChoiceEventStatus = "idle";
  private currentNode: TNodeId | null = null;

  constructor(private readonly options: ChoiceEventFlowOptions<TNodeId, TChoiceId>) {
    this.validateDefinition();
    if (options.restoredSnapshot) {
      this.restore(options.restoredSnapshot);
    }
  }

  get eventId(): string {
    return this.options.definition.id;
  }

  get status(): ChoiceEventStatus {
    return this.currentStatus;
  }

  get currentNodeId(): TNodeId | null {
    return this.currentNode;
  }

  get isCompleted(): boolean {
    return this.currentStatus === "completed";
  }

  getCurrentNode(): EventNodeDefinition<TNodeId, TChoiceId> | null {
    return this.currentNode === null ? null : this.nodes.get(this.currentNode)!;
  }

  getAvailableChoices(): readonly ChoiceOption<TNodeId, TChoiceId>[] {
    const node = this.getCurrentNode();
    return node?.type === "choice" ? node.choices : [];
  }

  trigger(): ChoiceEventTransition<TNodeId, TChoiceId> | null {
    if (this.currentStatus !== "idle") {
      return null;
    }
    return this.transitionTo(this.options.definition.initialNodeId, { type: "trigger" }, []);
  }

  selectChoice(choiceId: TChoiceId): ChoiceEventTransition<TNodeId, TChoiceId> {
    const node = this.requireActiveNode();
    if (node.type !== "choice") {
      throw new Error(`Event ${this.eventId} node ${node.id} does not accept choices.`);
    }

    const choice = node.choices.find((candidate) => candidate.id === choiceId);
    if (!choice) {
      throw new Error(`Unknown choice ${choiceId} at event ${this.eventId} node ${node.id}.`);
    }

    const changedFactIds: FactId[] = [];
    for (const effect of choice.persistentEffects ?? []) {
      if (this.options.state.setFact(effect.factId, effect.value)) {
        changedFactIds.push(effect.factId);
      }
    }

    return this.transitionTo(
      choice.nextNodeId,
      { type: "choice", choiceId },
      changedFactIds,
    );
  }

  advance(): ChoiceEventTransition<TNodeId, TChoiceId> {
    const node = this.requireActiveNode();
    if (node.type !== "stage") {
      throw new Error(`Event ${this.eventId} node ${node.id} cannot auto-advance.`);
    }
    return this.transitionTo(node.nextNodeId, { type: "advance" }, []);
  }

  snapshot(): ChoiceEventFlowSnapshot<TNodeId> {
    return { status: this.currentStatus, nodeId: this.currentNode };
  }

  private transitionTo(
    toNodeId: TNodeId,
    cause: ChoiceEventTransitionCause<TChoiceId>,
    changedPersistentFactIds: readonly FactId[],
  ): ChoiceEventTransition<TNodeId, TChoiceId> {
    const target = this.requireKnownNode(toNodeId);
    const fromNodeId = this.currentNode;
    this.currentNode = target.id;
    this.currentStatus = target.type === "complete" ? "completed" : "active";
    return {
      eventId: this.eventId,
      fromNodeId,
      toNodeId: target.id,
      cause,
      changedPersistentFactIds,
      status: this.currentStatus,
    };
  }

  private requireActiveNode(): EventNodeDefinition<TNodeId, TChoiceId> {
    if (this.currentStatus !== "active" || this.currentNode === null) {
      throw new Error(`Event ${this.eventId} is not active (status: ${this.currentStatus}).`);
    }
    return this.nodes.get(this.currentNode)!;
  }

  private requireKnownNode(nodeId: TNodeId): EventNodeDefinition<TNodeId, TChoiceId> {
    const node = this.nodes.get(nodeId);
    if (!node) {
      throw new Error(`Unknown event node ${nodeId} in event ${this.eventId}.`);
    }
    return node;
  }

  private restore(snapshot: ChoiceEventFlowSnapshot<TNodeId>): void {
    if (snapshot.status === "idle") {
      if (snapshot.nodeId !== null) {
        throw new Error(`Idle event ${this.eventId} snapshot cannot contain a node.`);
      }
      return;
    }
    if (snapshot.nodeId === null) {
      throw new Error(`Event ${this.eventId} snapshot status ${snapshot.status} requires a node.`);
    }

    const node = this.requireKnownNode(snapshot.nodeId);
    if (snapshot.status === "active" && node.type === "complete") {
      throw new Error(`Active event ${this.eventId} snapshot cannot point at a complete node.`);
    }
    if (snapshot.status === "completed" && node.type !== "complete") {
      throw new Error(`Completed event ${this.eventId} snapshot must point at a complete node.`);
    }

    this.currentStatus = snapshot.status;
    this.currentNode = snapshot.nodeId;
  }

  private validateDefinition(): void {
    const definition = this.options.definition;
    if (definition.id.trim().length === 0) {
      throw new Error("Choice event requires a non-empty id.");
    }
    if (definition.nodes.length === 0) {
      throw new Error(`Event ${definition.id} requires at least one node.`);
    }

    for (const node of definition.nodes) {
      if (node.id.trim().length === 0) {
        throw new Error(`Event ${definition.id} contains an empty node id.`);
      }
      if (this.nodes.has(node.id)) {
        throw new Error(`Duplicate event node ${node.id} in event ${definition.id}.`);
      }
      this.nodes.set(node.id, node);
    }

    this.requireKnownNode(definition.initialNodeId);

    for (const node of definition.nodes) {
      if (node.type === "stage") {
        this.requireKnownNode(node.nextNodeId);
        continue;
      }
      if (node.type !== "choice") {
        continue;
      }
      if (node.choices.length === 0) {
        throw new Error(`Choice node ${node.id} in event ${definition.id} requires at least one choice.`);
      }

      const choiceIds = new Set<TChoiceId>();
      for (const choice of node.choices) {
        if (choiceIds.has(choice.id)) {
          throw new Error(`Duplicate choice ${choice.id} at event ${definition.id} node ${node.id}.`);
        }
        choiceIds.add(choice.id);
        this.requireKnownNode(choice.nextNodeId);

        const factIds = new Set<FactId>();
        for (const effect of choice.persistentEffects ?? []) {
          if (factIds.has(effect.factId)) {
            throw new Error(
              `Choice ${choice.id} at event ${definition.id} node ${node.id} writes fact ${effect.factId} more than once.`,
            );
          }
          factIds.add(effect.factId);
        }
      }
    }
  }
}
