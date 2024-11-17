import React, { useState } from "react";
import "../../../assets/css/ComplaintActions.css";
const LodgeComplaints = () => {
    const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const renderForm = () => {
    if (!selectedOption) return null;

    return (
      <form className="form-container">
        <h2>{selectedOption} Complaint Form</h2>
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" id="name" placeholder="Enter your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Customer Phone</label>
          <input type="tel" id="phone" placeholder="Enter your phone number" required />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Branch</label>
          <input type="text" id="branch" placeholder="Enter branch name" required />
        </div>
        <div className="form-group">
          <label htmlFor="orderCode">Order Code (if available)</label>
          <input type="text" id="orderCode" placeholder="Enter order code" />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date of Visit</label>
          <input type="date" id="date" required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Complaint Description</label>
          <textarea
            id="description"
            rows="5"
            placeholder="Describe your complaint"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Attach Proof (Receipt or Visit Evidence)</label>
          <input type="file" accept=".jpg,.jpeg,.png,.pdf" />
          <p>Max. file size: 20 MB</p>
        </div>
        <button type="submit" className="submit-button">
          Submit Complaint
        </button>
      </form>
    );
  };

  return (
    <div className="complaint-form-page">
      <h1>Complaint Relating To:</h1>
      <div className="options">
        <button
          className={`option-button ${selectedOption === "Takeaway" ? "active" : ""}`}
          onClick={() => handleOptionClick("Takeaway")}
        >
          Takeaway
        </button>
        <button
          className={`option-button ${selectedOption === "Dine-in" ? "active" : ""}`}
          onClick={() => handleOptionClick("Dine-in")}
        >
          Dine-in
        </button>
        <button
          className={`option-button ${selectedOption === "Delivery" ? "active" : ""}`}
          onClick={() => handleOptionClick("Delivery")}
        >
          Delivery
        </button>
      </div>
      {renderForm()}
    </div>
  );
};
export default LodgeComplaints;