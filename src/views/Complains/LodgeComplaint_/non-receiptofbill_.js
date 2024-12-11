import React, { useState } from "react";
import { lodgeComplaint } from "../../../services/history.service";
const NonReceiptOfBill = () => {
  // State variables for form fields
  const [billingPeriod, setBillingPeriod] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [billingMethod, setBillingMethod] = useState("");
  const [description, setDescription] = useState("");
  const [supportingFile, setSupportingFile] = useState(null);
  const FURTHER_SUB_CATEGORY_ID=22;

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
      // Construct form_data
      const formData = {
        billingPeriod,
        expectedDate,
        billingMethod,
      };
  
      // Construct payload
      const dataPayload = {
        further_subcategory_id: FURTHER_SUB_CATEGORY_ID,
        description: description || "",
        form_data: formData,
        supporting_file: supportingFile || "",
      };
  
      try {
        // Call the lodgeComplaint service
        const response = await lodgeComplaint(dataPayload);
  
        if (response.status) {
          alert("Your complaint has been submitted successfully!");
          // Reset the form
          setBillingPeriod("");
          setExpectedDate("");
          setBillingMethod("");
          setDescription("");
          setSupportingFile(null);
        } else {
          alert(response.message || "Failed to submit your complaint.");
        }
      } catch (error) {
        console.error("Error submitting complaint:", error);
        alert("An error occurred while submitting your complaint.");
      }
    
  }

  //   console.log("Complaint submitted: ", formData);

  //   // Reset the form
  //   setBillingPeriod("");
  //   setExpectedDate("");
  //   setBillingMethod("");
  //   alert("Your complaint has been submitted successfully!");
  // };

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
