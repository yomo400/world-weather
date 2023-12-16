"use client";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import TimeSet from "./TimeSet";
import WeatherForecast from "./WeatherForecast";

export default function Forecast(props) {
  const cname = props.cname;

  // fetch
  const fetcher = (url) => axios.get(url).catch((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://api.openweathermap.org/data/2.5/forecast?appid=81265787ad6274ec35fd3d76001294e9&units=metric&q=${cname}&lang=ja`,
    fetcher
  );
  const finfo = data?.data;
  
  // 時刻(TimeSet.jsで変換)
  const now = Date.now();
  const unixTime = data && [
    now / 1000,
    finfo?.list[0].dt,
    finfo?.list[8].dt,
    finfo?.list[16].dt,
    finfo?.list[24].dt,
    finfo?.list[32].dt,
    finfo?.city.timezone,
  ];
  const localTime = TimeSet(unixTime);
  
  // 国コード
  const ccode = finfo?.city.country;
  const changeCode = (e) => {
    if (e) {
      let countryName;
      e === "JP"
      ? (countryName = "日本")
      : e === "GB"
      ? (countryName = "イギリス")
      : e === "US"
      ? (countryName = "アメリカ")
      : e === "RU"
      ? (countryName = "ロシア")
      : e === "AU"
      ? (countryName = "オーストラリア")
      : (countryName = "エラーが発生しています");
      return countryName;
    }
  };
  
  // 予報抽出
  const wfinfo = data?.data.list;
  const flist = []
  if (wfinfo) {
    for (let index = 0; index < wfinfo.length;) {
      flist.push(wfinfo[index])
      index = index + 8
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent my-20"></div>
      ) : (
        <div>
          <div className="px-4 py-2">
            <h3 className="text-4xl font-bold leading-7 text-blue-600 flex items-end">
              {finfo?.city.name}
              <p className="mt-1 max-w-2xl text-lg leading-6 text-sky-400 ml-5">
                {changeCode(ccode)}
              </p>
            </h3>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-base font-medium leading-6 text-gray-900">
                  現地時刻
                </dt>
                <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {data ? localTime[0].time : ""}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-base font-medium leading-6 text-gray-900">
                  緯度
                </dt>
                <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {finfo?.city.coord.lat}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-base font-medium leading-6 text-gray-900">
                  経度
                </dt>
                <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {finfo?.city.coord.lon}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
      <ul className="flex gap-x-8">
        {flist.map((list, index) => (
          <WeatherForecast
            key={index}
            flist={flist[index]}
            localTime={localTime && localTime[index + 1]}
          />
        ))}
      </ul>
    </>
  );
}
