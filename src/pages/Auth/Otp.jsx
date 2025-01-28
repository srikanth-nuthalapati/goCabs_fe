import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/ui/Loading'
import Message from '../../components/ui/Message'

export default function Otp() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const email = JSON.parse(localStorage.getItem('email'));

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      setMessage('OTP must be 4 digits.');
      return;
    }

    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);

    try {
      const response = await axios.post('https://gocabs-be.onrender.com/api/signup/otp', { otp, email });
      localStorage.removeItem('email');
      setMessage('OTP verified & user created successfully!');
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/login');
    } catch (error) {
      if (error.response) {
        setMessage('Invalid OTP. Please try again.');
      }
      else {
        setMessage(error.message);
      }
      setOtp('');
    }
  };

  return (
    <div 
      className="flex flex-col items-center p-[20px] w-[70%] mx-auto">
      <h1 className='my-5'>Verify OTP</h1>
      <p 
        className="text-[1.1rem] text-[#555] mb-[20px]">
        Please enter the 4 digit OTP sent to the email {email} to complete your registration.
      </p>
      <form onSubmit={handleVerifyOtp}>
        <label htmlFor="otp">Enter OTP:</label>
        <input
          className='w-[100%] p-[10px] my-[10px] text-[15px] border-[1px] border-[#ccc] rounded-[4px]'
          type="text"
          id="otp"
          name="otp"
          value={otp}
          onChange={handleOtpChange}
          maxLength="4"
          required
          placeholder='0000'
        />

        <button 
          className='py-[10px] px-[20px] bg-[#4CAF50] text-white border-none rounded-[4px] cursor-pointer disabled:bg-[#ccc] disabled:cursor-not-allowed'
          type="submit" 
          disabled={loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        {loading && (
          <Loading />
        )}

        {message && (
          <Message message={message} onClose={() => setMessage('')} />
        )}
      </form>
    </div>
  );
}
