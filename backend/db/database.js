const { Client } = require('pg');
require('dotenv').config();

const conn = new Client({
 host: process.env.DB_HOST || 'localhost',
  user: process.env.USER,
  password: process.env.PASS,
  port: process.env.PORT || 5432,
  database: process.env.NAME,
});

module.exports = conn;
