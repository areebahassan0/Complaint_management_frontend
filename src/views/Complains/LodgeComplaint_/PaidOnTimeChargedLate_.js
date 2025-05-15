import React, { useState } from "react";
import { lodgeComplaint } from "../../../services/history.service";
const PaidOnTimeChargedLate = ({ subType }) => {
  const [paymentDate, setPaymentDate] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionReference, setTransactionReference] = useState("");
  const [lateFeeAmount, setLateFeeAmount] = useState("");
  const [description, setDescription] = useState("");
  const [receipt, setReceipt] = useState(null);


  const FURTHER_SUB_CATEGORY_ID = 23
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = {
      subType,
      paymentDate,
      amountPaid,
      paymentMethod,
      transactionReference,
      lateFeeAmount,
    };
    const dataPayload = {
              further_subcategory_id: FURTHER_SUB_CATEGORY_ID,
              description:  description || "-",
              form_data: formData,
              supporting_file: receipt || "-",
            };
          
            try {
              // Call the lodgeComplaint service
              const response = await lodgeComplaint(dataPayload);
          
              if (response.status) {
                alert("Your complaint has been submitted successfully!");
                // Reset the form
                 // Reset form
                 setPaymentDate("");
                 setAmountPaid("");
                 setPaymentMethod("");
                 setTransactionReference("");
                 setLateFeeAmount("");
                 setDescription("");
                 setReceipt(null);
                
                
              } else {
                alert(response.message || "Failed to submit your complaint.");
              }
            } catch (error) {
              console.error("Error submitting complaint:", error);
              alert("An error occurred while submitting your complaint.");
            }
          
          }

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  return (
    <div className="form-container">
    <form  onSubmit={handleSubmit}>
      <h2  className="homepage-title" >{subType} Paid on Time, Charged Late Complaint</h2>
        
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
    </div>
  );
};

export default PaidOnTimeChargedLate;
