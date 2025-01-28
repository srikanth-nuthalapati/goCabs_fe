import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, Marker, OverlayView, OverlayViewF, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { StateContext } from '../../context/StateContext';
import carImage from '/carImages/mini.png';
import autoImage from '/carImages/auto.png';
import bikeImage from '/carImages/bike.png';

export default function GoogleMapComp() {

  const [mapLoaded, setMapLoaded] = useState(false);
  const { pickup, dropoff, pickupCoordinates, dropoffCoordinates, distance, setDistance, duration, setDuration } = useContext(StateContext);
  const [directions, setDirections] = useState(null);
  const [vehiclePoint, setVehiclePoint] = useState(null);
  const [center, setCenter] = useState({
    lat: 17.3616,
    lng: 78.4747,
  });

  const containerStyle = { width: '100%', height: '100%', };


  useEffect(() => {
    setMapLoaded(true);
  }, []);

  const roundIcon = {
    url: "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" fill="black" />
          <circle cx="12" cy="12" r="3" fill="white" stroke="black" stroke-width="2" />
        </svg>`
      ),
    scaledSize: { width: 24, height: 24 },
  };

  const squareIcon = {
    url: "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <rect x="6" y="6" width="14" height="14" fill="black" />
          <rect x="10" y="10" width="6" height="6" fill="white" stroke="black" stroke-width="2" />
        </svg>`
      ),
    scaledSize: { width: 24, height: 24 },
  };

  function getVehicleCoor(lat, lon, distance, direction) {
    const earthRadius = 6371;

    const latRad = (lat * Math.PI) / 180;
    const lonRad = (lon * Math.PI) / 180;

    const directionRad = (direction * Math.PI) / 180;
    const newLatRad = Math.asin(
      Math.sin(latRad) * Math.cos(distance / earthRadius) +
      Math.cos(latRad) * Math.sin(distance / earthRadius) * Math.cos(directionRad)
    );

    const newLonRad =
      lonRad +
      Math.atan2(
        Math.sin(directionRad) * Math.sin(distance / earthRadius) * Math.cos(latRad),
        Math.cos(distance / earthRadius) - Math.sin(latRad) * Math.sin(newLatRad)
      );

    const newLat = (newLatRad * 180) / Math.PI;
    const newLon = (newLonRad * 180) / Math.PI;

    return { lat: newLat, lng: newLon };
  }

  useEffect(() => {
    if (pickupCoordinates !== null) {
      setCenter({
        lat: pickupCoordinates.lat,
        lng: pickupCoordinates.lng,
      });
      let car = getVehicleCoor(pickupCoordinates.lat, pickupCoordinates.lng, 0.6, 0)
      let auto = getVehicleCoor(pickupCoordinates.lat, pickupCoordinates.lng, 0.6, 90);
      let bike = getVehicleCoor(pickupCoordinates.lat, pickupCoordinates.lng, 0.6, 270);
      setVehiclePoint({
        car: car,
        auto: auto,
        bike: bike
      });
    }
  }, [pickupCoordinates]);


  useEffect(() => {
    if (dropoffCoordinates !== null) {
      setCenter({
        lat: dropoffCoordinates.lat(),
        lng: dropoffCoordinates.lng(),
      })
    }
  }, [dropoffCoordinates]);


  useEffect(() => {
    if (pickupCoordinates && dropoffCoordinates) {
      setDirections(null);
    }
  }, [pickupCoordinates, dropoffCoordinates]);

  const handleDirections = (response) => {
    if (response) {
      setDirections(response);
      const leg = response.routes[0].legs[0];
      setDistance(leg.distance.text);
      setDuration(leg.duration.text);
    }
  }


  const carIcon = {
    url: carImage,
    scaledSize: { width: 80, height: 80 },
  }
  const autoIcon = {
    url: autoImage,
    scaledSize: { width: 80, height: 80 },
  }
  const bikeIcon = {
    url: bikeImage,
    scaledSize: { width: 80, height: 80 },
  }


  return (
    <div className="map-container h-[inherit] w-[inherit]">
      {mapLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {pickupCoordinates && pickup && (
            <>
            <Marker position={pickupCoordinates} icon={roundIcon} >
              <OverlayViewF position={pickupCoordinates} mapPaneName={OverlayView.MARKER_LAYER}>
                <div className='w-full h-[35px] font-bold flex items-center justify-between bg-white'>
                  {duration && (
                    <span className='bg-black text-white text-center px-1 h-[inherit] flex items-center'>
                      {duration}
                    </span>
                  )}
                  <p className='text-black bg-white text-[16px] px-4'>{pickup}</p>
                </div>
              </OverlayViewF>
            </Marker> 

            {vehiclePoint && (
              <>
              <Marker position={vehiclePoint.car} icon={carIcon} />
              <Marker position={vehiclePoint.auto} icon={autoIcon} />
              <Marker position={vehiclePoint.bike} icon={bikeIcon} />
              </>
            )}
            </>
          )}

          {dropoffCoordinates && dropoff && (
            <Marker position={dropoffCoordinates} icon={squareIcon}>
              <OverlayViewF position={dropoffCoordinates} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                <div className='w-full h-[35px] font-bold flex items-center justify-between bg-white'>
                  {distance && (
                    <span className='bg-black text-white text-center px-1 h-[inherit] flex items-center'>
                      {distance}
                    </span>
                  )}
                  <p className='text-black bg-white text-[16px] px-4'>
                    {dropoff}
                  </p>
                </div>
              </OverlayViewF>
            </Marker>
          )}

          {pickupCoordinates && dropoffCoordinates && !directions && (
            <DirectionsService
              options={{
                origin: pickupCoordinates,
                destination: dropoffCoordinates,
                travelMode: google.maps.TravelMode.DRIVING
              }}
              callback={handleDirections}
            />
          )}

          {directions && pickup && dropoff && (
            <DirectionsRenderer
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: '#000',
                  strokeOpacity: 1,
                  strokeWeight: 2
                }
              }}
              directions={directions}
            />
          )}
        </GoogleMap>
      )}
    </div>
  );
}
