import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
const Campaigns = () => {
  return (
    <div className="border-[1px] p-[30px] mt-[10px]">
      <div>
        <p>All campaigns</p>
      </div>

      <div className="flex justify-around items-center ">
        <div className="flex  gap-[20px] mt-[20px]">
          <button className="border-[1px] rounded text-[10px] p-[10px] w-[70px] text-[#2A9D8F] border-[#2A9D8F] hover:text-white hover:bg-[#2A9D8F]">
            All ()
          </button>
          <button className="border-[1px] rounded text-[10px] p-[10px] w-[70px] text-[#2A9D8F] border-[#2A9D8F] hover:text-white hover:bg-[#2A9D8F]">
            Inactive()
          </button>
          <button className="border-[1px] rounded text-[10px] p-[10px] w-[70px] text-[#2A9D8F] border-[#2A9D8F] hover:text-white hover:bg-[#2A9D8F]">
            Active ()
          </button>
        </div>

        <div className="flex mt-[20px] justify-between items-center w-[200px] shadow-sm border-[1px] rounded-sm bg-[#FFF] p-[5px] ">
            <input
              type="text"
              className=" w-[250px] p-[5px] text-xs rounded"
              placeholder="Search..."
            />
            <CiSearch />
          </div>


          <div className="flex mt-[20px] justify-between items-center w-[200px] shadow-sm border-[1px] rounded-sm bg-[#FFF] p-[5px] ">
            <input
              type="text"
              className=" w-[250px] p-[5px] text-xs rounded"
              placeholder="Filter by date..."
            />
            <IoIosArrowDown />
          </div>
      </div>
    </div>
  );
};

export default Campaigns;
