import fs from "fs";
import path from "path";

const dataDir = path.resolve(process.cwd(), "src/app/api/utils/");
const filePath = path.join(dataDir, "prompts.json");

// Si la carpeta "data" no existe, créala
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}


// Verifica si el archivo existe, si no, lo crea con un prompt por defecto.
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(
    filePath,
    JSON.stringify([
      {
        id: 1,
        prompt: "You are my friendly chat buddy. Please respond in casual English and be a bit rude.",
        isSelected: false,
      },
    ])
  );
}

// Función para obtener los prompts desde el archivo
export const getPrompts = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

// Función para guardar los prompts en el archivo
export const savePrompts = (prompts: any) => {
  fs.writeFileSync(filePath, JSON.stringify(prompts, null, 2));
}


