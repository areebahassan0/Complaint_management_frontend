import React from 'react';
import ModuleDashboard from '../Dashboard/ModuleDashboardPage';
import ChatWidget from '../../components/ChatWidget';
import poweroutageImage from '../../assets/css/6542080.jpg';
import './DashboardPage.css';
// import Header from '../../components/Header';

const ComplaintDashboardPage = () => (
  <div className="dashboard-container" style={{ 
    backgroundImage: `url(${poweroutageImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    position: 'relative'
  }}>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(27, 20, 100, 0.7)', // #1B1464 with 70% opacity
      zIndex: 1
    }} />
    <div style={{ position: 'relative', zIndex: 2 }}>
      {/* <Header /> */}
      
      <ModuleDashboard
        title="Your Voice Matters – File Complaints Quickly and Efficiently"
        options={[
          { label: 'Lodge your complaint', path: '/lodge-complaint' },
          { label: 'Track your complaint', path: '/track-complaints' },
          { label: 'View Complaint History', path: '/complaints-history' }
        ]}
      />
      {/* Chat widget sits on top of everything */}
      <ChatWidget />
    </div>
  </div>
);

export default ComplaintDashboardPage;
