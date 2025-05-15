import React, { useState } from 'react';
import axios from 'axios';

const PayBillPage = () => {
  const [cardDetails, setCardDetails] = useState({
    card_number: '',
    exp_month: '',
    exp_year: '',
    cvc: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/billing/payment-method/create/`,
        {
          method_type: 'CREDIT_CARD',
          details: {
            card_number: cardDetails.card_number,
            exp_month: parseInt(cardDetails.exp_month),
            exp_year: parseInt(cardDetails.exp_year),
            cvc: cardDetails.cvc,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // adjust if token is stored differently
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data) {
        setMessage('Payment intent created successfully!');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Payment failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Pay Your Bill</h2>

        <input
          type="text"
          name="card_number"
          placeholder="Card Number"
          maxLength={16}
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={cardDetails.card_number}
          onChange={handleChange}
          required
        />

        <div className="flex space-x-2">
          <input
            type="number"
            name="exp_month"
            placeholder="Exp Month"
            className="w-1/2 p-2 rounded bg-gray-700 text-white"
            value={cardDetails.exp_month}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="exp_year"
            placeholder="Exp Year"
            className="w-1/2 p-2 rounded bg-gray-700 text-white"
            value={cardDetails.exp_year}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          name="cvc"
          placeholder="CVC"
          maxLength={4}
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={cardDetails.cvc}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          {loading ? 'Processing...' : 'Submit Payment'}
        </button>

        {message && (
          <div className="text-center mt-2 text-sm text-green-400">{message}</div>
        )}
      </form>
    </div>
  );
};

export default PayBillPage;
