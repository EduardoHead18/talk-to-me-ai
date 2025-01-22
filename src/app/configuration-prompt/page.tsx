"use client";
import { useState, useEffect } from "react";
import { ToastError } from "../component/ErrorToast";
import { Modal } from "../component/reusable/Modal";

let initialPromptList: IPromptList[] = [
  {
    id: 1,
    name: "rude",
    promt:
      "You are my friendly chat buddy. Please respond in casual English and be a bit rude.",
  },
  {
    id:2,
    name: "loving",
    promt:
      "You are my friendly chat buddy. Please respond in casual English and be a bit rude.",
  }
];

function ConfigurationPromptPage() {
  const [selectedOption, setSelectedOption] = useState("loving");
  const [newPrompt, setNewPrompt] = useState("");
  const [promptList, setPromptList] =
    useState<IPromptList[]>(initialPromptList);
  const [errorPrompt, setErrorPrompt] = useState(false);

  //select a option promp
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  //update the option selected in the checkbox
  useEffect(() => {
    console.log("Selected option:", selectedOption);
  }, [selectedOption]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrompt(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    event.preventDefault();
  
    setErrorPrompt(false);
    openModal()
  };

  //update initialPromptList array
  useEffect(() => {
    console.log("update list");
  }, [initialPromptList]);

  const addNewPrompt = () => {
    setPromptList((list) => [
      ...list,
      {
        id:promptList.length + 1,
        name: newPrompt,
        promt: newPrompt,
      },
    ]);
    setNewPrompt("");
  };

  const openModal = () => {
    if (newPrompt === "" || newPrompt.length < 4) {
      console.log("error en el prompt");
      setErrorPrompt(true);
      return;
    }
    setErrorPrompt(false);
    const documentVar: any = document.getElementById("my_modal_1");
    if (documentVar) {
      documentVar.showModal();
    }
  };


  return (
    <div className="h-screen pt-24 bg-black ">
      <h1 className="md:text-2xl font-medium mr-4 mb-4">
        Choose a personality for your AI chat
      </h1>

      <div className="mb-10 h-48 overflow-y-auto">
        {promptList.map((item) => (
          <div key={item.id} className="form-control">
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
          Example:{" "}
          <span className="text-orange-500">
            Me gustaria que admires mi progreso en el ingles, que seas una IA
            amable.
          </span>
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
          <button onClick={openModal} className="btn btn-active btn-accent">
            Add prompt
          </button>
        </div>
      </div>
      {errorPrompt ? <ToastError /> : ""}
      <Modal
        title={"Save prompt"}
        description={`Do u wanna save this prompt? : ${newPrompt}`}
        action={addNewPrompt}
      />
    </div>
  );
}

export default ConfigurationPromptPage;
