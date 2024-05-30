import React from "react";

const DeleteModal = ({ showModal, modalMessage, setShowModal }) => {
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm">
      <div className="flex  h-[100vh] justify-center items-center flex-col">
        <div className="bg-gray-50 shadow-md text-center w-[350px] flex justify-center text-[10px] items-center gap-[20px] flex-col h-[250px] rounded">
          <p>Campaign Deleted</p>
          <p>{modalMessage}</p>
          <button
            className="text-white bg-[#247B7B] p-[10px] rounded"
            onClick={() => setShowModal(false)}
          >
            Go back to campaign List
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
