import React from 'react';
import './BillingMethodModal.css';

const BillingMethodModal = ({ show, onClose, onSelect }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Select a Billing Method</h3>
        <button onClick={() => onSelect('Yearly')}>Yearly</button>
        <button onClick={() => onSelect('Monthly')}>Monthly</button>
        <button onClick={() => onSelect('15-Days-Installments')}>15 Days Installments</button>
        <button onClick={() => onSelect('10-Days-Installments')}>10 Days Installments</button>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default BillingMethodModal;


