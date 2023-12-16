"use client";

import { useState } from "react";
import Image from "next/image";


export default function WeatherForecast(props) {
  // props
  const flist = props.flist
  console.log(flist);
  // const localTime = props.localTime;
  const localTime = props.localTime

  // icon
  const ficon = flist?.weather[0].icon
  const iconUrl = `https://openweathermap.org/img/wn/${ficon}@2x.png`;
  
  return (
    <li>
      {localTime?.day}<br />
      {localTime?.time}<br />
      <Image
        src={iconUrl}
        width={100}
        height={100}
        alt="天気画像"
      />
      <h3 className="relative w-full flex-none mb-1 font-semibold flex items-center">
        <span className="text-4xl text-amber-500">
          {Math.round(flist?.main.temp_max)}
          <span className="text-3xl">&#8451;</span>
        </span>
        <span className="text-2xl mx-3 text-slate-600">/</span>
        <span className="text-4xl text-sky-500">
          {Math.round(flist?.main.temp_min)}
          <span className="text-3xl">&#8451;</span>
        </span>
      </h3>
    </li>
  );
}