"use client";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import LocationInfo from "./LocationInfo";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Map } from "./Map";
import { Marker } from "./Marker";
import { useWindowSize } from "./useWindowSize";
import { useDataContext } from "./DataContext";

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
    {
      name: "Johannesburg",
      lat: -26.2023,
      lng: 28.0436,
    },
    {
      name: "New Delhi",
      lat: 28.6128,
      lng: 77.2311,
    },
    {
      name: "Hawaii",
      lat: 20.7503,
      lng: -156.5003,
    },
    {
      name: "Buenos Aires",
      lat: -34.6132,
      lng: -58.3772,
    },
    {
      name: "Vancouver",
      lat: 49.2497,
      lng: -123.1193,
    },
    {
      name: "Error",
      lat: 12,
      lng: 150,
    },
  ];
  const { data, setData } = useDataContext();
  // const cityList = cdata.cityList;
  console.log(data);
  const [city, setCity] = useState();

  // エラー文
  const messageFirst = (
    <p className="my-20 text-center text-teal-500">
      場所をクリックしてください
    </p>
  );
  const messageLoading = (
    <div className="animate-spin h-16 w-16 border-8 border-teal-500 rounded-full border-t-transparent my-16 mx-auto" />
  );
  const messageError = (
    <p className="my-20 text-center text-teal-500">
      エラーが出ています。
      <br />
      もう一度試してください。
    </p>
  );

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
  const selectCity = (e) => {
    setIsFetch(true);
    setCity(e);
  };
  let zoom;
  width < 640 ? (zoom = 1) : (zoom = 2.3);

  return (
    <div className=" sm:p-4">
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
        <div className="w-full aspect-square sm:aspect-[9/4] mt-6">
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
        <div className="my-6 max-w-lg mr-auto">
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
