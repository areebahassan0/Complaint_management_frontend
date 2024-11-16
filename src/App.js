import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './views/Dashboard/DashboardPage';
import ProfilePage from './views/Profile/ProfilePage';
import SettingsPage from './views/Settings/SettingsPage';

function App() {
    return (
        <Router>
            <Routes>
               {/* Define Dashboard Routes */}
              <Route path="/dashboard"  element= {<DashboardLayout><DashboardPage/></DashboardLayout>}></Route>
              <Route path="/dashboard/profile"  element= {<DashboardLayout><ProfilePage/></DashboardLayout>}></Route>
              <Route path="/dashboard/settings"  element= {<DashboardLayout><SettingsPage/></DashboardLayout>}></Route>

              {/* Redirect to Dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </Router>
    );
}

export default App;

