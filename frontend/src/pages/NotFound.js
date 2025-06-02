import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
    }}>
      <h1 style={{ fontSize: 96, margin: 0, color: "#e74c3c" }}>404</h1>
      <h2 style={{ color: "#2c3e50", marginBottom: 24 }}>Page Not Found</h2>
      <p style={{ color: "#555", marginBottom: 32, fontSize: 18 }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" style={{
        background: "#3498db",
        color: "white",
        padding: "12px 28px",
        borderRadius: 8,
        textDecoration: "none",
        fontWeight: "bold",
        fontSize: 18,
        boxShadow: "0 4px 16px rgba(52,152,219,0.12)"
      }}>
        Go Home
      </Link>
    </div>
  );
}