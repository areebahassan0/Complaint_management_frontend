import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './views/Dashboard/DashboardPage';
import ProfilePage from './views/Profile/ProfilePage';
import SettingsPage from './views/Settings/SettingsPage';
import HistoryTable from './views/Complains/ComplainHistory/HistoryTable';
import TrackComplaints from './views/Complains/TrackComplain/TrackComplain';
import LoginPage from './views/Login/login';
import AuthLayoutRoute from './layouts/Auth';

function App() {
    return (
        <Router>
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
            </Routes>
        </Router>
    );
}

export default App;

