"use client";
import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { RiResetLeftFill } from "react-icons/ri";
import { ChatComponent } from "../chat-components/ChatComponent";

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
  }, []);

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
    }, 100);
    setFinishedRecordig(true);
  };

  return (
    <div className="flex flex-col h-screen">
      {browserSupport ? (
        <>
          {/*chat*/}
          <main className="flex-grow mt-20 mx-2 mb-40">
            <div className="p-4 mb-4 flex justify-start bg-gray-200 text-black max-w-xs rounded-lg ">
              Hi, let&apos;s talk dude!       
            </div> 
            
            {finishedRecordig && (
              <ChatComponent messageMe={messageSend}></ChatComponent>
            )}
            {/* Componente en la parte inferior */}
          </main>

          <section className=" bg-slate-900 rounded-xl py-4 px-10 right-0 inset-x-0  fixed bottom-0 w-full ">
            <div className="flex justify-center gap-5">
              <FaMicrophone
                className={`hover:cursor-pointer ${
                  listening
                    ? "animate-pulse text-green-500"
                    : " text-orange-400"
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
          </section>
        </>
      ) : (
        <p>Speech recognition is not supported by this browser</p>
      )}
    </div>
  );
};
