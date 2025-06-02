const express = require('express');
const axios = require('axios');
const router = express.Router();

const ORS_API_KEY = process.env.ORS_API_KEY;
const nearestShelter = [13.0500, 80.2500];

router.post('/', async (req, res) => {
  const { lat, lng } = req.body;
  const url = `https://api.openrouteservice.org/v2/directions/foot-walking`;
  const headers = { Authorization: ORS_API_KEY };
  const data = {
    coordinates: [
      [parseFloat(lng), parseFloat(lat)],
      [nearestShelter[1], nearestShelter[0]]
    ]
  };

  try {
    const response = await axios.post(url, data, { headers });
    res.json(response.data.features[0].geometry);
  } catch (err) {
    res.status(500).json({ error: 'Routing failed' });
  }
});

module.exports = router;