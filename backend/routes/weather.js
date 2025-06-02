const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();
const areas = require("../data/areas.json")

// console.log("AREA",areas['chromepet'])

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
// console.log(WEATHER_API_KEY)

router.get("/weather", async (req, res) => {
  try {
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=${WEATHER_API_KEY}&units=metric`;
    const { lat, lon } = req.query;
    // console.log(lat, lon)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric
`;
    const response = await axios.get(url);
    const data = response.data;
    // console.log(data)
    res.json({
      location: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      weather: data.weather[0].description,
      rainfall: data.rain ? data.rain["1h"] || 0 : 0,
    });
  } catch (err) {
    console.error("Weather API error:", err.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// router.get("/forecast", async (req, res) => {
//   try {
//     const { lat, lon } = req.query;
//     console.log(lat, lon);
//     const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current,alerts&units=metric&appid=${WEATHER_API_KEY}
// `;
//     const response = await axios.get(url);
//     console.log("7-day Forecast Data:", response.data);
//     res.json(response.data);
//   } catch (err) {
//     console.error("Error fetching forecast:", err);
//   }
// });

router.get("/forecast", async (req, res) => {
  try {
    const { city, area } = req.query;
    // console.log(city, area);

    if (!city || !area) {
      return res.status(400).json({ error: "Please provide city and area" });
    }

    if (city.toLowerCase() !== "chennai") {
      return res
        .status(400)
        .json({ error: "Currently only Chennai is supported" });
    }

    const location = areas[area.toLowerCase()];
    if (!location) {
      return res.status(404).json({ error: "Area not found in Chennai" });
    }

    const { lat, lon } = location;
    // console.log(lat, lon);

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current,alerts&units=metric&appid=${WEATHER_API_KEY}`;

    const response = await axios.get(url);
    // console.log(`7-day Forecast for ${area}:`, response.data);

    res.json({
      area,
      lat,
      lon,
      forecast: response.data,
    });
  } catch (err) {
    console.error("Error fetching forecast:", err.message);
    res.status(500).json({ error: "Failed to fetch forecast data" });
  }
});

module.exports = router;
