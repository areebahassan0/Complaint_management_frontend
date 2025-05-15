import React, { useEffect, useState } from 'react';
import { getUnpaidBills } from '../../../services/billing.service';
import { Download, CreditCard } from 'lucide-react';
import jsPDF from 'jspdf';

const SimpleBillingPage = () => {
  const [unpaidBills, setUnpaidBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await getUnpaidBills();
        if (response.status) {
          setUnpaidBills(response.data);
        } else {
          throw new Error(response.message || 'Failed to load bills');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  const downloadPDF = (bill) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Electricity Bill', 20, 20);

    doc.setFontSize(12);
    doc.text(`Bill ID: ${bill.bill_id}`, 20, 40);
    doc.text(`Due Date: ${bill.due_date}`, 20, 50);
    doc.text(`Amount: Rs. ${bill.bill_amount}`, 20, 60);
    doc.text(`Arrears: Rs. ${bill.arrears}`, 20, 70);

    doc.save(`Bill_${bill.bill_id}.pdf`);
  };

  const payBill = (bill) => {
    console.log('Paying bill:', bill.bill_id);
    // Payment logic here
  };

  if (loading) return <div className="text-center text-white py-10">Loading bills...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Unpaid Bills</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 bg-gray-800 rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-3">Bill ID</th>
              <th className="p-3">Due Date</th>
              <th className="p-3">Amount (Rs.)</th>
              <th className="p-3">Arrears (Rs.)</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {unpaidBills.map((bill) => (
              <tr key={bill.bill_id} className="border-t border-gray-700 hover:bg-gray-700/30 transition">
                <td className="p-3">{bill.bill_id}</td>
                <td className="p-3">{bill.due_date}</td>
                <td className="p-3">{bill.bill_amount}</td>
                <td className="p-3">{bill.arrears}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => downloadPDF(bill)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
                  >
                    <Download size={16} />
                    Download
                  </button>
                  <button
                    onClick={() => payBill(bill)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
                  >
                    <CreditCard size={16} />
                    Pay
                  </button>
                </td>
              </tr>
            ))}
            {unpaidBills.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No unpaid bills found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SimpleBillingPage;
