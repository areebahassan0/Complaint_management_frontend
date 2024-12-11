import React, { useState } from "react";

const OnlinePaymentNotReflected = ({ subType }) => {
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      subType,
      paymentDate,
      paymentAmount,
      paymentMethod,
      transactionID,
      paymentProof,
    };

    console.log("Payment Not Reflected Complaint: ", formData);

    // Reset form
    setPaymentDate("");
    setPaymentAmount("");
    setPaymentMethod("");
    setTransactionID("");
    setPaymentProof(null);
    alert("Your complaint has been submitted successfully!");
  };

  const handleFileChange = (e) => {
    setPaymentProof(e.target.files[0]);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>{subType} Online Payment  Complaint</h2>
       
      <h3 className="small-slim-heading">Payment made online is not showing in the system</h3>
      {/* Payment Date */}
      <div className="form-group">
        <label htmlFor="paymentDate">Payment Date</label>
        <input
          type="date"
          id="paymentDate"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          required
        />
      </div>

      {/* Payment Amount */}
      <div className="form-group">
        <label htmlFor="paymentAmount">Payment Amount</label>
        <input
          type="number"
          id="paymentAmount"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          required
        />
      </div>

      {/* Payment Method */}
      <div className="form-group">
        <label htmlFor="paymentMethod">Payment Method</label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          <option value="">Select Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Digital Wallet">Digital Wallet</option>
        </select>
      </div>

      {/* Online Transaction ID */}
      <div className="form-group">
        <label htmlFor="transactionID">Online Transaction ID</label>
        <input
          type="text"
          id="transactionID"
          value={transactionID}
          onChange={(e) => setTransactionID(e.target.value)}
          required
        />
      </div>

      {/* Payment Proof */}
      <div className="form-group">
        <label htmlFor="paymentProof">Upload Payment Receipt</label>
        <input
          type="file"
          id="paymentProof"
          onChange={handleFileChange}
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
  );
};

export default OnlinePaymentNotReflected;
