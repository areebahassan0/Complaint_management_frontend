import React from 'react';
import ModuleDashboard from '../Dashboard/ModuleDashboardPage';
import ChatWidget from '../../components/ChatWidget';
import billingImage from '../../assets/css/3d-render-smartphone-payment-confirmation-bill.jpg';
import './BillingDashboardPage.css';
// import Header from '../../components/Header';

const BillingDashboardPage = () => (
  <div className="dashboard-container" style={{ 
    backgroundImage: `url(${billingImage})`,
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
        title="Manage Your Bills with Ease"
        options={[
          { label: 'View Current Bill', path: '/current-bill' },
          { label: 'Payment History', path: '/payment-history' },
          { label: 'Download Bills', path: '/download-bills' }
        ]}
      />
      {/* Chat widget sits on top of everything */}
      <ChatWidget />
    </div>
  </div>
);

export default BillingDashboardPage; 