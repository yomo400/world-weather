"use client";
import { createContext, useState, useContext } from "react";

const defaultProvider = {
  data: [],
  setData: () => [],
};
const DataContext = createContext(defaultProvider);

export function useDataContext() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [data, setData] = useState([]);

  const value = {
    data,
    setData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
