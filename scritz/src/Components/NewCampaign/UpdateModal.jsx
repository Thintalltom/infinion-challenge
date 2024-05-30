import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
const UpdateModal = ({ showModal, modalMessage, setShowModal }) => {
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm">
      <div className="flex  h-[100vh] justify-center items-center flex-col">
        <div className="bg-gray-50 shadow-md text-center w-[350px] flex justify-center text-[10px] items-center gap-[20px] flex-col h-[250px] rounded">
          <IoCheckmarkCircle className="text-[60px] text-[#247B7B]" />
          <p className="text-[10px]">{modalMessage}</p>
          <Link to="/campaign">
            <button
              className="text-white bg-[#247B7B] p-[10px] rounded w-[170px]"
              onClick={() => setShowModal(false)}
            >
              Go back to campaign List
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
