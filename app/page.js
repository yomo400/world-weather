"use client";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Marker } from "./component/Marker";
import { Map } from "./component/Map";
import Link from "next/link";

export default function Home() {
  const mapKey = process.env.NEXT_PUBLIC_MAP_KEY;
  const city = {
    name: "London",
    lat: 51.5085,
    lng: -0.1257,
  };
  const position = {
    lat: city.lat,
    lng: city.lng,
  };
  return (
    <div className="flex flex-col w-full pl-0 sm:p-4">
      <div className="flex flex-col sm:flex-wrap sm:flex-row gap-x-4 w-11/12 sm:w-full mx-auto">
        <div className="flex flex-col gap-x-4 grow lg:w-1/3">
          <div className="mb-4">
            <div className="w-full p-4 bg-white shadow-lg rounded-2xl">
              <div className="items-top justify-between p-0.5">
                <h2 className="text-5xl font-bold text-teal-800">
                  World-Weather
                </h2>
                <p className="text-teal-500 mt-2 text-sm">
                  World-Weatherは世界中の主要な都市の天気をリアルタイムで確認できる便利なウェブサイトです。
                </p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="w-full p-4 bg-white shadow-lg rounded-2xl">
              <div className="flex items-top justify-between p-0.5">
                <span className="font-bold text-teal-500 text-md text-lg">
                  現地時刻
                </span>
                <span className="mr-2 text-teal-800 font-bold text-5xl">
                  10:00
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
                  <li className="flex items-center justify-evenly w-1/2">
                    <span className="text-teal-500">緯度</span>
                    <span className="text-teal-800 text-lg">
                      {Math.round(city.lat * 10) / 10} &deg;
                    </span>
                  </li>
                  <li className="flex items-center justify-evenly w-1/2">
                    <span className="text-teal-500"> 経度 </span>
                    <span className="text-teal-800 text-lg">
                      {Math.round(city.lng * 10) / 10} &deg;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 xl:w-1/3 grow">
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
                  >
                    <Marker position={position} />
                  </Map>
                </Wrapper>
              </div>
            </div>
          </div>
        </div>
        <Link
          href="/world"
          className="block bg-teal-500 hover:bg-teal-800 text-white font-bold py-2 px-4 mx-auto rounded text-center w-11/12 sm:w-full mb-2"
        >
          WORLDへ
        </Link>
      </div>
    </div>
  );
}
