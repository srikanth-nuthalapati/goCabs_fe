import React, { useContext, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { StateContext } from '../../context/StateContext';

export default function InputField() {
  const pickupAutocomplete = useRef(null);
  const dropoffAutocomplete = useRef(null);
  let { mode, pickup, dropoff, setPickup, setDropoff, pickupCoordinates, setPickupCoordinates, dropoffCoordinates, setDropoffCoordinates, isAuthenticated } = useContext(StateContext);

  const handlePlaceSelected = (autocomplete, type) => {
    const place = autocomplete.getPlace();
    if (place && place.geometry) {
      const location = place.geometry.location;
      const placeName = place.name || place.formatted_address; 
      if (type === 'pickup') {
        setPickup(placeName);
        setPickupCoordinates({
          lat: location.lat(),
          lng: location.lng(),
        });
      } else if (type === 'dropoff') {
        setDropoff(placeName);
        setDropoffCoordinates(location);
      }
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

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
  
          if (window.google && window.google.maps) {
            const geocoder = new window.google.maps.Geocoder();
            const latLng = { lat: latitude, lng: longitude };
  
            geocoder.geocode({ location: latLng }, (results, status) => {
              if (status === 'OK' && results[0]) {
                setPickup(results[0].formatted_address); // Set the formatted address
                setPickupCoordinates({ lat: latitude, lng: longitude }); // Set the coordinates
              } else {
                console.error('Geocoder failed due to:', status);
                setPickup(`Lat: ${latitude}, Lng: ${longitude}`); // Fallback to coordinates
                setPickupCoordinates({ lat: latitude, lng: longitude }); // Set coordinates as fallback
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

  return (
    <div className={`input-container h-auto flex flex-col gap-4 justify-between relative ${isAuthenticated ? 'w-[100%] lg:w-[400px]':'w-[100%] lg:w-[75%]'}`}>
        <div className="h-[35%] absolute top-[30px] left-[20px] border-l-[1px] border-l-black"></div>
      <div 
        className="pickup-box rounded-md py-[8px] px-[5px] flex items-center bg-[rgba(201,198,198,0.5)]">
        <svg className="dot mx-[5px] w-[20px]" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" fill="currentColor"></path>
        </svg>
        <Autocomplete
          onLoad={(autocomplete) => (pickupAutocomplete.current = autocomplete)}
          onPlaceChanged={() => handlePlaceSelected(pickupAutocomplete.current, 'pickup')}
        >
          <input
            className='bg-transparent w-[100%] outline-none lg:w-[180%]'
            type="text"
            placeholder="Pickup location"
            name="pickup"
            value={pickup}
            onChange={handleChange}
          />
        </Autocomplete>
        <span className='ml-auto mr-2'>
          {pickup.length === 0 ? (
            <svg
              className="location-symbol cursor-pointer"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
              fill="none"
              onClick={handleGetCurrentLocation}
            >
              <path d="M10.5 13.5.5 11 21 3l-8 20.5-2.5-10Z" fill="currentColor"></path>
            </svg>
          ) : (
            <i className="bx bxs-x-circle cursor-pointer mt-2 ml-3" onClick={() => setPickup('')}></i>
          )}
        </span>
      </div>

      <div className="drop-box rounded-md py-[8px] px-[5px] flex items-center bg-[rgba(201,198,198,0.5)]">
        <svg className="m-[5px]" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M17 7H7v10h10V7Z" fill="currentColor"></path>
        </svg>
        <Autocomplete
          onLoad={(autocomplete) => (dropoffAutocomplete.current = autocomplete)}
          onPlaceChanged={() => handlePlaceSelected(dropoffAutocomplete.current, 'dropoff')}
        >
          <input
            className='outline-none w-[100%] lg:w-[180%] bg-transparent'
            type="text"
            placeholder={mode === 'ride' ? 'Drop location' : 'Delivery location'}
            name="dropoff"
            value={dropoff}
            onChange={handleChange}
          />
        </Autocomplete>
        <span className='ml-auto mr-2'>
          {dropoff.length !== 0 && (
            <i className="bx bxs-x-circle cursor-pointer mt-2" onClick={() => setDropoff('')}></i>
          )}
        </span>
      </div>
    </div>
  );
}
