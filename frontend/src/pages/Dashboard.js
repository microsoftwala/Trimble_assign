import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import mapIconUrl from "../images/placeholder.png";
import mapIconUrl1 from "../images/pin.png";
import { areas } from "../data/Area";
import { extractUserFromToken } from "../utils/AuthUtils";
import AreaWeather from "../components/ShowForecastWeather";
import PublishScenarioPopup from "../components/PublishScenarioPopup";
import ForecastRouteMap from "../components/ForeCastRouteMap";

const customIconEnd = new Icon({ iconUrl: mapIconUrl1, iconSize: [35, 35] });
const customIconStart = new Icon({ iconUrl: mapIconUrl, iconSize: [35, 35] });
const defaultLat = 13.1196;
const defaultLon = 80.2332;

const WeatherGISMap = () => {
  const [listOfCoords, setListOfCoords] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [currentForecast, setCurrentForecast] = useState(null);
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);
  const [lastCoord, setLastCoord] = useState(null);
  const [firstCoord, setFirstCoord] = useState(null);
  const [area, setArea] = useState("perambur");

  const areaOptions = Object.keys(areas).map((key) => ({
    value: key,
    label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  }));

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [popupUsername, setPopupUsername] = useState("");
  const [popupRole, setPopupRole] = useState("");
  const [popupCondition, setPopupCondition] = useState("");
  const [popupDescription, setPopupDescription] = useState("");
  const [popupError, setPopupError] = useState("");

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/weather/forecast",
          {
            params: { city: "Chennai", area },
          }
        );
        setForecastData((prev) => [...prev, res.data.forecast]);
        setCurrentForecast(res.data.forecast);
        setListOfCoords((prev) => [
          ...prev,
          [res.data.lat, res.data.lon, res.data.area],
        ]);
        // Set default weather condition for popup (first in forecast)
        const firstWeather =
          res.data.forecast?.list?.[0]?.weather?.[0]?.main || "";
        setPopupCondition(firstWeather);
      } catch (err) {
        console.error("Error fetching forecast:", err);
      }
    };
    fetchForecast();
  }, [area]);

  // When popup opens, prefill username and role from token
  useEffect(() => {
    if (showPopup) {
      const { username, role } = extractUserFromToken();
      setPopupUsername(username);
      setPopupRole(role);
    }
  }, [showPopup]);

  useEffect(() => {
    const fetchRoute = async () => {
      if (!currentForecast?.list) return;
      setRouteGeoJSON(null);
      const stormZones = currentForecast.list
        .filter((item) => {
          const w = item.weather[0].main.toLowerCase();
          return w === "rain" || w === "thunderstorm";
        })
        .map(() => ({
          lat: currentForecast.city.coord.lat,
          lon: currentForecast.city.coord.lon,
        }));
      try {
        const safeRoute = await axios.post(
          `http://localhost:5000/api/safe/safePath`,
          {
            start: areas[area.toLowerCase()],
            end: areas["koyambedu"],
            stormZones,
          }
        );
        setRouteGeoJSON(safeRoute.data);
        const last =
          safeRoute.data?.features?.[0]?.geometry?.coordinates?.slice(-1)[0];
        const first =
          safeRoute.data?.features?.[0]?.geometry?.coordinates?.slice(1)[0];
        setLastCoord(last);
        setFirstCoord(first);
      } catch (err) {
        console.error("Error fetching safe route:", err);
      }
    };
    fetchRoute();
    // eslint-disable-next-line
  }, [forecastData, area]);

  // Handler for popup submit
  const handlePopupSubmit = async (e) => {
    e.preventDefault();
    setPopupError("");
    if (
      !popupUsername.trim() ||
      !popupRole.trim() ||
      !popupCondition.trim() ||
      !popupDescription.trim()
    ) {
      setPopupError("All fields are required.");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/incidents",
        {
          type: popupCondition,
          location: area,
          description: popupDescription,
          lat: areas[area].lat,
          lng: areas[area].lon,
          username: popupUsername,
          role: popupRole,
          time: new Date().toISOString(),
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      setShowPopup(false);
      setPopupUsername("");
      setPopupRole("");
      setPopupCondition("");
      setPopupDescription("");
      setPopupError("");
      alert("Scenario published successfully!");
    } catch {
      setPopupError("Failed to publish scenario. Try again.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: 20,
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20, color: "#2c3e50" }}>
        Weather GIS Map with OpenWeatherMap + Drawing Tools
      </h2>
      <div style={{ marginBottom: 15, textAlign: "center" }}>
        <label
          htmlFor="areaSelect"
          style={{ marginRight: 10, fontWeight: "bold", fontSize: 20 }}
        >
          Select Area:
        </label>
        <div style={{ display: "inline-block", minWidth: 250 }}>
          <Select
            id="areaSelect"
            options={areaOptions}
            value={areaOptions.find((opt) => opt.value === area)}
            onChange={(selected) => setArea(selected?.value || "")}
            placeholder="-- Choose an area --"
            isClearable
            styles={{
              control: (base) => ({
                ...base,
                padding: 2,
                borderRadius: 6,
                borderColor: "#ccc",
                fontSize: "1rem",
              }),
              menu: (base) => ({ ...base, zIndex: 1000 }),
            }}
          />
        </div>
        <button
          onClick={() => setShowPopup(true)}
          style={{
            marginLeft: 20,
            padding: "8px 18px",
            borderRadius: 6,
            background: "#6366f1",
            color: "white",
            border: "none",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            transition: "background 0.2s",
          }}
        >
          Publish Current Scenario
        </button>
      </div>

      {/* Popup Modal */}
      <PublishScenarioPopup
        showPopup={showPopup}
        popupUsername={popupUsername}
        popupRole={popupRole}
        popupCondition={popupCondition}
        popupDescription={popupDescription}
        popupError={popupError}
        setPopupCondition={setPopupCondition}
        setPopupDescription={setPopupDescription}
        setShowPopup={setShowPopup}
        handlePopupSubmit={handlePopupSubmit}
      />
      <ForecastRouteMap
        forecastData={forecastData}
        listOfCoords={listOfCoords}
        defaultLat={defaultLat}
        defaultLon={defaultLon}
        routeGeoJSON={routeGeoJSON}
        firstCoord={firstCoord}
        lastCoord={lastCoord}
        customIconStart={customIconStart}
        customIconEnd={customIconEnd}
      />
      <div
        style={{
          marginTop: 30,
          backgroundColor: "#f1f3f5",
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <AreaWeather curr_area={area} forecastData1={currentForecast} />
      </div>
    </div>
  );
};

export default WeatherGISMap;