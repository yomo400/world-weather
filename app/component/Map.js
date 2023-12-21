import { useEffect, useRef, useState } from "react";

export const Map = ({ children, style, ...options }) => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      const option = {
        center: options.center,
        zoom: 8,
      };
      setMap(new window.google.maps.Map(ref.current, option));
    }
  }, [ref, map]);

  return <div ref={ref} style={style} />;
};
