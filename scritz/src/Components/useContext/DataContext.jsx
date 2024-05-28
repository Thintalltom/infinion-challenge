import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'
// Create a context
const FormDataContext = createContext();

export const useDataContext = () => useContext(FormDataContext);
// Create a provider component
export const FormDataProvider = ({ children }) => {
  const [data, setData] = useState([]);

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

  return (
    <FormDataContext.Provider value={{  data, postData }}>
      {children}
    </FormDataContext.Provider>
  );
};

// Custom hook to use the context
export const useFormData = () => useContext(FormDataContext);
