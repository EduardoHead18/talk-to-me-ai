"use client";
import { useState, useEffect } from "react";
import { ToastError } from "../component/ToastError";

let initialPromptList: IPromptList[] = [
  {
    name: "rude",
    promt:
      "You are my friendly chat buddy. Please respond in casual English and be a bit rude.",
  },
  {
    name: "loving",
    promt:
      "You are my friendly chat buddy. Please respond in casual English and be a bit rude.",
  },
];

function ConfigurationPromptPage() {


  const [selectedOption, setSelectedOption] = useState("loving");
  const [newPrompt, setNewPrompt] = useState("");
  const [promptList, setPromptList] = useState<IPromptList[]>(initialPromptList);
  const [errorPrompt, setErrorPrompt] = useState(false);
  let counter = 0;
  //select a option promp
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    console.log("Selected option:", selectedOption);
  }, [selectedOption]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrompt(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddPrompt(event); //pasar evento para detectar el enter
    }
  };

  const handleAddPrompt = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("New prompt added:", newPrompt);
    setNewPrompt(""); // agrega los prompt a la lista idk
    addNewPrompt();
  };

  const addNewPrompt = () => {
    if (newPrompt === "") setErrorPrompt(true);
    else {
      console.log(newPrompt)
      promptList.push({
        name: newPrompt,
        promt: newPrompt,
        
      });
      counter++;
      // setErrorPrompt(false);
    }
  };

  return (
    <div className="h-screen pt-24 bg-black">
      <h1 className="md:text-2xl font-medium mr-4 mb-4">
        Choose a personality for your AI chat
      </h1>

      <div className="mb-10">
        {promptList.map((item, index) => (
          <div key={index} className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">{item.name}</span>
              <input
                type="radio"
                name="aiPersonality"
                value={item.name}
                checked={selectedOption === item.name}
                onChange={handleOptionChange}
                className="radio radio-warning"
              />
            </label>
          </div>
        ))}
      </div>

      <div className="">
        <h2 className="md:text-2xl font-medium mr-4 mb-4">
          Write a new personality (promt)
        </h2>
        <p>
          Example: Me gustaria que admires mi progreso en el ingles, que seas
          una IA amable.
        </p>
        <div className="flex flex-row justify-between mt-3">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full mr-3 "
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={newPrompt}
          />
          <button
            onClick={handleAddPrompt}
            className="btn btn-active btn-accent"
          >
            Add prompt
          </button>
        </div>
      </div>
      {errorPrompt ? <ToastError /> : ""} 
    </div>
  );
}

export default ConfigurationPromptPage;
