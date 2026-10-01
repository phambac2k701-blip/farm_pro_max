export interface InteractableDefinition {
  id: string;
  prompt: string;
  maxDistance: number;
  priority?: number;
}

export interface InteractionPromptState {
  visible: boolean;
  text: string;
  interactableId: string | null;
}
