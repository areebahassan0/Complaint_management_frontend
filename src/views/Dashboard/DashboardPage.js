import React from 'react';
import ModuleDashboard from '../Dashboard/ModuleDashboardPage';
import ChatWidget from '../../components/ChatWidget';
// import Header from '../../components/Header';

const ComplaintDashboardPage = () => (
  <>
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
    
  </>
);

export default ComplaintDashboardPage;
