import React, { useState } from "react";
import { lodgeComplaint } from "../../../services/history.service";
const OnlinePaymentNotReflected = ({ subType }) => {
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);
  const [description, setDescription] = useState("");
  const FURTHER_SUB_CATEGORY_ID= 19;

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = {
      subType,
      paymentDate,
      paymentAmount,
      paymentMethod,
      transactionID,
      paymentProof,
    };
    const dataPayload = {
            further_subcategory_id: FURTHER_SUB_CATEGORY_ID,
            description:  description || "-",
            form_data: formData,
            supporting_file: paymentProof|| "-",
          };
        
          try {
            // Call the lodgeComplaint service
            const response = await lodgeComplaint(dataPayload);
        
            if (response.status) {
              alert("Your complaint has been submitted successfully!");
              // Reset the form
              setPaymentDate("");
              setPaymentAmount("");
              setPaymentMethod("");
              setTransactionID("");
              setPaymentProof(null);
              
              
            } else {
              alert(response.message || "Failed to submit your complaint.");
            }
          } catch (error) {
            console.error("Error submitting complaint:", error);
            alert("An error occurred while submitting your complaint.");
          }
        
        }


  const handleFileChange = (e) => {
    setPaymentProof(e.target.files[0]);
  };

  return (
    <form  onSubmit={handleSubmit}>
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

      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
  );
};

export default OnlinePaymentNotReflected;
