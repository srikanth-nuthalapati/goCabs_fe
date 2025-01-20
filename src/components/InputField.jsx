import React, { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import '../styles/inputfield.css';

export default function InputField({ mode, pickup, dropoff, handleChange, handleGetCurrentLocation, setPickup, setDropoff, setCoordinates }) {
  const pickupAutocomplete = useRef(null);
  const dropoffAutocomplete = useRef(null);

  const handlePlaceSelected = (autocomplete, type) => {
    const place = autocomplete.getPlace();
    if (place && place.geometry) {
      const location = place.geometry.location;
      if (type === 'pickup') {
        setPickup(place.formatted_address);
        setCoordinates({ lat: location.lat(), lng: location.lng() });
      } else if (type === 'dropoff') {
        setDropoff(place.formatted_address);
      }
    }
  };

  return (
    <div className="input-container my-7 w-[350px] h-auto flex flex-col gap-4 justify-between relative">
        <div className="hor-line"></div>
      <div className="pickup-box">
        <svg className="dot" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" fill="currentColor"></path>
        </svg>
        <Autocomplete
          onLoad={(autocomplete) => (pickupAutocomplete.current = autocomplete)}
          onPlaceChanged={() => handlePlaceSelected(pickupAutocomplete.current, 'pickup')}
        >
          <input
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
              className="location-symbol"
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

      <div className="drop-box">
        <svg className="dot" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M17 7H7v10h10V7Z" fill="currentColor"></path>
        </svg>
        <Autocomplete
          onLoad={(autocomplete) => (dropoffAutocomplete.current = autocomplete)}
          onPlaceChanged={() => handlePlaceSelected(dropoffAutocomplete.current, 'dropoff')}
        >
          <input
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
