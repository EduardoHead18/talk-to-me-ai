"use server";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI!);

const configGemini = {
  stopSequences: ["red"],
  maxOutputTokens: 100,
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  ...configGemini,
});

export async function POST(req: NextRequest) {
  const {message} = await req.json();

  if (!message || message.trim() === "") {
    return NextResponse.json(
      { error: "No user message found" },
      { status: 400 }
    );
  }

  const prompt = `You are my friendly chat buddy. Please respond in casual English and be a bit rude. User said: "${message}"`;
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();


  console.log("response:", text);
  return NextResponse.json({ message: text});
}
