"use client";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";

export default function Forecast(props) {
  const cname = props.cname;
  console.log(cname);

  // fetch
  const fetcher = (url) => axios.get(url).catch((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://api.openweathermap.org/data/2.5/forecast?appid=81265787ad6274ec35fd3d76001294e9&units=metric&q=${cname}&lang=ja`,
    fetcher
  );

  console.log(data);
  const finfo = data?.data;
  const deUnix = (e) => {
    let dateTime = new Date(e * 1000);
    return dateTime.toString();
  };

  return (
    <>
      <div>
        <h2>
          {finfo?.city.name}
          <span>{finfo?.city.country}</span>
        </h2>
        <dl>
          <dt>緯度/経度</dt>
          <dd>
            {finfo?.city.coord.lat}/{finfo?.city.coord.lon}
          </dd>
          <dt>人口</dt>
          <dd>{finfo?.city.population}</dd>
          <dt>日の出/日没</dt>
          <dd>
            {deUnix(finfo?.city.sunrise)}/{finfo?.city.sunset}
          </dd>
        </dl>
      </div>
    </>
  );
}
