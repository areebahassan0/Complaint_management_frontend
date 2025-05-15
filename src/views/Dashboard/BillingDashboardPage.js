import React, { useEffect, useState } from 'react';
import ModuleDashboard from '../Dashboard/ModuleDashboardPage';
import { getBillingMethod, updateMethod } from '../../services/billing.service';

const BillingDashboardPage = () => {
  const [currentMethod, setCurrentMethod] = useState(null);
  const [options, setOptions] = useState([]);
  const labelToValue = {
    "10-Days-Installments": 1,
    "15-Days-Installments": 2,
    "Monthly": 3,
    "Yearly": 4
  };
  
  // Send this to API:
  
  // Create a modern label with a default badge
  const createLabel = (text, isDefault) => (
    <span>
      {text}
      {isDefault && (
        <span style={{
          marginLeft: '8px',
          background: '#03fcdf',
          color: '#333',
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: '500'
        }}>
          Default
        </span>
      )}
    </span>
  );

  // Fetch current billing method
  const fetchMethod = async () => {
    const result = await getBillingMethod();
    if (result.status) {
      setCurrentMethod(result.data.billing_type);
    } else {
      console.error(result.message);
    }
  };

  
  const handleChangeMethod = async (method) => {
    const data = {
      billing_type: labelToValue[method]
    };
    console.log(method);
    const result = await updateMethod(data);
  
    if (result.status) {
      alert(`Billing method updated to ${method}!`);
      await fetchMethod();  // Refresh to update the Default badge
    } else {
      alert('Failed to update billing method.');
    }
  };
  

  // Construct dropdown options
  const generateOptions = () => {
    return [
      { label: 'Pay Your Bill', path: '/pay-bill' },
      {
        label: 'Change Mode of Payment',
        path: '/change-billing-method'
      },
      { label: 'View Billing History', path: '/billing-history' }
    ];
  };

  useEffect(() => {
    fetchMethod();
  }, []);

  useEffect(() => {
    setOptions(generateOptions());
  }, [currentMethod]);

  return (
    <ModuleDashboard
      title="Manage Your Bills – Stay on Top of Your Payments"
      options={options}
    />
  );
};
export default BillingDashboardPage;