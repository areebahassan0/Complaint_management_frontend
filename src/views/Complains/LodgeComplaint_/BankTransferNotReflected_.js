import React, { useState } from "react";

const BankTransferNotReflected = ({ subType }) => {
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [transactionReference, setTransactionReference] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankTransferReceipt, setBankTransferReceipt] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bankAccountNumber.length !== 11) {
      alert("Bank Account Number must be exactly 11 digits.");
      return;
    }

    const formData = {
      subType,
      paymentDate,
      paymentAmount,
      bankName,
      transactionReference,
      bankAccountNumber,
      bankTransferReceipt,
    };

    console.log("Bank Transfer Not Reflected Complaint: ", formData);

    // Reset form
    setPaymentDate("");
    setPaymentAmount("");
    setBankName("");
    setTransactionReference("");
    setBankAccountNumber("");
    setBankTransferReceipt(null);
    alert("Your complaint has been submitted successfully!");
  };

  const handleFileChange = (e) => {
    setBankTransferReceipt(e.target.files[0]);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>{subType} Bank Transfer Complaint</h2>

      <h3 className="small-slim-heading">Payment made via bank is not reflected</h3>
     

      {/* Payment Date */}
      <div className="form-group">
        <label htmlFor="paymentDate">Payment Date</label>
        <input
          type="date"
          id="paymentDate"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          required
        />
      </div>

      {/* Payment Amount */}
      <div className="form-group">
        <label htmlFor="paymentAmount">Payment Amount</label>
        <input
          type="number"
          id="paymentAmount"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          required
        />
      </div>

      {/* Bank Name */}
      <div className="form-group">
        <label htmlFor="bankName">Bank Name</label>
        <select
          id="bankName"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          required
        >
          <option value="">Select Bank</option>
          <option value="AlBaraka Bank (Pakistan) Limited">AlBaraka Bank (Pakistan) Limited</option>
          <option value="Allied Bank Limited">Allied Bank Limited</option>
          <option value="Askari Bank Limited">Askari Bank Limited</option>
          <option value="Bank AL Habib Limited">Bank AL Habib Limited</option>
          <option value="Bank Alfalah Limited">Bank Alfalah Limited</option>
          <option value="The Bank of Khyber">The Bank of Khyber</option>
          <option value="The Bank of Punjab">The Bank of Punjab</option>
          <option value="BankIslami Pakistan Limited">BankIslami Pakistan Limited</option>
          <option value="Citibank N.A.">Citibank N.A.</option>
          <option value="Deutsche Bank AG">Deutsche Bank AG</option>
          <option value="Dubai Islamic Bank Pakistan Limited">Dubai Islamic Bank Pakistan Limited</option>
          <option value="Faysal Bank Limited">Faysal Bank Limited</option>
          <option value="First Women Bank Limited">First Women Bank Limited</option>
          <option value="Habib Bank Limited">Habib Bank Limited</option>
          <option value="Habib Metropolitan Bank Limited">Habib Metropolitan Bank Limited</option>
          <option value="Industrial and Commercial Bank of China Limited">
            Industrial and Commercial Bank of China Limited
          </option>
          <option value="Industrial Development Bank of Pakistan">
            Industrial Development Bank of Pakistan
          </option>
          <option value="JS Bank Limited">JS Bank Limited</option>
          <option value="Meezan Bank Limited">Meezan Bank Limited</option>
          <option value="MCB Bank Limited">MCB Bank Limited</option>
          <option value="MCB Islamic Bank">MCB Islamic Bank</option>
          <option value="National Bank of Pakistan">National Bank of Pakistan</option>
          <option value="Punjab Provincial Cooperative Bank Ltd.">
            Punjab Provincial Cooperative Bank Ltd.
          </option>
          <option value="Samba Bank Limited">Samba Bank Limited</option>
          <option value="Sindh Bank Limited">Sindh Bank Limited</option>
          <option value="Silkbank Limited">Silkbank Limited</option>
          <option value="SME Bank Limited">SME Bank Limited</option>
          <option value="Soneri Bank Limited">Soneri Bank Limited</option>
          <option value="Standard Chartered Bank (Pakistan) Ltd">
            Standard Chartered Bank (Pakistan) Ltd
          </option>
          <option value="Summit Bank Limited">Summit Bank Limited</option>
          <option value="The Bank of Tokyo-Mitsubishi UFJ Ltd.">
            The Bank of Tokyo-Mitsubishi UFJ Ltd.
          </option>
          <option value="United Bank Limited">United Bank Limited</option>
          <option value="Zarai Taraqiati Bank Ltd.">Zarai Taraqiati Bank Ltd.</option>
        </select>
      </div>

      {/* Transaction Reference Number */}
      <div className="form-group">
        <label htmlFor="transactionReference">Transaction Reference Number</label>
        <input
          type="text"
          id="transactionReference"
          value={transactionReference}
          onChange={(e) => setTransactionReference(e.target.value)}
          required
        />
      </div>

      {/* Bank Account Number */}
      <div className="form-group">
        <label htmlFor="bankAccountNumber">Bank Account Number</label>
        <input
          type="number"
          id="bankAccountNumber"
          value={bankAccountNumber}
          onChange={(e) => setBankAccountNumber(e.target.value)}
          required
        />
      </div>

      {/* Upload Bank Transfer Receipt */}
      <div className="form-group">
        <label htmlFor="bankTransferReceipt">Upload Bank Transfer Receipt</label>
        <input
          type="file"
          id="bankTransferReceipt"
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

export default BankTransferNotReflected;
