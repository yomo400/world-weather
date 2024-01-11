import { InfoWindow } from "@react-google-maps/api";
import { useEffect, useState } from "react";

export const Marker = (options) => {
  const cityName = options.cityName;
  const [marker, setmarker] = useState();
  const [hoverinfo, sethoverinfo] = useState();
  // console.log(options);
  const icon = {
    url: "/anime02.gif",
    scaledSize: new google.maps.Size(40, 40),
  };

  options = { ...options, icon };

  marker?.addListener("click", () => {
    options.selectCity();
  });

  sethoverinfo(
    new google.maps.InfoWindow({
      // map: map,
      content: cityName,
      noSuppress: true,
      zIndex: 2,
      // pixelOffset: pixelOffset,
    })
  );

  // marker?.addListener("mouseover", () => {
  //   // console.log(cityName);
  //   hoverinfo.open(map);
  // });

  useEffect(() => {
    if (!marker) {
      setmarker(new google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      // console.log(options);
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};
