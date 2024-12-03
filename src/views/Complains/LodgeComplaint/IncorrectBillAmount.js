import React, { useState } from "react";
import "../../../assets/css/ComplaintActions.css";

const IncorrectBillAmount = () => {
    const [subOption, setSubOption] = useState("Incorrect Bill Amount");
    const [occurrenceDate, setOccurrenceDate] = useState("");
    const [frequency, setFrequency] = useState("");
    const [intensity, setIntensity] = useState("");
    const [additionalDetails, setAdditionalDetails] = useState("");
    const [attachedFile, setAttachedFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        const complaintData = {
            subOption,
            occurrenceDate,
            frequency,
            intensity,
            discrepancyReason: additionalDetails,
            attachedFile,
            chargeType:
                frequency > intensity
                    ? "Overcharged"
                    : frequency < intensity
                    ? "Undercharged"
                    : "No Discrepancy",
        };
        console.log("Complaint Submitted:", complaintData);
        // Add logic to send `complaintData` to your backend
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
            alert("File size should not exceed 5MB.");
            setAttachedFile(null);
        } else {
            setAttachedFile(file);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>{subOption || "Complaint"} Form</h2>

            {/* Billing Period */}
            <div className="form-group">
                <label htmlFor="billingPeriod">Billing Period</label>
                <input
                    type="month"
                    id="billingPeriod"
                    value={occurrenceDate}
                    onChange={(e) => setOccurrenceDate(e.target.value)}
                    required
                />
            </div>

            {/* Billed Amount */}
            <div className="form-group">
                <label htmlFor="billedAmount">Billed Amount (in Pak rupees)</label>
                <input
                    type="number"
                    id="billedAmount"
                    value={frequency}
                    onChange={(e) => setFrequency(parseFloat(e.target.value) || 0)}
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
                    value={intensity}
                    onChange={(e) => setIntensity(parseFloat(e.target.value) || 0)}
                    placeholder="Enter the expected amount"
                    required
                />
            </div>

            {/* Charge Type */}
            <div className="form-group">
                <label>Are you Overcharged or Undercharged?</label>
                <input
                    type="text"
                    value={
                        frequency > intensity
                            ? "Overcharged"
                            : frequency < intensity
                            ? "Undercharged"
                            : "No Discrepancy"
                    }
                    readOnly
                    disabled
                />
            </div>

            {/* Reason for Discrepancy */}
            <div className="form-group">
                <label htmlFor="discrepancyReason">Reason for Discrepancy</label>
                <select
                    id="discrepancyReason"
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    required
                >
                    <option value="" disabled>
                        Select a reason
                    </option>
                    <option value="High consumption">High consumption</option>
                    <option value="Unusual meter reading">Unusual meter reading</option>
                </select>
            </div>

            {/* Upload Bill Copy */}
            <div className="form-group">
                <label htmlFor="billCopy">Upload Bill Copy (Mandatory)</label>
                <input
                    type="file"
                    id="billCopy"
                    onChange={handleFileUpload}
                    accept=".pdf, .jpg, .jpeg, .png"
                    required
                />
            </div>

            <button type="submit" className="submit-button">
                Submit Complaint
            </button>
        </form>
    );
};

export default IncorrectBillAmount;
