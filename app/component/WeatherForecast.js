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
    <li className="sm:max-w-[11rem] flex items-center justify-between flex-col mb-8 text-gray-600 border-gray-100 sm:w-1/5">
      <h3 className="flex items-center w-full h-full group pl-6 sm:pl-0 sm:justify-center text-teal-800 font-semibold">
        <p className="mx-2">{localTime?.day}</p>
        <span>-</span>
        <p className="mx-2">{localTime?.time}</p>
      </h3>
      <div className="flex w-full justify-evenly items-center sm:flex-col">
        <div className="flex flex-col items-center">
          <Image
            src={iconUrl}
            width={100}
            height={100}
            alt="天気画像"
            className="drop-shadow-lg"
          />
          <div className="relative w-full flex-none mb-1 sm:mb-3 font-semibold flex items-center justify-center">
            <span className="text-4xl text-teal-800">
              {Math.round(flist?.main.temp)}
              <span className="text-2xl">&#8451;</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 w-1/2 sm:w-full">
          <p className="flex justify-between text-teal-500 px-3">
            降水確率
            <span className="text-right text-teal-800 font-semibold">
              {Math.round(flist?.pop * 100)}%
            </span>
          </p>
          <p className="flex justify-between text-teal-500 px-3">
            湿度
            <span className="text-right text-teal-800 font-semibold">
              {Math.round(flist?.main.humidity)}%
            </span>
          </p>
          <p className="flex justify-between text-teal-500 px-3">
            風速
            <span className="text-right text-teal-800 font-semibold">
              {Math.round(flist?.wind.speed * 10) / 10}m/s
            </span>
          </p>
        </div>
      </div>
    </li>
  );
}
