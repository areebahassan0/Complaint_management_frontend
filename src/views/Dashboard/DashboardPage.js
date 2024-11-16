import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';

const DashboardPage = () => {
    const navigate = useNavigate();

    return (
        <DashboardLayout>
            <div className="dashboard-content">
                <h2>Welcome to the Complaint Management System</h2>
                <p>Pick one:</p>
                <div className="buttons">
                    <button onClick={() => navigate('/dashboard/lodge-complaint')}>Lodge a Complaint</button>
                    <button onClick={() => navigate('/dashboard/track-complaint')}>Track a Complaint</button>
                    <button onClick={() => navigate('/dashboard/complaints-history')}>Complaints History</button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardPage;
