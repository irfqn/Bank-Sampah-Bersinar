// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { BiChart, BiUser, BiChevronRight } from "react-icons/bi";
import { LuBuilding } from "react-icons/lu";
import { LiaWineBottleSolid } from "react-icons/lia";
import { LuBookPlus } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", icon: BiChart },
    { title: "Nasabah", icon: BiUser, gap: true },
    { title: "Penyetoran", icon: BiUser },
    { title: "Mitra", icon: LuBuilding },
    { title: "Pendataan Mitra", icon: LuBuilding },
    { title: "Trash Detection", icon: LiaWineBottleSolid },
    { title: "Education", icon: LuBookPlus },
    { title: "Logout ", icon: FiLogOut, gap: true },
  ];

  return (
    <div
      className={` ${
        open ? "w-72 bg-green-700 text-white" : "w-20 bg-green-700 text-white"
      } h-screen p-5  pt-8 relative duration-300`}
    >
      <BiChevronRight
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-white
           border-2 rounded-full  ${!open && "rotate-180"}`}
        style={{ backgroundColor: "#e47222" }} // Background color for BiChevronRight
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <BiChart className="cursor-pointer duration-500" />
        <h1
          className={`origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Admin
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-green-600 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
              index === 0 && "bg-orange-600"
            } `}
          >
            <Menu.icon />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
