import React, { useState } from "react";

const UnexplainedArears = () => {
 
  const [billingPeriod, setBillingPeriod] = useState("");
  const [previousBilledAmount, setPreviousBilledAmount] = useState("");
  const [currentBilledAmount, setCurrentBilledAmount] = useState("");
  const [description, setDescription] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      billingPeriod,
      previousBilledAmount,
      currentBilledAmount,
      description,
    };
    console.log("Form Submitted:", formData);
    // Handle submission logic (e.g., send to backend)
  };

  const handleFileUpload = (event) => {
    setAttachedFile(event.target.files[0]);
  };

 

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Unexplained Charges Complaint Form</h2>

     
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

      {/* Total Billed Amount */}
      <div className="form-group">
        <label htmlFor="previousBilledAmount">Previous Billed Amount</label>
        <input
          type="number"
          id="previousBilledAmount"
          value={previousBilledAmount}
          onChange={(e) => setPreviousBilledAmount(e.target.value)}
          placeholder="Enter total billed amount"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="previousBilledAmount">Current Bill Amount</label>
        <input
          type="number"
          id="currentBillAmount"
          value={currentBilledAmount}
          onChange={(e) => setCurrentBilledAmount(e.target.value)}
          placeholder="Enter total billed amount"
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
          placeholder="Provide additional details about the charges..."
          rows="4"
        />
      </div>

       {/* Attach Image */}
       <div className="form-group">
        <label htmlFor="attachment">Attach Previous Bill Submission Picture</label>
        <input
          type="file"
          id="attachment"
          accept="image/*"
          onChange={handleFileUpload}
          required
        />
        {attachedFile && <p>Attached File: {attachedFile.name}</p>}
      </div>


      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
  );
};

export default UnexplainedArears;
