import { useEffect, useState } from 'react';

const CheckLocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl p-4 max-w-md w-full mb-3">
        <h1 className="text-3xl font-bold ">Check Location</h1>
      </div>{' '}
      {location.latitude && location.longitude && (
        <div className="bg-white rounded-3xl shadow-xl p-6 max-w-md w-full mt-3">
          <p className="text-lg text-gray-600">Latitude: {location.latitude}</p>
          <p className="text-lg text-gray-600">
            Longitude: {location.longitude}
          </p>
        </div>
      )}
    </>
  );
};
export default CheckLocation;
