import React, { useState } from 'react'
import cars from '../../cardata'
import CarList from './CarList';
import { useNavigate } from 'react-router-dom';

export default function CarListOptions({ distance }) {

  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const navigate = useNavigate();


  return (
    <div className='w-[inherit] h-[inherit] px-2 md:px-3 p-t-2 lg:overflow-y-scroll'>
      <h1 className='font-bold text-[30px] pl-3'>Choose a ride</h1>
      <h2 className='font-semibold text-[24px] pb-3 pl-3'>Recomended</h2>
      {cars.map((item,index) => (
        <div key={index} onClick={() => {setActiveIndex(index); setSelectedCar(item)}
        } className={`cursor-pointer
          ${activeIndex == index? 'border-black border-[2px] rounded': null}
        `}>
          <CarList car={item} distance={distance} />
        </div>
      ))}

      {selectedCar? (
        <div className='flex justify-center fixed z-10 bottom-3 bg-white'>
        <button onClick={() => navigate('/payment', {state: {car: selectedCar, amount: selectedCar.amount * distance}})} className='bg-black p-3 text-white rounded-lg'>Request {selectedCar?.name}</button>
      </div>
      ) : null}
    </div>
  )
}
