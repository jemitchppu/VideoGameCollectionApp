require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");

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

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json ({ message: "Email and password are required" });
    }

    const query = "SELECT * FROM users WHERE email = ? LIMIT 1";

    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Database error during login", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = results[0];

        bcrypt.compare(password, user.password_hash, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).json({ message: "Server error" });
            }

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            res.status(200).json({
                message: "Login Successful",
                user: {
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email,
                },
            });
        });
    });
});

app.post("/api/register", (req, res) => {
    const { name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Server Error"});
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).json({ message: "Server error" });
        }

        const query = `
        INSERT INTO users (name, email, password_hash)
        VALUES (?, ?, ?)
        `;

        db.query(query, [name, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("Database error:", err);

                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ message: "Email already exists"});
                    }

                return res.status(500).json({ message: "Database error"});
            }

            res.status(201).json({ message: "User registered successfully"});
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});