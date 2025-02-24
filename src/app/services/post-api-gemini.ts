import { IPromptList } from "../utils/interface/IPromptList";

export const postApiGemini = async (messageMe: string): Promise<string> => {
  try {
    const response = await fetch("api/gemini/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageMe }),
    });
    const data = await response.json();
    return data.message;
  } catch {
    throw new Error("Error in postApiGemini");
  }
};

export const sendPromptToApi = async (dataLocalStorage: IPromptList[]) => {
  try {
    const response = await fetch("api/gemini/save-prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataLocalStorage),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.message;
  } catch {
    throw new Error("Error in sendPromptToApi");
  }
};
