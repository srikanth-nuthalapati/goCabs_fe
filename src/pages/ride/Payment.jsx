import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

export default function Payment() {

  const location = useLocation();
  const navigate = useNavigate();
  const selectedCar = location.state?.car;
  const amount = location.state?.amount;

  function cancel(){
    navigate('/ride');
  }

  if (!selectedCar) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">No car selected</h1>
        <button
          className="bg-blue-500 text-white p-2 rounded-lg mt-4"
          onClick={() => navigate('/')}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Payment for {selectedCar.name}</h1>
      <p className="text-lg">Amount: ₹{amount}</p>
      <Elements stripe={stripePromise}>
        <CheckoutForm selectedCar={selectedCar} amount={amount} onCancel={cancel} />
      </Elements>
    </div>
  );
}
