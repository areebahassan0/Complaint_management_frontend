import React, { useState } from "react";

const MeterIssue = () => {
  // State variables for form fields
  const [meterIssueType, setMeterIssueType] = useState("");
  const [dateIssueNoticed, setDateIssueNoticed] = useState("");
  const [description, setDescription] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      meterIssueType,
      dateIssueNoticed,
      description,
    };

    console.log("Meter issue reported: ", formData);

    // Reset the form
    setMeterIssueType("");
    setDateIssueNoticed("");
    setDescription("");
    alert("Your meter issue has been submitted successfully!");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Faulty Meter Complaint</h2>

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

      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
  );
};

export default MeterIssue;

