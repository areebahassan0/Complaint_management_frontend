import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './views/Dashboard/DashboardPage';
import ProfilePage from './views/Profile/ProfilePage';
import SettingsPage from './views/Settings/SettingsPage';
<<<<<<< HEAD
//import Sidebar from './components/Sidebar';
import HistoryTable from './views/Complains/ComplainHistory/HistoryTable';
import TrackComplaints from './views/Complains/TrackComplain/TrackComplain';
import LodgeComplaint from './views/Complains/LodgeComplaint_/LodgeComplaints_';
//import IncorrectBillAmount_ from './views/Complains/LodgeComplaint_/IncorrectBillAmount_';
=======
import HistoryTable from './views/Complains/ComplainHistory/HistoryTable';
import TrackComplaints from './views/Complains/TrackComplain/TrackComplain';
import LoginPage from './views/Login/login';
import AuthLayoutRoute from './layouts/Auth';
>>>>>>> 77b23fb10e84336229e50108b8f7f67735f3c37d

function App() {
    return (
        <Router>
<<<<<<< HEAD
            <Routes>
               {/* Define Dashboard Routes */}
               
              <Route path="/dashboard"  element= {<DashboardLayout><DashboardPage/></DashboardLayout>}></Route>
              <Route path="/dashboard/profile"  element= {<DashboardLayout><ProfilePage/></DashboardLayout>}></Route>
              <Route path="/dashboard/settings"  element= {<DashboardLayout><SettingsPage/></DashboardLayout>}></Route>
              <Route path="/dashboard/complaints-history"  element= {<DashboardLayout><HistoryTable/></DashboardLayout>}></Route>  
              <Route path="/dashboard/track-complaints"  element= {<DashboardLayout><TrackComplaints/></DashboardLayout>}></Route>
              <Route path="/dashboard/lodge-complaints"  element= {<DashboardLayout><LodgeComplaint/></DashboardLayout>}></Route>
              {/* <Route path="/dashboard/lodge-complaints/Incorrect-Bill-Amount"  element= {<DashboardLayout><IncorrectBillAmount_/></DashboardLayout>}></Route>   */}
              {/* Redirect to Dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
=======
            <Routes> {/* Wrapping all routes in <Routes> */}
                {/* Define Dashboard Routes */}
                <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
                <Route path="/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
                <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
                <Route path="/complaints-history" element={<DashboardLayout><HistoryTable /></DashboardLayout>} />
                <Route path="/track-complaints" element={<DashboardLayout><TrackComplaints /></DashboardLayout>} />

                {/* Auth Route */}
                <Route path="/signin" element={<AuthLayoutRoute><LoginPage /></AuthLayoutRoute>} />

                {/* Redirect to Dashboard */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
>>>>>>> 77b23fb10e84336229e50108b8f7f67735f3c37d
            </Routes>
        </Router>
    );
}

export default App;

