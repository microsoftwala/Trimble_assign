import React from "react";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <button
      onClick={handleLogOut}
      style={{
        backgroundColor: "#e74c3c",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "10px 20px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "background-color 0.3s ease",
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")}
    >
      Log Out
    </button>
  );
}

export default LogOut;