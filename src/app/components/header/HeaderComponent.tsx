"use client";
import { Volkhov } from "next/font/google";
import { ButtonDrawerComponent } from "./DrawerComponent";
import Link from "next/link";

const volkhov = Volkhov({ subsets: ["latin"], weight: "700" });

const HeaderComponent: React.FC = () => {
  return (
    <section className="flex md:px-80 px-2 justify-between right-0 py-5 fixed w-full shadow-xl bg-black shadow-black">
      <Link
        href={"/"}
        className={`text-2xl  font-bold text-white ${volkhov.className} `}
      >
        Talk to me AI 🤖
      </Link>
      <div className="relative group">
        <ButtonDrawerComponent></ButtonDrawerComponent>
      </div>
    </section>
  );
};

export default HeaderComponent;
