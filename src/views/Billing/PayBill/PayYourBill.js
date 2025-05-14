import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import jsPDF from 'jspdf';
import { getBillingMethod, getUnpaidBills } from '../../../services/billing.service';

const PayYourBill = () => {
  const [billingData, setBillingData] = useState(null);
  const [unpaidBills, setUnpaidBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch current billing method
      const methodResponse = await getBillingMethod();
      if (methodResponse.status) {
        setBillingData(methodResponse.data);
      } else {
        throw new Error(methodResponse.message);
      }

      // Fetch unpaid bills
      const unpaidResponse = await getUnpaidBills();
      if (unpaidResponse.status) {
        setUnpaidBills(unpaidResponse.data);
        // Calculate total amount
        const total = unpaidResponse.data.reduce((sum, bill) => 
          sum + parseFloat(bill.bill_amount) + parseFloat(bill.arrears), 0);
        setTotalAmount(total.toFixed(2));
      } else {
        throw new Error(unpaidResponse.message);
      }

      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch billing data');
      setLoading(false);
    }
  };

  const downloadPDF = (bill) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Electricity Bill Challan', 20, 20);
    doc.setFontSize(14);
    doc.text(`Bill No: ${bill.bill_id}`, 20, 40);
    doc.text(`Amount: ${bill.bill_amount} Rs.`, 20, 50);
    doc.text(`Generated On: ${bill.bill_date}`, 20, 60);
    doc.text(`Due Date: ${bill.due_date}`, 20, 70);
    doc.text(`Status: ${bill.paid ? 'Paid' : 'Unpaid'}`, 20, 80);
    doc.text(`Arrears: ${bill.arrears} Rs.`, 20, 90);
    doc.text(`Concession: ${bill.concession} Rs.`, 20, 100);
    doc.setFontSize(12);
    doc.text('Thank you for your payment.', 20, 120);
    doc.save(`Bill-${bill.bill_id}.pdf`);
  };

  const columns = [
    {
      name: 'Bill ID',
      selector: (row) => row.bill_id,
      width: '80px'
    },
    {
      name: 'Amount',
      selector: (row) => `${row.bill_amount} Rs.`,
      sortable: true
    },
    {
      name: 'Bill Date',
      selector: (row) => row.bill_date,
      sortable: true
    },
    {
      name: 'Due Date',
      selector: (row) => row.due_date,
      sortable: true
    },
    {
      name: 'Arrears',
      selector: (row) => `${row.arrears} Rs.`,
      sortable: true
    },
    {
      name: 'Concession',
      selector: (row) => `${row.concession} Rs.`,
      sortable: true
    },
    {
      name: 'Print Challan',
      cell: (row) => (
        <button
          onClick={() => downloadPDF(row)}
          className="homepage-button"
        >
          Print
        </button>
      )
    }
  ];

  if (loading) {
    return <div className="homepage-card">Loading billing information...</div>;
  }

  if (error) {
    return <div className="homepage-card">Error: {error}</div>;
  }

  return (
    <div>
      <div className="homepage-card">
        <h1 className="homepage-title" style={{ textAlign: 'center', marginBottom: '10px' }}>Your Billing Information</h1>
        
        {/* Billing Method Information */}
        {billingData?.billing_method && (
          <div style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#f8f9fa' }}>
            <h2>Current Package</h2>
            <p><strong>Package Name:</strong> {billingData.billing_method.package.name}</p>
            <p><strong>Description:</strong> {billingData.billing_method.package.description}</p>
            <p><strong>Price:</strong> {billingData.billing_method.package.price} Rs.</p>
            <p><strong>Voltage Included:</strong> {billingData.billing_method.package.voltage_included} units</p>
            <p><strong>Duration:</strong> {billingData.billing_method.package.duration_months} months</p>
            <p><strong>Overage Rate:</strong> {billingData.billing_method.package.overage_rate} Rs. per unit</p>
          </div>
        )}

        {/* Payment Summary */}
        <div style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#f8f9fa' }}>
          <h2>Payment Summary</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <h5 className="card-title">Total Due</h5>
                  <h3 className="card-text">{totalAmount} Rs.</h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-warning text-white">
                <div className="card-body">
                  <h5 className="card-title">Unpaid Bills</h5>
                  <h3 className="card-text">{unpaidBills.length}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <h5 className="card-title">Next Due Date</h5>
                  <h3 className="card-text">
                    {unpaidBills.length > 0 
                      ? unpaidBills[0].due_date 
                      : 'No pending bills'}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unpaid Bills Table */}
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Unpaid Bills</h2>
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
          <DataTable
            columns={columns}
            data={unpaidBills}
            highlightOnHover
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            sortable
            responsive
            striped
          />
        </div>

        {/* Payment Button */}
        {unpaidBills.length > 0 && (
          <div className="text-center mt-4">
            <button className="btn btn-primary btn-lg">
              Pay All Bills ({totalAmount} Rs.)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayYourBill;
