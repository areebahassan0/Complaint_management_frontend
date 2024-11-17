import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './views/Dashboard/DashboardPage';
import ProfilePage from './views/Profile/ProfilePage';
import SettingsPage from './views/Settings/SettingsPage';
import Sidebar from './components/Sidebar';
import HistoryTable from './views/Complains/ComplainHistory/HistoryTable';
import TrackComplaints from './views/Complains/TrackComplain/TrackComplain';
import LodgeComplaints from './views/Complains/LodgeComplaint/LodgeComplaints';
function App() {
    return (
        <Router>
            <Routes>
               {/* Define Dashboard Routes */}
               
              <Route path="/dashboard"  element= {<DashboardLayout><DashboardPage/></DashboardLayout>}></Route>
              <Route path="/dashboard/profile"  element= {<DashboardLayout><ProfilePage/></DashboardLayout>}></Route>
              <Route path="/dashboard/settings"  element= {<DashboardLayout><SettingsPage/></DashboardLayout>}></Route>
              <Route path="/dashboard/complaints-history"  element= {<DashboardLayout><HistoryTable/></DashboardLayout>}></Route>  
              <Route path="/dashboard/track-complaints"  element= {<DashboardLayout><TrackComplaints/></DashboardLayout>}></Route>
              <Route path="/dashboard/lodge-complaints"  element= {<DashboardLayout><LodgeComplaints/></DashboardLayout>}></Route>  
              {/* Redirect to Dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </Router>
    );
}

export default App;

