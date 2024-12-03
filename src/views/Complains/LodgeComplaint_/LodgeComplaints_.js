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
import LateFeeDispute from "./LateFeeDispute_";
import PaidOnTimeChargedLate from "./PaidOnTimeChargedLate_";

import "../../../assets/css/ComplaintActions.css";

const ComplaintForm = () => {
  const [selectedBrand, setSelectedBrand] = useState("Load Shedding");
  const [selectedComplaintType, setSelectedComplaintType] = useState(null);
  const [faultyMeterSubType, setFaultyMeterSubType] = useState(null); // State for Faulty Meter sub-options
  const [paymentNotReflectedType, setPaymentNotReflectedType] = useState(null); // State for Payment Not Reflected sub-options
  const [latePaymentFeesType, setLatePaymentFeesType] = useState(null);
  const brands = ["Load Shedding", "Billing Complaints"];

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
      : complaintTypesOther;

  return (
    <div>
      <h2>Complaint Form</h2>

      {/* Brand Selection */}
      <div>
        <div>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => {
                setSelectedBrand(brand); // Change selected brand
                setSelectedComplaintType(null); // Reset complaint type
                setFaultyMeterSubType(null); // Reset Faulty Meter sub-options
                setPaymentNotReflectedType(null); // Reset Payment Not Reflected sub-options
                setLatePaymentFeesType(null);
              }}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Complaint Type Selection */}
      <div>
        <div>
          {complaintTypes.map(({ label, submenu }) => (
            <button
              key={submenu}
              onClick={() => {
                setSelectedComplaintType(label); // Update the selected complaint type
                setFaultyMeterSubType(null); // Reset Faulty Meter sub-options
                setPaymentNotReflectedType(null);
                setLatePaymentFeesType(null);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Render Faulty Meter Sub-options */}
      {selectedComplaintType === "Faulty Meter" && selectedBrand === "Billing Complaints" && (
        <div>
          <h3>Faulty Meter - Choose a Sub-Type</h3>
          <button onClick={() => setFaultyMeterSubType("Incorrect Reading")}>
            Incorrect Reading
          </button>
          <button onClick={() => setFaultyMeterSubType("Meter Issue")}>
            Meter Issue
          </button>
        </div>
      )}

      {selectedComplaintType === "Payment Not Reflected" && selectedBrand === "Billing Complaints" && (
        <div>
          <h3>Payment Not Reflected - Choose a Sub-Type</h3>
          <button onClick={() => setPaymentNotReflectedType("Online Payment Not Reflected")}>
            Online Payment Not Reflected
          </button>
          <button onClick={() => setPaymentNotReflectedType("Bank Transfer Not Reflected")}>
            Bank Transfer Not Reflected
          </button>
          <button onClick={() => setPaymentNotReflectedType("Physical Payment Center Not Recorded")}>
            Physical Payment Center Not Recorded
          </button>
        </div>
      )}


      {selectedComplaintType === "Late Payment Fees" && selectedBrand === "Billing Complaints" && (
        <div>
          <h3>Late Payment Fees - Choose an Option</h3>
          <button onClick={() => setLatePaymentFeesType("Paid on Time, Charged Late")}>
            Paid on Time, Charged Late
          </button>
          <button onClick={() => setLatePaymentFeesType("Late Fee Dispute")}>
            Late Fee Dispute
          </button>
        </div>
      )}


      {/* Render Complaint Forms Inline */}
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
  );
};

export default ComplaintForm;









