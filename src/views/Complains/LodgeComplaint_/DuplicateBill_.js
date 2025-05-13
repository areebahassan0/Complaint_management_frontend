import React, { useState } from "react";
import { lodgeComplaint } from "../../../services/history.service";
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
  
  //const [supportingFile, setSupportingFile] = useState(null);
  const FURTHER_SUB_CATEGORY_ID=17;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("b1billingPeriod", b1billingPeriod);
    formData.append("b2billingPeriod", b2billingPeriod);
    formData.append("b1BilledAmount", b1BilledAmount);
    formData.append("b2BilledAmount", b2BilledAmount);
    formData.append("b1attachedFile", b1attachedFile);
    formData.append("b2attachedFile", b2attachedFile);
    formData.append("b1Date", b1Date);
    formData.append("b2Date", b2Date);

    const dataPayload = {
      further_subcategory_id: FURTHER_SUB_CATEGORY_ID,
      description: description || "-",
      form_data: "-",
      supporting_file: b1attachedFile || b2attachedFile || "-",
    };
    // Perform the POST request to submit the form data
    try {
      // Call the lodgeComplaint service
      const response = await lodgeComplaint(dataPayload);

      if (response.status) {
        alert("Your complaint has been submitted successfully!");
        // Reset the form
        setDescription("");
        setb1BillingPeriod("");
        setb2BillingPeriod("");
        setb1BilledAmount("");
        setb2BilledAmount("");
        setDescription("");
        setb1AttachedFile(null);
        setb2AttachedFile(null);
        setb1Date("");
        setb2Date("");
      } else {
        alert(response.message || "Failed to submit your complaint.");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("An error occurred while submitting your complaint.");
    }

  };

  const handleFileUpload = (event, setFileState) => {
    setFileState(event.target.files[0]);
  };

  // // Reset the form fields
  // const resetForm = () => {
  //   setb1BillingPeriod("");
  //   setb2BillingPeriod("");
  //   setb1BilledAmount("");
  //   setb2BilledAmount("");
  //   setDescription("");
  //   setb1AttachedFile(null);
  //   setb2AttachedFile(null);
  //   setb1Date("");
  //   setb2Date("");
  // };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="homepage-title">Duplicate Bill Complaint Form</h2>
        <h3 className="small-slim-heading">Duplicate bills or repeated arrears, such as two bills for the same month or a previous balance appearing twice</h3>
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
        <button type="submit" className="homepage-button">
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default DuplicateBill;
