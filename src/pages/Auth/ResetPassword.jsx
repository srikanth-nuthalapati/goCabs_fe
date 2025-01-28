import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ShowPassword from '../../components/ui/ShowPassword';
import { StateContext } from '../../context/StateContext';
import Loading from '../../components/ui/Loading'
import Message from '../../components/ui/Message'

export default function ResetPassword() {

    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
      const [loading, setLoading] = useState(false);
        const [message, setMessage] = useState('');
    const {showPassword} = useContext(StateContext);

    const email = JSON.parse(localStorage.getItem('email'));

    const resetPassApi = 'https://gocabs-be.onrender.com/api/reset/password';

    const resetPassword = async(e)  => {
        e.preventDefault();
        setLoading(true);
        if (newPassword === '' ) {
            alert('enter new password');
            return;
        }

        try {
            const response = await axios.post(resetPassApi, {email, newPassword});
            localStorage.clear();
            setMessage(response?.data?.message);
            navigate('/login');
        }
        catch(error){
            if(error.response){
                setMessage(error.response?.data?.message);
            }
            else {
                setMessage(error?.message);
            }
            setNewPassword('');
        }
    }


  return (
    <div className='flex flex-col justify-center items-center h-[70vh] gap-5'>
        <h1 className='text-[25px] font-semibold'>Reset Password</h1>
            <label className='text-[19px]' htmlFor="new-password">New Password: </label>
            <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='border-[2px] border-black p-2 rounded-2xl' type={showPassword ? 'text' : 'password'} id="new-password" name="new-password" placeholder='password'/>
            <ShowPassword />
        <button onClick={resetPassword} className='bg-black text-white p-3 rounded-lg hover:bg-white hover:text-black hover:border-black hover:border-[2px]'>reset password</button>

        {loading && (
            <Loading />
        )}

        {message && (
            <Message message={message} onClose={() => setMessage('')} />
        )}
    </div>
  )
}
