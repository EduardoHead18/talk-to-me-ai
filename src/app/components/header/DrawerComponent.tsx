import React from "react";
import { IoIosSettings } from "react-icons/io";
import { SideBarComponent } from "./SideBarComponent";

export const ButtonDrawerComponent = () => {
  return (
    <div className="drawer z-50">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle "
      />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="">
          <IoIosSettings
            className="hover:cursor-pointer text-white hover:text-orange-500 transition-colors"
            size={30}
          />
          {/* Tooltip */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white  text-sm font-semibold py-1 px-3 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity">
            Settings
          </div>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-black text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}

          <SideBarComponent/>
        </ul>
      </div>
    </div>
  );
};
