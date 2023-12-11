"use client";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import LocationInfo from "./LocationInfo";

export default function WorldWeather(props) {
  let loc = props.location
  const [ clicker, setClicker ] = useState(false);
  const fetcher = (url) => axios.get(url).catch((res) => res.json());
  const { data, error, isLoading } = useSWR(clicker ? 
    `https://api.openweathermap.org/data/2.5/weather?appid=81265787ad6274ec35fd3d76001294e9&q=${loc}&units=metric&lang=ja` : null, fetcher)

  return (
    <>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setClicker(true)}>
        {loc}
      </button>
      { data ? <LocationInfo info={data?.data} /> : <div>場所をクリックしてね！</div> }
      { isLoading && <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>}
      { error && <div>エラーが出ています。もう一度試してください。</div>}
    </>
  )
}
