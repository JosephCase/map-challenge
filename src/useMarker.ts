import { useEffect, useRef } from "react";

// represent an address as a marker on a map
const useMarker = (
  map: google.maps.Map<never> | null,
  address: { latitude?: number; longitude?: number },
  icon: string
) => {
  const markerRef = useRef(new google.maps.Marker({ icon }));

  // set the map
  useEffect(() => {
    markerRef.current.setMap(map);
  }, [map]);

  // set the position
  useEffect(() => {
    if (address.longitude && address.latitude) {
      markerRef.current.setPosition({
        lat: address.latitude,
        lng: address.longitude,
      });
    } else {
      markerRef.current.setPosition(null);
    }
  }, [address]);

  return markerRef.current;
};

export default useMarker;