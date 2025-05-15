import React, { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CreditCard, Download, ChevronRight, Clock, AlertTriangle } from 'lucide-react';
import { getUnpaidBills } from '../../../services/billing.service';

const PayYourBill = () => {
  const [unpaidBills, setUnpaidBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedBills, setSelectedBills] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [isHoveringPay, setIsHoveringPay] = useState(false);

  const fetchUnpaidBills = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getUnpaidBills();
      if (response.status) {
        setUnpaidBills(response.data);
        calculateTotal(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch unpaid bills');
      }
      setLoading(false);
    } catch (err) {
      setError(err?.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUnpaidBills();
  }, [fetchUnpaidBills]);

  const calculateTotal = bills => {
    const sum = bills.reduce(
      (acc, b) => acc + parseFloat(b.bill_amount) + parseFloat(b.arrears),
      0
    );
    setTotalAmount(sum.toFixed(2));
  };

  const toggleSelectBill = billId => {
    setSelectedBills(prev =>
      prev.includes(billId) ? prev.filter(id => id !== billId) : [...prev, billId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedAll) {
      setSelectedBills([]);
    } else {
      setSelectedBills(unpaidBills.map(b => b.bill_id));
    }
    setSelectedAll(!selectedAll);
  };

  const getSelectedTotal = () => {
    const sum = unpaidBills
      .filter(b => selectedBills.includes(b.bill_id))
      .reduce((acc, b) => acc + parseFloat(b.bill_amount) + parseFloat(b.arrears), 0);
    return sum.toFixed(2);
  };

  const downloadPDF = bill => {
    console.log('Downloading PDF for bill:', bill.bill_id);
  };

  const handlePayBill = () => {
    console.log('Processing payment for:', selectedBills);
  };

  const chartData = unpaidBills.map(b => ({ id: `Bill-${b.bill_id}`, amount: parseFloat(b.bill_amount) }));

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="p-8 rounded-2xl bg-gray-800 shadow-lg text-white text-center border border-gray-700">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto mb-6"></div>
        <p className="text-xl font-medium">Loading billing information...</p>
        <p className="text-gray-400 mt-2">Please wait while we fetch your bills</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="p-8 rounded-2xl bg-gray-800 shadow-lg text-white text-center border border-gray-700 max-w-md">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-xl font-semibold mb-2">Error Loading Bills</p>
        <p className="text-gray-300 mb-4">{error}</p>
        <button 
          onClick={fetchUnpaidBills}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              Pay Your Bill
            </h1>
            <p className="text-gray-400 mt-2">Review and pay your outstanding bills</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="bg-gray-800 px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-blue-500/30">
              <span className="block text-xs text-blue-300 uppercase tracking-wider">Next Due Date</span>
              <span className="block text-lg font-semibold mt-1 text-white">
                {unpaidBills[0]?.due_date || '—'}
              </span>
            </div>
            <div className="bg-gray-800 px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-blue-500/30">
              <span className="block text-xs text-blue-300 uppercase tracking-wider">Total Due</span>
              <span className="block text-lg font-semibold mt-1 text-white">
                {totalAmount} Rs.
              </span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart Card */}
            <div className="bg-gray-800 p-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <CreditCard className="text-indigo-400" size={24} />
                  </div>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-200">
                    Billing Overview
                  </span>
                </h2>
                <div className="flex items-center text-sm text-blue-300 bg-blue-900/30 px-3 py-1 rounded-full">
                  <Clock size={16} className="mr-1" /> 
                  As of {new Date().toLocaleDateString()}
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer>
                  <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.5} />
                    <XAxis 
                      dataKey="id" 
                      tick={{ fill: '#cbd5e1', fontSize: 12 }} 
                      tickMargin={10}
                    />
                    <YAxis 
                      tick={{ fill: '#cbd5e1', fontSize: 12 }} 
                      tickFormatter={(value) => `${value} Rs.`}
                    />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        borderColor: '#334155',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                      itemStyle={{ color: '#818cf8' }}
                      formatter={(val) => [`${val} Rs.`, 'Amount']}
                      labelStyle={{ fontWeight: 'bold', color: '#e2e8f0' }}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="url(#colorBar)" 
                      radius={[8, 8, 0, 0]}
                      animationDuration={1500}
                    >
                      <defs>
                        <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0.8}/>
                        </linearGradient>
                      </defs>
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-center text-gray-400 text-sm">Amounts in Pakistani Rupees (Rs.)</p>
            </div>

            {/* Unpaid Bills Table */}
            <div className="bg-gray-800 p-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h2 className="text-xl md:text-2xl font-semibold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-200">
                    Unpaid Bills
                  </span>
                </h2>
                <div className="flex items-center gap-3">
                  <label className="flex items-center text-sm cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedAll}
                        onChange={toggleSelectAll}
                      />
                      <div className={`block w-5 h-5 rounded ${selectedAll ? 'bg-indigo-600' : 'bg-gray-700 border border-gray-600'}`}>
                        {selectedAll && (
                          <svg className="w-5 h-5 text-white p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="ml-2 text-gray-300">Select All</span>
                  </label>
                  {selectedBills.length > 0 && (
                    <span className="text-xs bg-indigo-600 px-2.5 py-1 rounded-full font-medium">
                      {selectedBills.length} Selected
                    </span>
                  )}
                </div>
              </div>
              
              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-700/50">
                        {['Select','Bill ID','Amount','Bill Date','Due Date','Arrears','Action'].map((col,i)=>(
                          <th 
                            key={i} 
                            className="px-4 py-3 text-left uppercase text-xs font-medium text-gray-400 tracking-wider"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {unpaidBills.length ? unpaidBills.map(bill => (
                        <tr 
                          key={bill.bill_id} 
                          className={`transition-colors ${selectedBills.includes(bill.bill_id) ? 'bg-indigo-900/20' : 'hover:bg-gray-700/50'}`}
                        >
                          <td className="px-4 py-3">
                            <label className="flex items-center cursor-pointer">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  checked={selectedBills.includes(bill.bill_id)}
                                  onChange={() => toggleSelectBill(bill.bill_id)}
                                />
                                <div className={`block w-5 h-5 rounded ${selectedBills.includes(bill.bill_id) ? 'bg-indigo-600' : 'bg-gray-700 border border-gray-600'}`}>
                                  {selectedBills.includes(bill.bill_id) && (
                                    <svg className="w-5 h-5 text-white p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            </label>
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-100">{bill.bill_id}</td>
                          <td className="px-4 py-3 font-medium text-green-400">{bill.bill_amount} Rs.</td>
                          <td className="px-4 py-3 text-gray-300">{bill.bill_date}</td>
                          <td className="px-4 py-3 text-gray-300">{bill.due_date}</td>
                          <td className="px-4 py-3 font-medium text-amber-400">{bill.arrears} Rs.</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => downloadPDF(bill)}
                              className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors border border-gray-600 hover:border-gray-500"
                            >
                              <Download size={14} /> Download
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={7} className="py-10 text-center text-gray-500">
                            <div className="flex flex-col items-center justify-center">
                              <CreditCard size={48} className="text-gray-600 mb-4" />
                              <p className="text-lg">No unpaid bills found</p>
                              <p className="text-sm text-gray-400 mt-1">You're all caught up!</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {unpaidBills.length > 0 && (
                <div className="mt-4 text-center text-gray-400 text-sm">
                  {selectedBills.length > 0 ? (
                    <span className="text-blue-300">
                      {selectedBills.length} bill{selectedBills.length !== 1 ? 's' : ''} selected ({getSelectedTotal()} Rs.)
                    </span>
                  ) : (
                    "Select bills to pay from the list above"
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="bg-gray-800 p-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 sticky top-8 h-fit">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <CreditCard className="text-indigo-400" size={24} />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-200">
                Payment Summary
              </span>
            </h2>
            
            <div className="space-y-3 mb-6">
              {[
                ['Total Due', totalAmount + ' Rs.', 'text-white'],
                ['Bills Selected', `${selectedBills.length} of ${unpaidBills.length}`, 'text-gray-300'],
                ['Selected Amount', `${selectedBills.length ? getSelectedTotal() + ' Rs.' : '0.00 Rs.'}`, 'text-blue-300'],
                ['Next Due Date', unpaidBills[0]?.due_date || '—', 'text-gray-300'],
              ].map(([label,value,textColor],i)=>(
                <div 
                  key={i} 
                  className="flex justify-between p-4 bg-gray-700/50 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-colors"
                >
                  <span className={`text-sm ${textColor}`}>{label}</span>
                  <span className={`font-medium ${textColor}`}>{value}</span>
                </div>
              ))}
            </div>
            
            <button
              onClick={handlePayBill}
              disabled={!selectedBills.length}
              onMouseEnter={() => setIsHoveringPay(true)}
              onMouseLeave={() => setIsHoveringPay(false)}
              className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden ${selectedBills.length ? 
                'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg' : 
                'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
            >
              {selectedBills.length ? (
                <>
                  <span className="relative z-10 flex items-center">
                    Pay {selectedBills.length} Bill{selectedBills.length !== 1 ? 's' : ''} ({getSelectedTotal()} Rs.)
                    <ChevronRight 
                      size={18} 
                      className={`ml-1 transition-transform duration-300 ${isHoveringPay ? 'translate-x-1' : ''}`} 
                    />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                </>
              ) : 'Select Bills to Pay'}
            </button>
            
            {unpaidBills.length > 0 && selectedBills.length < unpaidBills.length && (
              <button
                onClick={() => {setSelectedBills(unpaidBills.map(b=>b.bill_id)); setSelectedAll(true);}}
                className="w-full mt-4 py-2.5 border-2 border-indigo-600/50 text-indigo-300 rounded-xl font-medium hover:bg-indigo-900/20 hover:border-indigo-600/70 transition-colors"
              >
                Select All Bills
              </button>
            )}
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-3 text-gray-200">Accepted Payment Methods</h3>
              <div className="grid grid-cols-3 gap-3">
                {['Visa', 'MasterCard', 'JazzCash', 'EasyPaisa', 'Bank Transfer', 'Cash'].map((method, i) => (
                  <div 
                    key={i} 
                    className="bg-gray-700/50 p-2 rounded-lg border border-gray-700 flex items-center justify-center hover:border-blue-500/30 transition-colors"
                  >
                    <span className="text-xs text-center text-gray-300">{method}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400 text-center">
                Payments are processed securely. By paying your bills, you agree to our Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayYourBill;