"use client";
import { postApiGemini } from "@/app/services/post-api-gemini";
import useChatStore from "@/app/store/useChatStore";
import React, { useEffect, useRef } from "react";
import { RiRobot3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

interface ChatComponentProps {
  messageMe: string | undefined;
}

export const ChatComponent: React.FC<ChatComponentProps> = ({ messageMe }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);
  const zustandMessage = useChatStore((state)=>state.messages)

  console.log("menssage from zustand: ", zustandMessage)

  const userMessageAdd = async () => {
    if (messageMe) {
      addMessage({ user: "me", message: messageMe });
      const responseApi = await postApiGemini(messageMe);
      setTimeout(() => {
        addMessage({ user: "ai", message: responseApi });
        speak(responseApi);
      }, 100);
    }
  };

  //speak AI
  const speak = (textToPlay: string) => {
    const voice = window.speechSynthesis;
    const speech = new SpeechSynthesisUtterance(textToPlay);
    speech.lang = "en-US";
    voice.speak(speech);
  };

  useEffect(() => {
    if (messageMe) {
      userMessageAdd();
    }
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
            message.user === "me" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs p-3 rounded-lg ${
              message.user === "me"
                ? "border-solid border-2 border-orange-400 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {message.user === "me" ? (
              <div className="flex items-center justify-end">
                <FaUser className="text-2xl" />
              </div>
            ) : (
              <div className="flex items-center justify-start">
                <RiRobot3Fill className="text-2xl" />
              </div>
            )}
            {message.message}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};
