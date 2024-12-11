import React, { useState } from "react";

const LateFeeDispute = ({ subType }) => {
  const [billingPeriod, setBillingPeriod] = useState("");
  const [lateFeeAmount, setLateFeeAmount] = useState("");
  const [disputeReason, setDisputeReason] = useState("");
  const [description, setDescription] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]); 

  const handleFileChange = (e) => {
    setAttachedFiles([...e.target.files]);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      subType,
      billingPeriod,
      lateFeeAmount,
      disputeReason,
      description,
    };

    console.log("Late Fee Dispute Complaint: ", formData);

    // Reset form
    setBillingPeriod("");
    setLateFeeAmount("");
    setDisputeReason("");
    setDescription("");
    alert("Your complaint has been submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{subType} Late Fee Dispute Complaint</h2>
      
      <h3 className="small-slim-heading">Users dispute the amount of the late fee</h3>
      {/* Billing Period */}
      <div className="form-group">
        <label htmlFor="billingPeriod">Billing Period</label>
        <input
          type="month"
          id="billingPeriod"
          value={billingPeriod}
          onChange={(e) => setBillingPeriod(e.target.value)}
          required
        />
      </div>

      {/* Late Fee Amount Disputed */}
      <div className="form-group">
        <label htmlFor="lateFeeAmount">Late Fee Amount Disputed</label>
        <input
          type="number"
          id="lateFeeAmount"
          value={lateFeeAmount}
          onChange={(e) => setLateFeeAmount(e.target.value)}
          placeholder="Enter late fee amount"
          required
        />
      </div>

      {/* Reason for Dispute */}
      <div className="form-group">
        <label htmlFor="disputeReason">Reason for Dispute</label>
        <input
          type="text"
          id="disputeReason"
          value={disputeReason}
          onChange={(e) => setDisputeReason(e.target.value)}
          placeholder="e.g., excessive late fee amount, circumstances for delay not considered"
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

      <div className="form-group">
        <label htmlFor="attachedFiles">Attach Files (Optional)</label>
        <input
          type="file"
          id="attachedFiles"
          multiple
          onChange={handleFileChange}
        />
        {attachedFiles.length > 0 && (
          <ul>
            {Array.from(attachedFiles).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
  );
};

export default LateFeeDispute;
