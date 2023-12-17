"use client";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import LocationInfo from "./LocationInfo";

export default function WorldWeather(props) {
  // 都市
  const cityList = ["Tokyo", "London", "New York", "Moscow", "Sydney", "error"];
  const [city, setCity] = useState(cityList[0]);

  // エラー文
  const messageFirst = <p className="my-20">場所をクリックしてください</p>;
  const messageLoading = (
    <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent my-20"></div>
  );
  const messageError = (
    <p className="my-20">エラーが出ています。もう一度試してください。</p>
  );

  // fetch
  const [isFetch, setIsFetch] = useState(false);
  const fetcherApi = (url) => axios.get(url).catch((res) => res.json());
  const {
    data: weather,
    error,
    isLoading,
  } = useSWR(isFetch ? `/api/${city}/weather` : null, fetcherApi);
  console.log(weather);

  return (
    <>
      {cityList.map((city, index) => (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded"
          key={index}
          onClick={() => {
            setIsFetch(true);
            setCity(city);
          }}
        >
          {city}
        </button>
      ))}
      <div className="max-w-md rounded-lg flex m-3 p-4 border-double border-4 border-indigo-600 justify-center">
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
    </>
  );
}
