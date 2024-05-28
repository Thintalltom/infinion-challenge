import React from "react";
import { useState } from "react";
import { FaToggleOff } from "react-icons/fa6";
import { IoToggle } from "react-icons/io5";
import { useDataContext } from "../useContext/DataContext";

const NewCampaign = () => {
  const [open, setOpen] = useState(false);
  const { data, postData } = useDataContext();
  const handleToggle = () => {
    setdailyDigest(!dailyDigest);
    console.log(dailyDigest)
  };

  const [selectedOption, setSelectedOption] = useState("");

  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEnddate] = useState("");
  const [dailyDigest, setdailyDigest] = useState("");
  const [linkedKeywords, setLinkedKeywords] = useState([]);
  const [digestCampaign, setdigestCampaign] = useState(false);
  const [campaignStatus, setCampaignStatus] = useState("");

  const handlePostData = (e) => {
    e.preventDefault();
    const newData = {
      campaignName,
      campaignDescription,
      startDate,
      endDate,
      digestCampaign,
      linkedKeywords,
      dailyDigest,
      campaignStatus: campaignName ? "Active" : "Not active"
    };
    console.log(newData);
    postData(newData);
  };

  const handleLinked = (e) => {
    const input = e.target.value;
    const keywordsArray = input.split(',').map(keyword => keyword.trim());
    setLinkedKeywords(keywordsArray);
    console.log(keywordsArray); // Log the array to check the values
  };

  const handleSelected = (e) => {
    setCampaignDigest(e.target.value)
    console.log(campaignDigest)
  }

  return (
    <div className="p-[30px] mt-[10px]">
      <div className="font-bold text-[#247B7B]"> Create New Campaign</div>
      <form className="mt-[20px]">
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
            className="text-[10px] w-[500px] h-[100px] border-[1px] p-[10px] mt-1"
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
              className="text-[10px] w-[250px] border-[1px] p-[10px]"
              value={endDate}
              onChange={(e) => setEnddate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between mt-[10px]  w-[500px] p-[10px]">
          <p className="text-[10px]">
            Want to recieve daily digest about the campaign ?{" "}
          </p>
          <button onClick={handleToggle}>
            {digestCampaign ? (
              <FaToggleOff className="text-2xl" />
            ) : (
              <IoToggle className="text-2xl" />
            )}
          </button>
        </div>
        <div className="mt-[10px]">
          <label className="text-[10px] flex items-center">
            Linked Keyword
            <span className="text-red-500 ml-1">*</span>
          </label>
          <br />
          <textarea
            required
            placeholder="Please add a description to your campaign"
            className="text-[10px] w-[500px] h-[100px] border-[1px] p-[10px] mt-1"
            value={linkedKeywords}
            onChange={handleLinked}
          />
        </div>

        <p className="text-[10px] mt-[20px]">
          Kindly select how often you want to recieve daily digest
        </p>
        <select
          value={dailyDigest}
          onChange={handleSelected}
          className="text-[10px] w-[200px] border-[1px] p-[10px] mt-[20px]"
          required
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

       

        <div className="flex justify-between  w-[500px] mt-[50px]">
          <button className="text-[10px] text-center border-[1px] border-[#247B7B] rounded w-[200px] p-[10px] ">
            Cancel
          </button>
          <button
            onClick={handlePostData}
            className="text-[10px] text-center border-[1px] bg-[#247B7B] text-white rounded w-[200px] p-[10px] "
          >
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCampaign;
