import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Ganado,  Sensor } from "../../types/ganato";
import { ganadoData, sensorData } from "../../types/ganato";
const CENTER_COORDS: [number, number] = [-26.5365, -58.7657];
const INITIAL_ZOOM = 13;

const RED_CIRCLE_OPTIONS = {
  color: "#ff0000",
  fillColor: "red",
  fillOpacity: 0.8,
  weight: 1,
};

const GREEN_CIRCLE_OPTIONS = {
  color: "#507d2a",
  fillColor: "green",
  fillOpacity: 0.8,
  weight: 1,
};

const MapComponent: React.FC = () => {
  return (
    <div className="w-full h-[500px] relative z-40">
      <MapContainer
        className="z-30"
        center={CENTER_COORDS}
        zoom={INITIAL_ZOOM}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="Tiles © Esri — Source: Esri, USGS, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {ganadoData.map((ganado: Ganado) => (
          <CircleMarker
            key={ganado.id}
            center={[ganado.lat, ganado.lng]}
            pathOptions={RED_CIRCLE_OPTIONS}
            radius={6}
          >
            <Popup>
              <div className="text-center font-bold">{ganado.nombre}</div>
              <div>Propósito: {ganado.proposito}</div>
              <div>Raza: {ganado.raza}</div>
            </Popup>
          </CircleMarker>
        ))}

        {sensorData.map((sensor: Sensor) => (
          <CircleMarker
            key={sensor.id}
            center={[sensor.lat, sensor.lng]}
            pathOptions={GREEN_CIRCLE_OPTIONS}
            radius={6}
          >
            <Popup>
              <div className="text-center font-bold">{sensor.nombre}</div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
