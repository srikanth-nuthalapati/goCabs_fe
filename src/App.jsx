import { Route, Routes } from 'react-router-dom'
import { StateContext } from './context/StateContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { LoadScript } from '@react-google-maps/api'
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Header from './components/layout/Header'
import Home from './pages/Home'
import Ride from './pages/ride/Ride'
import Profile from './pages/Profile'
import Payment from './pages/ride/Payment'
import Booked from './pages/ride/Booked'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import Otp from './pages/Auth/Otp'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetOtp from './pages/Auth/ResetOtp'
import ResetPassword from './pages/Auth/ResetPassword'
import './index.css';
import { useContext } from 'react';

const config = {
  libraries: ['places', 'geometry'],
}


function App() {

  const { isAuthenticated, passwordResetInitiated, otpVerified } = useContext(StateContext);

  return (
    <>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY} libraries={config.libraries}>

        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            <Route path='/ride' element={<ProtectedRoute> <Ride /> </ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
            <Route path='/payment' element={<ProtectedRoute> <Payment /> </ProtectedRoute>} />
            <Route path='/booked' element={<ProtectedRoute> <Booked /> </ProtectedRoute>} />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path='/reset-otp' element={<ResetOtp />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/signup/otp' element={<Otp />} />
          </Routes>
        </GoogleOAuthProvider>
      </LoadScript>
    </>
  )
}

export default App
