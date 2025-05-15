import React, { useState, useEffect } from 'react';
import { getBillingMethod, updateMethod, getUnpaidBills, getPackages } from '../../../services/billing.service';

const ChangeMethod = () => {
  const [currentMethod, setCurrentMethod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedTimeBased, setSelectedTimeBased] = useState('');
  const [frequency, setFrequency] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [unpaidBills, setUnpaidBills] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch current billing method
      const methodResponse = await getBillingMethod();
      if (methodResponse.status) {
        setCurrentMethod(methodResponse.data);
        // Set initial values based on current method
        if (methodResponse.data.billing_method) {
          if (methodResponse.data.billing_method.billing_type === 'PACKAGE') {
            setSelectedType('package');
            setSelectedPackage(methodResponse.data.billing_method.package.id);
          } else {
            setSelectedType('time-based');
            setSelectedTimeBased(methodResponse.data.billing_method.billing_type.toLowerCase());
            if (methodResponse.data.billing_method.billing_type === 'INSTALLMENT') {
              setFrequency(methodResponse.data.billing_method.frequency || 1);
            }
          }
        }
      } else {
        throw new Error(methodResponse.message);
      }

      // Fetch packages
      const packagesResponse = await getPackages();
      if (packagesResponse.status) {
        setPackages(packagesResponse.data);
      } else {
        console.error('Warning: Failed to load packages', packagesResponse.message);
      }

      // Fetch unpaid bills
      const unpaidResponse = await getUnpaidBills();
      if (unpaidResponse.status) {
        setUnpaidBills(unpaidResponse.data);
      } else {
        throw new Error(unpaidResponse.message);
      }

      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let data = {};
      
      if (selectedType === 'package') {
        data = {
          billing_type: 'PACKAGE',
          package_id: parseInt(selectedPackage)
        };
      } else {
        data = {
          billing_type: selectedTimeBased.toUpperCase(),
          frequency: selectedTimeBased === 'installment' ? frequency : null
        };
      }

      const response = await updateMethod(data);
      if (response.status) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        fetchData(); // Refresh all data
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to update billing method');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="homepage-card">Loading billing method information...</div>;
  }

  if (unpaidBills.length > 0) {
    return (
      <div className="homepage-card">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Cannot Change Billing Method</h4>
          <p>You have unpaid bills. Please clear your pending payments before changing your billing method.</p>
          <hr />
          <div className="mt-3">
            <h5>Unpaid Bills:</h5>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Bill ID</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Arrears</th>
                    <th>Concession</th>
                  </tr>
                </thead>
                <tbody>
                  {unpaidBills.map((bill) => (
                    <tr key={bill.bill_id}>
                      <td>{bill.bill_id}</td>
                      <td>{bill.bill_amount} Rs.</td>
                      <td>{bill.due_date}</td>
                      <td>{bill.arrears} Rs.</td>
                      <td>{bill.concession} Rs.</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <hr />
          <p className="mb-0">
            <a href="/pay-bill" className="btn btn-primary">Pay Bills</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage-card">
      <h1 className="homepage-title" style={{ textAlign: 'center', marginBottom: '20px' }}>
        Change Billing Method
      </h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {showSuccess && (
        <div className="alert alert-success" role="alert">
          Billing method updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="form-label">Select Billing Type</label>
          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="billingType"
                id="package"
                value="package"
                checked={selectedType === 'package'}
                onChange={(e) => setSelectedType(e.target.value)}
              />
              <label className="form-check-label" htmlFor="package">
                Package Based
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="billingType"
                id="time-based"
                value="time-based"
                checked={selectedType === 'time-based'}
                onChange={(e) => setSelectedType(e.target.value)}
              />
              <label className="form-check-label" htmlFor="time-based">
                Time Based
              </label>
            </div>
          </div>
        </div>

        {selectedType === 'package' && (
          <div className="form-group mb-4">
            <label className="form-label">Select Package</label>
            <select
              className="form-select"
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              required
            >
              <option value="">Select a package</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} - {pkg.price} Rs. ({pkg.description})
                  {pkg.voltage_included ? ` - ${pkg.voltage_included}V included` : ''}
                  {pkg.duration_months ? ` - ${pkg.duration_months} month${pkg.duration_months > 1 ? 's' : ''}` : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedType === 'time-based' && (
          <div className="form-group mb-4">
            <label className="form-label">Select Time Period</label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="timeBased"
                  id="monthly"
                  value="monthly"
                  checked={selectedTimeBased === 'monthly'}
                  onChange={(e) => setSelectedTimeBased(e.target.value)}
                />
                <label className="form-check-label" htmlFor="monthly">
                  Monthly
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="timeBased"
                  id="yearly"
                  value="yearly"
                  checked={selectedTimeBased === 'yearly'}
                  onChange={(e) => setSelectedTimeBased(e.target.value)}
                />
                <label className="form-check-label" htmlFor="yearly">
                  Yearly
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="timeBased"
                  id="installment"
                  value="installment"
                  checked={selectedTimeBased === 'installment'}
                  onChange={(e) => setSelectedTimeBased(e.target.value)}
                />
                <label className="form-check-label" htmlFor="installment">
                  Installment
                </label>
              </div>
            </div>

            {selectedTimeBased === 'installment' && (
              <div className="form-group mt-3">
                <label className="form-label">Number of Months</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="12"
                  value={frequency}
                  onChange={(e) => setFrequency(parseInt(e.target.value))}
                  required
                />
              </div>
            )}
          </div>
        )}

        <div className="d-grid gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Billing Method'}
          </button>
        </div>
      </form>

      {currentMethod && (
        <div className="mt-4">
          <h3>Current Billing Method</h3>
          <div className="card">
            <div className="card-body">
              {currentMethod.billing_method.billing_type === 'PACKAGE' ? (
                <>
                  <h5>Package Based Billing</h5>
                  <p><strong>Package:</strong> {currentMethod.billing_method.package.name}</p>
                  <p><strong>Price:</strong> {currentMethod.billing_method.package.price} Rs.</p>
                  <p><strong>Description:</strong> {currentMethod.billing_method.package.description}</p>
                </>
              ) : (
                <>
                  <h5>Time Based Billing</h5>
                  <p><strong>Type:</strong> {currentMethod.billing_method.billing_type}</p>
                  {currentMethod.billing_method.billing_type === 'INSTALLMENT' && (
                    <p><strong>Installment Months:</strong> {currentMethod.billing_method.frequency}</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeMethod; 