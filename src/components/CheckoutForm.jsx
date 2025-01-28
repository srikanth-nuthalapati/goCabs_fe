import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import Loading from './ui/Loading';
import Message from './ui/Message';

export default function CheckoutForm({ selectedCar, onCancel, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    // Mock demo payment response
    const demoResponse = {
      success: true,
      paymentIntent: {
        amount: amount * 100,
        status: 'succeeded',
      },
    };

    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);

    if (demoResponse.success) {
      setMessage(`Payment for ₹${amount} succeeded!`);
    } else {
      setMessage('Payment failed!');
    }
    await new Promise(resolve => setTimeout(resolve, 2000));

    navigate('/booked');
  }

    return (
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Pay for {selectedCar?.name}</h2>
        <CardElement className="border p-2 rounded" />
        <div className="mt-4 flex gap-4">
          <button
            type="submit"
            className="bg-black text-white p-2 rounded-lg"
            disabled={!stripe}
          >
            Pay ₹ {amount}
          </button>
          <button
            type="button"
            className="bg-gray-200 text-black p-2 rounded-lg"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>

        {loading && (<Loading />)}
        {message && (<Message message={message} onClose={() => setMessage('')} />)}
      </form>
    );
  }
