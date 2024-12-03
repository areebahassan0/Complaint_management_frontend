import React, { useState } from "react";

const PhaseComplaint = () => {
  const [selectedPhases, setSelectedPhases] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    startHours: 0,
    startMinutes: 0,
    startPeriod: "AM",
    duration: 0,
    appliances: "",
  });

  const phases = ["Phase 1", "Phase 2", "Phase 3"];

  const handlePhaseChange = (phase) => {
    if (selectedPhases.includes(phase)) {
      setSelectedPhases(selectedPhases.filter((p) => p !== phase));
    } else {
      setSelectedPhases([...selectedPhases, phase]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeChange = (unit, value) => {
    setFormData({ ...formData, [unit]: value });
  };

  const formatTime = (hours, minutes, period) => {
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPhases.length > 1) {
      alert("Phase Failure");
    } else {
      console.log("Submitted Data:", {
        selectedPhases,
        ...formData,
        formattedTime: formatTime(
          formData.startHours,
          formData.startMinutes,
          formData.startPeriod
        ),
      });
      alert("Complaint Submitted Successfully!");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Phase Complaint Form</h2>

      {/* Affected Phase Selection */}
      <div className="form-group">
        <fieldset>
          <legend>Affected Phase(s):</legend>
          {phases.map((phase) => (
            <label key={phase} className="checkbox-label">
              <input
                type="checkbox"
                value={phase}
                checked={selectedPhases.includes(phase)}
                onChange={() => handlePhaseChange(phase)}
              />
              {phase}
            </label>
          ))}
        </fieldset>
      </div>

      {selectedPhases.length === 1 && (
        <>
          {/* Date of Outage */}
          <div className="form-group">
            <label htmlFor="date">Date of Outage</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Time of Outage */}
          <div className="form-group">
            <label htmlFor="time">Time of Outage</label>
            <div className="time-container">
              <div className="time-input">
                <input
                  type="number"
                  value={formData.startHours}
                  min="1"
                  max="12"
                  onChange={(e) => handleTimeChange("startHours", e.target.value)}
                  placeholder="HH"
                  required
                />
                <span>:</span>
                <input
                  type="number"
                  value={formData.startMinutes}
                  min="0"
                  max="59"
                  onChange={(e) =>
                    handleTimeChange("startMinutes", e.target.value)
                  }
                  placeholder="MM"
                  required
                />
                <select
                  value={formData.startPeriod}
                  onChange={(e) =>
                    handleTimeChange("startPeriod", e.target.value)
                  }
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              <p>
                {formatTime(
                  formData.startHours,
                  formData.startMinutes,
                  formData.startPeriod
                )}
              </p>
            </div>
          </div>

          {/* Duration Slider */}
          <div className="form-group">
            <label htmlFor="duration">Outage Duration (Hours)</label>
            <div className="slider-container">
              <input
                type="range"
                id="duration"
                name="duration"
                value={formData.duration / 60}
                min="1"
                max="24"
                onChange={(e) =>
                  handleTimeChange("duration", e.target.value * 60)
                }
              />
              <p>{Math.floor(formData.duration / 60)} hours</p>
            </div>
          </div>

          {/* Appliances Affected */}
          <div className="form-group">
            <label htmlFor="appliances">Appliances Affected (Description)</label>
            <textarea
              id="appliances"
              name="appliances"
              rows="4"
              value={formData.appliances}
              onChange={handleInputChange}
              placeholder="Add additional details"
            />
          </div>
        </>
      )}

      {/* Phase Failure Message */}
      {selectedPhases.length > 1 && (
        <p className="error-message">Phase Failure</p>
      )}

      {/* Submit Button */}
      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
  );
};

export default PhaseComplaint;
