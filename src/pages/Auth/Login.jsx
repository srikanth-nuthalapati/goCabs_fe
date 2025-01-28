import React, { useContext, useEffect, useState } from 'react'
// import '../../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import ShowPassword from '../../components/ui/ShowPassword'
import Loading from '../../components/ui/Loading'
import Message from '../../components/ui/Message'
import { StateContext } from '../../context/StateContext';
import axios from 'axios';
import GAuth from '../../components/Auth/GAuth';
import { jwtDecode } from 'jwt-decode';

export default function Login() {

  const { showPassword, setCurrentUser, setIsAuthenticated } = useContext(StateContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const loginUrl = 'https://gocabs-be.onrender.com/api/login';

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAuthenticated');
    if (isLoggedIn) {
      navigate('/ride');
    }
  }, [navigate]);

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    else {
      setPassword(e.target.value);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email === '' || password === '') {
      setMessage('Please fill in all fields');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);

    try {
      let response = await axios.post(loginUrl, { email, password }, { withCredentials: true });
      const token = response?.data?.token;
      if (token) {
        const user = jwtDecode(token);
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));

        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", true);

        setMessage(response?.data?.message);
        console.log(response?.data?.message);
        

        await new Promise(resolve => setTimeout(resolve, 2000));
        navigate('/ride');
      }
      else {
        setMessage('Invalid credentials');
        setPassword('')
      }
    }
    catch (error) {
      if (error.response){
        setMessage(error.response?.data?.message);
        console.log(error.response?.data?.message);
        
      }
      else if (error.request){
        setMessage('Network error');
      }
      setPassword('')
    }
  }


  return (
    <div className="login-container p-[10px] w-[340px] mx-auto mt-5 shadow-slate-950 shadow-lg bg-[rgb(250,250,250)] rounded-md">
      <h1 className='text-[2rem] text-center mb-[20px]'>Login</h1>
      <form onSubmit={handleLogin} className='flex flex-col py-2'>
        <div className="input-group flex items-center relative mb-[15px]">
          <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-[8px] w-[24px] h-[24px] text-[#666]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <input 
            className='w-[100%] pl-[40px] py-[8px] border-[1px] border-[#ccc] rounded-lg text-[16px] outline-none focus:border-[#007bff] focus:shadow-lg' 
            type="email" 
            name="email" 
            value={email} 
            onChange={handleChange} 
            placeholder='email' r
            equired />
        </div>

        <div className="input-group flex items-center relative mb-[15px]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-[8px] w-[24px] h-[24px] text-[#666]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <input 
            className='w-[100%] pl-[40px] py-[8px] border-[1px] border-[#ccc] rounded-lg text-[16px] outline-none focus:border-[#007bff] focus:shadow-lg' 
            type={showPassword ? 'text' : 'password'} 
            name="password" 
            value={password} 
            onChange={handleChange} 
            placeholder='password' 
            required />
        </div>

        <ShowPassword />
        <button 
          className='p-[10px] bg-[#007bff] text-white border-none rounded-lg cursor-pointer text-[1rem] transition ease-in 0.3s hover:bg-[#0056b3]'
          type="submit">Login</button>
        <Link to={'/forgot-password'}><p className='text-center mt-3 cursor-pointer hover:text-blue-900'>Forgot Password</p></Link>
        <Link to={'/signup'}>
          <p className="text-center mt-3 hover:underline">Create new account</p>
        </Link>
        <p className='mb-2 flex items-center justify-center before:flex-1 after:flex-1 before:border-b-[1px] after:border-b-[1px] before:border-b-[rgba(0,0,0,0.46)] after:border-b-[rgba(0,0,0,0.46)] before:mx-[8px] after:mx-[8px]'>
          <span className='px-[10px]'>or</span>
        </p>
        <GAuth />
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
