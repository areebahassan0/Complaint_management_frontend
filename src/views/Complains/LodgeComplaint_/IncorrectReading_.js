import React, { useState } from "react";

const IncorrectReading = () => {
  const [billingPeriod, setBillingPeriod] = useState("");
  const [billedMeterReading, setBilledMeterReading] = useState("");
  const [actualMeterReading, setActualMeterReading] = useState("");
  const [dateOfActualReading, setDateOfActualReading] = useState("");
  const [description, setDescription] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);

  const handleSubmit = (e) => {
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
      description,
      attachedFile,
    };

    console.log("Complaint submitted: ", formData);

    // Reset the form
    setBillingPeriod("");
    setBilledMeterReading("");
    setActualMeterReading("");
    setDateOfActualReading("");
    setDescription("");
    setAttachedFile(null);
    alert("Your complaint has been submitted successfully!");
  };

  const handleFileChange = (e) => {
    setAttachedFile(e.target.files[0]);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Incorrect Reading Complaint</h2>

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
