import { IPromptList } from "@/app/utils/interface/IPromptList";
import fs from "fs";
import path from "path";

const dataDir = path.resolve(process.cwd(), "src/app/api/utils/");
const filePath = path.join(dataDir, "prompts.json");

try {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
} catch {
  throw new Error("Error creating data directory");
}

try {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      JSON.stringify([
        {
          id: 1,
          prompt:
            "You are my friendly chat buddy. Please respond in casual English and be a bit rude.",
          isSelected: false,
        },
      ])
    );
  }
} catch {
  throw new Error("Error creating prompts.json file");
}

export const getPrompts = (): IPromptList[] => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    if (Array.isArray(parsedData)) {
      return parsedData;
    } else {
      throw new Error("Data is not an array");
    }
  } catch {
    throw new Error("Error reading prompts.json file");
  }
};

export const savePrompts = (prompts: any) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(prompts, null, 2));
  } catch {
    throw new Error("Error saving prompts to prompts.json file");
  }
};
