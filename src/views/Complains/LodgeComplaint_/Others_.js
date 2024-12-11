import React, { useState } from "react";

const Others = () => {
  const [description, setDescription] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) {
      alert("Please provide a description before submitting.");
      return;
    }

    const formData = {
      description,
      attachedFile,
    };

    console.log("Complaint submitted: ", formData);

    // Reset the form
    setDescription("");
    setAttachedFile(null);
    alert("Your complaint has been submitted successfully!");
  };

  const handleFileChange = (e) => {
    setAttachedFile(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Other Complaints</h2>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="description">Description (Mandatory)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide additional details..."
          rows="4"
          required
        />
      </div>

      {/* File Attachment */}
      <div className="form-group">
        <label htmlFor="attachedFile">Attach File (Optional)</label>
        <input
          type="file"
          id="attachedFile"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit" className="submit-button">
        Submit Complaint
      </button>
    </form>
  );
};

export default Others;
