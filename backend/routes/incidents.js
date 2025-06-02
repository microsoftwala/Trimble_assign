const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const incidents = require("../data/incidents.json");
const SECRET = process.env.JWT_SECRET || "supersecret";
const { sendMail } = require("../services/sendMail");
const conn = require("../db/database");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(403);
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
}

router.get("/", (req, res) => res.json(incidents));

router.post("/", authMiddleware, async (req, res) => {
  const newIncident = {
    id: Date.now(),
    type: req.body.type,
    location: req.body.location,
    description: req.body.description,
    lat: req.body.lat,
    lng: req.body.lng,
    publishedAt: new Date(),
    reporterName: req.user.username,
  };
  incidents.push(newIncident);
  fs.writeFileSync("./data/incidents.json", JSON.stringify(incidents, null, 2));

  //aLERT mail if rain or thunderstorm
  const type = (req.body.type || "").toLowerCase();
  if (type.includes("rain") || type.includes("thunderstorm") || type.includes("flood")) {
    try {
      // Get all user emails from the users table
      const result = await conn.query("SELECT email FROM users WHERE email IS NOT NULL AND email <> ''");
      // console.log("Fetched emails:", result.rows);
      const emails = result.rows.map((u) => u.email).filter(Boolean);
      // console.log("Filtered emails:", emails);
      if (emails.length > 0) {
        await sendMail(
          emails,
          `Weather Alert: ${req.body.type} in ${req.body.location}`,
          `Alert: ${req.body.type} reported in ${req.body.location} at ${new Date().toLocaleString()}\n\nDescription: ${req.body.description}`
        );
      }
    } catch (err) {
      console.error("Failed to send alert email:", err);
    }
  }
  console.log("Jai");
  res.status(201).json(newIncident);
});

module.exports = router;
