"use client";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import LocationInfo from "./LocationInfo";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Map } from "./Map";
import { Marker } from "./Marker";

export default function WorldWeather(props) {
  // 都市
  const cityList = [
    {
      name: "Tokyo",
      lat: 35.6895,
      lng: 139.6917,
    },
    {
      name: "London",
      lat: 51.5085,
      lng: -0.1257,
    },
    {
      name: "New York",
      lat: 40.7143,
      lng: -74.006,
    },
    {
      name: "Moscow",
      lat: 55.7522,
      lng: 37.6156,
    },
    {
      name: "Sydney",
      lat: -33.8679,
      lng: 151.2073,
    },
  ];
  const [city, setCity] = useState(cityList[0].name);

  // エラー文
  const messageFirst = <p className="my-20">場所をクリックしてください</p>;
  const messageLoading = (
    <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent my-20"></div>
  );
  const messageError = (
    <p className="my-20">
      エラーが出ています。
      <br />
      もう一度試してください。
    </p>
  );

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
    lat: 25,
    lng: 139,
  };
  const selectCity = (e) => {
    setIsFetch(true);
    setCity(e);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full h-[65vh]">
        <Wrapper apiKey={mapKey}>
          <Map
            center={mapCenter}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "0.5rem",
            }}
            mapTypeId="satellite"
            zoom={2}
          >
            {cityList.map((city, index) => (
              <Marker
                key={index}
                position={{
                  lat: city.lat,
                  lng: city.lng,
                }}
                selectCity={() => selectCity(city.name)}
              />
            ))}
          </Map>
        </Wrapper>
      </div>
      <div className="mt-6 gap-x-4 w-11/12 max-w-md mx-auto ">
        <div className="w-full p-4 bg-white shadow-lg rounded-2xl">
          <div className="flex flex-wrap text-teal-800 font-bold">
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
