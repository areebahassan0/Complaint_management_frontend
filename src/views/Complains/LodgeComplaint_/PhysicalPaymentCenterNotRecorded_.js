import React, { useState } from "react";
import { lodgeComplaint } from "../../../services/history.service";
const PhysicalPaymentCenterNotRecorded = ({ subType }) => {
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentCenterLocation, setPaymentCenterLocation] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);
  const [description, setDescription] = useState("");
 
  const FURTHER_SUB_CATEGORY_ID = 21
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = {
      subType,
      paymentDate,
      paymentAmount,
      paymentCenterLocation,
      receiptNumber,
    };
    const dataPayload = {
          further_subcategory_id: FURTHER_SUB_CATEGORY_ID,
          description:  description || "-",
          form_data: formData,
          supporting_file: paymentProof || "-",
        };
      
        try {
          // Call the lodgeComplaint service
          const response = await lodgeComplaint(dataPayload);
      
          if (response.status) {
            alert("Your complaint has been submitted successfully!");
            // Reset the form
             // Reset form
              setPaymentDate("");
              setPaymentAmount("");
              setPaymentCenterLocation("");
              setReceiptNumber("");
              setPaymentProof(null);
              setDescription("");
            
            
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
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="homepage-title">{subType} Physical Payment Center Complaint</h2>
        <h3 className="small-slim-heading">Payment made at a payment center is not recorded</h3>
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

        {/* Payment Center Location */}
        <div className="form-group">
          <label htmlFor="paymentCenterLocation">Payment Center Location</label>
          <input
            type="text"
            id="paymentCenterLocation"
            value={paymentCenterLocation}
            onChange={(e) => setPaymentCenterLocation(e.target.value)}
            required
          />
        </div>

        {/* Receipt Number (Digits Only) */}
        <div className="form-group">
          <label htmlFor="receiptNumber">Receipt Number</label>
          <input
            type="number"
            id="receiptNumber"
            value={receiptNumber}
            onChange={(e) => setReceiptNumber(e.target.value)}
            required
          />
        </div>

        {/* Payment Receipt */}
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

        <button type="submit" className="homepage-button">
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default PhysicalPaymentCenterNotRecorded;
