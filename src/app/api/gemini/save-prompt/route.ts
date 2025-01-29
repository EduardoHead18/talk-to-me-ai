"use server";
import { listPrompt } from "../../utils/list-prompt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const prompts: IPromptList[] = body;

  if (!Array.isArray(prompts) || prompts.length === 0) {
    console.log("error 1:", prompts);
    return NextResponse.json(
      {
        error: "Prompt list is required and cannot be empty",
      },
      { status: 400 }
    );
  }

  try {
    prompts.forEach(({ id, prompt, isSelected }) => {
      if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
        throw new Error("Invalid prompt data");
      }
      listPrompt.push({ id, prompt, isSelected });
    });
    //Data saved successfully
    console.log("success:", prompts);
    return NextResponse.json(
      {
        error: "Data saved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error 1:", prompts);
    return NextResponse.json(
      {
        error: "error",
      },
      { status: 400 }
    );
  }
}
