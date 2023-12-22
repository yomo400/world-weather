import { useEffect, useState } from "react";

export const Marker = (options) => {
  const [marker, setmarker] = useState();

  marker?.addListener("click", () => {
    if (options.map instanceof google.maps.Map) {
      const position = marker.getPosition();
      if (position) options.map.panTo(position);
    }
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
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};
