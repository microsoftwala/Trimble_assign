import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [email,setEmail] = useState("");
  const [role, setRole] = useState("agent");
  const [error, setError] = useState("");

  const register = async () => {
    try {
      setError("");
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
        role,
        email
      });
      alert("Registered successfully");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("User already exists");
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Register</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUser(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          style={styles.input}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ ...styles.input, cursor: "pointer" }}
        >
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={register} style={styles.button}>
          Register
        </button>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.loginLink}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius:'1rem',
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: "30px",
    textAlign: "center",
    color: "#333",
    fontSize: "28px",
  },
  input: {
    padding: "12px 15px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  button: {
    backgroundColor: "#6c63ff",
    color: "white",
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "15px",
  },
  loginText: {
    marginTop: "20px",
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
  },
  loginLink: {
    color: "#6c63ff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};