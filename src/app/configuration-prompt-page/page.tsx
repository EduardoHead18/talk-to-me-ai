"use client";
import { useState, useEffect } from "react";
import { ToastError } from "../components/reusable/ErrorToast";
import { Modal } from "../components/reusable/Modal";
import { motion } from "motion/react";
import { IoSaveOutline } from "react-icons/io5";
import { IPromptList } from "../utils/interface/IPromptList";

import {
  getPromptListLocalStorage,
  savePromptListLocalStorage,
} from "../utils/local-storage/prompt-list-storage";
import { sendPromptToApi } from "../services/post-api-gemini";

//transition config animation
const transition = {
  duration: 0.8,
  delay: 0.5,
  ease: [0, 0.71, 0.2, 1.01],
};
const variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

function ConfigurationPromptPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [newPrompt, setNewPrompt] = useState("");
  const [promptList, setPromptList] = useState<IPromptList[]>([]);
  const [errorPrompt, setErrorPrompt] = useState(false);

  // load the status with the localstorage data (avoid passing getStorage directly in the prompt list state to prevent rendering in each update)
  useEffect(() => {
    const storedPromptList = getPromptListLocalStorage();
    const selectedOptionFromStorage = storedPromptList.find(
      (p) => p.isSelected
    );
    setPromptList(storedPromptList);
    if (selectedOptionFromStorage) {
      setSelectedOption(selectedOptionFromStorage.prompt);
    }
  }, []);

  //update
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedPrompt = event.target.value;
    setSelectedOption(newSelectedPrompt);
    const updatedPromptList = promptList.map((prompt) =>
      prompt.prompt === newSelectedPrompt
        ? { ...prompt, isSelected: true }
        : { ...prompt, isSelected: false }
    );
    // save in the state and locals
    setPromptList(updatedPromptList);
    savePromptListLocalStorage(updatedPromptList);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrompt(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    event.preventDefault();

    setErrorPrompt(false);
    openModal();
  };

  const addNewPrompt = () => {
    //improve prompt
    const improvePrompt =
      "It doesn't matter if the message you received is in Spanish, simply respond in English according to the topic that was sent to you in this case it is: " +
      newPrompt;

    const updatePromptList = [
      ...promptList,
      {
        id: promptList.length + 1,
        prompt: improvePrompt,
        isSelected: false,
      },
    ];

    setPromptList(updatePromptList);
    savePromptListLocalStorage(updatePromptList);
    setNewPrompt("");
  };

  const openModal = () => {
    if (newPrompt === "" || newPrompt.length < 4) {
      setErrorPrompt(true);
      return;
    }
    setErrorPrompt(false);

    getPromptListLocalStorage();
    const documentVar =
      (document.getElementById("my_modal_1") as HTMLDialogElement) || null;
    if (documentVar) {
      documentVar.showModal();
    }
  };

  const sendToApiLocalStorage = async () => {
    try {
      await sendPromptToApi(promptList);
    } catch {
      throw new Error("Error sending prompts to the API");
    }
  };

  return (
    <div className="h-screen pt-24 bg-black ">
      <div className="flex  items-center justify-between mb-6">
        <h1 className="md:text-2xl font-medium mr-4 mb-4">
          Choose a personality for your AI chat
        </h1>
        <button onClick={sendToApiLocalStorage} className="btn btn-warning">
          <IoSaveOutline /> save
        </button>
      </div>

      <div className="mb-10 h-32 overflow-y-auto">
        {promptList.map((item) => (
          <motion.div
            key={item.id}
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={transition}
            className="form-control"
          >
            <label className="label cursor-pointer">
              <span className="label-text">{item.prompt}</span>
              <input
                type="radio"
                name="aiPersonality"
                value={item.prompt}
                checked={selectedOption === item.prompt}
                onChange={handleOptionChange}
                className="radio radio-warning"
              />
            </label>
            <hr />
          </motion.div>
        ))}
      </div>

      <div className="">
        <h2 className="md:text-2xl font-medium mr-4 mb-4">
          Write a new personality (prompt)
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
