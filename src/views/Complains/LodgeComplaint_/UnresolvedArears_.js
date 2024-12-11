import React, { useState } from "react";
import { lodgeComplaint } from "../../../services/history.service";
const UnexplainedArears = () => {
 
  const [billingPeriod, setBillingPeriod] = useState("");
  const [previousBilledAmount, setPreviousBilledAmount] = useState("");
  const [currentBilledAmount, setCurrentBilledAmount] = useState("");
  const [description, setDescription] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const FURTHER_SUB_CATEGORY_ID= 18;
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = {
      billingPeriod,
      previousBilledAmount,
      currentBilledAmount,

    };
    const dataPayload = {
      further_subcategory_id: FURTHER_SUB_CATEGORY_ID,
      description: description || "-",
      form_data: formData,
      supporting_file: attachedFile || "-",
    };

    try {
      // Call the lodgeComplaint service
      const response = await lodgeComplaint(dataPayload);

      if (response.status) {
        alert("Your complaint has been submitted successfully!");
        // Reset the form
        setPreviousBilledAmount("");
        setBillingPeriod("");
        setCurrentBilledAmount("");
        setDescription("");
        setAttachedFile(null);
      } else {
        alert(response.message || "Failed to submit your complaint.");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("An error occurred while submitting your complaint.");
    }
  
}

  const handleFileUpload = (event) => {
    setAttachedFile(event.target.files[0]);
  };

 

  return (
    <form onSubmit={handleSubmit}>
      <h2>Unresolved Arears Complaint Form</h2>

     
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
