import React, { useState } from "react";

const IncorrectBillAmount = () => {
  const [billingPeriod, setBillingPeriod] = useState("");
  const [billedAmount, setBilledAmount] = useState(0);
  const [expectedAmount, setExpectedAmount] = useState(0);
  const [discrepancyReason, setDiscrepancyReason] = useState("");
  const [billCopy, setBillCopy] = useState(null);
  const [description, setDescription] = useState("");

  // Determine the charge type automatically
  const chargeType =
    billedAmount > expectedAmount
      ? "Overcharged"
      : billedAmount < expectedAmount
      ? "Undercharged"
      : "No Discrepancy";

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      billingPeriod,
      billedAmount,
      expectedAmount,
      chargeType,
      discrepancyReason,
      billCopy,
      description,
    };
    console.log("Form Submitted:", formData);
    // Handle form submission logic (e.g., sending to a backend API)
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Incorrect Bill Amount Complaint Form</h2>
      
      <h3 className="small-slim-heading">Billed amount being is overcharged, and undercharged.</h3>
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

      {/* Billed Amount */}
      <div className="form-group">
        <label htmlFor="billedAmount">Billed Amount (in Pak rupees)</label>
        <input
          type="number"
          id="billedAmount"
          value={billedAmount}
          onChange={(e) => setBilledAmount(parseFloat(e.target.value) || 0)}
          placeholder="Enter the billed amount"
          required
        />
      </div>

      {/* Expected Amount */}
      <div className="form-group">
        <label htmlFor="expectedAmount">Expected Amount (in Pak rupees)</label>
        <input
          type="number"
          id="expectedAmount"
          value={expectedAmount}
          onChange={(e) => setExpectedAmount(parseFloat(e.target.value) || 0)}
          placeholder="Enter the expected amount"
          required
        />
      </div>

      {/* Charge Type (Automatically Set) */}
      <div className="form-group">
        <label>Are you Overcharged or Undercharged?</label>
        <input type="text" value={chargeType} readOnly disabled />
      </div>

      {/* Reason for Discrepancy */}
      <div className="form-group">
        <label htmlFor="discrepancyReason">Reason for Discrepancy</label>
        <select
          id="discrepancyReason"
          value={discrepancyReason}
          onChange={(e) => setDiscrepancyReason(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a reason
          </option>
          <option value="High consumption">High consumption</option>
          <option value="Unusual meter reading">Unusual meter reading</option>
          <option value="Incorrect tariff applied">Incorrect tariff applied</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Upload Bill Copy */}
      <div className="form-group">
        <label htmlFor="billCopy">Upload Bill Copy (Mandatory)</label>
        <input
          type="file"
          id="billCopy"
          onChange={(e) => setBillCopy(e.target.files[0])}
          accept=".pdf, .jpg, .jpeg, .png"
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

      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
  );
};

export default IncorrectBillAmount;

