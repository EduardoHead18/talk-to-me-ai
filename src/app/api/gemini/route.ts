"use server";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { listPrompt } from "../utils/list-prompt";

const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI!);

interface Ichat {
  role: "user" | "model";
  parts: { text: string }[];
}

const configGemini = {
  model: "gemini-1.5-flash",
  stopSequences: ["red"],
  maxOutputTokens: 100,
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};

const defaultPrompt =
  "You are my friendly chat buddy. Please respond in casual English and be a bit rude.";

const model = genAI.getGenerativeModel({ ...configGemini });


export async function POST(req: NextRequest): Promise<NextResponse> {
  const { message } = await req.json();
  const promptSelected = listPrompt.find((item) => item.isSelected === true);
  let chatHistory: Ichat[] = [
    {
      role: "user",
      parts: [{ text:  promptSelected?.prompt || defaultPrompt }],
    },
  ];
  

  if (!message || message.trim() === "" || message.trim().length < 5) {
    return NextResponse.json(
      { error: "No user message or short message found, you must write a message of more than 5 characters" },
      { status: 400 }
    );
  }

  const chat = model.startChat({
    history: chatHistory,
  });

  try {
    let result = await chat.sendMessage(message);
    chatHistory.push({
      role: "model",
      parts: [{ text: result.response.text() }],
    });
    return NextResponse.json({ message: result.response.text() });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
