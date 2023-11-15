import { useEffect, useState } from "react";

import Error from "./Error.jsx";
import Places from "./Places.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchPlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    async function getPlaces() {
      try {
        const places = await fetchPlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
        });

        setAvailablePlaces(data.places);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsFetching(false);
      }
    }

    getPlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="loading places...."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
