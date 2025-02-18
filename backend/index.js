require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 80; // Use env port or default to 80

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MySQL Database Connection (Using Pool for Better Performance)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ✅ Check Database Connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL Connection Error:', err);
  } else {
    console.log('✅ Connected to MySQL Database');
    connection.release(); // Release the connection
  }
});

// ✅ Route to Handle Form Submission
app.post('/submit', (req, res) => {
  try {
    let { email, projectType, meterType, metersInstalled } = req.body;

    // ✅ Validate Required Fields
    if (!email || !projectType || !meterType || !metersInstalled) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // ✅ Remove commas and convert to integer
    metersInstalled = parseInt(metersInstalled.replace(/,/g, ''), 10);

    // ✅ Insert Data into MySQL
    const sql = `INSERT INTO metersinstalled (email, projectType, meterType, metersInstalled) VALUES (?, ?, ?, ?)`;
    
    db.query(sql, [email, projectType, meterType, metersInstalled], (err, result) => {
      if (err) {
        console.error('❌ Database Insert Error:', err);
        return res.status(500).json({ error: 'Database error', details: err });
      }
      console.log('✅ Data Saved:', result);
      res.status(200).json({ message: 'Form data saved successfully!' });
    });
  } catch (error) {
    console.error('❌ Server Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ Root Route to Check Server Status
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// ✅ Start Express Server (Use only one server)
app.listen(port, () => {
  console.log(`🚀 Express Backend running at http://localhost:${port}`);
});
