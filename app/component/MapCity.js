import React, { useEffect, useRef, useState } from "react";

export const MapCity = ({ children, style, ...options }) => {
  const ref = useRef(null);
  const [map, setMap] = useState();
  // console.log(options);

  useEffect(() => {
    if (ref.current && !map) {
      const option = {
        center: options.center,
        zoom: options.zoom,
        mapTypeId: options.mapTypeId,
        disableDefaultUI: true,
      };
      setMap(new google.maps.Map(ref.current, option));
    }
  }, [ref, map]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};
