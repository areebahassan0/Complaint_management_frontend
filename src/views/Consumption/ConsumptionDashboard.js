import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import {
  getDailyConsumption,
  getMonthlyConsumption,
  getDailySummary,
  getMonthlySummary,
  getTotalSummary
} from '../../services/consumption.service';
import { Calendar, Clock, Zap, Home, TrendingUp, TrendingDown, Refrigerator, Wind, PieChart as PieChartIcon } from 'lucide-react';

const ConsumptionDashboard = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [dailySummary, setDailySummary] = useState(null);
  const [monthlySummary, setMonthlySummary] = useState(null);
  const [totalSummary, setTotalSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

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
        if (dailyRes.status) {
          // Extract the data array from the response
          const dailyConsumptionData = dailyRes.data.data || [];
          setDailyData(dailyConsumptionData);
          
          // Automatically select the most recent day
          if (dailyConsumptionData.length > 0) {
            setSelectedDay(dailyConsumptionData[dailyConsumptionData.length - 1]);
          }
        }
        else throw new Error(dailyRes.message);
        if (dailySummaryRes.status) setDailySummary(dailySummaryRes.data);
        else throw new Error(dailySummaryRes.message);
      } else if (tab === 'monthly') {
        const [monthlyRes, monthlySummaryRes] = await Promise.all([
          getMonthlyConsumption(),
          getMonthlySummary()
        ]);
        if (monthlyRes.status) {
          // Extract the data array from the response
          const monthlyConsumptionData = monthlyRes.data.data || [];
          setMonthlyData(monthlyConsumptionData);
          
          // Automatically select the most recent month
          if (monthlyConsumptionData.length > 0) {
            setSelectedMonth(monthlyConsumptionData[monthlyConsumptionData.length - 1]);
          }
        }
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

  const formatApplianceName = (name) => {
    return name
      .split('_')
      .map(word => {
        if (word.toLowerCase() === 'br') return 'Bedroom';
        if (word.toLowerCase() === 'tv') return 'TV';
        if (word.toLowerCase() === 'ac') return 'AC';
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };

  const handleBarClick = (data) => {
    if (activeTab === 'daily') {
      setSelectedDay(data);
      setSelectedMonth(null);
    } else if (activeTab === 'monthly') {
      setSelectedMonth(data);
      setSelectedDay(null);
    }
  };

  const processApplianceData = (data) => {
    if (!data || !data.appliance_consumption) return [];
    
    const totalConsumption = data.total_consumption_6_months || data.total_consumption;
    return data.appliance_consumption
      .filter(item => item.total_consumption > 0)
      .map(item => ({
        name: formatApplianceName(item.appliance),
        usage: Number(item.total_consumption.toFixed(2)),
        share: Number(((item.total_consumption / totalConsumption) * 100).toFixed(1))
      }))
      .sort((a, b) => b.usage - a.usage);
  };

  // Function to get pie chart data for appliance breakdown
  const getPieData = (summary) => {
    if (!summary || !summary.appliance_consumption) return [];
    
    const totalConsumption = summary.total_consumption_6_months || summary.total_consumption;
    const topAppliances = processApplianceData(summary).slice(0, 3);  // Get top 3 appliances
    
    // Calculate 'Other' category
    const topAppliancesTotal = topAppliances.reduce((sum, item) => sum + item.usage, 0);
    const otherUsage = totalConsumption - topAppliancesTotal;
    
    const result = topAppliances.map(item => ({
      name: item.name,
      value: item.usage
    }));
    
    if (otherUsage > 0) {
      result.push({
        name: 'Other',
        value: Number(otherUsage.toFixed(2))
      });
    }
    
    return result;
  };

  const COLORS = ["#10B981", "#F59E0B", "#6366F1", "#8884d8"];

  // New helper for monthly appliance breakdown pie data
  const getMonthlyPieData = (data) => {
    if (!data) return [];
    return Object.entries(data)
      .filter(([key, value]) =>
        !['month', 'total', 'metadata', 'created_at', 'updated_at'].includes(key) && value > 0
      )
      .map(([key, value]) => ({
        name: formatApplianceName(key),
        value: Number(value.toFixed(2)),
      }));
  };

  const renderTopAppliances = (summary, title = "Top Energy Consuming Appliances") => {
    if (!summary) return null;

    return (
      <div style={{ minHeight: 150, background: '#23263a', borderRadius: 8, padding: 24, color: '#fff', marginTop: 20 }}>
        <h4>{title}</h4>
        <div style={{ marginTop: '15px' }}>
          {processApplianceData(summary).map((appliance, idx) => (
            <div 
              key={idx} 
              style={{ 
                background: '#181c2a', 
                padding: '15px', 
                borderRadius: '8px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <div 
                style={{
                  background: idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : idx === 2 ? '#CD7F32' : '#2A2E3E',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: idx < 3 ? '#000' : '#fff',
                  fontWeight: 'bold',
                  marginRight: '15px',
                  flexShrink: 0
                }}
              >
                {idx + 1}
              </div>
              <div style={{ flex: 1 }}>
                <h5 style={{ color: '#fff', marginBottom: '5px' }}>{appliance.name}</h5>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ color: '#82ca9d' }}>Usage: {appliance.usage} kWh</div>
                  <div style={{ color: '#82ca9d' }}>Share: {appliance.share}%</div>
                </div>
              </div>
              <div 
                style={{ 
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '4px',
                  background: idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : idx === 2 ? '#CD7F32' : '#2A2E3E',
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderApplianceBreakdown = () => {
    if (!selectedDay) return null;

    const applianceData = Object.entries(selectedDay)
      .filter(([key, value]) => 
        key !== 'date' && 
        key !== 'total' && 
        key !== 'metadata' && 
        key !== 'created_at' && 
        key !== 'updated_at' &&
        value > 0
      )
      .map(([key, value]) => ({
        name: formatApplianceName(key),
        usage: Number(value.toFixed(2)),
        share: Number(((value / selectedDay.total) * 100).toFixed(1))
      }))
      .sort((a, b) => b.usage - a.usage);

    return (
      <div style={{ minHeight: 150, background: '#23263a', borderRadius: 8, padding: 24, color: '#fff', marginTop: 20 }}>
        <h4>Appliance Breakdown for {new Date(selectedDay.date).toLocaleDateString()}</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '15px' }}>
          {applianceData.map((appliance, idx) => (
            <div 
              key={idx} 
              style={{ 
                background: '#181c2a', 
                padding: '15px', 
                borderRadius: '8px',
                minWidth: '200px',
                flex: '1'
              }}
            >
              <h5 style={{ color: '#fff', marginBottom: '10px' }}>{appliance.name}</h5>
              <div style={{ color: '#82ca9d' }}>
                <div>Usage: {appliance.usage} kWh</div>
                <div>Share: {appliance.share}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMonthlyApplianceBreakdown = () => {
    if (!selectedMonth) return null;

    const applianceData = Object.entries(selectedMonth)
      .filter(([key, value]) => 
        key !== 'month' && 
        key !== 'total' && 
        key !== 'metadata' && 
        key !== 'created_at' && 
        key !== 'updated_at' &&
        value > 0
      )
      .map(([key, value]) => ({
        name: formatApplianceName(key),
        usage: Number(value.toFixed(2)),
        share: Number(((value / selectedMonth.total) * 100).toFixed(1))
      }))
      .sort((a, b) => b.usage - a.usage);

    return (
      <div style={{ minHeight: 150, background: '#23263a', borderRadius: 8, padding: 24, color: '#fff', marginTop: 20 }}>
        <h4>Appliance Breakdown for {new Date(selectedMonth.month).toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '15px' }}>
          {applianceData.map((appliance, idx) => (
            <div 
              key={idx} 
              style={{ 
                background: '#181c2a', 
                padding: '15px', 
                borderRadius: '8px',
                minWidth: '200px',
                flex: '1'
              }}
            >
              <h5 style={{ color: '#fff', marginBottom: '10px' }}>{appliance.name}</h5>
              <div style={{ color: '#82ca9d' }}>
                <div>Usage: {appliance.usage} kWh</div>
                <div>Share: {appliance.share}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMonthlySummaryStats = () => {
    if (!monthlySummary) return null;
    
    return (
      <div className="mt-3">
        <strong>Average Monthly Units:</strong> {Number(monthlySummary.average_consumption_6_months || 0).toFixed(2)} kWh<br />
        <strong>Total Consumption (6 Months):</strong> {Number(monthlySummary.total_consumption_6_months || 0).toFixed(2)} kWh
      </div>
    );
  };

  // New function to render enhanced summary section
  const renderEnhancedSummary = () => {
    if (!totalSummary || !totalSummary.data) return null;

    const data = totalSummary.data;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Overview Card */}
        <div style={{ background: '#23263a', borderRadius: 8, padding: 24, color: '#fff' }}>
          <h3 className="flex items-center gap-2">
            <Home /> Energy Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div style={{ background: '#181c2a', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#3B82F6', fontWeight: 500, fontSize: '0.875rem' }}>Daily Average</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{Number(data?.average_daily_usage || 0).toFixed(2)} kWh</div>
              <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Overall daily consumption</div>
            </div>
            
            <div style={{ background: '#181c2a', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#10B981', fontWeight: 500, fontSize: '0.875rem' }}>Monthly Average</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{Number(data?.average_monthly_usage || 0).toFixed(2)} kWh</div>
              <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Overall monthly consumption</div>
            </div>
            
            <div style={{ background: '#181c2a', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F59E0B', fontWeight: 500, fontSize: '0.875rem' }}>Kitchen Usage</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {Number(data?.average_daily_kitchen_usage || 0).toFixed(2)} kWh
              </div>
              <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Average daily kitchen consumption</div>
            </div>
            
            <div style={{ background: '#181c2a', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#8B5CF6', fontWeight: 500, fontSize: '0.875rem' }}>AC Usage</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {Number(data?.average_daily_ac_usage || 0).toFixed(2)} kWh
              </div>
              <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Average daily AC consumption</div>
            </div>
          </div>
        </div>

        {/* Usage Statistics and Distribution */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {/* Usage Statistics */}
          <div style={{ background: '#23263a', borderRadius: 8, padding: 24, color: '#fff' }}>
            <h3 className="flex items-center gap-2 mb-4">
              <Clock /> Monthly Usage Statistics
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#181c2a', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Kitchen Consumption</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                  {Number(data?.average_monthly_kitchen_usage || 0).toFixed(2)} kWh
                </div>
                <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Monthly average</div>
              </div>
              <div style={{ background: '#181c2a', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#94A3B8', fontSize: '0.875rem' }}>AC Consumption</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                  {Number(data?.average_monthly_ac_usage || 0).toFixed(2)} kWh
                </div>
                <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Monthly average</div>
              </div>
            </div>
          </div>

          {/* Distribution Pie Chart */}
          <div style={{ background: '#23263a', borderRadius: 8, padding: 24, color: '#fff' }}>
            <h3 className="flex items-center gap-2 mb-4">
              <PieChartIcon size={20} /> Energy Distribution
            </h3>
            <div style={{ height: '250px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: 'Kitchen',
                        value: Number(data?.average_daily_kitchen_usage || 0)
                      },
                      {
                        name: 'AC',
                        value: Number(data?.average_daily_ac_usage || 0)
                      },
                      {
                        name: 'Other',
                        value: Math.max(
                          0,
                          Number(data?.average_daily_usage || 0) -
                          Number(data?.average_daily_kitchen_usage || 0) -
                          Number(data?.average_daily_ac_usage || 0)
                        )
                      }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {[
                      { name: 'Kitchen', color: '#3B82F6' },
                      { name: 'AC', color: '#F59E0B' },
                      { name: 'Other', color: '#10B981' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${Number(value).toFixed(2)} kWh`, "Usage"]}
                    contentStyle={{ background: '#181c2a', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#94A3B8' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px', color: '#aaa', fontSize: '0.9em' }}>
              Daily Energy Distribution
            </div>
          </div>
        </div>

        {/* Min/Max Card */}
        <div style={{ background: '#23263a', borderRadius: 8, padding: 24, color: '#fff' }}>
          <h3 className="flex items-center gap-2 mb-4">
            <Calendar /> Consumption Extremes
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data?.min_daily_usage && data?.max_daily_usage && (
              <div style={{ background: '#181c2a', borderRadius: 8, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Daily Usage Range</div>
                    <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <TrendingDown style={{ color: '#10B981' }} />
                      {Number(data.min_daily_usage.value || 0).toFixed(2)} kWh
                      <span style={{ color: '#94A3B8' }}>to</span>
                      <TrendingUp style={{ color: '#EF4444' }} />
                      {Number(data.max_daily_usage.value || 0).toFixed(2)} kWh
                    </div>
                  </div>
                </div>
                <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginTop: '8px' }}>
                  Min: {data.min_daily_usage.date ? new Date(data.min_daily_usage.date).toLocaleDateString() : 'N/A'}
                  <br />
                  Max: {data.max_daily_usage.date ? new Date(data.max_daily_usage.date).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            )}

            {data?.min_monthly_usage && data?.max_monthly_usage && (
              <div style={{ background: '#181c2a', borderRadius: 8, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Monthly Usage Range</div>
                    <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <TrendingDown style={{ color: '#10B981' }} />
                      {Number(data.min_monthly_usage.value || 0).toFixed(2)} kWh
                      <span style={{ color: '#94A3B8' }}>to</span>
                      <TrendingUp style={{ color: '#EF4444' }} />
                      {Number(data.max_monthly_usage.value || 0).toFixed(2)} kWh
                    </div>
                  </div>
                </div>
                <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginTop: '8px' }}>
                  Min: {data.min_monthly_usage.month ? new Date(data.min_monthly_usage.month).toLocaleDateString('default', { month: 'long', year: 'numeric' }) : 'N/A'}
                  <br />
                  Max: {data.max_monthly_usage.month ? new Date(data.max_monthly_usage.month).toLocaleDateString('default', { month: 'long', year: 'numeric' }) : 'N/A'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div style={{ background: '#23263a', borderRadius: 8, padding: 24, color: '#fff' }}>
          <h3 className="mb-4">Energy Saving Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div style={{ background: '#181c2a', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'flex-start' }}>
              <Refrigerator style={{ marginRight: '12px', color: '#3B82F6' }} />
              <div>
                <h4 style={{ fontWeight: 500 }}>Kitchen Usage</h4>
                <p style={{ fontSize: '0.875rem', color: '#94A3B8' }}>
                  Your kitchen uses {Number(data?.average_daily_kitchen_usage || 0).toFixed(2)} kWh daily. Consider using energy-efficient appliances and avoiding peak hours.
                </p>
              </div>
            </div>
            <div style={{ background: '#181c2a', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'flex-start' }}>
              <Wind style={{ marginRight: '12px', color: '#F59E0B' }} />
              <div>
                <h4 style={{ fontWeight: 500 }}>AC Management</h4>
                <p style={{ fontSize: '0.875rem', color: '#94A3B8' }}>
                  Your AC consumes {Number(data?.average_daily_ac_usage || 0).toFixed(2)} kWh daily. Set to 24°C and clean filters regularly.
                </p>
              </div>
            </div>
            <div style={{ background: '#181c2a', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'flex-start' }}>
              <Home style={{ marginRight: '12px', color: '#10B981' }} />
              <div>
                <h4 style={{ fontWeight: 500 }}>Overall Usage</h4>
                <p style={{ fontSize: '0.875rem', color: '#94A3B8' }}>
                  Your daily average is {Number(data?.average_daily_usage || 0).toFixed(2)} kWh. Consider LED lighting and unplugging unused devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            {/* Bar Chart Section */}
            <div style={{ background: '#181c2a', borderRadius: 8, padding: 24, color: '#fff' }}>
              <h3 className="flex items-center gap-2 mb-4">
                <BarChart size={20} /> Daily Consumption Overview
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart 
                  data={dailyData} 
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  onClick={(e) => e && e.activePayload && handleBarClick(e.activePayload[0].payload)}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#fff"
                    tickFormatter={(date) => new Date(date).toLocaleDateString()}
                  />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value) => [`${Number(value).toFixed(2)} kWh`, 'Total Consumption']}
                    contentStyle={{ background: '#23263a', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#94A3B8' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="total" 
                    fill="#8884d8" 
                    name="Total Consumption"
                    cursor="pointer"
                  />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ textAlign: 'center', marginTop: '10px', color: '#aaa', fontSize: '0.9em' }}>
                Click on any bar to see appliance breakdown
              </div>
            </div>

            {/* Line Graph and Pie Chart Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {/* Line Graph */}
              <div style={{ background: '#181c2a', borderRadius: 8, padding: 24, color: '#fff' }}>
                <h3 className="flex items-center gap-2 mb-4">
                  <TrendingUp size={20} /> Consumption Trend
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={dailyData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis
                      dataKey="date"
                      stroke="#fff"
                      tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <YAxis stroke="#fff" />
                    <Tooltip
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                      formatter={(value) => [`${Number(value).toFixed(2)} kWh`, 'Consumption']}
                      contentStyle={{ background: '#23263a', border: 'none', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#94A3B8' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#10B981"
                      name="Daily Usage"
                      strokeWidth={2}
                      dot={{ fill: '#10B981', stroke: '#10B981', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div style={{ textAlign: 'center', marginTop: '10px', color: '#aaa', fontSize: '0.9em' }}>
                  Daily consumption trend over time
                </div>
              </div>

              {/* Pie Chart */}
              <div style={{ background: '#181c2a', borderRadius: 8, padding: 24, color: '#fff' }}>
                <h3 className="flex items-center gap-2 mb-4">
                  <PieChartIcon size={20} /> Daily Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={selectedDay ? [
                        {
                          name: 'Kitchen',
                          value: Number(selectedDay?.kitchen || 0)
                        },
                        {
                          name: 'AC',
                          value: Number(selectedDay?.ac || 0)
                        },
                        {
                          name: 'Other',
                          value: Math.max(
                            0,
                            Number(selectedDay?.total || 0) -
                            Number(selectedDay?.kitchen || 0) -
                            Number(selectedDay?.ac || 0)
                          )
                        }
                      ] : dailySummary ? [
                        {
                          name: 'Kitchen',
                          value: Number(dailySummary?.average_daily_kitchen_usage || 0)
                        },
                        {
                          name: 'AC',
                          value: Number(dailySummary?.average_daily_ac_usage || 0)
                        },
                        {
                          name: 'Other',
                          value: Math.max(
                            0,
                            Number(dailySummary?.average_daily_usage || 0) -
                            Number(dailySummary?.average_daily_kitchen_usage || 0) -
                            Number(dailySummary?.average_daily_ac_usage || 0)
                          )
                        }
                      ] : []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: 'Kitchen', color: '#3B82F6' },
                        { name: 'AC', color: '#F59E0B' },
                        { name: 'Other', color: '#10B981' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${Number(value).toFixed(2)} kWh`, "Usage"]}
                      contentStyle={{ background: '#23263a', border: 'none', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#94A3B8' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ textAlign: 'center', marginTop: '10px', color: '#aaa', fontSize: '0.9em' }}>
                  {selectedDay ? 'Selected day' : 'Average'} consumption distribution
                </div>
              </div>
            </div>

            {renderApplianceBreakdown()}
            {renderTopAppliances(dailySummary)}
            {dailySummary && (
              <div className="mt-3" style={{ background: '#181c2a', borderRadius: 8, padding: 16, color: '#fff' }}>
                <h4 className="mb-2">Daily Summary</h4>
                <div><strong>Average Daily Units:</strong> {dailySummary.average_daily_units} kWh</div>
                <div><strong>Average Daily Cost:</strong> {dailySummary.average_daily_cost} Rs.</div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'monthly' && !loading && !error && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            {/* Bar Chart Section */}
            <div style={{ background: '#181c2a', borderRadius: 8, padding: 24, color: '#fff' }}>
              <h3 className="flex items-center gap-2 mb-4">
                <BarChart size={20} /> Monthly Consumption Overview
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart 
                  data={monthlyData} 
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  onClick={(e) => e && e.activePayload && handleBarClick(e.activePayload[0].payload)}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#fff"
                    tickFormatter={(month) => {
                      const date = new Date(month);
                      return date.toLocaleDateString('default', { month: 'short', year: '2-digit' });
                    }}
                  />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    labelFormatter={(month) => {
                      const date = new Date(month);
                      return date.toLocaleDateString('default', { month: 'long', year: 'numeric' });
                    }}
                    formatter={(value) => [`${Number(value).toFixed(2)} kWh`, 'Total Consumption']}
                    contentStyle={{ background: '#23263a', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#94A3B8' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="total" 
                    fill="#8884d8" 
                    name="Total Consumption"
                    cursor="pointer"
                  />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ textAlign: 'center', marginTop: '10px', color: '#aaa', fontSize: '0.9em' }}>
                Click on any bar to see appliance breakdown
              </div>
            </div>

            {/* Predicted Consumption Section */}
            <div style={{ background: '#181c2a', borderRadius: 8, padding: 24, color: '#fff', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Zap size={24} color='#F59E0B' />
              <div>
                <h4 style={{ margin: 0 }}>Predicted Consumption</h4>
                <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>1.008 kWh</p>
                </div>
            </div>

            {/* Monthly Trend and Distribution Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {/* Monthly Trend Line Chart */}
              <div style={{ background: '#181c2a', borderRadius: 8, padding: 24, color: '#fff' }}>
                <h3 className="flex items-center gap-2 mb-4">
                  <TrendingUp size={20} /> Monthly Trend
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="month" stroke="#fff" tickFormatter={month => new Date(month).toLocaleDateString('default', { month: 'short', year: '2-digit' })} />
                    <YAxis stroke="#fff" />
                    <Tooltip labelFormatter={month => new Date(month).toLocaleDateString('default', { month: 'long', year: 'numeric' })} formatter={value => [`${Number(value).toFixed(2)} kWh`, 'Consumption']} contentStyle={{ background: '#23263a', border: 'none', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} labelStyle={{ color: '#94A3B8' }} />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#10B981" name="Monthly Usage" strokeWidth={2} dot={{ fill: '#10B981', stroke: '#10B981', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
                <div style={{ textAlign: 'center', marginTop: '10px', color: '#aaa', fontSize: '0.9em' }}>
                  Monthly consumption trend over time
                </div>
                    </div>

              {/* Monthly Distribution Pie Chart */}
              <div style={{ background: '#181c2a', borderRadius: 8, padding: 24, color: '#fff' }}>
                <h3 className="flex items-center gap-2 mb-4">
                  <PieChartIcon size={20} /> Monthly Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={getMonthlyPieData(selectedMonth)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {getMonthlyPieData(selectedMonth).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${Number(value).toFixed(2)} kWh`, 'Usage']}
                      contentStyle={{ background: '#23263a', border: 'none', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#94A3B8' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ textAlign: 'center', marginTop: '10px', color: '#aaa', fontSize: '0.9em' }}>
                  {selectedMonth ? 'Selected month consumption distribution' : 'Click on a bar to see distribution'}
                </div>
                    </div>
                  </div>

            {renderMonthlyApplianceBreakdown()}
            {renderTopAppliances(monthlySummary, "Top Energy Consuming Appliances (Last 6 Months)")}
            {monthlySummary && (
              <div style={{ background: '#181c2a', borderRadius: 8, padding: 16, color: '#fff' }}>
                <h4 className="mb-2">Monthly Summary</h4>
                <div><strong>Average Monthly Units:</strong> {Number(monthlySummary.average_consumption_6_months).toFixed(2)} kWh</div>
                <div><strong>Total Consumption (6 Months):</strong> {Number(monthlySummary.total_consumption_6_months).toFixed(2)} kWh</div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'summary' && !loading && !error && renderEnhancedSummary()}
      </div>
    </div>
  );
};

export default ConsumptionDashboard; 