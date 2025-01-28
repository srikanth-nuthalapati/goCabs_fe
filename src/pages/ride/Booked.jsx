import React from 'react'
import carImage from '/car_ani.gif';
import { Link } from 'react-router-dom';

export default function Booked() {
  return (
    <div className='success-container flex justify-center items-center w-[100%]'>
      <div className="success-content w-[60%] text-center">
        <h1 className='text-[30px] text-center font-semibold py-3'>Booking Confirmed!</h1>
        <div className='w-[100%] flex justify-center mb-3'>
          <img width={450} height={200} src={carImage} alt='car gif' />
        </div>
        <p className='text-[24px]'>Your ride is on the way. Thank you for choosing our service!</p>
        <Link to={'/'}>
          <button className='bg-black text-white py-2 px-4 rounded-lg mt-2 hover:bg-[rgb(22,22,22)]'>Home</button>
        </Link>
      </div>
    </div>
  )
}
