"use client";
import axios from "axios";
import useSWR from "swr";
import TimeSet from "./TimeSet";
import WeatherForecast from "./WeatherForecast";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Map } from "./Map";
import { Marker } from "./Marker";
import Link from "next/link";

export default function Forecast(props) {
  const cname = props.cname;

  // fetch
  const fetcher = (url) => axios.get(url).catch((res) => res.json());
  const {
    data: forecast,
    error,
    isLoading,
  } = useSWR(`/api/${cname}/forecast`, fetcher);
  // console.log(forecast);
  const finfo = forecast?.data.res;

  // 時刻(TimeSet.jsで変換)
  const now = Date.now();
  const unixTime = forecast && [
    now / 1000,
    finfo?.list[0].dt,
    finfo?.list[8].dt,
    finfo?.list[16].dt,
    finfo?.list[24].dt,
    finfo?.list[32].dt,
    finfo?.city.sunrise,
    finfo?.city.sunset,
    finfo?.city.timezone,
  ];
  const localTime = TimeSet(unixTime);
  // console.log(localTime);

  // 国コード
  const regionNames = new Intl.DisplayNames(["ja"], { type: "region" });
  const ccode = finfo?.city.country;
  const country = ccode && regionNames.of(ccode);

  // 予報抽出
  const wfinfo = finfo?.list;
  const flist = [];
  if (wfinfo) {
    for (let index = 0; index < wfinfo.length; ) {
      flist.push(wfinfo[index]);
      index = index + 8;
    }
  }
  // console.log(finfo?.city.population);

  // Google Map
  const coord = finfo?.city.coord;
  const mapKey = process.env.NEXT_PUBLIC_MAP_KEY;
  const position = {
    lat: coord?.lat,
    lng: coord?.lon,
  };

  return (
    <>
      {isLoading ? (
        <div className="animate-spin h-20 w-20 border-8 border-teal-500 rounded-full border-t-transparent my-40 mx-auto" />
      ) : (
        <div className="flex flex-col w-full pl-0 sm:p-4">
          <header className="z-40 w-full bg-white shadow-lg sm:rounded-2xl rounded-b-xl sticky md:top-2">
            <div className="flex mx-auto flex-center">
              <div className="flex flex-wrap items-baseline w-full p-4 lg:max-w-68 sm:ml-0">
                <div className="left-0 z-50 flex">
                  <h2 className="text-3xl font-bold text-teal-800 mr-5">
                    {finfo?.city.name}
                  </h2>
                </div>
                <span className="sm:mr-0 sm:right-auto text-teal-500">
                  {country}
                </span>
              </div>
            </div>
          </header>
          <div className="flex flex-col sm:flex-wrap sm:flex-row mt-6 gap-x-4 w-11/12 sm:w-full mx-auto">
            <div className="flex flex-col gap-x-4 grow lg:grow-0 lg:w-1/3">
              <div className="mb-4">
                <div className="w-full p-4 bg-white shadow-lg rounded-2xl">
                  <div className="flex items-top justify-between p-0.5">
                    <span className="font-bold text-teal-500 text-md text-lg">
                      現地時刻
                    </span>
                    <span className="mr-2 text-teal-800 font-bold text-5xl">
                      {forecast && localTime[0].time}
                    </span>
                  </div>
                </div>
              </div>
              <div className="xl:grow">
                <div className="mb-4">
                  <div className="w-full bg-white shadow-lg rounded-2xl pb-4">
                    <p className="p-4 font-bold text-teal-500 text-md text-lg">
                      地理
                    </p>
                    <ul className="flex px-8 gap-x-4">
                      <li className="flex items-center justify-between w-1/2">
                        <span className="text-teal-500">緯度</span>
                        <span className="text-teal-800 text-lg">
                          {Math.round(finfo?.city.coord.lat * 10) / 10} &deg;
                        </span>
                      </li>
                      <li className="flex items-center justify-between w-1/2">
                        <span className="text-teal-500"> 経度 </span>
                        <span className="text-teal-800 text-lg">
                          {Math.round(finfo?.city.coord.lon * 10) / 10} &deg;
                        </span>
                      </li>
                    </ul>
                    <ul className="flex px-8 gap-x-4 mt-2">
                      <li className="flex items-center justify-between w-1/2">
                        <span className="text-teal-500">日の出</span>
                        <span className="text-teal-800 text-lg">
                          {forecast && localTime[6].time}
                        </span>
                      </li>
                      <li className="flex items-center justify-between w-1/2">
                        <span className="text-teal-500">日の入り</span>
                        <span className="text-teal-800 text-lg">
                          {forecast && localTime[7].time}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 xl:w-1/3 grow-0 lg:grow">
              <div className="mb-4">
                <div className="w-full p-4 bg-white shadow-lg rounded-2xl">
                  <p className="font-bold text-teal-500 text-md text-lg mb-4">
                    地図
                  </p>
                  <div className="max-w-80 h-80">
                    <Wrapper apiKey={mapKey}>
                      <Map
                        center={position}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "0.5rem",
                        }}
                        zoom={10}
                        // mapTypeId="hybrid"
                      >
                        <Marker
                          position={position}
                          // style={{
                          // background={"#cccccc"}
                          // }}
                        />
                      </Map>
                    </Wrapper>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="mb-6">
                <div className="w-full bg-white shadow-lg rounded-2xl">
                  <p className="p-4 font-bold text-teal-500 text-md text-lg flex justify-between items-center">
                    予報
                    <span className="text-sm font-normal">
                      ※時間はすべて現地時間です。
                    </span>
                  </p>
                  <ul className="flex flex-col sm:flex-row sm:justify-around">
                    {flist.map((list, index) => (
                      <WeatherForecast
                        key={index}
                        flist={list}
                        localTime={localTime && localTime[index + 1]}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Link
            href="/world"
            className="block bg-teal-500 hover:bg-teal-800 text-white font-bold py-2 px-4 mx-auto mb-5 rounded text-center w-11/12 sm:w-full"
          >
            WORLDへ戻る
          </Link>
        </div>
      )}
    </>
  );
}
