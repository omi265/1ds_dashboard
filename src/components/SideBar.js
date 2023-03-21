import React, { useState } from "react";
import { FaBars, FaUserAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { RiAdminFill } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";

function SideBar() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <FaBars
        className={`${
          open
            ? "hidden"
            : "bg-black text-white text-3xl rounded-sm p-1 cursor-pointer m-5"
        } duration-300`}
        onClick={() => setOpen(!open)}
      />
      <div
        className={`${
          open ? "bg-[#242939] h-screen w-72" : "w-0"
        } duration-300 flex flex-col`}
      >
        <div className={`${open ? "flex bg-[#0d6efd] p-5" : "hidden"}  `}>
          <div className="flex-1 text-white text-xl">APPLICATION</div>
          <FaBars
            className="text-slate-400 text-3xl rounded-sm p-1 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className={`${open ? "flex p-2" : "hidden"}`}>
          <FaUserAlt className="text-white text-5xl p-1 mt-5" />
          <div className="flex flex-col flex-1 p-3 ml-5">
            <div className="text-lg text-slate-400">Username</div>
            <div className="flex text-slate-400">
              <FiLogOut className="mt-1 mr-1 text-slate-400" />
              Logout
            </div>
            <div className="flex text-slate-400">
              <RiAdminFill className="mt-1 mr-1 text-slate-400" />
              Admin Settings
            </div>
          </div>
        </div>
        <div className={`${open ? "flex flex-row justify-center" : "hidden"}`}>
          <div className="flex justify-center text-slate-400">
            <BsGraphUpArrow className=" text-slate-400 mr-5 mt-1" />
            Performance Overview
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;

// {` ${
//   open ? " bg-red-500 h-screen p-5 pt-8 w-72" : "w-0"
// }  duration-300 flex flex-col`}
