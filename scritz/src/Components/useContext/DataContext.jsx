import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// Create a context
const FormDataContext = createContext();

export const useDataContext = () => useContext(FormDataContext);
// Create a provider component
export const FormDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEnddate] = useState("");
  const [dailyDigest, setdailyDigest] = useState("");
  const [linkedKeywords, setLinkedKeywords] = useState([]);
  const [inputValue, setInputValues] = useState("");
  const [digestCampaign, setdigestCampaign] = useState(false);
  const [campaignStatus, setCampaignStatus] = useState("");
  const [info, setInfo] = useState([]);
  const [data, setData] = useState({})

  const updateFormData = (data) => {
    setData(data);
  };

  const postData = async (postData) => {
    try {
      const response = await axios.post(
        'https://infinion-test-int-test.azurewebsites.net/api/Campaign',
        postData,
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      );
      console.log('Response:', response.data);
      
      // Optionally, you can update the UI with the response data
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };  

  const navigate = useNavigate();
  const { id } = useParams();
  
  const getData = async () => {
    try {
      const response = await axios.get(
        `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <FormDataContext.Provider value={{  getData, data, postData, isLoading, setIsLoading, selectedOption, setSelectedOption, campaignName, setCampaignName, 
      campaignDescription, setCampaignDescription,startDate, setStartDate, endDate, setEnddate, dailyDigest, setdailyDigest,
      linkedKeywords, setLinkedKeywords, inputValue, setInputValues, digestCampaign, setdigestCampaign,
      campaignStatus, setCampaignStatus, info, setInfo
      
     }}>
      {children}
    </FormDataContext.Provider>
  );
};

// Custom hook to use the context
export const useFormData = () => useContext(FormDataContext);
