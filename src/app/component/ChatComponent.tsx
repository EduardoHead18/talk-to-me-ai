'use client'
import React, { useState } from "react";

interface ChatComponentProps {
    messageMe: string | undefined;
  }
export const ChatComponent: React.FC<ChatComponentProps> = ({messageMe}) => {
    
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you?", sender: "ai" },
      ]);
    
      // Función para agregar nuevos mensajes
      const addMessageFunction = (text: string, sender: "user" | "ai") => {
        setMessages((prevMessages) => [...prevMessages, { text, sender }]);
      };

      const userMessageAdd = () =>{
        if (messageMe) {
          addMessageFunction(messageMe, "user");
          setTimeout(() => {
            addMessageFunction("I can help with that!", "ai"); 
          }, 1000);
        }

      }
    
      // Simula que se agrega un mensaje del usuario
      React.useEffect(() => {
        userMessageAdd()
      }, [messageMe]);

  
  return (
    <div className="p-4 space-y-4">
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
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};
