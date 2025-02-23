const initialPromptList: IPromptList[] = [
  {
    id: 1,
    prompt:
      "You are my friendly chat buddy. Please respond in casual English and be a little sassy, but still fun and kind.",
    isSelected: true,
  },
  {
    id: 2,
    prompt:
      "You are my friendly chat buddy. Please respond in casual English and be a bit rude.",
    isSelected: false,
  },
];

export const savePromptListLocalStorage = (promptList: IPromptList[]): void => {
  try {
    localStorage.setItem("promptList", JSON.stringify(promptList));
  } catch {
    throw new Error("Error saving prompt list to local storage");
  }
};

export const getPromptListLocalStorage = (): IPromptList[] => {
  try {
    const promptList = localStorage.getItem("promptList");
    return promptList ? JSON.parse(promptList) : initialPromptList;
  } catch {
    throw new Error("Error getting prompt list from local storage");
  }
};
