import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogOut from "./LogOut";

const headerS = {
  top: 0,
  zIndex: 50,
  width: "100%",
  background: "linear-gradient(90deg, #4c51bf, #434190, #3c366b)",
  color: "white",
  boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
  padding: "16px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const titleS = {
  fontSize: "1.75rem",
  fontWeight: "800",
  textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
  userSelect: "none",
  cursor: "pointer",
};

const navS = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

const linkS = {
  padding: "8px 16px",
  borderRadius: "6px",
  border: "1.5px solid rgba(255, 255, 255, 0.3)",
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  transition: "all 0.3s ease",
  userSelect: "none",
};

const linkHoverS = {
  borderColor: "rgba(255, 255, 255, 0.8)",
  backgroundColor: "white",
  color: "#3c366b",
  cursor: "pointer",
};

export default function Header() {
  const [loginHover, setLoginHover] = useState(false);
  const [registerHover, setRegisterHover] = useState(false);
  const navigate = useNavigate();

  return (
    <header style={headerS}>
      <h1
        style={titleS}
        onClick={() => {
          navigate("/");
        }}
      >
        Chennai Emergency Dashboard
      </h1>
      {localStorage.length === 0 ? (
        <nav style={navS}>
          <Link
            to="/login"
            style={loginHover ? { ...linkS, ...linkHoverS } : linkS}
            onMouseEnter={() => setLoginHover(true)}
            onMouseLeave={() => setLoginHover(false)}
          >
            <span role="img" aria-label="login">
              🔐
            </span>
            Login
          </Link>
          <Link
            to="/register"
            style={registerHover ? { ...linkS, ...linkHoverS } : linkS}
            onMouseEnter={() => setRegisterHover(true)}
            onMouseLeave={() => setRegisterHover(false)}
          >
            <span role="img" aria-label="register">
              📝
            </span>
            Sign Up
          </Link>
        </nav>
      ) : (
        <LogOut />
      )}
    </header>
  );
}