import React from 'react';
import { useNavigate } from 'react-router-dom';


const DashboardPage = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-page">
            <h1>Welcome to the Complaint Management System</h1>
            <h2>Pick One:</h2>
            <div className="button-container">
                <button 
                    className="dashboard-button" 
                    onClick={() => navigate('/lodge-complaint')}
                >
                    Lodge a Complaint
                </button>
                <button 
                    className="dashboard-button" 
                    onClick={() => navigate('/track-complaint')}
                >
                    Track a Complaint
                </button>
                <button 
                    className="dashboard-button" 
                    onClick={() => navigate('/complaint-history')}
                >
                    Complaint History
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;
