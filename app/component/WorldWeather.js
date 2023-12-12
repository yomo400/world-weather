"use client";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import LocationInfo from "./LocationInfo";

export default function WorldWeather(props) {
  const cityList = [
    "Tokyo",
    "London",
    "New York",
    "Moscow",
    "Sydney",
    "error"
  ]
  const [city, setCity] = useState(cityList[0])
  const [message, setMessage] = useState(<div>場所をクリックしてね！</div>)
  // const loading = () => setMessage(<div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>)
  // const err = () => setMessage(<div>エラーが出ています。もう一度試してください。</div>)
  const [ isFetch, setIsFetch ] = useState(false);
  const fetcher = (url) => axios.get(url).catch((res) => res.json());
  const { data, error, isLoading } = useSWR(isFetch ? 
    `https://api.openweathermap.org/data/2.5/weather?appid=81265787ad6274ec35fd3d76001294e9&q=${city}&units=metric&lang=ja` : null, fetcher)

  return (
    <>
      {cityList.map((city, index) => (
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded"
          key={index}
          onClick={() => {
            setIsFetch(true)
            setCity(city)
        }}>
          {city}
        </button>
      ))}
      <div className="max-w-md rounded-lg flex m-3 p-4 border-double border-4 border-indigo-600">
        { data ? <LocationInfo info={data?.data} /> : message }
        { isLoading && <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>}
        { error && <div>エラーが出ています。もう一度試してください。</div>}
      </div>
    </>
  )
}
