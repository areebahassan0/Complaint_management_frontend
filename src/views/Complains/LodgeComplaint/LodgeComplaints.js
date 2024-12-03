import React, { useState } from "react";
import "../../../assets/css/ComplaintActions.css";
//import { Routes, Route } from "react-router-dom";
 // Import routing utilities
import { useNavigate } from "react-router-dom";
//import IncorrectBillAmount from './IncorrectBillAmount'; // Adjust the path based on your project structure
const LodgeComplaints = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [subOption, setSubOption] = useState("");
  const [isExtendedOutage, setIsExtendedOutage] = useState(false);

  const [outageStartHours, setOutageStartHours] = useState(0);
  const [outageStartMinutes, setOutageStartMinutes] = useState(0);
  const [outageStartPeriod, setOutageStartPeriod] = useState("AM");
  const [outageDuration, setOutageDuration] = useState(60);
  const [scheduledStartHours, setScheduledStartHours] = useState(0);
  const [scheduledStartMinutes, setScheduledStartMinutes] = useState(0);
  const [scheduledStartPeriod, setScheduledStartPeriod] = useState("AM");
  const [scheduledDuration, setScheduledDuration] = useState(60);
  const [numOutage, setNumOutage] = useState(1);
  const [outageTiming, setOutageTiming] = useState([{ hours: 0, minutes: 0, period: "AM" }]);
  const [weekendPreference, setWeekendPreference] = useState([]);
  const [occurrenceDate, setOccurrenceDate] = useState("");
  const [numOutages, setNumOutages] = useState(1);
  const [outageTimings, setOutageTimings] = useState([{ hours: "", minutes: "", period: "AM" }]);
  const [description, setDescription] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [voltageIssueDate, setVoltageIssueDate] = useState("");
  const [voltageIssueTime, setVoltageIssueTime] = useState({ hours: "", minutes: "", period: "AM" });
  const [voltageDuration, setVoltageDuration] = useState(1); // Default 1 hour
  const [voltageLevel, setVoltageLevel] = useState([2]);  // Default voltage level
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [level, setLevel] = useState('');
  const [frequency, setFrequency] = useState('');
  const [intensity, setIntensity] = useState('');
  const [faultyMeterSubOption, setFaultyMeterSubOption] = useState("");
  const [billingPeriod, setBillingPeriod] = useState("");
  const [billedReading, setBilledReading] = useState("");
  const [actualReading, setActualReading] = useState("");
  const [actualReadingDate, setActualReadingDate] = useState("");
  //const [proofFile, setProofFile] = useState(null);
  const [meterIssueType, setMeterIssueType] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [descriptions, setDescriptions] = useState(""); // Description is optional
  const [chargeType, setChargeType] = useState("");
  const [billingPeriod_, setBillingPeriod_] = useState("");
  const [totalBilledAmount, setTotalBilledAmount] = useState("");
  const [surchargeAmount, setSurchargeAmount] = useState("");
  const [description_, setDescription_] = useState("");
  const [duplicateBillDetails, setDuplicateBillDetails] = useState({
    bill1Period: "",
    bill2Period: "",
    bill1Amount: "",
    bill2Amount: "",
    bill1Date: "",
    bill2Date: "",
    bill1File: null,
    bill2File: null,
    description: "",
  });
 

  const handleDuplicateBillChange = (field, value) => {
    setDuplicateBillDetails({
      ...duplicateBillDetails,
      [field]: value,
    });
  };

  const handleFileChange = (field, file) => {
    setDuplicateBillDetails({
      ...duplicateBillDetails,
      [field]: file,
    });
  };

  const handleOptionClicks= (option) => {
    setSelectedOption(option);
    setSubOption("");
    setFaultyMeterSubOption(""); // Reset Faulty Meter sub-option
  };

  const handleSubOptionClicks = (sub) => {
    setSubOption(sub);
    setFaultyMeterSubOption(""); // Reset Faulty Meter sub-option
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSubOption("");
    setIsExtendedOutage(false);
  };

  const handleFaultyMeterSubOptionClick = (sub) => {
    setFaultyMeterSubOption(sub);
  };

  const handleSubOptionClick = (subOption) => {
    setSubOption(subOption);
    setIsExtendedOutage(false);
  };

  const toggleExtendedOutage = () => {
    setIsExtendedOutage(!isExtendedOutage);
  };

  const handleTimeChange = (type, field, value) => {
   // const parsedValue = Math.max(0, Math.min(12, Number(value)));
    if (type === "outageStart") {
      if (field === "hours") setOutageStartHours(Math.max(0, Math.min(12, value)));
      if (field === "minutes") setOutageStartMinutes(Math.max(0, Math.min(59, value)));
      if (field === "period") setOutageStartPeriod(value);
    }
    if (type === "scheduledStart") {
      if(field === "hours") setScheduledStartHours(Math.max(0, Math.min(12, value))); 
      if(field === "minutes") setScheduledStartMinutes(Math.max(0, Math.min(59, value))); 
      if(field === "period") setScheduledStartPeriod(value);
    }
  };

  /*const handleOutageTimingChange = (index, field, value) => {
    const updatedTimings = [...outageTiming];
    updatedTimings[index] = {
      ...updatedTimings[index],
      [field]: field === "minutes" ? Math.max(0, Math.min(59, value)) : value,
    };
    setOutageTiming(updatedTimings);
  };*/


  const formatTime = (hours, minutes, period) => {
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const navigate = useNavigate; // Correctly call useNavigate here
    
  const handleIncorrectBillAmountClick = () => {
    navigate("/dashboard/lodge-complaints/Incorrect-Bill-Amount");
  };

  const renderFaultyMeterForm = () => {
    if (faultyMeterSubOption === "Incorrect Reading") {
      return (
        <form className="form-container">
          <h3>Incorrect Reading</h3>
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
              <div className="form-group">
                <label htmlFor="billedMeterReading">Billed Meter Reading</label>
                <input
                  type="number"
                  step="0.01"
                  id="billedMeterReading"
                  value={billedReading}
                  onChange={(e) => setBilledReading(e.target.value)}
                  placeholder="Enter billed meter reading"
                  required
                />
              </div>
          <div className="form-group">
                <label htmlFor="actualMeterReading">Actual Meter Reading</label>
                <input
                  type="number"
                  step="0.01"
                  id="actualMeterReading"
                  value={actualReading}
                  onChange={(e) => setActualReading(e.target.value)}
                  placeholder="Enter actual meter reading"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfActualReading">Date of Actual Reading</label>
                <input
                  type="date"
                  id="dateOfActualReading"
                  value={actualReadingDate}
                  onChange={(e) => setActualReadingDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description (Optional)</label>
                <textarea
                  id="description"
                  value={descriptions}
                  onChange={(e) => setDescriptions(e.target.value)}
                  placeholder="Describe the issue in detail (optional)..."
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label htmlFor="proof">Upload Proof (Mandatory)</label>
                <input
                  type="file"
                  id="proof"
                  onChange={(e) => setAttachedFile(e.target.files[0])}
                  accept=".pdf, .jpg, .jpeg, .png"
                  required
                />
              </div>
          
          <button type="submit" className="submit-button">
            Submit Complaint
          </button>
        </form>
      );
    }

    if (faultyMeterSubOption === "Meter Issue") {
      return (
        <form className="form-container">
          <h3>Meter Issue</h3>
          <div className="form-group">
            <label htmlFor="meterIssueType">Type of Meter Issue</label>
            <select
              id="meterIssueType"
              value={meterIssueType}
              onChange={(e) => setMeterIssueType(e.target.value)}
              required
            >
              <option value="">Select an issue</option>
              <option value="Meter Tampering">Meter Tampering</option>
              <option value="Theft">Theft</option>
              <option value="Marginal Billing">Marginal Billing</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="issueDate">Date Issue Was Noticed</label>
            <input
              type="date"
              id="issueDate"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="issueDescription">Description of Issue</label>
            <textarea
              id="issueDescription"
              rows="4"
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="Describe the issue in detail"
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit Complaint
          </button>
        </form>
      );
    }

    return null;
  };


  const renderSubOptions = ({ selectedOption, subOption, handleSubOptionClick }) => {
    const navigate = useNavigate();
  
    const handleIncorrectBillAmountClick = () => {
      handleSubOptionClick("Incorrect Bill Amount");
      navigate("/dashboard/lodge-complaints/Incorrect-Bill-Amount");
    };
 
    if (selectedOption === "Billing") {
      return (
        //<div className="sub-options">
          //{[

<div className="sub-options">
<button
  className={`sub-option-button ${subOption === "Incorrect Bill Amount" ? "active" : ""}`}
  onClick={handleIncorrectBillAmountClick}
>
  Incorrect Bill Amount
</button>
            
             
          )
    }
  };

    if (selectedOption === "Load Shedding") {
      return (
        <div className="sub-options">
          {[
            "Report an Outage",
            "Frequent Load Shedding",
            "Incorrect Load Shedding Schedule",
            "Voltage Complaints",
            "Phase Complaints"
          ].map((sub, index) => (
            <button
              key={index}
              className={`sub-option-button ${subOption === sub ? "active" : ""}`}
              onClick={() => handleSubOptionClick(sub) ||  handleSubOptionClicks(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderDuplicateBillsForm = () => (
    <form className="form-container">
      <h2>Duplicate Bills Complaint</h2>

      {/* Bill 1 Details */}
      <div className="form-group">
        <label htmlFor="bill1Period">Bill 1 Billing Period (Month, Year)</label>
        <input
          type="text"
          id="bill1Period"
          placeholder="e.g., January 2024"
          value={duplicateBillDetails.bill1Period}
          onChange={(e) => handleDuplicateBillChange("bill1Period", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="bill1Amount">Bill 1 Amount</label>
        <input
          type="number"
          id="bill1Amount"
          placeholder="e.g., 1500"
          value={duplicateBillDetails.bill1Amount}
          onChange={(e) => handleDuplicateBillChange("bill1Amount", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="bill1Date">Bill 1 Date Received</label>
        <input
          type="date"
          id="bill1Date"
          value={duplicateBillDetails.bill1Date}
          onChange={(e) => handleDuplicateBillChange("bill1Date", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="bill1File">Attach Bill 1</label>
        <input
          type="file"
          id="bill1File"
          accept=".jpg,.png,.pdf"
          onChange={(e) => handleFileChange("bill1File", e.target.files[0])}
          required
        />
      </div>

      {/* Bill 2 Details */}
      <div className="form-group">
        <label htmlFor="bill2Period">Bill 2 Billing Period (Month, Year)</label>
        <input
          type="text"
          id="bill2Period"
          placeholder="e.g., February 2024"
          value={duplicateBillDetails.bill2Period}
          onChange={(e) => handleDuplicateBillChange("bill2Period", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="bill2Amount">Bill 2 Amount</label>
        <input
          type="number"
          id="bill2Amount"
          placeholder="e.g., 1500"
          value={duplicateBillDetails.bill2Amount}
          onChange={(e) => handleDuplicateBillChange("bill2Amount", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="bill2Date">Bill 2 Date Received</label>
        <input
          type="date"
          id="bill2Date"
          value={duplicateBillDetails.bill2Date}
          onChange={(e) => handleDuplicateBillChange("bill2Date", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="bill2File">Attach Bill 2</label>
        <input
          type="file"
          id="bill2File"
          accept=".jpg,.png,.pdf"
          onChange={(e) => handleFileChange("bill2File", e.target.files[0])}
          required
        />
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="description">Description (Optional)</label>
        <textarea
          id="description"
          rows="4"
          placeholder="Add additional details"
          value={duplicateBillDetails.description}
          onChange={(e) => handleDuplicateBillChange("description", e.target.value)}
        ></textarea>
      </div>

      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
  );

  const renderForm = () => {
    if (!selectedOption) return null;

    if (!subOption) return <p>Please select a specific issue under {selectedOption}.</p>;

    if (subOption === "Report an Outage") {
      return (
        <form className="form-container">
          <h2>{subOption} Form</h2>
          <div className="form-group">
            <label htmlFor="outageDate">Outage Date</label>
            <input type="date" id="outageDate" required />
          </div>

          {/* Outage Start Time */}
          <div className="form-group">
            <label htmlFor="outageStartTime">Outage Start Time</label>
            <div className="time-container">
              <div className="time-input">
                <input
                  type="number"
                  id="outageStartHours"
                  value={outageStartHours}
                  min="1"
                  max="12"
                  onChange={(e) => handleTimeChange("outageStart", "hours", e.target.value)}
                  placeholder="HH"
                />
                <span>:</span>
                <input
                  type="number"
                  id="outageStartMinutes"
                  value={outageStartMinutes}
                  min="0"
                  max="59"
                  onChange={(e) => handleTimeChange("outageStart", "minutes", e.target.value)}
                  placeholder="MM"
                />
                <select
                  value={outageStartPeriod}
                  onChange={(e) => handleTimeChange("outageStart", "period", e.target.value)}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              <p>{formatTime(outageStartHours, outageStartMinutes, outageStartPeriod)}</p>
            </div>
          </div>

          {/* Outage Duration Slider */}
          <div className="form-group">
            <label htmlFor="outageDuration">Outage Duration (Hours)</label>
            <div className="slider-container">
              <input
                type="range"
                id="outageDuration"
                value={outageDuration / 60}
                min="1"
                max="24"
                onChange={(e) => setOutageDuration(Number(e.target.value) * 60)}
              />
              <p>{Math.floor(outageDuration / 60)} hours</p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea id="description" rows="4" placeholder="Add additional details"></textarea>
          </div>

          <button type="button" className="expand-button" onClick={toggleExtendedOutage}>
            {isExtendedOutage ? "Hide Extended Outage" : "Add Extended Outage"}
          </button>

          {isExtendedOutage && (
            <div className="extended-outage">
              <h3>Extended Outage Details</h3>

              {/* Scheduled Start Time */}
              <div className="form-group">
                <label htmlFor="scheduledStartTime">Scheduled Starting Time</label>
                <div className="time-container">
                  <div className="time-input">
                    <input
                      type="number"
                     // id="scheduledStartHours"
                      value={scheduledStartHours}
                      min="1"
                      max="12"
                      onChange={(e) => handleTimeChange("scheduledStart", "hours", e.target.value)}
                      placeholder="HH"
                    />
                    <span>:</span>
                    <input
                      type="number"
                      //id="scheduledStartMinutes"
                      value={scheduledStartMinutes}
                      min="0"
                      max="59"
                      onChange={(e) => handleTimeChange("scheduledStart", "minutes", e.target.value)}
                      placeholder="MM"
                    />
                    <select
                      value={scheduledStartPeriod}
                      onChange={(e) => handleTimeChange("scheduledStart", "period", e.target.value)}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                  <p>{formatTime(scheduledStartHours, scheduledStartMinutes, scheduledStartPeriod)}</p>
                </div>
              </div>

              {/* Scheduled Duration Slider */}
              <div className="form-group">
                <label htmlFor="scheduledDuration">Scheduled Duration (Hours)</label>
                <div className="slider-container">
                  <input
                    type="range"
                    id="scheduledDuration"
                    value={scheduledDuration / 60}
                    min="1"
                    max="24"
                    onChange={(e) => setScheduledDuration(Number(e.target.value) * 60)}
                  />
                  <p>{Math.floor(scheduledDuration / 60)} hours</p>
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="submit-button">
            Submit Complaint
          </button>
        </form>
      );
    }
    if (subOption === "Frequent Load Shedding") {
  
      const handleOutageTimingChange = (index, field, value) => {
        const updatedTimings = [...outageTiming];
        updatedTimings[index] = {
          ...updatedTimings[index],
          [field]: field === "minutes" ? Math.max(0, Math.min(59, value)) : value,
        };
        setOutageTiming(updatedTimings);
      };
  
     
      const handleNumOutagesChange = (value) => {
        const parsedValue = Math.max(0, Math.min(10, Number(value))); // Limit the number of outages
        setNumOutage(parsedValue);
        setOutageTiming(
          Array.from({ length: parsedValue }, (_, i) => outageTiming[i] || { hours: 0, minutes: 0, period: "AM" })
        );
      };

      const handleCheckboxChange = (event, value) => {
        if (event.target.checked) {
          // Add the value if it's checked
          setWeekendPreference([...weekendPreference, value]);
        } else {
          // Remove the value if it's unchecked
          setWeekendPreference(weekendPreference.filter((pref) => pref !== value));
        }
      };
  
      return (
        <form className="form-container">
          <h2>{subOption} Form</h2>
  
          <div className="form-group">
            <label htmlFor="numOutage">Number of Outages in a Day  </label>
            <input
              type="number"
              id="numOutage"
              value={numOutage}
              min="1"
              max="10"
              onChange={(e) => handleNumOutagesChange(e.target.value)}
            required/>
          </div>
  
          {Array.from({ length: numOutage }).map((_, index) => (
            <div key={index} className="form-group">
              <label htmlFor={`outageTiming${index + 1}`}>Timing for Outage {index + 1}</label>
              <div className="time-container">
                <div className="time-input">
                  <input
                    type="number"
                    placeholder="HH"
                    min="1"
                    max="12"
                    value={outageTiming[index]?.hours || ""}
                    onChange={(e) => handleOutageTimingChange(index, "hours", e.target.value)}
                    required
                  />
                  <span>:</span>
                  <input
                    type="number"
                    placeholder="MM"
                    min="0"
                    max="59"
                    value={outageTiming[index]?.minutes || ""}
                    onChange={(e) => handleOutageTimingChange(index, "minutes", e.target.value)}
                    required
                  />
                  <select
                    value={outageTiming[index]?.period || "AM"}
                    onChange={(e) =>  handleOutageTimingChange(index,"period", e.target.value)}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea id="description" rows="4" placeholder="Add additional details"></textarea>
          </div>
  
          <div className="form-group">
             <label>Weekend/Early Morning Outages</label>
             <div className="checkbox-container">
             <label>
              <input
               type="checkbox"
               name="weekendPreference"
               value="Weekends"
               checked={weekendPreference.includes("Weekends")}
               onChange={(e) => handleCheckboxChange(e, "Weekends")}
              />
              Weekends
             </label>
             <label>
              <input
               type="checkbox"
               name="weekendPreference"
               value="Morning"
               checked={weekendPreference.includes("Morning")}
               onChange={(e) => handleCheckboxChange(e, "Morning")}
              />
              Early Morning
             </label>
             </div>
          </div>
  
          <button type="submit" className="submit-button">
            Submit Complaint
          </button>
        </form>
      );
    }
    if (subOption === "Incorrect Load Shedding Schedule") {
    
      const handleOutageTimingChanges = (index, field, value) => {
        const updatedTimings = [...outageTimings];
        updatedTimings[index] = {
          ...updatedTimings[index],
          [field]: field === "minutes" ? Math.max(0, Math.min(59, value)) : value,
        };
        setOutageTimings(updatedTimings);
      };
    
      const handleNumOutagesChanges = (value) => {
        const parsedValue = Math.max(1, Math.min(10, Number(value))); // Limit the number of outages between 1 and 10
        setNumOutages(parsedValue);
        setOutageTimings(
          Array.from({ length: parsedValue }, (_, i) => outageTimings[i] || { hours: "", minutes: "", period: "AM" })
        );
      };

      const handleFileUpload = (event) => {
        setAttachedFile(event.target.files[0]);
      };
    
      return (
        <form className="form-container">
          <h2>{subOption} Form</h2>
    
          {/* Date of Occurrence */}
          <div className="form-group">
            <label htmlFor="occurrenceDate">Date of Occurrence</label>
            <input
              type="date"
              id="occurrenceDate"
              value={occurrenceDate}
              onChange={(e) => setOccurrenceDate(e.target.value)}
              required
            />
          </div>
    
          {/* Number of Outages */}
          <div className="form-group">
            <label htmlFor="numOutages">Number of Outages in a Day</label>
            <input
              type="number"
              id="numOutages"
              value={numOutages}
              min="0"
              max="10"
              onChange={(e) => handleNumOutagesChanges(e.target.value)}
              required
            />
          </div>
    
          {/* Actual Outage Timings */}
          {Array.from({ length: numOutages }).map((_, index) => (
            <div key={index} className="form-group">
              <label htmlFor={`outageTimings${index + 1}`}>Actual Outage Timing {index + 1}</label>
              <div className="time-container">
                <div className="time-input">
                  <input
                    type="number"
                    placeholder="HH"
                    min="1"
                    max="12"
                    value={outageTimings[index]?.hours || ""}
                    onChange={(e) => handleOutageTimingChanges(index, "hours", e.target.value)}
                    required
                  />
                  <span>:</span>
                  <input
                    type="number"
                    placeholder="MM"
                    min="0"
                    max="59"
                    value={outageTimings[index]?.minutes || ""}
                    onChange={(e) => handleOutageTimingChanges(index, "minutes", e.target.value)}
                    required
                  />
                  <select
                    value={outageTimings[index]?.period || "AM"}
                    onChange={(e) => handleOutageTimingChanges(index, "period", e.target.value)}
                    required
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
    
          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="4"
              placeholder="Add additional details (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
    
          {/* Attach Image */}
          <div className="form-group">
            <label htmlFor="attachment">Attach Published Outage Picture</label>
            <input
              type="file"
              id="attachment"
              accept="image/*"
              onChange={handleFileUpload}
              required
            />
            {attachedFile && <p>Attached File: {attachedFile.name}</p>}
          </div>
    
          <button type="submit" className="submit-button">
            Submit Complaint
          </button>
        </form>
      );
    }

    if (subOption === "Voltage Complaints") {
    
      const handleVoltageTimeChange = (field, value) => {
        setVoltageIssueTime((prev) => ({
          ...prev,
          [field]: field === "minutes" ? Math.max(0, Math.min(59, value)) : value,
        }));
      };
    
      

const handleVoltageLevelChange = (index, value) => {
  const numericValue = Number(value);
  const updatedLevels = [...voltageLevel];
  if (numericValue > 1 || value === "") {
    updatedLevels[index] = value;
    setVoltageLevel(updatedLevels);
  }
};

const handleAddVoltageLevel = () => {
  setVoltageLevel([...voltageLevel, ""]); // Add a new empty input
};

const handleRemoveVoltageLevel = (index) => {
  const updatedLevels = voltageLevel.filter((_, i) => i !== index); // Remove a specific input
  setVoltageLevel(updatedLevels);
};
    
      return (
        <form className="form-container">
          <h2>{subOption} Form</h2>
    
          {/* Date of Voltage Issue */}
          <div className="form-group">
            <label htmlFor="voltageIssueDate">Date of Voltage Issue</label>
            <input
              type="date"
              id="voltageIssueDate"
              value={voltageIssueDate}
              onChange={(e) => setVoltageIssueDate(e.target.value)}
              required
            />
          </div>
    
          {/* Time of Voltage Issue */}
          <div className="form-group">
            <label htmlFor="voltageIssueTime">Time of Voltage Issue</label>
            <div className="time-container">
              <div className="time-input">
                <input
                  type="number"
                  placeholder="HH"
                  min="1"
                  max="12"
                  value={voltageIssueTime.hours}
                  onChange={(e) => handleVoltageTimeChange("hours", e.target.value)}
                  required
                />
                <span>:</span>
                <input
                  type="number"
                  placeholder="MM"
                  min="0"
                  max="59"
                  value={voltageIssueTime.minutes}
                  onChange={(e) => handleVoltageTimeChange("minutes", e.target.value)}
                  required
                />
                <select
                  value={voltageIssueTime.period}
                  onChange={(e) => handleVoltageTimeChange("period", e.target.value)}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
    
          {/* Duration of Voltage Issue */}
          <div className="form-group">
            <label htmlFor="voltageDuration">Duration (Hours)</label>
            <div className="slider-container">
              <input
                type="range"
                id="voltageDuration"
                value={voltageDuration}
                min="1"
                max="24"
                onChange={(e) => setVoltageDuration(Number(e.target.value))}
              />
              <p>{voltageDuration} hours</p>
            </div>
          </div>
    
          {/* Voltage Level */}
          <div className="form-group">
   <label>Voltage Level</label>
   <div className="voltage-container">
    {voltageLevel.map((level, index) => (
      <div key={index} className="voltage-level-input">
        <input
          type="number"
          name={`voltageLevel-${index}`}
          value={level}
          placeholder="Enter Voltage Level (must be > 1)"
          min="2" // Enforces the minimum value at the HTML level
          onChange={(e) => handleVoltageLevelChange(index, e.target.value)}
        />
        {level <= 1 && level !== "" && ( // Show validation error if value <= 1
          <p className="error-message">Voltage level must be greater than 1.</p>
        )}
       <button
          type="button"
          onClick={() => handleRemoveVoltageLevel(index)}
          className="remove-button"
        >
          Remove
        </button>
      </div>
    ))}
    <button type="button" onClick={handleAddVoltageLevel} className="add-more-button">
      Add More
    </button>

    <p>{level}</p>
   </div>
   </div>

          {/* Additional Details */}
          <div className="form-group">
            <label htmlFor="additionalDetails">Additional Details (Optional)</label>
            <textarea
              id="additionalDetails"
              rows="4"
              placeholder="Add additional details"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
   <label>
    Level:
    <select value={level} onChange={(e) => setLevel(e.target.value)}>
      <option value="low">Low</option>
      <option value="high">High</option>
      <option value="fluctuative">Fluctuative</option>
    </select>
    </label>
    {level === 'fluctuative' && (
    <>
      <label>
        Frequency of Fluctuations:
        <input
          type="number"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />
      </label>
      <label>
        Intensity of Fluctuations:
        <input
          type="number"
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
        />
      </label>
    </>
    )}
    </div>

          <button type="submit" className="submit-button">
            Submit Complaint
          </button>
        </form>
      );
    }

    
    if (subOption === "Incorrect Bill Amount") {

    return (
    <div>
     
      <button onClick={handleIncorrectBillAmountClick}>
      </button>
    </div>
    );

     /* return (
        <form className="form-container">
          <h2>{subOption} Form</h2>
    
          {/* Billing Period }
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
    
          {/* Billed Amount *}
          <div className="form-group">
            <label htmlFor="billedAmount">Billed Amount (in Pak rupees)</label>
            <input
              type="number"
              id="billedAmount"
              value={frequency}
              onChange={(e) => setFrequency(parseFloat(e.target.value) || 0)} // Ensure it's a number
              placeholder="Enter the billed amount"
              required
            />
          </div>
    
          {/* Expected Amount *}
          <div className="form-group">
            <label htmlFor="expectedAmount">Expected Amount (in Pak rupees)</label>
            <input
              type="number"
              id="expectedAmount"
              value={intensity}
              onChange={(e) => setIntensity(parseFloat(e.target.value) || 0)} // Ensure it's a number
              placeholder="Enter the expected amount"
              required
            />
          </div>
    
          {/* Charge Type (Automatically Set}
          <div className="form-group">
            <label>Are you Overcharged or Undercharged?</label>
            <input
              type="text"
              value={
                frequency > intensity
                  ? "Overcharged"  // If billed amount is greater
                  : frequency < intensity
                  ? "Undercharged" // If billed amount is less
                  : "No Discrepancy"  // If both amounts are equal
              }
              readOnly
              disabled
            />
          </div>
    
          {/* Reason for Discrepancy *}
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
    
          {/* Upload Bill Copy *}
          <div className="form-group">
            <label htmlFor="billCopy">Upload Bill Copy (Mandatory)</label>
            <input
              type="file"
              id="billCopy"
              onChange={(e) => setAttachedFile(e.target.files[0])}
              accept=".pdf, .jpg, .jpeg, .png"
              required
            />
          </div>
    
          <button type="submit" className="submit-button">
            Submit Complaint
          </button>
        </form>
      );*/
    }
    if (subOption === "Faulty Meter") {
      return (
        <div className="sub-options">
          {["Incorrect Reading", "Meter Issue"].map((sub, index) => (
            <button
              key={index}
              className={`sub-option-button ${
                faultyMeterSubOption === sub ? "active" : ""
              }`}
              onClick={() => handleFaultyMeterSubOptionClick(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      );
    }

    if (subOption === "Unexplained Charges") {
      return (
        <form className="form-container">
          <h2>{subOption} Form</h2>

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
              <option value="Uniform Quarterly Adjustment">Uniform Quarterly Adjustment</option>
              <option value="Fuel Charges Adjustment">Fuel Charges Adjustment</option>
              <option value="PHL Surcharge">PHL Surcharge</option>
              <option value="Extra Surcharge Amount">Extra Surcharge Amount</option>
              <option value="Sales Tax (Electricity Charges)">Sales Tax (Electricity Charges)</option>
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
              value={billingPeriod_}
              onChange={(e) => setBillingPeriod_(e.target.value)}
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
              value={description_}
              onChange={(e) => setDescription_(e.target.value)}
              placeholder="Provide additional details about the charges..."
              rows="4"
            />
          </div>

          <button type="submit" className="submit-button">
            Submit Complaint
          </button>
        </form>
      );
    }
    
    if (subOption === "Duplicate Bills") {
      return renderDuplicateBillsForm();
    }
    
  };

  return (
    <div className="lodge-complaints-container">
      <h1>Lodge Complaints</h1>
      <div className="options-container">
        {["Billing", "Load Shedding"].map((option) => (
          <button
            key={option}
            className={`option-button ${selectedOption === option ? "active" : ""}`}
            onClick={() => handleOptionClick(option) || handleOptionClicks(option)}

          >
            {option}
          </button>
        ))}
      </div>

      {renderSubOptions()}
      {renderForm()}
      {faultyMeterSubOption ? renderFaultyMeterForm() : null}
    </div>
  );
};

export default LodgeComplaints;
