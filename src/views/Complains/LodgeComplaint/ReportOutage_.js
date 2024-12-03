import React from "react";

const ReportOutageForm = () => {
  return (
    <div>
      <h3>Report an Outage</h3>
      <form>
        <label>
          Enter your address:
          <input type="text" name="address" />
        </label>
        <br />
        <label>
          Description of outage:
          <textarea name="description"></textarea>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReportOutageForm;
