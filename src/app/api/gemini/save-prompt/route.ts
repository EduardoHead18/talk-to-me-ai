"use server";
import { NextRequest, NextResponse } from "next/server";
import { savePrompts } from "../../utils/create-json-list";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const prompts: IPromptList[] = body;

  if (!Array.isArray(prompts) || prompts.length === 0) {
    return NextResponse.json(
      {
        error: "Prompt list is required and cannot be empty",
      },
      { status: 400 }
    );
  }

  try {
    prompts.forEach(({ prompt }) => {
      if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
        throw new Error("Invalid prompt data");
      }
    });
    //save json
    savePrompts(prompts);

    return NextResponse.json(
      { message: "Data saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error saving prompts" },
      { status: 400 }
    );
  }
}
