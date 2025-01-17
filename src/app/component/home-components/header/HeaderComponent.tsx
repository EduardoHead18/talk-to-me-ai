"use client";
import { IoIosSettings } from "react-icons/io";
import { Volkhov } from "next/font/google";
import { ButtonDrawerComponent } from "./DrawerComponent";

const volkhov = Volkhov({ subsets: ["latin"], weight: "700" });

const HeaderComponent: React.FC = () => {
  return (
    <section className="flex md:px-80 justify-between  right-0 py-4 fixed w-full shadow-xl shadow-black">
      <h1 className={`text-2xl  font-bold text-white ${volkhov.className} `}>
        Speak English with AI 🤖
      </h1>
      <div className="relative group">
        <ButtonDrawerComponent></ButtonDrawerComponent>
      </div>
    </section>
  );
};

export default HeaderComponent;
