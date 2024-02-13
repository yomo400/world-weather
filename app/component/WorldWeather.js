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
  // 都市
  const cityList = useReadCity();

  // エラー文
  const messages = useReadMessage();
  const messageFirst = messages.first;
  const messageLoading = messages.loading;
  const messageError = messages.error;
  // console.log(messages);

  // WindowSize
  const [width, height] = useWindowSize();
  // console.log(width + ":" + height);

  // Coordinates from GoogleMap →
  // weather from openweather using Coordinate →
  // Coordinates to reverseGeocoding  from openweather →
  // yes → name from openweather using city → detail true
  //  no → no name error → detail false

  // Coordinates
  const [latLng, setLatLng] = useState();
  const lat = latLng?.lat;
  const lng = latLng?.lng;
  const getCoordinates = (e) => {
    setLatLng(e);
  };

  // Weather fetch
  const [weatherFetch, setWeatherFetch] = useState(false);
  const fetcherApi = (url) => axios.get(url).catch((res) => res.json());
  const {
    data: weather,
    error: weatherError,
    isLoading,
  } = useSWR(
    weatherFetch ? `/api/weather?lat=${lat}&lon=${lng}` : null,
    fetcherApi,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount >= 1) return;
      },
    }
  );
  // /api/${city}/weather

  // address fetch
  const [addressFetch, setAddressFetch] = useState(false);
  const {
    data: address,
    error: addressError,
    isLoading: addressLoading,
  } = useSWR(
    addressFetch ? `api/geo?lat=${lat}&lon=${lng}` : null,
    fetcherApi,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount >= 1) return;
      },
    }
  );

  let geoCity;
  useEffect(() => {
    // console.log(latLng);
    setAddressFetch(true);
  }, [latLng]);
  useEffect(() => {
    geoCity = address?.data.res[0]?.name;
    // console.log(geoCity);
  }, [address]);

  // @googlemaps/react-wrapper
  const mapKey = process.env.NEXT_PUBLIC_MAP_KEY;
  const mapCenter = {
    lat: 20,
    lng: 150,
  };
  let zoom;
  width < 640 ? (zoom = 1) : (zoom = 2);
  // Marker clicked
  useEffect(() => {
    // console.log(city);
    if (latLng) {
      setWeatherFetch(true);
    }
  }, [latLng]);

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
              getCoordinates={(e) => {
                getCoordinates(e);
              }}
            >
              {cityList.map((city, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: city.coordinates.lat,
                    lng: city.coordinates.lng,
                  }}
                  setCity={() => setLatLng(city.coordinates)}
                  cityName={city.name}
                />
              ))}
            </Map>
          </Wrapper>
        </div>
        <div className="mt-6 mb-2 max-w-md mr-auto">
          <div className="w-full px-4 py-4 bg-white shadow-lg rounded-2xl">
            {weatherError ? (
              //   messageCityError
              // ) : addressError ? (
              messageError
            ) : isLoading ? (
              messageLoading
            ) : weather ? (
              <LocationInfo info={weather?.data.res} latLng={latLng} />
            ) : (
              messageFirst
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
