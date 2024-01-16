"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import LocationInfo from "./LocationInfo";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Map } from "./Map";
import { Marker } from "./Marker";
import { useWindowSize } from "./useWindowSize";
import { useReadCity } from "./CityContext";
import { useReadMessage } from "./MessageContext";

export default function WorldWeather(props) {
  // city
  const cityList = useReadCity();
  const [city, setCity] = useState();

  // error sentence
  const messages = useReadMessage();
  const messageFirst = messages.first;
  const messageLoading = messages.loading;
  const messageError = messages.error;
  // console.log(messages);

  // WindowSize
  const [width, height] = useWindowSize();
  // console.log(width + ":" + height);

  // fetch
  const [isFetch, setIsFetch] = useState(false);
  const fetcherApi = (url) => axios.get(url).catch((res) => res.json());
  const {
    data: weather,
    error,
    isLoading,
  } = useSWR(isFetch ? `/api/${city}/weather` : null, fetcherApi);
  // console.log(weather);

  // @googlemaps/react-wrapper
  const mapKey = process.env.NEXT_PUBLIC_MAP_KEY;
  const mapCenter = {
    lat: 20,
    lng: 150,
  };
  let zoom;
  width < 640 ? (zoom = 1) : (zoom = 2);
  // Marker clicked
  const selectCity = (e) => {
    setIsFetch(true);
    setCity(e);
  };
  // Any points clicked
  // Coordinates from GoogleMap →
  // Coordinates to reverseGeocoding  from openweather →
  // yes→ weather from openweather using city
  //  no→ weather from openweather using Coordinate
  const [latLng, setLatLng] = useState();
  // const getCoordinates = new Promise(function (resolve, reject, e) {
  //   setLatLng(e);
  // });
  // getCoordinates.then(console.log(latLng));
  const getCoordinates = (e) => {
    setLatLng(e);
    latLng ? console.log(latLng) : console.log("none");
  };

  return (
    <div className="sm:p-4">
      <header className="z-40 w-full bg-white shadow-lg sm:rounded-2xl rounded-b-xl sticky md:top-2">
        <div className="flex mx-auto flex-center">
          <div className="flex flex-wrap items-baseline w-full p-4 lg:max-w-68 sm:ml-0">
            <div className="left-0 z-50 flex">
              <h2 className="text-3xl font-bold text-teal-800 mr-5">
                World-Weather
              </h2>
            </div>
          </div>
        </div>
      </header>
      <div className="w-11/12 sm:w-full mx-auto">
        <div className="w-full aspect-square sm:aspect-[9/4] mt-6 bg-white shadow-lg rounded-2xl">
          <Wrapper apiKey={mapKey}>
            <Map
              center={mapCenter}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "1rem",
              }}
              mapTypeId="satellite"
              zoom={zoom}
              setLatLng={(e) => getCoordinates(e)}
            >
              {cityList.map((city, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: city.lat,
                    lng: city.lng,
                  }}
                  selectCity={() => selectCity(city.name)}
                  cityName={city.name}
                />
              ))}
            </Map>
          </Wrapper>
        </div>
        <div className="mt-6 mb-2 max-w-lg mr-auto">
          <div className="w-full px-4 py-6 bg-white shadow-lg rounded-2xl">
            {error ? (
              messageError
            ) : isLoading ? (
              messageLoading
            ) : weather ? (
              <LocationInfo info={weather?.data.res} />
            ) : (
              messageFirst
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
