import '../styles/home.css';
import { useContext, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { StateContext } from '../context/StateContext';
import Suggestions from '../components/Suggestions';
import LoginSuggestion from '../components/LoginSuggestion';
import GoogleMapComp from '../components/GoogleMapomp';
import ModeSelector from '../components/ModeSelector';
import InputField from '../components/InputField';
import DateTime from '../components/DateTime';
import { useNavigate } from 'react-router-dom';

const libraries = ['places'];

export default function Home() {
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState('');
  const { mode, setMode, pickup, setPickup, dropoff, setDropoff } = useContext(StateContext);

  const handleMode = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });

          if (window.google && window.google.maps) {
            const geocoder = new window.google.maps.Geocoder();
            const latLng = { lat: latitude, lng: longitude };

            geocoder.geocode({ location: latLng }, (results, status) => {
              if (status === 'OK' && results[0]) {
                setPickup(results[0].formatted_address); // Set the formatted address
              } else {
                console.error('Geocoder failed due to:', status);
                setPickup(`Lat: ${latitude}, Lng: ${longitude}`); // Fallback to coordinates
              }
            });
          } else {
            console.error('Google Maps API is not loaded.');
            alert('Google Maps API is not available. Please try again later.');
          }
        },
        (error) => {
          console.error('Error getting current location:', error);
          alert('Unable to retrieve location. Please enable location access in your browser.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'pickup') {
      setPickup(value);
    } else if (name === 'dropoff') {
      setDropoff(value);
    }
  };

  const seePrices = () => {
    navigate('/login')
  }

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY} libraries={libraries}>
      <div className="container p-[20px] w-[100%]">
        <div className="wrapper flex p-[30px] w-100 justify-between">
          <div className="left px-7 ml-3">
            <div className="caption">
              <h1>{mode === 'ride' ? 'Go anywhere with goCabs' : 'Deliver a package'} </h1>
            </div>
            <ModeSelector mode={mode} handleMode={handleMode} />
            <InputField
              mode={mode}
              pickup={pickup}
              dropoff={dropoff}
              handleChange={handleChange}
              handleGetCurrentLocation={handleGetCurrentLocation}
              setPickup={setPickup}
              setDropoff={setDropoff}
              setCoordinates={setCoordinates}
            />
            {mode === 'ride' && <DateTime />}
            <button onClick={seePrices} className="bg-black text-white px-[15px] py-[10px] rounded">See prices</button>
          </div>

          <div className="right w-[65%] h-[600px] p-2">
            <GoogleMapComp coordinates={coordinates} />
          </div>
        </div>
      </div>
      <Suggestions />
      <LoginSuggestion />
    </LoadScript>
  );
}
