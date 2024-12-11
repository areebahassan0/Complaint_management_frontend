import React, { useState } from "react";

const UnexplainedCharges = () => {
  const [chargeType, setChargeType] = useState("");
  const [billingPeriod, setBillingPeriod] = useState("");
  const [totalBilledAmount, setTotalBilledAmount] = useState("");
  const [surchargeAmount, setSurchargeAmount] = useState("");
  const [description, setDescription] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]); // Array for attached files

  const handleFileChange = (e) => {
    setAttachedFiles([...e.target.files]);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      chargeType,
      billingPeriod,
      totalBilledAmount,
      surchargeAmount,
      description,
    };
    console.log("Form Submitted:", formData);
    // Handle submission logic (e.g., send to backend)
  };


  return (
    <form  onSubmit={handleSubmit}>
      <h2>Unexplained Charges Complaint Form</h2>
      <h3 className="small-slim-heading">Excessive or unclear additional fees, taxes, or service charges added to the bill</h3>
      {/* Type of Surcharges and Fees */}
      <div className="form-group">
        <label htmlFor="chargeType">Type of Surcharges and Fees</label>
        <select
          id="chargeType"
          value={chargeType}
          onChange={(e) => setChargeType(e.target.value)}
          required
        >
          <option value="">Select a type</option>
          <option value="Fix Charges">Fix Charges</option>
          <option value="Uniform Quarterly Adjustment">
            Uniform Quarterly Adjustment
          </option>
          <option value="Fuel Charges Adjustment">Fuel Charges Adjustment</option>
          <option value="PHL Surcharge">PHL Surcharge</option>
          <option value="Extra Surcharge Amount">Extra Surcharge Amount</option>
          <option value="Sales Tax (Electricity Charges)">
            Sales Tax (Electricity Charges)
          </option>
          <option value="Electricity Duty">Electricity Duty</option>
          <option value="TVL Fee">TVL Fee</option>
        </select>
      </div>

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
        <label htmlFor="totalBilledAmount">Total Billed Amount</label>
        <input
          type="number"
          id="totalBilledAmount"
          value={totalBilledAmount}
          onChange={(e) => setTotalBilledAmount(e.target.value)}
          placeholder="Enter total billed amount"
          required
        />
      </div>

      {/* Surcharge or Tax Amount */}
      <div className="form-group">
        <label htmlFor="surchargeAmount">Surcharge or Tax Amount</label>
        <input
          type="number"
          id="surchargeAmount"
          value={surchargeAmount}
          onChange={(e) => setSurchargeAmount(e.target.value)}
          placeholder="Enter surcharge or tax amount"
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

      {/* File Attachment */}
      <div className="form-group">
        <label htmlFor="attachedFiles">Attach Files (Optional)</label>
        <input
          type="file"
          id="attachedFiles"
          multiple
          onChange={handleFileChange}
        />
        {attachedFiles.length > 0 && (
          <ul>
            {Array.from(attachedFiles).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
  );
};

export default UnexplainedCharges;
