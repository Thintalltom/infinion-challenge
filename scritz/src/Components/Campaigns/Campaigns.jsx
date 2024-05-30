import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";

const Campaigns = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();
  //function to get data
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://infinion-test-int-test.azurewebsites.net/api/Campaign"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteCampaign = async (campaignId, campaignName) => {
    try {
      const response = await axios.delete(
        `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${campaignId}`
      );
      setData(data.filter((campaign) => campaign.id !== campaignId));
      setModalMessage(`${campaignName} has been deleted`);
      setShowModal(true);
      console.log("deleted");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const countCampaigns = () => {
    const activeCount = data.filter((campaign) => campaign.campaignName).length; // destructure the array to get length of campaign active/non-active
    const inactiveCount = data.filter(
      (campaign) => !campaign.campaignName
    ).length;
    return { activeCount, inactiveCount };
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const { activeCount, inactiveCount } = countCampaigns();
  return (
    <div className="border-[1px] p-[30px] mt-[10px]">
      <div>
        <p>All campaigns</p>
      </div>

      <div className="flex justify-around items-center ">
        <div className="flex  gap-[20px] mt-[20px]">
          <button className="border-[1px] rounded text-[10px] p-[10px] w-[70px] text-[#2A9D8F] border-[#2A9D8F] hover:text-white hover:bg-[#2A9D8F]">
            All ({data.length})
          </button>
          <button className="border-[1px] rounded text-[10px] p-[10px] w-[70px] text-[#2A9D8F] border-[#2A9D8F] hover:text-white hover:bg-[#2A9D8F]">
            Inactive({inactiveCount})
          </button>
          <button className="border-[1px] rounded text-[10px] p-[10px] w-[70px] text-[#2A9D8F] border-[#2A9D8F] hover:text-white hover:bg-[#2A9D8F]">
            Active ({activeCount})
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

      <div>
        <table className="   w-full mt-[40px] p-[10px]">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr className="ml-[20px]">
              <th className="p-[10px] text-left text-[10px]">S/N</th>
              <th className="p-[10px] text-left text-[10px] ">Campaign Name</th>
              <th className="p-[10px] text-left text-[10px] ">Start Date</th>
              <th className="p-[10px] text-left text-[10px] ">Status</th>
              <th className="p-[10px] text-left text-[10px] ">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((campaign, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-[10px] text-[10px] font-medium">
                  {index + 1}
                </td>
                <td className="p-[10px] text-[10px] font-medium">
                  {campaign.campaignName}
                </td>
                <td className="p-[10px] text-[10px] font-medium">
                  {new Date(campaign.startDate).toLocaleDateString()}
                </td>
                <td
                  className={`p-[10px] text-[10px] font-medium ${
                    campaign.campaignName ? "text-[#247B7B]" : "text-red-500"
                  }`}
                >
                  {campaign.campaignName ? "Active" : "Not Active"}
                </td>
                <td className="p-[10px] text-[10px] font-light items-center gap-[20px] text-sm flex ">
                  <IoEyeOutline className="cursor-pointer" />
                  <FaRegEdit
                    className="cursor-pointer hover:text-[#247B7B]"
                    onClick={() => navigate(`/edit/${campaign.id}`)}
                  />
                  <RiDeleteBin6Line
                    className="cursor-pointer hover:text-red-500"
                    onClick={() =>
                      deleteCampaign(campaign.id, campaign.campaignName)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <DeleteModal
          showModal={showModal}
          modalMessage={modalMessage}
          setShowModal={setShowModal}
        />
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          className="p-[5px] mx-1 cursor-pointer rounded disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <MdArrowBackIos className="text-sm" />
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 flex items-center w-[10px] ${
              currentPage === index + 1
                ? "bg-[#247B7B] text-[10px] flex items-center justify-center rounded-full text-white"
                : ""
            }`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="p-[5px] mx-1 cursor-pointer rounded disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <MdArrowForwardIos />
        </button>

        <div>
          <p className="text-[10px]">
            Showing {currentPage} of {totalPages} results
          </p>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
