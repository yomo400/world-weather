"use client";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import LocationInfo from "./LocationInfo";
// import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
// import googleMapReact from "google-map-react";

export default function WorldWeather(props) {
  // 都市
  const cityList = ["Tokyo", "London", "New York", "Moscow", "Sydney", "error"];
  const [city, setCity] = useState(cityList[0]);

  // エラー文
  const messageFirst = <p className="my-20">場所をクリックしてください</p>;
  const messageLoading = (
    <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent my-20"></div>
  );
  const messageError = (
    <p className="my-20">エラーが出ています。もう一度試してください。</p>
  );

  // fetch
  const [isFetch, setIsFetch] = useState(false);
  const fetcherApi = (url) => axios.get(url).catch((res) => res.json());
  const {
    data: weather,
    error,
    isLoading,
  } = useSWR(isFetch ? `/api/${city}/weather` : null, fetcherApi);
  // console.log(weather);

  // Google Map "google-map-react"
  // const defaultMap = {
  //   center: {
  //     lat: 35.6895,
  //     lng: 139.6917,
  //   },
  //   zoom: 11,
  // };
  // Google Map "@react-google-maps/api"
  // const containerStyle = {
  //   width: "100vw",
  //   maxWidth: "1080px",
  //   height: "550px",
  // };

  // const center = {
  //   lat: 35.6895,
  //   lng: 139.6917,
  // };

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_KEY,
  // });

  // const [map, setMap] = React.useState(null);

  // const onLoad = React.useCallback(function callback(map) {
  //   // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);

  //   setMap(map);
  // }, []);

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

  // @googlemaps/react-wrapper

  return (
    <>
      {/* {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          onLoad={onLoad}
          zoom={5}
          onUnmount={onUnmount}
        >
          <MarkerF
            position={center}
            // icon={
            //   <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            // }
          />
        </GoogleMap>
      ) : (
        messageLoading
      )} */}
      {/* <div className="h-[50vh] w-full">
        <googleMap
          apiKey={{ key: process.env.NEXT_PUBLIC_MAP_KEY }}
          defaultCenter={defaultMap.center}
          defaultZoom={defaultMap.zoom}
        ></googleMap>
      </div> */}
      {cityList.map((city, index) => (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded"
          key={index}
          onClick={() => {
            setIsFetch(true);
            setCity(city);
          }}
        >
          {city}
        </button>
      ))}
      <div className="max-w-md rounded-lg flex m-3 p-4 border-double border-4 border-indigo-600 justify-center">
        {error ? (
          messageError
        ) : isLoading ? (
          messageLoading
        ) : weather ? (
          <LocationInfo info={weather?.data.res} />
        ) : (
          messageFirst
        )}
      </div>
    </>
  );
}
