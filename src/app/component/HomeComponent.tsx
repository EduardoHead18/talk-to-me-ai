"use client";
import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { RiResetLeftFill } from "react-icons/ri";
import { ChatComponent } from "./ChatComponent";
import { Volkhov } from "next/font/google";

const volkhov = Volkhov({ subsets: ["latin"], weight: '700' });
export const HomeComponent = () => {
  const [browserSupport, setBrowserSupport] = useState(true);
  const [finishedRecordig, setFinishedRecordig] = useState(false);
  const [messageSend, setMessageSend] = useState<string>();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setBrowserSupport(false);
    } 
  }, [browserSupportsSpeechRecognition]);

  const startListening = () => {
    try {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    } catch (error) {
      console.error("Error starting SpeechRecognition:", error);
    }
  };

  const stopListeningRecognition = async () => {
    await SpeechRecognition.stopListening();
    setTimeout(() => {
      setMessageSend(transcript);
    }, 1000);
    setFinishedRecordig(true);
  };

  return (
    <div className="flex flex-col h-screen">
      {browserSupport ? (
        <div className="flex flex-col flex-grow justify-center px-10 lg:px-52 py-10">
          <h1 className={`text-2xl text-center font-bold text-white ${volkhov.className}`}>
            Speak English with AI  🤖
          </h1>

          {/*chat*/}
          <main className="flex-grow mt-10">
            <div className="p-4 mb-4 flex justify-start bg-gray-200 text-black max-w-xs rounded-lg ">
              Hi, let&apos;s talk dude!
            </div>
            {finishedRecordig && (
              <ChatComponent messageMe={messageSend}></ChatComponent>
            )}
          </main>

          {/* Componente en la parte inferior */}
          <div className="mt-auto bg-slate-900 rounded-xl py-2 px-10">
            <div className="flex justify-center gap-5">
              <FaMicrophone
                className={`hover:cursor-pointer ${
                  listening ? "animate-pulse text-green-500" : " text-orange-400"
                } text-black hover:text-green-500 transition-colors`}
                size={30}
                onClick={startListening}
              />
              <BsFillSendFill
                className="hover:cursor-pointer text-orange-400 hover:text-green-500 transition-colors"
                size={30}
                onClick={stopListeningRecognition}
              />
              <RiResetLeftFill
                className="hover:cursor-pointer text-orange-400 hover:text-green-500 transition-colors"
                size={30}
                onClick={resetTranscript}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Speech recognition is not supported by this browser</p>
      )}
    </div>
  );
};
