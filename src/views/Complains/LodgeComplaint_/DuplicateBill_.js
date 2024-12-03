import React, { useState } from "react";

const DuplicateBill = () => {
  const [b1billingPeriod, setb1BillingPeriod] = useState("");
  const [b2billingPeriod, setb2BillingPeriod] = useState("");
  const [b1BilledAmount, setb1BilledAmount] = useState("");
  const [b2BilledAmount, setb2BilledAmount] = useState("");
  const [description, setDescription] = useState("");
  const [b1attachedFile, setb1AttachedFile] = useState(null);
  const [b2attachedFile, setb2AttachedFile] = useState(null);
  const [b1Date, setb1Date] = useState("");
  const [b2Date, setb2Date] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("b1billingPeriod", b1billingPeriod);
    formData.append("b2billingPeriod", b2billingPeriod);
    formData.append("b1BilledAmount", b1BilledAmount);
    formData.append("b2BilledAmount", b2BilledAmount);
    formData.append("description", description);
    formData.append("b1attachedFile", b1attachedFile);
    formData.append("b2attachedFile", b2attachedFile);
    formData.append("b1Date", b1Date);
    formData.append("b2Date", b2Date);

    // Perform the POST request to submit the form data
    try {
      const response = await fetch("/submit-form", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Form submitted successfully:", responseData);
        alert("Your complaint has been submitted successfully!");
        // Optionally reset the form
        resetForm();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleFileUpload = (event, setFileState) => {
    setFileState(event.target.files[0]);
  };

  // Reset the form fields
  const resetForm = () => {
    setb1BillingPeriod("");
    setb2BillingPeriod("");
    setb1BilledAmount("");
    setb2BilledAmount("");
    setDescription("");
    setb1AttachedFile(null);
    setb2AttachedFile(null);
    setb1Date("");
    setb2Date("");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Unexplained Charges Complaint Form</h2>

      {/* B1 Date of Occurrence */}
      <div className="form-group">
        <label htmlFor="b1Date">Bill 1 Date of Occurrence</label>
        <input
          type="date"
          id="b1Date"
          value={b1Date}
          onChange={(e) => setb1Date(e.target.value)}
          required
        />
      </div>

      {/* B2 Date of Occurrence */}
      <div className="form-group">
        <label htmlFor="b2Date">Bill 2 Date of Occurrence</label>
        <input
          type="date"
          id="b2Date"
          value={b2Date}
          onChange={(e) => setb2Date(e.target.value)}
          required
        />
      </div>

      {/* Billing Period */}
      <div className="form-group">
        <label htmlFor="b1billingPeriod">Bill 1 Billing Period</label>
        <input
          type="month"
          id="b1billingPeriod"
          value={b1billingPeriod}
          onChange={(e) => setb1BillingPeriod(e.target.value)}
          required
        />
      </div>

      {/* Billing Period */}
      <div className="form-group">
        <label htmlFor="b2billingPeriod">Bill 2 Billing Period</label>
        <input
          type="month"
          id="b2billingPeriod"
          value={b2billingPeriod}
          onChange={(e) => setb2BillingPeriod(e.target.value)}
          required
        />
      </div>

      {/* Total Billed Amount */}
      <div className="form-group">
        <label htmlFor="b1BilledAmount">Bill 1 Billed Amount</label>
        <input
          type="number"
          id="b1BilledAmount"
          value={b1BilledAmount}
          onChange={(e) => setb1BilledAmount(e.target.value)}
          placeholder="Enter total billed amount"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="b2BilledAmount">Bill 2 Billed Amount</label>
        <input
          type="number"
          id="b2BilledAmount"
          value={b2BilledAmount}
          onChange={(e) => setb2BilledAmount(e.target.value)}
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
        <label htmlFor="b1attachedFile">Attach Bill 1 Submission Picture</label>
        <input
          type="file"
          id="b1attachedFile"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, setb1AttachedFile)}
          required
        />
        {b1attachedFile && <p>Attached File: {b1attachedFile.name}</p>}
      </div>

      {/* Attach Image */}
      <div className="form-group">
        <label htmlFor="b2attachedFile">Attach Bill 2 Submission Picture</label>
        <input
          type="file"
          id="b2attachedFile"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, setb2AttachedFile)}
          required
        />
        {b2attachedFile && <p>Attached File: {b2attachedFile.name}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
  );
};

export default DuplicateBill;
