import React, { useState } from "react";
import { lodgeComplaint } from "../../../services/history.service";
const MeterIssue = () => {
  // State variables for form fields
  const [meterIssueType, setMeterIssueType] = useState("");
  const [dateIssueNoticed, setDateIssueNoticed] = useState("");
  const [description, setDescription] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const FURTHER_SUB_CATEGORY_ID= 15;
  // Handle file upload
  const handleFileUpload = (event) => {
    setAttachedFile(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = {
      meterIssueType,
      dateIssueNoticed
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
              setMeterIssueType("");
              setDateIssueNoticed("");
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
    
   

  return (
    <form onSubmit={handleSubmit}>
      <h2>Meter Issue Complaint</h2>
      
      <h3 className="small-slim-heading">The meter itself is malfunctioning and producing incorrect data.</h3>

      {/* Type of Meter Issue Noticed */}
      <div className="form-group">
        <label htmlFor="meterIssueType">Type of Meter Issue Noticed</label>
        <select
          id="meterIssueType"
          value={meterIssueType}
          onChange={(e) => setMeterIssueType(e.target.value)}
          required
        >
          <option value="" disabled>
            Select an issue type
          </option>
          <option value="Meter Tampering">Meter Tampering</option>
          <option value="Theft">Theft</option>
          <option value="Marginal Billing">Marginal Billing</option>
        </select>
      </div>

      {/* Date Issue Was Noticed */}
      <div className="form-group">
        <label htmlFor="dateIssueNoticed">Date Issue Was Noticed</label>
        <input
          type="date"
          id="dateIssueNoticed"
          value={dateIssueNoticed}
          onChange={(e) => setDateIssueNoticed(e.target.value)}
          required
        />
      </div>

      {/* Description of Issue */}
      <div className="form-group">
        <label htmlFor="description">Description of Issue (Optional)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide additional details about the issue..."
          rows="4"
        />
      </div>

      {/* Attach Supporting Document */}
      <div className="form-group">
        <label htmlFor="attachment">Attach Supporting Document (Optional)</label>
        <input
          type="file"
          id="attachment"
          accept="image/*"
          onChange={handleFileUpload}
        />
        {attachedFile && <p>Attached File: {attachedFile.name}</p>}
      </div>

      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
  );
};

export default MeterIssue;
