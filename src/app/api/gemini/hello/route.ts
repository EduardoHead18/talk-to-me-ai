"use server"

import { NextResponse } from "next/server";

export async function GET(res: NextResponse){
    return NextResponse.json({ message: "Hello from ap/gemini" });
}