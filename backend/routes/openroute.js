const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
const turf = require("@turf/turf");

dotenv.config();

const ORS_API_KEY = process.env.ORS_API_KEY;

router.post("/safePath", async (req, res) => {
  try {
    const { start, end, stormZones } = req.body;

    if (
      !start ||
      !end ||
      !stormZones ||
      stormZones.length === 0
    ) {
      return res.status(400).json({ error: "Invalid input" });
    }
    // console.log(stormZones.length)
    const { lon, lat } = stormZones[0];

    // Create buffer (in meters) around the point
    const point = turf.point([parseFloat(lon), parseFloat(lat)]);
    const buffered = turf.buffer(point, 200, { units: "meters" });

    // Debug: see what the coordinates look like
    // console.log(JSON.stringify(buffered.geometry, null, 2));

    const avoidPolygonsFeature = {
      type: "Polygon",
      coordinates: buffered.geometry.coordinates,
      properties: {},
    };

    // console.log("Avoid",avoidPolygonsFeature);

    const routeRequestBody = {
      coordinates: [
        [parseFloat(start.lon), parseFloat(start.lat)],
        [parseFloat(end.lon), parseFloat(end.lat)],
      ],
      options: {
        avoid_polygons: avoidPolygonsFeature
      },
    };

    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/foot-walking/geojson",
      routeRequestBody,
      {
        headers: {
          Authorization: ORS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching safe route:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to fetch safe route",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
