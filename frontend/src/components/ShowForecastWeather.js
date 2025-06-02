import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "react-bootstrap";

// Spinner component for When data is not there
const LoadingSpinner = () => (
  <div style={{ textAlign: "center", marginTop: "20px" }}>
    <Spinner animation="border" role="status" variant="primary" />
  </div>
);

// Emoji on weather description
const getWeatherIcon = (desc) => {
  const d = desc.toLowerCase();
  if (d.includes("thunderstorm")) return "⛈️";
  if (d.includes("rain")) return "🌧️";
  if (d.includes("cloud")) return "☁️";
  return "🌫️";
};

export default function AreaWeather({ curr_area, forecastData1 }) {
  const [forecastData, setForecastData] = useState(null);
  console.log(forecastData1);
  useEffect(() => {
    setForecastData(forecastData1);
    console.log("CURR_AREA", curr_area);
  }, [curr_area, forecastData1]);

  return (
    <div style={{ marginTop: "20px", padding: "15px", marginBottom:"30px" }}>
      <h2
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          color: "#2c3e50",
        }}
      >
        Forecast for {curr_area.replace(/_/g, " ")}
      </h2>

      {forecastData?.list ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #dee2e6",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#343a40", color: "#fff" }}>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                Date
              </th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                Average Temperature (°C)
              </th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                Most Frequent Condition
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(
              forecastData.list.reduce((acc, item) => {
                const dateStr = new Date(item.dt * 1000)
                  .toISOString()
                  .split("T")[0];

                if (!acc[dateStr]) {
                  acc[dateStr] = {
                    temps: [],
                    descriptions: {},
                  };
                }

                acc[dateStr].temps.push(item.main.temp);

                const desc = item.weather[0].description;
                acc[dateStr].descriptions[desc] =
                  (acc[dateStr].descriptions[desc] || 0) + 1;

                return acc;
              }, {})
            ).map(([date, data], idx) => {
              const avgTemp = (
                data.temps.reduce((sum, t) => sum + t, 0) / data.temps.length
              ).toFixed(1);

              const topDescription = Object.entries(data.descriptions).reduce(
                (max, current) => (current[1] > max[1] ? current : max)
              )[0];

              const formattedDate = new Date(date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              });

              return (
                <tr key={idx}>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #dee2e6",
                      textAlign: "center",
                    }}
                  >
                    {formattedDate}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #dee2e6",
                      textAlign: "center",
                    }}
                  >
                    {avgTemp}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #dee2e6",
                      textAlign: "center",
                    }}
                  >
                    {getWeatherIcon(topDescription)} {topDescription}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : curr_area ? (
        <LoadingSpinner />
      ) : (
        <p style={{ textAlign: "center" }}>
          Please select an area to see the forecast.
        </p>
      )}
    </div>
  );
}