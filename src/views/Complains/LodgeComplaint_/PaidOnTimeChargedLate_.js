import React, { useState } from "react";

const PaidOnTimeChargedLate = ({ subType }) => {
  const [paymentDate, setPaymentDate] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionReference, setTransactionReference] = useState("");
  const [lateFeeAmount, setLateFeeAmount] = useState("");
  const [description, setDescription] = useState("");
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      subType,
      paymentDate,
      amountPaid,
      paymentMethod,
      transactionReference,
      lateFeeAmount,
      description,
      receipt,
    };

    console.log("Paid On Time But Charged Late Complaint: ", formData);

    // Reset form
    setPaymentDate("");
    setAmountPaid("");
    setPaymentMethod("");
    setTransactionReference("");
    setLateFeeAmount("");
    setDescription("");
    setReceipt(null);
    alert("Your complaint has been submitted successfully!");
  };

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  return (
    <form  onSubmit={handleSubmit}>
      <h2>{subType} Paid on Time, Charged Late Complaint</h2>
        
      <h3 className="small-slim-heading">User paid within the due date but was charged a late fee</h3>
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

      {/* Amount Paid */}
      <div className="form-group">
        <label htmlFor="amountPaid">Amount Paid</label>
        <input
          type="number"
          id="amountPaid"
          value={amountPaid}
          onChange={(e) => setAmountPaid(e.target.value)}
          placeholder="Enter amount paid"
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
          <option value="">Select Payment Method</option>
          <option value="Online">Online</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Physical Payment Center">Physical Payment Center</option>
        </select>
      </div>

      {/* Transaction Reference Number */}
      <div className="form-group">
        <label htmlFor="transactionReference">Transaction Reference Number</label>
        <input
          type="text"
          id="transactionReference"
          value={transactionReference}
          onChange={(e) => setTransactionReference(e.target.value)}
          placeholder="Enter transaction reference number"
          required
        />
      </div>

      {/* Late Fee Amount */}
      <div className="form-group">
        <label htmlFor="lateFeeAmount">Late Fee Amount</label>
        <input
          type="number"
          id="lateFeeAmount"
          value={lateFeeAmount}
          onChange={(e) => setLateFeeAmount(e.target.value)}
          placeholder="Enter late fee amount"
          required
        />
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="description">Description (Optional)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide additional details..."
          rows="4"
        />
      </div>

      {/* Receipt Upload */}
      <div className="form-group">
        <label htmlFor="receipt">Attach Payment Receipt</label>
        <input
          type="file"
          id="receipt"
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

export default PaidOnTimeChargedLate;
