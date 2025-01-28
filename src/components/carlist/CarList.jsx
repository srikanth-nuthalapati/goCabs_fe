import React, { useState } from 'react'

export default function CarList({ car, distance }) {
  
  return (
    <div className='flex lg:justify-between md:justify-around justify-between items-center pr-3'>
      <img width={100} src={car.image} alt={car.name} />
      <div className='w-[200px]'>
        <div className='flex items-center gap-2'>
        <p>{car.name}</p>
        <span className='flex items-center text-[15px]'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 mr-1">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
        </svg>{car.seat}
        </span>
        </div>
        <small className='text-[13px]'>{car.desc}</small>

      </div>
      <span className='ml-2'>₹{(car.amount * distance).toFixed('1')}</span>
    </div>
  )
}
