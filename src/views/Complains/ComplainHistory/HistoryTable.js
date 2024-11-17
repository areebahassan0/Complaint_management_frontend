import React, { useState } from 'react';
import Table from '../../../components/Table';

const ComplaintHistory = () => {
  // Sample Data for the table
  const [complaints, setComplaints] = useState([
    { id: 1, issueddate: '2024-11-15', resolveddate: '2024-11-15',type: 'Billing', status: 'Resolved' },
    { id: 2, issueddate: '2024-11-10', resolveddate: '2024-11-15',type: 'Load Shedding', status: 'Pending' },
    { id: 3, issueddate: '2024-10-20', resolveddate: '2024-11-15',type: 'Voltage Complaints', status: 'Resolved' },
  ]);

  // Columns for the table
  const columns = ['ID', 'IssuedDate','ResolvedDate', 'Type', 'Status'];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Complaint History</h2>
      <Table columns={columns} data={complaints} />
    </div>
  );
};

export default ComplaintHistory;
