'use server'

import { NextResponse } from "next/server"
import { listPrompt } from "../../utils/list-prompt"

export async function GET(res: NextResponse){
    return NextResponse.json({message: listPrompt})
}