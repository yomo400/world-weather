"use client";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import LocationInfo from "./LocationInfo";

export default function WorldWeather() {
  const [ clicker, setClicker ] = useState(false);
  const fetcher = (url) => axios.get(url).catch((res) => res.json());
  const { data, error, isLoading } = useSWR(clicker ? 
    "https://api.openweathermap.org/data/2.5/weather?appid=81265787ad6274ec35fd3d76001294e9&lat=35.689499&lon=139.691711" : null,
    fetcher
  )
  if (error) return <div>An error has occurred.</div>;
  if (isLoading) return <div>Loading...</div>;
  // if (data) {
  //   console.log(data);
  // }

  return (
    <>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setClicker(true)}>
        Tokyo
      </button>
      <LocationInfo info={data?.data} />
    </>
  )
}
