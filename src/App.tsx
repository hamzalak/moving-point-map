import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "./styles.css";
import "leaflet/dist/leaflet.css";

const defaultPosition = {
  lat: 38.86784718714166,
  lng: -77.08996175162719,
  zoom: 13,
};

let DefaultIcon = L.icon({
  iconUrl: require("./images/temp.png"),
  iconSize: [30, 30],
});
export default function App() {
  const [loc, setLoc] = useState<[number, number]>([
    defaultPosition.lat,
    defaultPosition.lng,
  ]);
  const [isHide, setIsHide] = useState(true);

  setTimeout(() => setIsHide(false), 5000);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setLoc((oldState) => [oldState[0], oldState[1] + 0.00001]);
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [loc]);

  const markerRef = useRef(null);

  return (
    <MapContainer
      className="map"
      center={[38.86784718714166, -77.08996175162719]}
      zoom={defaultPosition.zoom}
    >
      {console.log(loc, " ----------------- ")}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/*    eventHandlers={eventHandlers} */}
      {!isHide ? (
        <Marker
          position={loc}
          draggable={true}
          ref={markerRef}
          icon={DefaultIcon}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ) : null}
    </MapContainer>
  );
}

/*
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) {
          setLoc(marker.getLatLng());
        }
      },
    }),
    []
  );
*/
