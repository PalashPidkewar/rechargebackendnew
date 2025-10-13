// config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pathrecharge_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port:23223

});

module.exports = pool;
