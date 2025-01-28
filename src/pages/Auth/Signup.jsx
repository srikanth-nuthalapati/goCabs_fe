import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShowPassword from '../../components/ui/ShowPassword';
import { StateContext } from '../../context/StateContext';
import Loading from '../../components/ui/Loading'
import Message from '../../components/ui/Message'

export default function Signup() {

  const navigate = useNavigate();

  const validName = /^[A-Za-z][A-Za-z0-9_ ]{4,}$/;
  const validEmail = /^[A-Za-z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com)$/;
  const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

  const signupUrl = 'https://gocabs-be.onrender.com/api/signup';

  const { showPassword } = useContext(StateContext);
  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    uname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'uname':
        setUname(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          uname: validName.test(value)
            ? ''
            : 'Name should be at least 5 characters and start with a letter.',
        }));
        break;
      case 'email':
        setEmail(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: validEmail.test(value)
            ? ''
            : 'Email should be valid (e.g., example@gmail.com).',
        }));
        break;
      case 'password':
        setPassword(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: validPassword.test(value)
            ? ''
            : 'Password must have at least 1 uppercase, 1 lowercase, 1 special character, and 1 number.',
        }));
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword:
            value === password
              ? ''
              : 'Passwords do not match.',
        }));
        break;
      default:
        break;
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      errors.uname ||
      errors.email ||
      errors.password ||
      errors.confirmPassword
    ) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(signupUrl, {
        name: uname,
        email: email,
        password: password,
      });

      localStorage.setItem('email', JSON.stringify(response.data.email));
      setMessage(response.data?.message);
      navigate('/signup/otp');
    } catch (error) {
      if (error.response) {

        setMessage(error.response?.data?.message)
      }
      else {
        setMessage(error.message);
      }
      setPassword('');
      setConfirmPassword('');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="signup-container mx-auto p-[20px] w-[330px] lg:w-[450px] mt-[20px] lg:mb-[20px] bg-[rgb(250,250,250)] rounded-md shadow-lg">
      <h1 className='text-center text-[2rem] mb-[20px]'>Register</h1>
      <form 
        className='flex flex-col'
        onSubmit={handleSubmit}>
        <label 
          className='mb-[8px] text-[1rem] text-[#333]'
          htmlFor="name">Name:</label>
        <input
          className='p-[10px] mb-[15px] border-[1px] border-[#ccc] rounded-[4px] text-[1rem] outline-none focus:bg-[#007bff]'
          type="text"
          id="name"
          name="uname"
          value={uname}
          onChange={handleChange}
          required
        />
        {errors.uname && uname.length > 0 && <p className="error-message">{errors.uname}</p>}

        <label 
          className='mb-[8px] text-[1rem] text-[#333]'
          htmlFor="email">Email:</label>
        <input
          className='focus:bg-[#007bff] p-[10px] mb-[15px] border-[1px] border-[#ccc] rounded-[4px] text-[1rem] outline-none'
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        {errors.email && email.length > 0 && <p className="error-message">{errors.email}</p>}

        <label
          className='mb-[8px] text-[1rem] text-[#333]'
          htmlFor="password">Password:</label>
        <input
          className='focus:bg-[#007bff] p-[10px] mb-[15px] border-[1px] border-[#ccc] rounded-[4px] text-[1rem] outline-none'
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        {errors.password && password.length > 0 && (
          <p className="error-message">{errors.password}</p>
        )}

        <label
          className='mb-[8px] text-[1rem] text-[#333]'
          htmlFor="confirmPassword">Confirm Password:</label>
        <input
          className='focus:bg-[#007bff] p-[10px] mb-[15px] border-[1px] border-[#ccc] rounded-[4px] text-[1rem] outline-none'
          type={showPassword ? 'text' : 'password'}
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword}</p>
        )}

        <ShowPassword />

        <button 
          className='p-[10px] bg-[#007bff] text-white border-none rounded-[4px] cursor-pointer text-[1rem] transition ease-in duration-[0.3s] hover:bg-[#0056b3]'
          type="submit">Sign up</button>
        <Link to={'/login'}>
          <p className="underline text-center mt-3">
            Already have an account
          </p>
        </Link>
      </form>

      {loading && <Loading />}
      {message && <Message message={message} onClose={() => setMessage('')} />}
    </div>
  );
}
