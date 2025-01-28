import React, { useContext, useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { StateContext } from '../context/StateContext';
import { useNavigate } from 'react-router-dom';
import Message from '../components/ui/Message';
import Loading from '../components/ui/Loading';

export default function Profile() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [message, setMessage] = useState('');
  const [loading, seLoading] = useState(false);
  const navigate = useNavigate();

  const clearCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`; // This will clear the cookie
  };

  const handleLogout = async () => {
    seLoading(true);
    try {
      if (auth.currentUser) {
        await signOut(auth);
      }

      clearCookie('auth_token');
      setCurrentUser(null); 
      setMessage('Logged out successfully!');
      localStorage.clear();

      setTimeout(() => {
        navigate('/login'); 
      },2000);

    } catch (error) {
      setMessage('An error occurred while logging out. Please try again.');
    }
    finally{
      seLoading(false);
    }
  };

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setCurrentUser(user);
      } else {
        setMessage('session expired. pls login again');
        setCurrentUser(null);
        navigate('/login');
      }
    } catch (error) {
      setMessage('session expired. pls login again');
      setCurrentUser(null);
      navigate('/login');
    }
  }, [navigate]);
  

  return (
    <div className='w-[350px] h-[40vh] p-[20px] mt-[30px] flex flex-col m-auto shadow-slate-900 shadow-inner rounded-2xl justify-center items-center'>
      <h1 className='text-2xl font-bold text-center p-4'>Profile</h1>
      {currentUser ? (
        <div className='flex flex-col h-[100%] justify-center gap-[10px] items-center'>
          <p><strong>Name:</strong> {currentUser.displayName || currentUser.name || 'Guest User'}</p>
          <p><strong>Email:</strong> {currentUser.email || 'N/A'}</p>
          <button onClick={handleLogout} className="logout-btn bg-black py-2 px-3 text-white rounded-2xl hover:bg-[rgb(112,109,109)]">
            Logout
          </button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}

      {loading && (
        <Loading />
      )}

      {message && (
        <Message message={message} onClose={() => setMessage('')} />
      )}
    </div>
  );
}
