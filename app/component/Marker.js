"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const Marker = (options) => {
  const params = usePathname();
  const cityName = options.cityName;
  const [marker, setmarker] = useState();
  // console.log(options);
  const icon = {
    url: "/anime02.gif",
    scaledSize: new google.maps.Size(40, 40),
  };

  options = { ...options, icon };

  if (params === "/world") {
    marker?.addListener("click", () => {
      options.setCity();
    });

    const infowindow = new google.maps.InfoWindow({
      content: cityName,
      disableAutoPan: true,
    });
    // console.log(infowindow);
    marker?.addListener("mouseover", () => {
      infowindow.open({
        anchor: marker,
      });
    });
    marker?.addListener("mouseout", () => {
      infowindow.close();
    });
  }

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
