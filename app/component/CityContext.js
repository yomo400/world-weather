"use client";
import { createContext, useState, useContext } from "react";

const cityList = [
  {
    name: "Tokyo",
    coordinates: { lat: 35.6895, lng: 139.6917 },
  },
  {
    name: "London",
    coordinates: { lat: 51.5085, lng: -0.1257 },
  },
  {
    name: "New York",
    coordinates: { lat: 40.7143, lng: -74.006 },
  },
  {
    name: "Moscow",
    coordinates: { lat: 55.7522, lng: 37.6156 },
  },
  {
    name: "Sydney",
    coordinates: { lat: -33.8679, lng: 151.2073 },
  },
  {
    name: "Johannesburg",
    coordinates: { lat: -26.2023, lng: 28.0436 },
  },
  {
    name: "New Delhi",
    coordinates: { lat: 28.6128, lng: 77.2311 },
  },
  {
    name: "Hawaii",
    coordinates: { lat: 20.7503, lng: -156.5003 },
  },
  {
    name: "Buenos Aires",
    coordinates: { lat: -34.6132, lng: -58.3772 },
  },
  {
    name: "Vancouver",
    coordinates: { lat: 49.2497, lng: -123.1193 },
  },
  {
    name: "Cairo",
    coordinates: { lat: 30.0481, lng: 31.2383 },
  },
];
const CityReadContext = createContext(cityList);
export const CityProvider = ({ children }) => {
  const [city, setCity] = useState(cityList);
  return (
    <CityReadContext.Provider value={city}>{children}</CityReadContext.Provider>
  );
};

export const useReadCity = () => useContext(CityReadContext);
