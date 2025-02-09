export const postApiGemini = async (messageMe:string): Promise<string> => {
    const response = await fetch("api/gemini/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageMe }),
    });
    const data = await response.json();
    return data.message;
  };

  export const sendPromptToApi = async (dataLocalStorage: IPromptList[])  => {
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
    console.log("from data:", data)
    return data.message
  }