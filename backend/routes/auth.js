const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const router = express.Router();
const conn = require("../db/database");
require("dotenv").config();

// const users = require('../data/users.json');
const { config } = require("process");
const SECRET = process.env.JWT_SECRET || "supersecret";


// SignUp user
router.post("/register", async (req, res) => {
  const { username, password, role, email } = req.body;

  try {
    const existingUser = await conn.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hash = await bcrypt.hash(password, 10);
    const result = await conn.query(
      "INSERT INTO users (username, password, role, email) VALUES ($1, $2, $3,$4) RETURNING id",
      [username, hash, role, email]
    );

    res.status(201).json({ message: "Registered", userId: result.rows[0].id });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password, role } = req.body;
  // console.log(username,password)
  try {
    const userRes = await conn.query(
      "SELECT * FROM users WHERE username = $1 and role = $2",
      [username, role]
    );
    // console.log(userRes)
    const user = userRes.rows[0];
    // console.log(user)

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!!!" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials!!!" });
    }

    const token = jwt.sign({ username: username, role: user.role }, SECRET);
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login has failed" });
  }
});

module.exports = router;
