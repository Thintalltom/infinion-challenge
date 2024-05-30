import React, { useState, useEffect } from "react";
import { useDataContext } from "../useContext/DataContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const EditCampaign = () => {
  const { id } = useParams();
  const {
    startDate,
    setStartDate,
    endDate,
    setEnddate,
    dailyDigest,
    setdailyDigest,
    linkedKeywords,
    getData,
    setLinkedKeywords,
    inputValue,
    setInputValues,
    isLoading,
    setCampaignName,
    campaignName,
    setIsLoading,
    campaignDescription,
    digestCampaign,
    setdigestCampaign,
    setCampaignDescription,
  } = useDataContext();

  const navigate = useNavigate();
  const editPostData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newData = {
      id,
      campaignName,
      campaignDescription,
      startDate,
      endDate,
      digestCampaign,
      linkedKeywords,
      dailyDigest,
    };
    try {
      const response = await axios.put(
        `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`,
        newData,
        {
          headers: {
            "Content-Type": "text/json",
            Accept: "text/json",
          },
        }
      );
      navigate("/campaign");
    } catch (error) {
      console.error(
        "Error posting data:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDigest = (event) => {
    setdigestCampaign(event.target.value === "true");
    console.log(digestCampaign);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSelected = (e) => {
    setdailyDigest(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputValues(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newKeyword = inputValue.trim();
      if (newKeyword !== "") {
        setLinkedKeywords([...linkedKeywords, newKeyword]);
        setInputValues("");
      }
    }
  };

  const removeKeyword = (index) => {
    const updatedKeywords = linkedKeywords.filter((_, i) => i !== index);
    setLinkedKeywords(updatedKeywords);
  };

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const deleteCamp = () => {
    setModal(true);
  };
  const deleteCampaign = async () => {
    try {
      const response = await axios.delete(
        `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`
      );
      setDeleteModal(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div>
        <Link
          to="/campaign"
          className=" flex items-center p-[20px] gap-[10px]  text-[10px] mt-[20px] "
        >
          <FaArrowLeft />
          <p className=" text-[10px]"> Back</p>
        </Link>
      </div>

      <div className="flex justify-between p-[20px]">
        <p className="text-[15px] font-medium text-[#247B7B]">
          Campaign Information
        </p>
        <p className="text-[10px] bg-gray-300 p-[10px] rounded">
          Campaign Status |{" "}
          <span
            className={`p-[10px] text-[10px] font-medium ${
              campaignName ? "text-[#247B7B]" : "text-red-500"
            }`}
          >
            {" "}
            {campaignName ? "Active" : "Not Active"}
          </span>
        </p>
      </div>

      <div className="p-[30px] mt-[-30px]">
        <form>
          <div>
            <div className="hidden">
              Campaign Status: {campaignName ? "Active" : "Not Active"}
            </div>
            <label className="text-[10px] flex items-center">
              Campaign Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <br />
            <input
              type="text"
              required
              placeholder="e.g the future is now"
              className="text-[10px] w-[500px] border-[1px] p-[10px]"
              name="campaignName"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
            />
          </div>

          <div className="mt-[10px]">
            <label className="text-[10px] flex items-center">
              Campaign Description
              <span className="text-red-500 ml-1">*</span>
            </label>
            <br />
            <textarea
              required
              placeholder="Please add a description to your campaign"
              className="text-[10px] w-[500px] h-[50px] border-[1px] p-[10px] mt-1"
              name="campaignDescription"
              value={campaignDescription}
              onChange={(e) => setCampaignDescription(e.target.value)}
            />
          </div>
          <div className="flex gap-[20px] mt-[10px]">
            <div>
              <label className="text-[10px] flex items-center">
                Start Date
                <span className="text-red-500 ml-1">*</span>
              </label>
              <br />
              <input
                type="date"
                required
                placeholder="e.g the future is now"
                name="startDate"
                className="text-[10px] w-[250px] border-[1px] p-[10px]"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[10px] flex items-center">
                End Date
                <span className="text-red-500 ml-1">*</span>
              </label>
              <br />
              <input
                type="date"
                required
                placeholder="e.g the future is now"
                name="endDate"
                className="text-[10px] w-[250px] border-[1px] p-[10px]"
                value={endDate}
                onChange={(e) => setEnddate(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-[10px] ">
            <label className="text-[10px] flex items-center">
              Linked Keyword
              <span className="text-red-500 ml-1">*</span>
            </label>
            <br />
            <div className="border-[1px] w-[500px] h-[100px]">
              <div className="flex flex-wrap gap-[10px] p-[10px]">
                {linkedKeywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-[10px] flex-row gap-[5px] border-[1px] p-[5px] bg-[#247B7B] text-white "
                  >
                    {" "}
                    <span>{keyword}</span>
                    <button onClick={() => removeKeyword(index)}>
                      {" "}
                      &times;{" "}
                    </button>
                  </div>
                ))}
              </div>

              <input
                required
                placeholder="Press enter after typing...."
                className="text-[10px] w-[500px] h-[40px]  p-[10px] mt-[35px]"
                value={inputValue}
                name="linkedKeywords"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <p className="text-[10px] mt-[40px]">
            Want to recieve daily digest about the campaign?
          </p>
          <select
            value={digestCampaign}
            onChange={handleDigest}
            name="dailyDigest"
            className="text-[10px] w-[400px] border-[1px] p-[10px] mt-[20px]"
            required
          >
            <option>Select</option>
            <option value={false}>Yes</option>
            <option value={true}>No</option>
          </select>

          <p className="text-[10px] mt-[20px]">
            Kindly select how often you want to recieve daily digest
          </p>
          <select
            value={dailyDigest}
            onChange={handleSelected}
            name="dailyDigest"
            className="text-[10px] w-[400px] border-[1px] p-[10px] mt-[20px]"
            required
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <div className="flex justify-between  w-[500px] mt-[50px]">
            <button
              onClick={deleteCamp}
              className="text-[10px] text-center border-[1px] bg-[#990000] text-white rounded w-[200px] p-[10px] "
            >
              Stop Campaign
            </button>
            <button
              onClick={editPostData}
              className="text-[10px] text-center border-[1px] border-[#247B7B] text-[#247B7B] rounded w-[200px] p-[10px] "
            >
              {isLoading ? "Loading.." : "Edit Information"}
            </button>
          </div>
        </form>
        {modal && (
          <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm">
            <div className="flex  h-[100vh] justify-center items-center flex-col">
              <div className="bg-gray-50 shadow-md text-center w-[350px] flex justify-center text-[10px] items-center gap-[20px] flex-col h-[250px] rounded">
                <p className="font-medium">Stop Campaign</p>
                <p>Are you sure you want to stop {campaignName}?</p>
                <p>This action cannot be undone</p>
                <div className="flex justify-between gap-[30px]">
                  <button
                    onClick={() => {
                      setModal(false);
                    }}
                    className="border-[1px] w-[100px] border-zinc-950  p-[10px] rounded"
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-red-500 p-[10px] rounded"
                    onClick={deleteCampaign}
                  >
                    Delete Campaign
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {deleteModal && (
          <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm">
            <div className="flex  h-[100vh] justify-center items-center flex-col">
              <div className="bg-gray-50 shadow-md text-center w-[350px] flex justify-center text-[10px] items-center gap-[20px] flex-col h-[250px] rounded">
                {" "}
                <p className="text-center font-medium text-[10px]">
                  Campaign Deleted
                </p>
                <p>{campaignName}</p>
                <button
                  onClick={() => navigate("/campaign")}
                  className="mt-4 bg-[#247B7B] text-[10px] w-[150px] text-white p-2 rounded"
                >
                  Go back to campaign List
                </button>{" "}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditCampaign;
