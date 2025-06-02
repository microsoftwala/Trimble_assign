import React, { useEffect, useState } from "react";
import { getChennaiWeather } from "../services/WeatherService";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "13rem",
      backgroundColor: "white",
      borderRadius: "1rem",
      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
      maxWidth: "28rem",
      margin: "2.5rem auto",
    }}
  >
    <Spinner animation="border" role="status" variant="primary" />
  </div>
);

export default function WeatherCard({area, condition,desc, temp, humidity}) {

  

  if (!area) return <LoadingSpinner />;

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #6366f1, #4f46e5, #4338ca)",
        color: "white",
        borderRadius: "1.5rem",
        boxShadow: "0 25px 50px -12px rgba(67, 56, 202, 0.7)",
        padding: "2rem 3rem",
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "28rem",
        maxWidth: "28rem",
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          fontWeight: "900",
          textAlign: "center",
          textShadow: "0 2px 6px rgba(0,0,0,0.4)",
          marginBottom: "2.5rem",
          userSelect: "none",
        }}
      >
        {area} Weather
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
          textShadow: "0 1px 3px rgba(0,0,0,0.25)",
        }}
      >
        {[
          { icon: "🌡️", label: "Temperature", value: `${temp}` },
          { icon: "💧", label: "Humidity", value: `${humidity}` },
          { icon: "🌥️", label: "Condition", value: `${condition}` },
          { icon: "📝", label: "Description", value: `${desc}` },
        ].map(({ icon, label, value }) => (
          <p
            key={label}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <span
              role="img"
              aria-label={label}
              style={{ fontSize: "2rem", userSelect: "none" }}
            >
              {icon}
            </span>
            <span>{label}:</span>
            <span style={{ fontSize: "1.5rem", textTransform: "capitalize" }}>
              {value}
            </span>
          </p>
        ))}
      </div>

      <footer
        style={{
          textAlign: "center",
          marginTop: "3rem",
          color: "rgba(255, 255, 255, 0.7)",
          fontWeight: "300",
          fontStyle: "italic",
          textShadow: "0 1px 3px rgba(0,0,0,0.3)",
          userSelect: "none",
        }}
      >
        Stay safe and prepared! 🌈
      </footer>
    </div>
  );
}