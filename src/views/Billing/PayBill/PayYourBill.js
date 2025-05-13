import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import jsPDF from 'jspdf';

const PayYourBill = () => {
  const [bills] = useState([
    {
      sNo: 1,
      amount: '74500 Rs.',
      generatedOn: '25-Jan-2025',
      dueDate: '04-Feb-2025',
      status: 'Paid',
      billNumber: 'BILL-20250125'
    },
    {
      sNo: 2,
      amount: '4000 Rs.',
      generatedOn: '21-Apr-2025',
      dueDate: '22-Apr-2025',
      status: 'Paid',
      billNumber: 'BILL-20250421'
    }
  ]);

  const downloadPDF = (bill) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Faysal Bank Challan', 20, 20);
    doc.setFontSize(14);
    doc.text(`Bill No: ${bill.billNumber}`, 20, 40);
    doc.text(`Amount: ${bill.amount}`, 20, 50);
    doc.text(`Generated On: ${bill.generatedOn}`, 20, 60);
    doc.text(`Due Date: ${bill.dueDate}`, 20, 70);
    doc.text(`Status: ${bill.status}`, 20, 80);
    doc.setFontSize(12);
    doc.text('Thank you for your payment.', 20, 100);
    doc.save(`${bill.billNumber}.pdf`);
  };

  const statusStyles = {
    Paid: { backgroundColor: '#28a745', color: '#fff' },
    Pending: { backgroundColor: '#ffc107', color: '#fff' }
  };

  const columns = [
    {
      name: 'S. No',
      selector: (row) => row.sNo,
      width: '80px'
    },
    {
      name: 'Amount',
      selector: (row) => row.amount
    },
    {
      name: 'Generated On',
      selector: (row) => row.generatedOn
    },
    {
      name: 'Due Date',
      selector: (row) => row.dueDate
    },
    {
      name: 'Status',
      cell: (row) => (
        <span
          style={{
            ...statusStyles[row.status],
            padding: '5px 10px',
            borderRadius: '15px',
            display: 'inline-block'
          }}
        >
          {row.status}
        </span>
      )
    },
    {
      name: 'Print Challan',
      cell: (row) => (
        <button
          onClick={() => downloadPDF(row)}
          style={{
            backgroundColor: '#6610f2',
            color: '#fff',
            padding: '7px 12px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Print
        </button>
      )
    }
  ];

  return (
    <div>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(45deg, #eecaca, #e3d0d000)',
          padding: '20px',
          color: 'black',
          marginBottom: '20px'
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Your Billing History</h1>
      </div>

      {/* Table */}
      <div style={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
        <DataTable
          columns={columns}
          data={bills}
          highlightOnHover
          pagination
        />
      </div>
    </div>
  );
};

export default PayYourBill;
