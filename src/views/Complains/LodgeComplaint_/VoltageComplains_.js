import React, { useState } from "react";

const VoltageComplaint = () => {
  const [voltageIssueDate, setVoltageIssueDate] = useState("");
  const [voltageIssueTime, setVoltageIssueTime] = useState({
    hours: "",
    minutes: "",
    period: "AM",
  });
  const [voltageDuration, setVoltageDuration] = useState(1);
  const [voltageLevel, setVoltageLevel] = useState([""]);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [level, setLevel] = useState("low");
  const [frequency, setFrequency] = useState("");
  const [intensity, setIntensity] = useState("");

  // Handle time changes
  const handleVoltageTimeChange = (field, value) => {
    setVoltageIssueTime((prev) => ({
      ...prev,
      [field]: field === "minutes" ? Math.max(0, Math.min(59, value)) : value,
    }));
  };

  // Handle voltage level changes
  const handleVoltageLevelChange = (index, value) => {
    const numericValue = Number(value);
    const updatedLevels = [...voltageLevel];
    if (numericValue > 1 || value === "") {
      updatedLevels[index] = value;
      setVoltageLevel(updatedLevels);
    }
  };

  const handleAddVoltageLevel = () => {
    setVoltageLevel([...voltageLevel, ""]);
  };

  const handleRemoveVoltageLevel = (index) => {
    const updatedLevels = voltageLevel.filter((_, i) => i !== index);
    setVoltageLevel(updatedLevels);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      voltageIssueDate,
      voltageIssueTime,
      voltageDuration,
      voltageLevel,
      additionalDetails,
      level,
      ...(level === "fluctuative" && { frequency, intensity }),
    };
    console.log("Form Submitted:", data);
    // Submit form data to the backend
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Voltage Complaint Form</h2>
      <h3 className="small-slim-heading">Low, high, or fluctuating voltage impacts appliances</h3>
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
              onChange={(e) =>
                handleVoltageTimeChange("minutes", e.target.value)
              }
              required
            />
            <select
              value={voltageIssueTime.period}
              onChange={(e) =>
                handleVoltageTimeChange("period", e.target.value)
              }
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
                min="2"
                onChange={(e) => handleVoltageLevelChange(index, e.target.value)}
              />
              {level <= 1 && level !== "" && (
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
          <button
            type="button"
            onClick={handleAddVoltageLevel}
            className="add-more-button"
          >
            Add More
          </button>
        </div>
      </div>

      {/* Level */}
      <div className="form-group">
        <label>
          Level:
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="low">Low</option>
            <option value="high">High</option>
            <option value="fluctuative">Fluctuative</option>
          </select>
        </label>
        {level === "fluctuative" && (
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

      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
  );
};

export default VoltageComplaint;
