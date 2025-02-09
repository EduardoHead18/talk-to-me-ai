"use server";
import { NextRequest, NextResponse } from "next/server";
import { getPrompts, savePrompts } from "../../utils/create-json-list";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { id, prompt, isSelected } = await req.json();

  // Validación del prompt
  if (!prompt || prompt.trim() === "" || prompt.trim().length < 5) {
    return NextResponse.json(
      {
        error:
          "No user message or short message found, you must write a message of more than 5 characters",
      },
      { status: 400 }
    );
  }

  try {
    const prompts = getPrompts();

    prompts.push({ id, prompt, isSelected });
    savePrompts(prompts);
    return NextResponse.json({
      message: prompts.map((item: { prompt: string }) => item.prompt),
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}