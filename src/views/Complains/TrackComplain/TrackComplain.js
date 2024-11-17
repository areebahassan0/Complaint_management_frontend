import React, { useState } from 'react';
import Table from '../../../components/Table';

const TrackComplaints = () => {
  // Sample Data for tracking complaints
  const [complaints, setComplaints] = useState([
    { id: 1, issueddate: '2024-11-16', type: 'Billing', status: 'In Progress', lastupdated: '2024-11-17' },
    { id: 2, issueddate: '2024-11-14', type: 'Load Shedding', status: 'Pending', lastupdated: '2024-11-14' },
    { id: 3, issueddate: '2024-11-12', type: 'Phase Complaints', status: 'Resolved', lastupdated: '2024-11-15' },
  ]);

  // Columns for the table
  const columns = ['ID', 'IssuedDate', 'Type', 'Status', 'LastUpdated'];

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Track Complaints</h2>
      <Table columns={columns} data={complaints} />
    </div>
  );
};

export default TrackComplaints;
