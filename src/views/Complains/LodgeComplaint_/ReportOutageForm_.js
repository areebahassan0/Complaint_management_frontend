
import React, { useState } from "react";
import { lodgeComplaint } from "../../../services/history.service";
const ReportOutageForm = () => {
  // State for outage details
  const [outageDate, setOutageDate] = useState("");
  const [outageStartHours, setOutageStartHours] = useState(0);
  const [outageStartMinutes, setOutageStartMinutes] = useState(0);
  const [outageStartPeriod, setOutageStartPeriod] = useState("AM");
  const [outageDuration, setOutageDuration] = useState(0); // in minutes
  const [description, setDescription] = useState("");
  const [isExtendedOutage, setIsExtendedOutage] = useState(false);
  const [scheduledStartHours, setScheduledStartHours] = useState(0);
  const [scheduledStartMinutes, setScheduledStartMinutes] = useState(0);
  const [scheduledStartPeriod, setScheduledStartPeriod] = useState("AM");
  const [scheduledDuration, setScheduledDuration] = useState(0); // in minutes
  const [attachedFiles, setAttachedFiles] = useState([]); 

  const FURTHER_SUB_CATEGORY_ID= isExtendedOutage ? 2 :1
  // Handle time changes for start and scheduled times
  const handleTimeChange = (type, unit, value) => {
    if (type === "outageStart") {
      if (unit === "hours") setOutageStartHours(value);
      if (unit === "minutes") setOutageStartMinutes(value);
      if (unit === "period") setOutageStartPeriod(value);
    }
    if (type === "scheduledStart") {
      if (unit === "hours") setScheduledStartHours(value);
      if (unit === "minutes") setScheduledStartMinutes(value);
      if (unit === "period") setScheduledStartPeriod(value);
    }
  };

  // Format time to HH:MM AM/PM
  const formatTime = (hours, minutes, period) => {
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
  };


  // Handle file attachments
  const handleFileChange = (e) => {
    setAttachedFiles([...e.target.files]);
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData ={}
    isExtendedOutage ?
    formData = {
      outageDate,
      outageStartTime: formatTime(outageStartHours, outageStartMinutes, outageStartPeriod),
      outageDuration,
    } : 
    formData = {
      scheduledStartTime: formatTime(scheduledStartHours, scheduledStartMinutes, scheduledStartPeriod),
      scheduledDuration,
    }
    const dataPayload = {
      further_subcategory_id: FURTHER_SUB_CATEGORY_ID,
      description: description || "-",
      form_data: formData,
      supporting_file: attachedFiles || "-",
    };

    try {
      // Call the lodgeComplaint service
      const response = await lodgeComplaint(dataPayload);

      if (response.status) {
        alert("Your complaint has been submitted successfully!");
        // Reset the form
        setOutageDate("");
        setOutageStartHours(0);
        setOutageStartMinutes(0);
        setOutageStartPeriod("AM");
        setOutageDuration(0);
        setDescription("");
        setIsExtendedOutage(false);
        setScheduledStartHours(0);
        setScheduledStartMinutes(0);
        setScheduledStartPeriod("AM");
        setScheduledDuration(0);
        setAttachedFiles([]);
      } else {
        alert(response.message || "Failed to submit your complaint.");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("An error occurred while submitting your complaint.");
    }
  
}

    

  return (
    <form  onSubmit={handleSubmit}>
      <h2>Report an Outage Form</h2>

      {/* Outage Date */}
      <h3 className="small-slim-heading">Complete power outage without any prior notice</h3>
      <div className="form-group">
        <label htmlFor="outageDate">Outage Date</label>
        <input
          type="date"
          id="outageDate"
          value={outageDate}
          onChange={(e) => setOutageDate(e.target.value)}
          required
        />
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
              onChange={(e) =>
                handleTimeChange("outageStart", "hours", e.target.value)
              }
              placeholder="HH"
            />
            <span>:</span>
            <input
              type="number"
              id="outageStartMinutes"
              value={outageStartMinutes}
              min="0"
              max="59"
              onChange={(e) =>
                handleTimeChange("outageStart", "minutes", e.target.value)
              }
              placeholder="MM"
            />
            <select
              value={outageStartPeriod}
              onChange={(e) =>
                handleTimeChange("outageStart", "period", e.target.value)
              }
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

      {/* Description (Optional) */}
      <div className="form-group">
        <label htmlFor="description">Description (Optional)</label>
        <textarea
          id="description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add additional details"
        />
      </div>


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

      {/* Extended Outage Radio Button */}
      <div className="form-group">
        <label>Is outage extended?</label>
        <div className="radio-buttons">
          <label>
            <input
              type="radio"
              name="extendedOutage"
              value="yes"
              checked={isExtendedOutage}
              onChange={() => setIsExtendedOutage(true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="extendedOutage"
              value="no"
              checked={!isExtendedOutage}
              onChange={() => setIsExtendedOutage(false)}
            />
            No
          </label>
        </div>
      </div>

      {/* Extended Outage Details */}
      {isExtendedOutage && (
        <div >
          <h3>Extended Outage Details</h3>
           
          <h4 className="small-slim-heading">Power outage lasting longer than expected or announced</h4>
          {/* Scheduled Start Time */}
          <div className="form-group">
            <label htmlFor="scheduledStartTime">Scheduled Starting Time</label>
            <div className="time-container">
              <div className="time-input">
                <input
                  type="number"
                  id="scheduledStartHours"
                  value={scheduledStartHours}
                  min="1"
                  max="12"
                  onChange={(e) =>
                    handleTimeChange("scheduledStart", "hours", e.target.value)
                  }
                  placeholder="HH"
                />
                <span>:</span>
                <input
                  type="number"
                  id="scheduledStartMinutes"
                  value={scheduledStartMinutes}
                  min="0"
                  max="59"
                  onChange={(e) =>
                    handleTimeChange("scheduledStart", "minutes", e.target.value)
                  }
                  placeholder="MM"
                />
                <select
                  value={scheduledStartPeriod}
                  onChange={(e) =>
                    handleTimeChange("scheduledStart", "period", e.target.value)
                  }
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
                onChange={(e) =>
                  setScheduledDuration(Number(e.target.value) * 60)
                }
              />
              <p>{Math.floor(scheduledDuration / 60)} hours</p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
  );
};

export default ReportOutageForm;
