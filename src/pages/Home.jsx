
import '../styles/home.css';
import { useContext, useState } from 'react';
import { StateContext } from '../context/StateContext';
import Suggestions from '../components/Suggestions';
import LoginSuggestion from '../components/LoginSuggestion';
import DateTime from '../components/DateTime';

export default function Home() {

  const { mode, setMode, pickup, setPickup, dropoff, setDropoff} = useContext(StateContext);

  const handleMode = (selectedMode) => {
    setMode(selectedMode);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "pickup") {
      setPickup(value);
    }
    else if (name === "dropoff") {
      setDropoff(value);
    }
  }  

  return (
    <>
      <div className="container p-[20px] w-[100%]">
        <div className="wrapper flex p-[30px] w-100 justify-between">
          <div className="left px-7">
            <div className="caption">
              <h1>{mode === 'ride' ? 'Go anywhere with goCabs' : 'Deliver a package'} </h1>
            </div>

            <div className="modes flex justify-between w-[200px]">
              <div className={`ride ${mode !== 'ride' ? 'opacity-[0.6]' : ''} hover:opacity-[1] cursor-pointer`} onClick={() => handleMode('ride')}>
                <button className={`${mode === 'ride' ? 'bg-neutral-400' : ''} rounded`}>
                  <i className='bx bxs-car'></i>
                </button>
                <p>Ride</p>
              </div>
              <div className={`courier cursor-pointer ${mode === 'ride' ? 'opacity-[.6]' : ''} hover:opacity-[1]`} onClick={() => handleMode('courier')}>
                <button className={`${mode !== 'ride' ? 'bg-neutral-400' : ''} rounded`}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z" /></svg>
                </button>
                <p>courier</p>
              </div>
            </div>

            <div className="input-container my-7 w-[350px] h-auto flex flex-col gap-4 justify-between relative">
              <div className="hor-line"></div>
              <div className="pickup-box">
                <svg className='dot' width="20" height="20" viewBox="0 0 24 24" fill="none" ><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" fill="currentColor"></path></svg>
                <input type="text" placeholder="Pickup location" name='pickup' value={pickup} onChange={(e) => handleChange(e)} />
                <span>
                  {pickup.length === 0 ? (
                    <svg className='location-symbol' width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" aria-label="Pickup location" role="button" tabIndex="0"><path d="M10.5 13.5.5 11 21 3l-8 20.5-2.5-10Z" fill="currentColor"></path></svg>

                  ) : (
                    <i className='bx bxs-x-circle cursor-pointer mt-2' onClick={() => setPickup('')}></i>
                  )
                  }
                </span>
              </div>

              <div className="drop-box">
                <svg className='dot' width="20" height="20" viewBox="0 0 24 24" fill="none"><title>search</title><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" fill="currentColor"></path></svg>
                <input type="text" placeholder={mode==='ride' ? 'Drop location' : 'Delivery location'} name='dropoff' value={dropoff} onChange={(e) => handleChange(e)} />
                <span>
                  {dropoff.length !== 0 && (
                    <i className='bx bxs-x-circle cursor-pointer mt-2' onClick={() => setDropoff('')}></i>
                  )}
                </span>
              </div>

              {mode === 'ride' && (
                <DateTime />
              )}

            </div>

            <button className='bg-black text-white px-[15px] py-[10px] rounded'>See prices</button>
          </div>

          <div className="right">
            <div className="map-container">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15452.334618546844!2d79.99759085000001!3d14.479885649999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1737106840216!5m2!1sen!2sin" width="600" height="700" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
        <Suggestions />
        <LoginSuggestion />
    </>
  )
}
