import './App.css'
import Campaigns from './Components/Campaigns/Campaigns'
import { Routes, Route, Router} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import OverviewBoard from './Components/Overviewboard/OverviewBoard';
import DashboardView from './Components/DashboardView/DashboardView';
import NewCampaign from './Components/NewCampaign/NewCampaign';
import EditCampaign from './Components/Campaigns/EditCampaign';

function App() {


  return (
   
    <div>
     <DashboardView />
     <div className='flex flex-col ml-[20rem]'>
     <Navbar />
     <Routes>
     <Route exact path='/' element={<OverviewBoard />} />
      <Route path='/campaign' element={<Campaigns />} />
      <Route path='/new' element={<NewCampaign />} />
      <Route path='/edit/:id' element={<EditCampaign />} />
      
      </Routes>
     </div>
      

     
    </div>
   
  )
}

export default App
