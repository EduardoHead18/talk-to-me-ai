let initialPromptList: IPromptList[] = [
  {
    id: 1,
    prompt:
      "You are my friendly chat buddy. Please respond in casual English and be a bit rude.",
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
  localStorage.setItem("promptList", JSON.stringify(promptList));
};

export const getPromptListLocalStorage = (): IPromptList[] => {
  const promptList = localStorage.getItem("promptList");
  return promptList ? JSON.parse(promptList) : initialPromptList;
};
