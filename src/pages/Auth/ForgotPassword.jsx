import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/ui/Loading'
import Message from '../../components/ui/Message'
import { StateContext } from '../../context/StateContext';


export default function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const forgotApi = 'https://gocabs-be.onrender.com/api/forgot/password';

    async function handleSubmit(e) {
        e.preventDefault();

        if (email === '') {
            alert('Please enter your email address');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(forgotApi, { email });
            setMessage(response?.data?.message);
            localStorage.setItem('email', JSON.stringify(email));
   
            navigate('/reset-otp');
        }
        catch (error) {
            if (error.response) {
                setMessage(error.response?.data?.message)
            }
            else {
                setMessage(error.message);
            }
            setEmail('');
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='p-4'>
            <h1 className='text-center text-[30px] font-semibold my-4'>Reset Password</h1>
            <form className='flex flex-col shadow-2xl justify-center items-center rounded-2xl gap-9 p-5'>
                <label className='text-lg font-semibold'>Enter your email address:</label>
                <input className='p-3 border-[2px] border-[black] rounded-xl' type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
                <button onClick={handleSubmit} className='p-2 bg-slate-800 rounded-lg text-white hover:bg-slate-700'>send otp</button>
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
