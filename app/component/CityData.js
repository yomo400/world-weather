"use client";
import { useDataContext } from "./DataContext";

export default function CityData() {
  const { data, setData } = useDataContext();
  cityList = [
    {
      name: "Tokyo",
      lat: 35.6895,
      lng: 139.6917,
    },
    {
      name: "London",
      lat: 51.5085,
      lng: -0.1257,
    },
    {
      name: "New York",
      lat: 40.7143,
      lng: -74.006,
    },
    {
      name: "Moscow",
      lat: 55.7522,
      lng: 37.6156,
    },
    {
      name: "Sydney",
      lat: -33.8679,
      lng: 151.2073,
    },
    {
      name: "Johannesburg",
      lat: -26.2023,
      lng: 28.0436,
    },
    {
      name: "New Delhi",
      lat: 28.6128,
      lng: 77.2311,
    },
    {
      name: "Hawaii",
      lat: 20.7503,
      lng: -156.5003,
    },
    {
      name: "Buenos Aires",
      lat: -34.6132,
      lng: -58.3772,
    },
    {
      name: "Vancouver",
      lat: 49.2497,
      lng: -123.1193,
    },
    {
      name: "Error",
      lat: 12,
      lng: 150,
    },
  ];
  setData([...data, cityList]);
}
