import React, { useState } from "react";
import { lodgeComplaint } from "../../../services/history.service";
const FrequentLoadShedding = () => {
  const [numOutages, setNumOutages] = useState(1);
  const [outageTimings, setOutageTimings] = useState([{ hours: "", minutes: "", period: "AM" }]);
  const [occurrenceDate, setOccurrenceDate] = useState("");
  const [description, setDescription] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [timePreferences, setTimePreferences] = useState({ weekends: false, morning: false });

  const determineCategory = () => {
    if (timePreferences.weekends ) {
      return 4;
    } 
     else if (timePreferences.morning) {
      return 5;
    } else {
      return 3;
    }
  };
  const FURTHER_SUB_CATEGORY_ID = determineCategory();
  
  const handleOutageTimingChange = (index, field, value) => {
    const updatedTimings = [...outageTimings];
    updatedTimings[index] = {
      ...updatedTimings[index],
      [field]: field === "minutes" ? Math.max(0, Math.min(59, value)) : value,
    };
    setOutageTimings(updatedTimings);
  };

  const handleNumOutagesChange = (value) => {
    const parsedValue = Math.max(0, Math.min(10, Number(value))); // Limit the number of outages between 1 and 10
    setNumOutages(parsedValue);
    setOutageTimings(
      Array.from({ length: parsedValue }, (_, i) => outageTimings[i] || { hours: "", minutes: "", period: "AM" })
    );
  };

  const handleFileUpload = (event) => {
    setAttachedFile(event.target.files[0]);
  };

  const handlePreferenceChange = (preference) => {
    setTimePreferences((prev) => ({
      ...prev,
      [preference]: !prev[preference],
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const formData = {
      occurrenceDate,
      numOutages,
      outageTimings,
    };
    const dataPayload = {
      further_subcategory_id: FURTHER_SUB_CATEGORY_ID,
      description: description || "-",
      form_data: formData,
      supporting_file: attachedFile || "-",
    };

    try {
      // Call the lodgeComplaint service
      const response = await lodgeComplaint(dataPayload);

      if (response.status) {
        alert("Your complaint has been submitted successfully!");
        // Reset the form
        setOccurrenceDate("");
        setNumOutages(0);
        setOutageTimings(0);
        setDescription("");
        setAttachedFile([]);
      } else {
        alert(response.message || "Failed to submit your complaint.");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("An error occurred while submitting your complaint.");
    }
  
}
  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <h2 className="homepage-title">Frequent Load Shedding Form</h2>

      <h3 className="small-slim-heading">Several outages occurring within the same day</h3>
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
          min="1"
          max="10"
          onChange={(e) => handleNumOutagesChange(e.target.value)}
          required
        />
      </div>

      {/* Outage Timings */}
      {Array.from({ length: numOutages }).map((_, index) => (
        <div key={index} className="form-group">
          <label htmlFor={`outageTimings${index + 1}`}>Outage Timing {index + 1}</label>
          <div className="time-container">
            <div className="time-input">
              <input
                type="number"
                placeholder="HH"
                min="1"
                max="12"
                value={outageTimings[index]?.hours || ""}
                onChange={(e) => handleOutageTimingChange(index, "hours", e.target.value)}
                required
              />
              <span>:</span>
              <input
                type="number"
                placeholder="MM"
                min="0"
                max="59"
                value={outageTimings[index]?.minutes || ""}
                onChange={(e) => handleOutageTimingChange(index, "minutes", e.target.value)}
                required
              />
              <select
                value={outageTimings[index]?.period || "AM"}
                onChange={(e) => handleOutageTimingChange(index, "period", e.target.value)}
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

      {/* Time Preference */}
      <div className="form-group">
        <label>Time Preference</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="timePreference"
              checked={timePreferences.weekends}
              onChange={() => handlePreferenceChange("weekends")}
            />
            Weekends
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="timePreference"
              checked={timePreferences.morning}
              onChange={() => handlePreferenceChange("morning")}
            />
            Morning
          </label>
        </div>
      </div>

      {/* Attach Image */}
      <div className="form-group">
        <label htmlFor="attachment">Attach Supporting Document (Optional)</label>
        <input
          type="file"
          id="attachment"
          accept="image/*"
          onChange={handleFileUpload}
        />
        {attachedFile && <p>Attached File: {attachedFile.name}</p>}
      </div>

      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
    </div>
  );
};

export default FrequentLoadShedding;