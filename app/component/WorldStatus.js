"use client";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";

export default function WorldStatus() {
  const [ should, setShould ] = useState(false);
  const fetcher = (url) => axios.get(url).catch((res) => res.json());
  // let should = false;
  const { data, error, isLoading } = useSWR(should ? 
    "https://api.openweathermap.org/data/2.5/weather?appid=81265787ad6274ec35fd3d76001294e9&lat=35.6828387&lon=139.7594549" : null,
    fetcher
  )
  if (error) return <div>An error has occurred.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (data) {
    console.log(data);
  }

  return (
    <>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShould(true)}>
        Tokyo
      </button>
      <div className="flex min-h-full items-stretch justify-evenly text-center md:items-center md:px-2 lg:px-4">
        <img src="" alt="天気画像" className="" />
        <div className="">
          <h3 className="">{should && data.data.name}</h3>
        </div>
      </div>
    </>
  )
   
}
