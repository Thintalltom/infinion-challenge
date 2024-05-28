import './App.css'
import Campaigns from './Components/Campaigns/Campaigns'
import { Routes, Route, Router} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import OverviewBoard from './Components/Overviewboard/OverviewBoard';
import DashboardView from './Components/DashboardView/DashboardView';
import NewCampaign from './Components/NewCampaign/NewCampaign';
function App() {


  return (
   
    <div className='flex'>
     <DashboardView />
     <div className='flex flex-col'>
     <Navbar />
     <Routes>
      <Route path='/campaign' element={<Campaigns />} />
      <Route path='/overview' element={<OverviewBoard />} />
      <Route path='/new' element={<NewCampaign />} />
      </Routes>
     </div>
      

     
    </div>
   
  )
}

export default App
