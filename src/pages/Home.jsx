import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../context/StateContext';
import Suggestions from '../components/layout/Suggestions';
import LoginSuggestion from '../components/layout/LoginSuggestion';
import { lazy, Suspense } from 'react'
const GoogleMapComp = lazy(() => import('../components/maps/GoogleMapomp'));
import ModeSelector from '../components/common/ModeSelector';
import InputField from '../components/common/InputField';
import DateTime from '../components/common/DateTime';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/ui/ScrollToTop';

export default function Home() {
  const navigate = useNavigate();
  const { mode, setMode, isAuthenticated } = useContext(StateContext);

  useEffect(() => {
    const user = localStorage.getItem('isAuthenticated');
    if (user) {
      navigate('/ride');
    }
  }, [])

  const handleMode = (selectedMode) => {
    setMode(selectedMode);
  };

  const seePrices = () => {
    navigate('/login')
  }

  return (
    <>
      <div className="container  w-[100%] lg:w-full lg:m-auto lg:py-[20px] p-[20px]">
        <div className="wrapper flex w-[100%] py-[20px]">

          <div className="left w-[70%] sm:pl-[10px] pr-[10px]">
            <div className="caption lg:text-[2.7rem] font-bold mb-[20px]">
              <h1>{mode === 'ride' ? 'Go anywhere with goCabs' : 'Deliver a package'} </h1>
            </div>
            <ModeSelector mode={mode} handleMode={handleMode} />
            <InputField />
            {mode === 'ride' && <DateTime />}
            <button onClick={seePrices} className="bg-black text-white px-[15px] py-[10px] my-4 rounded">See prices</button>
          </div>

          <div className="right hidden lg:block w-[100%] h-[600px] p-2 lg:pl-[50px]">
            <Suspense fallback={<div>Loading map...</div>}>
              <GoogleMapComp />
            </Suspense>
          </div>

        </div>
      </div>
      {!isAuthenticated && (
        <>
          <ScrollToTop />
          <Suggestions />
          <LoginSuggestion />
          <Footer />
        </>
      )}
    </>
  );
}
