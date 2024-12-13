"use client";
import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export const HomeComponent = () => {
  const [browserSupport, setBrowserSupport] = useState(true);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setBrowserSupport(false);
      console.log("Speech recognition is not supported");
    } else {
      console.log("Speech recognition is supported");
    }
  }, [browserSupportsSpeechRecognition]);

  const startListening = () => {
    try {
      console.log("Starting recognition...");
      SpeechRecognition.startListening({ continuous: true, language: "es-ES" });
    } catch (error) {
      console.error("Error starting SpeechRecognition:", error);
    }
  };



  return (
    <div>
      {browserSupport ? (
        <>
          <p>Microphone: {listening ? "on" : "off"}</p>
          <button onClick={startListening}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
          <p>Texto: {transcript || "No se ha detectado texto aún"}</p>
        </>
      ) : (
        <p>Speech recognition is not supported by this browser</p>
      )}
    </div>
  );
};
