import React, { useState } from "react";

const NonReceiptOfBill = () => {
  // State variables for form fields
  const [billingPeriod, setBillingPeriod] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [billingMethod, setBillingMethod] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      billingPeriod,
      expectedDate,
      billingMethod,
    };

    console.log("Complaint submitted: ", formData);

    // Reset the form
    setBillingPeriod("");
    setExpectedDate("");
    setBillingMethod("");
    alert("Your complaint has been submitted successfully!");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Non-Receipt of Bill Complaint</h2>

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

      {/* Expected Date */}
      <div className="form-group">
        <label htmlFor="expectedDate">Expected Date</label>
        <input
          type="date"
          id="expectedDate"
          value={expectedDate}
          onChange={(e) => setExpectedDate(e.target.value)}
          required
        />
      </div>

      {/* Preferred Billing Method */}
      <div className="form-group">
        <label htmlFor="billingMethod">Preferred Billing Method</label>
        <select
          id="billingMethod"
          value={billingMethod}
          onChange={(e) => setBillingMethod(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a billing method
          </option>
          <option value="Email">Email</option>
          <option value="Physical Mail">Physical Mail</option>
          <option value="Online Portal">Online Portal</option>
        </select>
      </div>

      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
  );
};

export default NonReceiptOfBill;
