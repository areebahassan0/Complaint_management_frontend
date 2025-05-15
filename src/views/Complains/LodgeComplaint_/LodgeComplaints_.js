import React, { useState } from "react";
import ReportOutageForm from "./ReportOutageForm_"; // Ensure the correct path
import FrequentLoadShedding from "./FrequentLoadShedding_";
import IncorrectLoadShedding from "./IncorrectLoadsheddingSchedule_";
import VoltageComplaint from "./VoltageComplains_";
import IncorrectBillAmount from "./IncorrectBillAmount_";
import UnexplainedCharges from "./UnexplainedCharges_";
import UnexplainedArears from "./UnresolvedArears_";
import DuplicateBill from "./DuplicateBill_";
import PhaseComplaint from "./PhaseComplaint_"
import NonReceiptOfBill from "./non-receiptofbill_";
import IncorrectReading from "./IncorrectReading_"; // Placeholder for Incorrect Reading form
import MeterIssue from "./MeterIssue_"; // Placeholder for Meter Issue form
import PhysicalPaymentCenterNotRecorded from "./PhysicalPaymentCenterNotRecorded_";
import BankTransferNotReflected from "./BankTransferNotReflected_";
import OnlinePaymentNotReflected from "./OnlinePaymentNotReflected_";
import LateFeeDispute from "../LodgeComplaint_/LateFeeDispute_";
import PaidOnTimeChargedLate from "./PaidOnTimeChargedLate_";
import Others from "../LodgeComplaint_/Others_";
import "../../../assets/css/ComplaintActions.css";

const ComplaintForm = () => {
  const [selectedBrand, setSelectedBrand] = useState("Load Shedding");
  const [selectedComplaintType, setSelectedComplaintType] = useState(null);
  const [faultyMeterSubType, setFaultyMeterSubType] = useState(null); // State for Faulty Meter sub-options
  const [paymentNotReflectedType, setPaymentNotReflectedType] = useState(null); // State for Payment Not Reflected sub-options
  const [latePaymentFeesType, setLatePaymentFeesType] = useState(null);
  const brands = ["Load Shedding", "Billing Complaints","Others"];

  // Define the complaint types
  const complaintTypesForLoadShedding = [
    { label: "Report an Outage", submenu: "ReportOutage" },
    { label: "Frequent Load Shedding", submenu: "Frequent Load Shedding" },
    { label: "Incorrect Load Shedding Schedule", submenu: "Incorrect Load Shedding Schedule" },
    { label: "Voltage complains", submenu: "Voltage complains" },
    { label: "Phase complains", submenu: "Phase complains" },
  ];

  const complaintTypesOther = [
    { label: "Incorrect Bill Amount", submenu: "Incorrect Bill Amount" },
    { label: "Faulty Meter", submenu: "Faulty Meter" },
    { label: "Unexplained Charges", submenu: "Unexplained Charges" },
    { label: "Duplicate Bills", submenu: "Duplicate Bills" },
    { label: "Unresolved Arrears", submenu: "Unresolved Arrears" },
    { label: "Payment Not Reflected", submenu: "Payment Not Reflected" },
    { label: "Non-receipt of Bill", submenu: "Non-receipt of Bill" },
    { label: "Late Payment Fees", submenu: "Late Payment Fees" },
  ];

  // Dynamically set the complaint types based on selected brand
  const complaintTypes =
    selectedBrand === "Load Shedding"
      ? complaintTypesForLoadShedding
      : selectedBrand === "Billing Complaints"
      ? complaintTypesOther
      : [];

  return (
    <div className="form-container">
      <div className="homepage-card">
        <h1 className="homepage-title"> Complaint Form</h1>

        {/* Brand Selection */}
        <div className="options-container">
          {brands.map((brand) => (
            <button
              key={brand}
              className={`option-button ${selectedBrand === brand ? "active" : ""}`}
              onClick={() => {
                setSelectedBrand(brand);
                setSelectedComplaintType(null);
                setFaultyMeterSubType(null);
                setPaymentNotReflectedType(null);
                setLatePaymentFeesType(null);
              }}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Sub-options section: always visible, not nested */}
        <div className="sub-options">
          {complaintTypes.map(({ label, submenu }) => (
            <button
              key={submenu}
              className={`sub-option-button ${selectedComplaintType === label ? "active" : ""}`}
              onClick={() => {
                setSelectedComplaintType(label);
                setFaultyMeterSubType(null);
                setPaymentNotReflectedType(null);
                setLatePaymentFeesType(null);
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sub-sub-options section: only visible if a sub-option with sub-sub-options is selected */}
        {selectedComplaintType === "Faulty Meter" && selectedBrand === "Billing Complaints" && (
          <div className="subsub-options">
            <button
              className={`subsub-option-button ${faultyMeterSubType === "Incorrect Reading" ? "active" : ""}`}
              onClick={() => setFaultyMeterSubType("Incorrect Reading")}
            >
              Incorrect Reading
            </button>
            <button
              className={`subsub-option-button ${faultyMeterSubType === "Meter Issue" ? "active" : ""}`}
              onClick={() => setFaultyMeterSubType("Meter Issue")}
            >
              Meter Issue
            </button>
          </div>
        )}
        {selectedComplaintType === "Payment Not Reflected" && selectedBrand === "Billing Complaints" && (
          <div className="subsub-options">
            <button
              className={`subsub-option-button ${paymentNotReflectedType === "Online Payment Not Reflected" ? "active" : ""}`}
              onClick={() => setPaymentNotReflectedType("Online Payment Not Reflected")}
            >
              Online Payment Not Reflected
            </button>
            <button
              className={`subsub-option-button ${paymentNotReflectedType === "Bank Transfer Not Reflected" ? "active" : ""}`}
              onClick={() => setPaymentNotReflectedType("Bank Transfer Not Reflected")}
            >
              Bank Transfer Not Reflected
            </button>
            <button
              className={`subsub-option-button ${paymentNotReflectedType === "Physical Payment Center Not Recorded" ? "active" : ""}`}
              onClick={() => setPaymentNotReflectedType("Physical Payment Center Not Recorded")}
            >
              Physical Payment Center Not Recorded
            </button>
          </div>
        )}
        {selectedComplaintType === "Late Payment Fees" && selectedBrand === "Billing Complaints" && (
          <div className="subsub-options">
            <button
              className={`subsub-option-button ${latePaymentFeesType === "Paid on Time, Charged Late" ? "active" : ""}`}
              onClick={() => setLatePaymentFeesType("Paid on Time, Charged Late")}
            >
              Paid on Time, Charged Late
            </button>
            <button
              className={`subsub-option-button ${latePaymentFeesType === "Late Fee Dispute" ? "active" : ""}`}
              onClick={() => setLatePaymentFeesType("Late Fee Dispute")}
            >
              Late Fee Dispute
            </button>
          </div>
        )}

        {/* Render Complaint Forms Inline */}
        {selectedBrand === "Others" && <Others/>}
        {selectedComplaintType === "Report an Outage" && selectedBrand === "Load Shedding" && <ReportOutageForm />}
        {selectedComplaintType === "Frequent Load Shedding" && selectedBrand === "Load Shedding" && <FrequentLoadShedding />}
        {selectedComplaintType === "Incorrect Load Shedding Schedule" && selectedBrand === "Load Shedding" && <IncorrectLoadShedding />}
        {selectedComplaintType === "Voltage complains" && selectedBrand === "Load Shedding" && <VoltageComplaint />}
        {selectedComplaintType === "Phase complains" && selectedBrand === "Load Shedding" && <PhaseComplaint />}
        {selectedComplaintType === "Incorrect Bill Amount" && selectedBrand === "Billing Complaints" && <IncorrectBillAmount />}
        {selectedComplaintType === "Unexplained Charges" && selectedBrand === "Billing Complaints" && <UnexplainedCharges />}
        {selectedComplaintType === "Unresolved Arrears" && selectedBrand === "Billing Complaints" && <UnexplainedArears />}
        {selectedComplaintType === "Duplicate Bills" && selectedBrand === "Billing Complaints" && <DuplicateBill />}
        {selectedComplaintType === "Non-receipt of Bill" && selectedBrand === "Billing Complaints" && <NonReceiptOfBill />}

        {/* Render Sub-Forms for Faulty Meter */}
        {faultyMeterSubType === "Incorrect Reading" &&
          selectedComplaintType === "Faulty Meter" &&
          selectedBrand === "Billing Complaints" && <IncorrectReading />}
        {faultyMeterSubType === "Meter Issue" &&
          selectedComplaintType === "Faulty Meter" &&
          selectedBrand === "Billing Complaints" && <MeterIssue />}
        
        {/* Render Sub-Forms for  Payment Not Reflected*/}
        {paymentNotReflectedType === "Online Payment Not Reflected" &&
          selectedComplaintType === "Payment Not Reflected" &&
          selectedBrand === "Billing Complaints" && <OnlinePaymentNotReflected />}
        {paymentNotReflectedType === "Bank Transfer Not Reflected" &&
          selectedComplaintType === "Payment Not Reflected" &&
          selectedBrand === "Billing Complaints" && <BankTransferNotReflected />}
        {paymentNotReflectedType === "Physical Payment Center Not Recorded" &&
          selectedComplaintType === "Payment Not Reflected" &&
          selectedBrand === "Billing Complaints" && <PhysicalPaymentCenterNotRecorded />}

        {/* Render Sub-Forms for Late Payment Fees */}

        {latePaymentFeesType === "Paid on Time, Charged Late" &&
          selectedComplaintType === "Late Payment Fees" &&
          selectedBrand === "Billing Complaints" && <PaidOnTimeChargedLate/>}
        {latePaymentFeesType === "Late Fee Dispute" &&
          selectedComplaintType === "Late Payment Fees" &&
          selectedBrand === "Billing Complaints" && <LateFeeDispute/>}

      </div>
    </div>
  );
};

export default ComplaintForm;









