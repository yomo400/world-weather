"use client";

import Image from "next/image";

export default function WeatherForecast(props) {
  // props
  const flist = props.flist;
  const localTime = props.localTime;

  // icon
  const ficon = flist?.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${ficon}@2x.png`;

  return (
    <li className="flex items-center justify-between flex-col py-3 text-gray-600 border-gray-100 dark:text-gray-200 dark:border-gray-800 sm:w-1/5">
      {localTime?.day}
      <br />
      {localTime?.time}
      <br />
      <Image src={iconUrl} width={100} height={100} alt="天気画像" />
      <h3 className="relative w-full flex-none mb-1 font-semibold flex items-center justify-center">
        <span className="text-4xl text-amber-500">
          {Math.round(flist?.main.temp_max)}
          <span className="text-3xl">&#8451;</span>
        </span>
        <span className="text-2xl mx-1.5 text-slate-600">/</span>
        <span className="text-4xl text-sky-500">
          {Math.round(flist?.main.temp_min)}
          <span className="text-3xl">&#8451;</span>
        </span>
      </h3>
      <h4>降水確率{Math.round(flist?.pop * 100)}%</h4>
      <h4>湿度{Math.round(flist?.main.humidity)}%</h4>
      <h4>風速{Math.round(flist?.wind.speed * 10) / 10}m/s</h4>
    </li>
  );
}
