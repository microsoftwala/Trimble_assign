const express = require('express');
const cors = require('cors');
const weatherRoute = require('./routes/weather');
const authRoute = require('./routes/auth');
const incidentsRoute = require('./routes/incidents');
const routeRoute = require('./routes/route');
const safeRoute = require("./routes/openroute");
const conn = require('./db/database');

require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

conn.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
  } else {
    console.log('Connected to the database');
  }
});
app.use('/api/weather', weatherRoute);
app.use('/api/auth', authRoute);
app.use('/api/incidents', incidentsRoute);
app.use('/api/route', routeRoute);
app.use('/api/safe',safeRoute);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

