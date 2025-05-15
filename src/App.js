import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './views/Dashboard/DashboardPage';
import ProfilePage from './views/Profile/ProfilePage';
import SettingsPage from './views/Settings/SettingsPage';
// import Sidebar from './components/Sidebar';
import HistoryTable from './views/Complains/ComplainHistory/HistoryTable';
import TrackComplaints from './views/Complains/TrackComplain/TrackComplain';
import LodgeComplaint from './views/Complains/LodgeComplaint_/LodgeComplaints_';
import LoginPage from './views/Login/login';
import AuthLayoutRoute from './layouts/Auth';
import Login from './views/Auth/Login';
import Signup from './views/Auth/Signup';
import ForgetPassword from './views/Auth/ForgetPass';
import OTPVerificationPage from './views/Auth/OTPVerification';
import ChangePassword from './views/Auth/ChangePassword';
import HomePage from './views/Home/HomePage'
import BillingDashboardPage from './views/Dashboard/BillingDashboardPage'
import PayYourBill from './views/Billing/PayBill/PayYourBill';
import ChangeMethod from './views/Billing/ChangeMethod/ChangeMethod';
import ConsumptionDashboard from './views/Consumption/ConsumptionDashboard';

function App() {
    return (
        <Router>
            <Routes>
                {/* Define Dashboard Routes */}
                <Route path="/home" element={<DashboardLayout><HomePage /></DashboardLayout>} />
                <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
                <Route path="/bills" element={<DashboardLayout><BillingDashboardPage /></DashboardLayout>} />
                <Route path="/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
                <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
                <Route path="/complaints-history" element={<DashboardLayout><HistoryTable /></DashboardLayout>} />
                <Route path="/track-complaints" element={<DashboardLayout><TrackComplaints /></DashboardLayout>} />
                <Route path="/lodge-complaint" element={<DashboardLayout><LodgeComplaint /></DashboardLayout>} />
                <Route path="/pay-bill" element={<DashboardLayout><PayYourBill /></DashboardLayout>} />
                <Route path="/change-billing-method" element={<DashboardLayout><ChangeMethod /></DashboardLayout>} />
                <Route path="/consumption" element={<DashboardLayout><ConsumptionDashboard /></DashboardLayout>} />
                {/* Auth Route */}
                <Route path="/signin" element={<AuthLayoutRoute><Login /></AuthLayoutRoute>} />
                <Route path="/signup" element={<AuthLayoutRoute><Signup /></AuthLayoutRoute>} />
                <Route path="/forget-password" element={<AuthLayoutRoute><ForgetPassword /></AuthLayoutRoute>} />
                <Route path="/otp-verification" element={<AuthLayoutRoute><OTPVerificationPage /></AuthLayoutRoute>} />
                <Route path="/change-password" element={<AuthLayoutRoute><ChangePassword /></AuthLayoutRoute>} />
                {/* Redirect to Dashboard */}
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </Router>
    );
}

export default App;



