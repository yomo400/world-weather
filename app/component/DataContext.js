"use client";
import { createContext, useState, useContext } from "react";

const DataContext = createContext(data, setData);

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
