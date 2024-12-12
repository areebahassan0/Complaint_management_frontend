import React, { useState } from "react";
import { lodgeComplaint } from "../../../services/history.service";
const IncorrectReading = () => {
  const [billingPeriod, setBillingPeriod] = useState("");
  const [billedMeterReading, setBilledMeterReading] = useState("");
  const [actualMeterReading, setActualMeterReading] = useState("");
  const [dateOfActualReading, setDateOfActualReading] = useState("");
  const [description, setDescription] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);

  const FURTHER_SUB_CATEGORY_ID= 14;
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!attachedFile) {
      alert("Please attach a file before submitting.");
      return;
    }

    const formData = {
      billingPeriod,
      billedMeterReading,
      actualMeterReading,
      dateOfActualReading,
    };
    const dataPayload = {
        further_subcategory_id: FURTHER_SUB_CATEGORY_ID,
        description:  description || "-",
        form_data: formData,
        supporting_file: attachedFile|| "-",
      };
    
      try {
        // Call the lodgeComplaint service
        const response = await lodgeComplaint(dataPayload);
    
        if (response.status) {
          alert("Your complaint has been submitted successfully!");
          // Reset the form
          setBillingPeriod("");
          setBilledMeterReading("");
          setActualMeterReading("");
          setDateOfActualReading("");
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
    
  
    // Reset the form
   
    
  const handleFileChange = (e) => {
    setAttachedFile(e.target.files[0]);
  };

  return (
    <form  onSubmit={handleSubmit}>
      <h2>Incorrect Reading Complaint</h2>

      <h3 className="small-slim-heading">The meter reading on the bill doesn't match the actual reading</h3>

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

      {/* Billed Meter Reading */}
      <div className="form-group">
        <label htmlFor="billedMeterReading">Billed Meter Reading</label>
        <input
          type="number"
          id="billedMeterReading"
          value={billedMeterReading}
          onChange={(e) => setBilledMeterReading(e.target.value)}
          placeholder="Enter billed meter reading"
          required
        />
      </div>

      {/* Actual Meter Reading */}
      <div className="form-group">
        <label htmlFor="actualMeterReading">Actual Meter Reading</label>
        <input
          type="number"
          id="actualMeterReading"
          value={actualMeterReading}
          onChange={(e) => setActualMeterReading(e.target.value)}
          placeholder="Enter actual meter reading"
          required
        />
      </div>

      {/* Date of Actual Reading */}
      <div className="form-group">
        <label htmlFor="dateOfActualReading">Date of Actual Reading</label>
        <input
          type="date"
          id="dateOfActualReading"
          value={dateOfActualReading}
          onChange={(e) => setDateOfActualReading(e.target.value)}
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

      {/* File Attachment */}
      <div className="form-group">
        <label htmlFor="attachedFile">Attach File (Mandatory)</label>
        <input
          type="file"
          id="attachedFile"
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

export default IncorrectReading;
