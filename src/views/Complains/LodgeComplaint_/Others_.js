import React, { useState } from "react";
import { lodgeComplaint } from "../../../services/history.service";

const Others = () => {
  const [description, setDescription] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  //const [supportingFile, setSupportingFile] = useState(null);
  const FURTHER_SUB_CATEGORY_ID=30;

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!description) {
      alert("Please provide a description before submitting.");
      return;
    }
    const dataPayload = {
      further_subcategory_id: FURTHER_SUB_CATEGORY_ID,
      description: description || "-",
      form_data: "-",
      supporting_file: attachedFile || "-",
    };
    try {
      // Call the lodgeComplaint service
      const response = await lodgeComplaint(dataPayload);

      if (response.status) {
        alert("Your complaint has been submitted successfully!");
        // Reset the form
        setDescription("");
        setAttachedFile(null);
      } else {
        alert(response.message || "Failed to submit your complaint.");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("An error occurred while submitting your complaint.");
    }

  };

  const handleFileChange = (e) => {
    setAttachedFile(e.target.files[0]);
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <h2 className="homepage-title">Other Complaints</h2>
      

      {/* Description */}
      <div className="form-group">
        <label htmlFor="description">Description (Mandatory)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide additional details..."
          rows="4"
          required
        />
      </div>

      {/* File Attachment */}
      <div className="form-group">
        <label htmlFor="attachedFile">Attach File (Optional)</label>
        <input
          type="file"
          id="attachedFile"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
    </div>
  );
};

export default Others;
