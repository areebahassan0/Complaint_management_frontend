import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';

const DashboardPage = () => {
    const navigate = useNavigate();

    return (
        <DashboardLayout>
          <div className="dashboard-content">
            <h2 className="custom-text">Your Voice Matters – File Complaints Quickly and Efficiently</h2>
      
            <div class="button-container">
                
                    <button class="button-74" role="button" onclick="navigate('/dashboard/lodge-complaint')">Lodge your complaint</button>

                    <button class="button-74" role="button" onclick="navigate('/dashboard/track-complaint')">Track your complaint</button>
                
                    <button class="button-74" role="button" onclick="navigate('/dashboard/complaints-history')">View Complaint History</button>
               
            </div>


        </div>
        </DashboardLayout>
    );

      
};

export default DashboardPage;
