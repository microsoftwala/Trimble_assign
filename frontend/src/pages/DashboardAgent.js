
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardAgent() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/incidents", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setNotifications(res.data);
      } catch (err) {
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: 24 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Notifications</h2>
      {loading ? (
        <div style={{ textAlign: "center", color: "#555" }}>Loading...</div>
      ) : error ? (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      ) : notifications.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888" }}>No notifications found.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notifications.map((n) => {
            const type = n.type ? n.type.toLowerCase() : "";
            const isDanger =
              type.includes("rain") ||
              type.includes("flood") ||
              type.includes("thunderstorm");
            return (
              <li
                key={n.id}
                style={{
                  background: isDanger ? "#ffe5e5" : "#f8fafc",
                  border: isDanger ? "2px solid #e53e3e" : "5px solid #e2e8f0",
                  borderRadius: 10,
                  marginBottom: 18,
                  padding: 18,
                  boxShadow: isDanger ? "0 2px 12px rgba(229,62,62,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
                  position: "relative",
                }}
              >
                {isDanger && (
                  <span
                    style={{
                      position: "absolute",
                      left: 16,
                      top: 16,
                      fontSize: 24,
                      color: "#e53e3e",
                      marginRight: 8,
                    }}
                    title="Danger"
                  >
                    &#9888;
                  </span>
                )}
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6, marginLeft: isDanger ? 32 : 0 }}>
                  {n.type} in {n.location}
                </div>
                <div style={{ color: "#444", marginBottom: 4, marginLeft: isDanger ? 32 : 0 }}>{n.description}</div>
                <div style={{ fontSize: 13, color: "#888", marginLeft: isDanger ? 32 : 0 }}>
                  Reported at: {new Date(n.publishedAt).toLocaleString()}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}