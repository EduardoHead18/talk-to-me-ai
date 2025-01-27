import { NextApiRequest, NextApiResponse } from "next";
import { listPrompt } from "../../utils/list-prompt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id, prompt, isSelected } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
        return res.status(400).json({ message: "Prompt is required and cannot be empty" });
      }
      
    try {
      listPrompt.push({
        id: id,
        prompt: prompt,
        isSelected: isSelected,
      });
      res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
      res.status(405).json({ message: "Method not allowed" });
    }
  }
}
