interface IListPrompts {
  id: number;
  prompt: string;
  isSelected: boolean;
}

const defaultPrompt = "You are my friendly chat buddy. Please respond in casual English and be a bit rude."

export const listPrompt: IListPrompts[] = [
  {
    id: 1,
    prompt: defaultPrompt,
    isSelected: false,  
  }
];

