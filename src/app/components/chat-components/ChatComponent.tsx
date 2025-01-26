"use client";
import { postApiGemini } from "@/app/services/post-api-gemini";
import React, { useState, useEffect, useRef } from "react";

interface ChatComponentProps {
  messageMe: string | undefined;
}

export const ChatComponent: React.FC<ChatComponentProps> = ({ messageMe }) => {
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "ai" }[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // function to add new message
  const addMessageFunction = (text: string, sender: "user" | "ai") => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
  };

  const userMessageAdd = async () => {
    const responseApi = await postApiGemini(messageMe!);
    if (messageMe) {
      addMessageFunction(messageMe, "user");
      setTimeout(() => {
        addMessageFunction(responseApi, "ai");
        speak(responseApi);
      }, 100);
    }
  };

  //speak AI
  const speak = (textToPlay : string) => {
    const voice = window.speechSynthesis;
    const speech = new SpeechSynthesisUtterance(textToPlay);
    speech.lang = "en-US";
    voice.speak(speech);
  };

  useEffect(() => {
    userMessageAdd();
  }, [messageMe]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <div className="mb-24 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs p-3 rounded-lg ${
              message.sender === "user"
                ? "border-solid border-2 border-orange-400 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};
