"use client";
import axios from "axios";
import useSWR from "swr";

export default function Tokyo() {
  const fetcher = (url) => axios.get(url).catch((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "https://api.openweathermap.org/data/2.5/weather?appid=81265787ad6274ec35fd3d76001294e9&lat=35.6828387&lon=139.7594549",
    fetcher
  );
  if (error) return <div>An error has occurred.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (data) {
    console.log(data);
  }
}
