import React, { useState } from "react";

const IncorrectLoadShedding = () => {
  const [numOutages, setNumOutages] = useState(1);
  const [outageTimings, setOutageTimings] = useState([{ hours: "", minutes: "", period: "AM" }]);
  const [occurrenceDate, setOccurrenceDate] = useState("");
  const [description, setDescription] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);

  const handleOutageTimingChange = (index, field, value) => {
    const updatedTimings = [...outageTimings];
    updatedTimings[index] = {
      ...updatedTimings[index],
      [field]: field === "minutes" ? Math.max(0, Math.min(59, value)) : value,
    };
    setOutageTimings(updatedTimings);
  };

  const handleNumOutagesChange = (value) => {
    const parsedValue = Math.max(1, Math.min(10, Number(value))); // Limit the number of outages between 1 and 10
    setNumOutages(parsedValue);
    setOutageTimings(
      Array.from({ length: parsedValue }, (_, i) => outageTimings[i] || { hours: "", minutes: "", period: "AM" })
    );
  };

  const handleFileUpload = (event) => {
    setAttachedFile(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      occurrenceDate,
      numOutages,
      outageTimings,
      description,
      attachedFile,
    };
    console.log("Form Submitted:", formData);
    alert("Complaint submitted successfully!");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Incorrect Load Shedding Schedule Form</h2>
       
      <h3 className="small-slim-heading">Outages do not match the schedule provided by the utility company</h3>
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
};

export default IncorrectLoadShedding;

