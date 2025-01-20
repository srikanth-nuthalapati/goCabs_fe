import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

export default function GoogleMapComp({ coordinates }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  const defaultCenter = {
    lat: 17.3616,
    lng: 78.4747,
  };

  const containerStyle = {
    width: '100%',
    height: '600px',
  };

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  return (
    <div className="map-container">
      {mapLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coordinates || defaultCenter}
          zoom={coordinates ? 16 : 12}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={coordinates || defaultCenter} />
        </GoogleMap>
      )}
    </div>
  );
}
