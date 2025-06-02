import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Circle,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ForecastRouteMap = ({
  forecastData,
  listOfCoords,
  defaultLat,
  defaultLon,
  routeGeoJSON,
  firstCoord,
  lastCoord,
  customIconStart,
  customIconEnd,
}) => {
  return (
    <MapContainer
      center={[defaultLat, defaultLon]}
      zoom={12}
      style={{
        height: "80vh",
        width: "100%",
        border: "2px solid #ccc",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        zIndex: 0,
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {forecastData.map((forecast, areaIdx) =>
        forecast.list.map((item, idx) => {
          const weatherMain = item.weather[0].main.toLowerCase();
          let color = null;
          if (weatherMain === "rain") color = "rgba(255, 165, 0, 0.1)";
          else if (weatherMain === "thunderstorm")
            color = "rgba(113, 15, 15, 0.1)";
          else if (weatherMain === "clouds")
            color = "rgba(191, 188, 188, 0.06)";
          if (color) {
            const [lat, lon, areaName] = listOfCoords[areaIdx];
            return (
              <Circle
                key={`${areaIdx}-${idx}`}
                center={[lat, lon]}
                radius={5000}
                color={color}
                fillOpacity={0.2}
                opacity={0.2}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1} sticky>
                  <div>
                    <strong>{weatherMain}</strong>
                    <br />
                    Temp: {item.main.temp}°C
                    <br />
                    Area: {areaName}
                  </div>
                </Tooltip>
              </Circle>
            );
          }
          return null;
        })
      )}

      {routeGeoJSON?.type === "FeatureCollection" && (
        <>
          <GeoJSON data={routeGeoJSON} style={{ color: "blue", weight: 3 }} />
          {lastCoord && (
            <>
              <Marker position={[lastCoord[1], lastCoord[0]]} icon={customIconEnd}>
                <Tooltip direction="top" offset={[0, -10]} opacity={1} sticky>
                  <div>
                    {lastCoord[0]},{lastCoord[1]}
                  </div>
                </Tooltip>
              </Marker>
              <Marker position={[firstCoord[1], firstCoord[0]]} icon={customIconStart}>
                <Tooltip direction="top" offset={[0, -10]} opacity={1} sticky>
                  <div>
                    {firstCoord[0]},{firstCoord[1]}
                  </div>
                </Tooltip>
              </Marker>
            </>
          )}
        </>
      )}
    </MapContainer>
  );
};

export default ForecastRouteMap;