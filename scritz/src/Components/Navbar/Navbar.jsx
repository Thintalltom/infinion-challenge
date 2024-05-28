import React from "react";
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoMdContact } from "react-icons/io";

const Navbar = () => {
  


  return (
    <div>
      <div className="shadow-sm w-[60.5rem] p-[15px]">
        <div className="flex justify-around">
          <div className="flex justify-between items-center w-[350px] shadow-sm border-[1px] rounded-sm bg-[#FFF] p-[5px] ">
            <input
              type="text"
              className=" w-[250px] p-[5px] text-xs rounded"
              placeholder="Search..."
            />
            <CiSearch />
          </div>

          <div className="flex justify-center items-center gap-[10px]">
            <CiBellOn />

            <IoMdContact />
            <p className="text-xs">BigTech</p>
            <IoIosArrowDown />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
