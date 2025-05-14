import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import {
  getDailyConsumption,
  getMonthlyConsumption,
  getDailySummary,
  getMonthlySummary,
  getTotalSummary
} from '../../services/consumption.service';

const ConsumptionDashboard = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [dailySummary, setDailySummary] = useState(null);
  const [monthlySummary, setMonthlySummary] = useState(null);
  const [totalSummary, setTotalSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTabData(activeTab);
    // eslint-disable-next-line
  }, [activeTab]);

  const fetchTabData = async (tab) => {
    setLoading(true);
    setError(null);
    try {
      if (tab === 'daily') {
        const [dailyRes, dailySummaryRes] = await Promise.all([
          getDailyConsumption(),
          getDailySummary()
        ]);
        if (dailyRes.status) setDailyData(dailyRes.data);
        else throw new Error(dailyRes.message);
        if (dailySummaryRes.status) setDailySummary(dailySummaryRes.data);
        else throw new Error(dailySummaryRes.message);
      } else if (tab === 'monthly') {
        const [monthlyRes, monthlySummaryRes] = await Promise.all([
          getMonthlyConsumption(),
          getMonthlySummary()
        ]);
        if (monthlyRes.status) setMonthlyData(monthlyRes.data);
        else throw new Error(monthlyRes.message);
        if (monthlySummaryRes.status) setMonthlySummary(monthlySummaryRes.data);
        else throw new Error(monthlySummaryRes.message);
      } else if (tab === 'summary') {
        const totalSummaryRes = await getTotalSummary();
        if (totalSummaryRes.status) setTotalSummary(totalSummaryRes.data);
        else throw new Error(totalSummaryRes.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Sample static data for top appliances (replace with real API if available)
  const topAppliances = [
    { name: 'HVAC', usage: 500, share: 42.8 },
    { name: 'Water Heater', usage: 200, share: 16.7 },
    { name: 'Refrigerator', usage: 150, share: 12.7 },
    { name: 'Lighting', usage: 100, share: 8.5 },
    { name: 'Entertainment', usage: 80, share: 6.7 },
    { name: 'Oven', usage: 60, share: 5.1 },
    { name: 'Washer/Dryer', usage: 40, share: 3.3 }
  ];

  return (
    <div className="homepage-card">
      <h1 className="homepage-title" style={{ textAlign: 'center', marginBottom: '20px' }}>
        Energy Consumption Overview
      </h1>
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn btn-outline-primary mx-2 ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          Daily
        </button>
        <button
          className={`btn btn-outline-primary mx-2 ${activeTab === 'monthly' ? 'active' : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          Monthly
        </button>
        <button
          className={`btn btn-outline-primary mx-2 ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          Summary
        </button>
      </div>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div>
        {activeTab === 'daily' && !loading && !error && (
          <div>
            {/* Daily Chart */}
            <div style={{ minHeight: 300, background: '#181c2a', borderRadius: 8, marginBottom: 24, padding: 24, color: '#fff' }}>
              <h3>Daily Consumption Chart</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={dailyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="date" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="units_consumed" fill="#8884d8" name="Units Consumed" />
                  <Bar dataKey="cost" fill="#82ca9d" name="Cost (Rs.)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Top Appliances Section (static for now) */}
            <div style={{ minHeight: 150, background: '#23263a', borderRadius: 8, padding: 24, color: '#fff' }}>
              <h4>Top Appliances</h4>
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>Appliance</th>
                    <th>Usage (kWh)</th>
                    <th>Share (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {topAppliances.map((appliance, idx) => (
                    <tr key={idx}>
                      <td>{appliance.name}</td>
                      <td>{appliance.usage}</td>
                      <td>{appliance.share}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {dailySummary && (
                <div className="mt-3">
                  <strong>Average Daily Units:</strong> {dailySummary.average_daily_units} kWh<br />
                  <strong>Average Daily Cost:</strong> {dailySummary.average_daily_cost} Rs.
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === 'monthly' && !loading && !error && (
          <div>
            <div style={{ minHeight: 300, background: '#181c2a', borderRadius: 8, padding: 24, color: '#fff' }}>
              <h3>Monthly Consumption Chart</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total_units" fill="#8884d8" name="Total Units" />
                  <Bar dataKey="total_cost" fill="#82ca9d" name="Total Cost (Rs.)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Top Appliances Section (static for now) */}
            <div style={{ minHeight: 150, background: '#23263a', borderRadius: 8, padding: 24, color: '#fff' }}>
              <h4>Top Appliances</h4>
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>Appliance</th>
                    <th>Usage (kWh)</th>
                    <th>Share (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {topAppliances.map((appliance, idx) => (
                    <tr key={idx}>
                      <td>{appliance.name}</td>
                      <td>{appliance.usage}</td>
                      <td>{appliance.share}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {monthlySummary && (
                <div className="mt-3">
                  <strong>Average Monthly Units:</strong> {monthlySummary.average_monthly_units} kWh<br />
                  <strong>Average Monthly Cost:</strong> {monthlySummary.average_monthly_cost} Rs.
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === 'summary' && !loading && !error && (
          <div style={{ minHeight: 200, background: '#181c2a', borderRadius: 8, padding: 24, color: '#fff' }}>
            <h3>Summary</h3>
            {totalSummary ? (
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card bg-primary text-white mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Total Units</h5>
                      <h3 className="card-text">{totalSummary.total_units}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-success text-white mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Average Cost</h5>
                      <h3 className="card-text">{totalSummary.average_cost} Rs.</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-info text-white mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Months Counted</h5>
                      <h3 className="card-text">{totalSummary.months_counted}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>No summary data available.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsumptionDashboard; 