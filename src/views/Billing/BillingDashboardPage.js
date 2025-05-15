import React, { useEffect, useState } from 'react';
import ModuleDashboard from '../Dashboard/ModuleDashboardPage';
import ChatWidget from '../../components/ChatWidget';
import billingImage from '../../assets/css/3d-render-smartphone-payment-confirmation-bill.jpg';
import './BillingDashboardPage.css';

const BillingDashboardPage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = billingImage;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  if (!imageLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-lg">
        Loading background...
      </div>
    );
  }

  return (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: `url(${billingImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(27, 20, 100, 0.7)', // #1B1464 with 70% opacity
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <ModuleDashboard
          title="Manage Your Bills with Ease"
          options={[
            { label: 'Pay Your Bill', path: '/pay-bill' },
            { label: 'Change Mode of Payment', path: '/change-billing-method' },
            { label: 'View Billing History', path: '/billing-history' },
          ]}
        />
        <ChatWidget />
      </div>
    </div>
  );
};

export default BillingDashboardPage;
