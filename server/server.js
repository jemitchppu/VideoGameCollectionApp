require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//Learing about .env files and the security benefits of it
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }

  console.log("Connected to MySQL database");
});

app.get("/", (req,res) => {
    res.send("Server is working!");
});

app.get("/api/games", (req,res) => {

    const sql = "SELECT * FROM games ORDER BY game_id ASC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Query failed:", err.message);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});