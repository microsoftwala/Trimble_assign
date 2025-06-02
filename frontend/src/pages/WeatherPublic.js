import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";

const AREAS = [
  "T Nagar",
  "Velachery",
  "Anna Nagar",
  "Adyar",
  "Tambaram",
  "Guindy",
  "Mylapore",
  "Kodambakkam",
  "Perambur",
  "Saidapet",
  // Add more areas as needed
];

export default function WeatherPublic() {
  const [area, setArea] = useState(AREAS[0]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/weather/forecast",
        {
          params: { city: "Chennai", area },
        }
      );
      setWeather(res.data.forecast);
    } catch (err) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: 24 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>
        Chennai Area Weather (Public)
      </h2>
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 18,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          style={{ padding: 7, borderRadius: 6, fontSize: 16 }}
        >
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <button
          onClick={fetchWeather}
          style={{
            padding: "8px 18px",
            borderRadius: 6,
            background: "#3498db",
            color: "white",
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          See Weather
        </button>
      </div>
      {loading && (
        <div style={{ textAlign: "center", color: "#555" }}>Loading...</div>
      )}
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}
      {weather && (
        <div
          style={{
            borderRadius: 10,
            padding: 18,
            marginTop: 18,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            width: "100%",
          }}
        >
          <WeatherCard
            area={area}
            condition={weather.list?.[0]?.weather?.[0]?.main || "-"}
            desc={weather.list?.[0]?.weather?.[0]?.description || "-"}
            temp={
              weather.list?.[0]?.main?.temp
                ? `${weather.list[0].main.temp}°C`
                : "-"
            }
            humidity={
              weather.list?.[0]?.main?.humidity
                ? `${weather.list[0].main.humidity}%`
                : "-"
            }
          />
        </div>
      )}
    </div>
  );
}
