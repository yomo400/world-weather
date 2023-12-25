import { useEffect, useState } from "react";

export const Marker = (options) => {
  const [marker, setmarker] = useState();
  // console.log(options);

  marker?.addListener("click", () => {
    options.selectCity();
  });

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
