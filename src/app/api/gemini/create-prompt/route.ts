"use server";
import { NextRequest, NextResponse } from "next/server";
import { listPrompt } from "../../utils/list-prompt";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { id, prompt, isSelected } = await req.json();

  //valid promt
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
    listPrompt.push({ id, prompt: prompt, isSelected });
    return NextResponse.json({
      mesage: listPrompt.map((item) => item.prompt),
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
