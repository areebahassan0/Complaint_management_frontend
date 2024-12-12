import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';

const DashboardPage = () => {
  const navigate = useNavigate();

  // Handlers for navigation
  const onLodge = () => {
    navigate('/lodge-complaint');
  };

  const onTrack = () => {
    navigate('/track-complaints');
  };

  const onViewHistory = () => {
    navigate('/complaints-history');
  };

  return (
    <DashboardLayout>
      <div className="dashboard-content">
        <h2 className="custom-text">
          Your Voice Matters – File Complaints Quickly and Efficiently
        </h2>

        <div className="button-container">
          <button className="button-74" role="button" onClick={onLodge}>
            Lodge your complaint
          </button>

          <button className="button-74" role="button" onClick={onTrack}>
            Track your complaint
          </button>

          <button className="button-74" role="button" onClick={onViewHistory}>
            View Complaint History
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
