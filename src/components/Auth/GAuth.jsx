import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import React, { useContext, useEffect, useState } from 'react'
import { StateContext } from '../../context/StateContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../ui/Loading'
import Message from '../ui/Message'


export default function GAuth() {

    const { setCurrentUser, setIsAuthenticated } = useContext(StateContext);
        const [loading, setLoading] = useState(false);
        const [message, setMessage] = useState('');
    
    
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('isAuthenticated', 'true');
            }
            else {
                setCurrentUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem('user');
                localStorage.removeItem('isAuthenticated');
            }
        });
        return () => unsubscribe();
    },[])

    const handleGoogleLogin = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setCurrentUser(user);
            localStorage.setItem('user',JSON.stringify(user));

            localStorage.setItem('isAuthenticated',true);
            setIsAuthenticated(true);

            navigate('/ride');
        }
        catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                setMessage('Login canceled. Please try again.');
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <button 
            className='flex py-2 text-black bg-[#afa8a8] rounded-lg justify-center items-center gap-[10px] hover:bg-[#8f8989]' 
            onClick={handleGoogleLogin} 
            type='submit'>
            <svg 
                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="9%" height="9%" viewBox="0 0 48 48">
                <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            <span>Continue with Google</span>
            {loading && <Loading /> }
            {message && <Message />}
        </button>
    )
}
