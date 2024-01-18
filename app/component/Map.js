import React, { useEffect, useRef, useState } from "react";

export const Map = ({ children, style, ...options }) => {
  const ref = useRef(null);
  const [map, setMap] = useState();
  const [point, setPoint] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      const option = {
        center: options.center,
        zoom: options.zoom,
        mapTypeId: options.mapTypeId,
        disableDefaultUI: true,
        draggableCursor: "crosshair",
      };
      setMap(new google.maps.Map(ref.current, option));
    }
    // map?.addListener("click", () => {
    //   let latlng = google.maps.MapMouseEvent.latLng;
    //   console.log(latlng.lat());
    //   //   console.log(latlng.lat());
    // });
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
