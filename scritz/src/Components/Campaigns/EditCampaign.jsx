import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EditCampaign = () => {
    const [data, setData] = useState({});
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
    
      useEffect(() => {
        getData();
      }, []); 

    const navigate = useNavigate();
    const {id} = useParams()

    const {campaignName} = data
 
  return (
    <div>
      <Link to='/campaign'>
      <p className='mt-[20px] p-[20px] text-[15px]'>Back</p>
      </Link>
        

        <div className='flex justify-around'>
        <p className='text-[15px] font-medium text-[#247B7B]'>Campaign Information</p>
        <div className='bg-gray-200 p-[10px] text-[10px] flex items-center'>
          <p>Campaign Status | </p>
        <p className={` text-[10px] font-medium ${campaignName ? 'text-[#247B7B]' : 'text-red-500'}`}> {campaignName ? 'Active' : 'Not Active'}</p>
        </div>
       
        </div>

        <div>

        </div>
       
    </div>
  )
}

export default EditCampaign