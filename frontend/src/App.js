import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import WeatherPublic from "./pages/WeatherPublic";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import DashboardAgent from "./pages/DashboardAgent";
import { extractUserFromToken } from "./utils/AuthUtils";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function ProtectedRouteAdmin({ children }) {
  const token = localStorage.getItem("token");
  const { role } = extractUserFromToken();
  return token && role === "admin" ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, white 0%, white 100%)",
        }}
      >
        <Header />

        <main
          style={{
            flexGrow: 1,
            maxWidth: "80rem",
            margin: "2rem auto",
            borderRadius: "1rem",
            boxShadow:
              "0 8px 24px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1)",
            width: "90%",
            minHeight: "100vh",
          }}
        >
          <Routes>
            <Route path="/" element={<WeatherPublic />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <ProtectedRouteAdmin>
                    <Dashboard />
                  </ProtectedRouteAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboardagent"
              element={
                <ProtectedRoute>
                  <DashboardAgent />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Sticky Footer */}
        <footer
          style={{
            userSelect: "none",
            textAlign: "center",
            padding: "0.75rem 0",
            backgroundColor: "rgba(10, 20, 20, 0.85)",
            color: "#eee",
            fontSize: "0.875rem",
            position: "sticky",
            bottom: 0,
            width: "100%",
            boxShadow: "inset 0 1px 4px rgba(0,0,0,0.1)",
            zIndex: 20,
          }}
        >
          &copy; 2025 Chennai Emergency Management
        </footer>
      </div>
    </Router>
  );
}

export default App;