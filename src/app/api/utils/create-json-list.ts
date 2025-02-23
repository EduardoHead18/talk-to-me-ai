import fs from "fs";
import path from "path";

const dataDir = path.resolve(process.cwd(), "src/app/api/utils/");
const filePath = path.join(dataDir, "prompts.json");

interface IPrompt {
  id: number;
  prompt: string;
  isSelected: boolean;
}

try {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
} catch (error) {
  console.error("Error creating directory:", error);
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
} catch (error) {
  console.error("Error creating file:", error);
}

// Función para obtener los prompts desde el archivo
export const getPrompts = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
};

// Función para guardar los prompts en el archivo
export const savePrompts = (prompts: IPrompt) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(prompts, null, 2));
  } catch (error) {
    console.error("Error writing file:", error);
  }
};
