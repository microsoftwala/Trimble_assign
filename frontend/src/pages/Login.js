import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

export default function Login() {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [role, setRole] = useState('user'); 
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
        role,
      });
      localStorage.setItem('token', res.data.token);
      if(role === 'admin') {
        navigate('/dashboard');
      }
      else{
        navigate('/dashboardagent');
      }
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Login</h2>

        <input
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPass(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Role (agent/admin)"
          type="role"
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        />

        <button onClick={login} style={styles.button}>
          Login
        </button>
        <p style={styles.signUpText}>
          Create a new account?{" "}
          <Link to="/register" style={styles.signUpLink}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #74ebd5, #acb6e5)',
    borderRadius:'1rem',
  },
  card: {
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    marginBottom: '30px',
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: '28px',
  },
  input: {
    padding: '12px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  signUpLink: {
    color: "#6c63ff",
    textDecoration: "none",
    fontWeight: "bold",
  },signUpText: {
    marginTop: "20px",
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
  }
};