import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../components/ui/Loading'
import Message from '../../components/ui/Message'

export default function ResetOtp() {

    const email = JSON.parse(localStorage.getItem('email'));
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const resetOtpApi = 'https://gocabs-be.onrender.com/api/reset/otp';

    const sendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(resetOtpApi, { email, otp });
            setMessage(response.data.message);
            localStorage.setItem('otpVerified', true);
            navigate('/reset-password');
        }
        catch (error) {
            if (error.response) {
                setMessage(error.response?.data?.message);
            }
            else {
                alert(error.message);
            }
            setOtp('');
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <div
            className="flex flex-col items-center p-[20px] w-[70%] mx-auto">
            <h1 className='my-5'>Verify OTP</h1>
            <p
                className="text-[1.1rem] text-[#555] mb-[20px]">
                Please enter the 4 digit OTP sent to your email to complete your registration.
            </p>
            <form >
                <label htmlFor="otp">Enter OTP:</label>
                <input
                    className='w-[100%] p-[10px] my-[10px] text-[15px] border-[1px] border-[#ccc] rounded-[4px]'
                    type="text"
                    id="otp"
                    name="otp"
                    placeholder='0000'
                    maxLength="4"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <button
                    className='py-[10px] px-[20px] bg-[#4CAF50] text-white border-none rounded-[4px] cursor-pointer disabled:bg-[#ccc] disabled:cursor-not-allowed'
                    onClick={sendOtp}
                    type="submit">
                    verify otp
                </button>
                <Link to={'/forgot-password'}><p className='text-center mt-3 underline'>Change email</p></Link>
            </form>

            {loading && (
                <Loading />
            )}

            {message && (
                <Message message={message} onClose={() => setMessage('')} />
            )}
        </div>
    )
}
