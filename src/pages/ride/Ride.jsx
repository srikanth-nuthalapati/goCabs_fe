import React, { useContext, useState } from 'react'
import InputField from '../../components/common/InputField'
import DateTime from '../../components/common/DateTime'
import { lazy, Suspense } from 'react'
const GoogleMapComp = lazy(() => import('../../components/maps/GoogleMapomp'));
import { StateContext } from '../../context/StateContext';
import CarListOptions from '../../components/carlist/CarListOptions';

export default function Ride() {

  const { pickup, dropoff, selectedDate, selectedTime, distance, isAuthenticated } = useContext(StateContext);
  const [displayCar, setDisplayCar] = useState(false);

  const handleSearch = () => {
    setDisplayCar(true);
  }


  return (
    <div className='ride-container flex flex-col lg:flex-row lg:p-[20px] lg:h-[85vh] h-[100%] w-[100%]'>
      <div className={`ride-left w-[100%] h-[100] px-4  ${displayCar ? 'lg:w-[80%]':''}`}>
        <div className="content py-3">
          <h1 className='font-bold text-[30px]'>Get a Ride</h1>
        </div>
        <InputField />
        <DateTime />
        <button
          disabled={pickup === "" || dropoff === "" || selectedDate === null || selectedTime === ""}
          className={`w-[100%] bg-black text-white hover:bg-opacity-90 rounded-lg py-2 text-center ${pickup === "" || dropoff === "" || selectedDate === null || selectedTime === "" ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          type="submit"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="caroptions my-[30px] w-[inherit] md:px-3">
        {displayCar && pickup && dropoff && (<CarListOptions distance={Number(distance.replace(',', '').split(' ')[0])} />)}
      </div>

      <div className={`ride-right mb-[30px] w-[100%] h-[80vh] lg:w-[850px]  px-5 flex ${displayCar ? 'lg:w-[380px]':''}`}>
        <Suspense fallback={<div>Loading map...</div>}>
          <GoogleMapComp />
        </Suspense>
      </div>
    </div>
  )
}
