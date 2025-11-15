// server/server.js
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Allow CORS (safe even if not needed)
app.use(cors());
app.use(express.json());

// 🔹 Serve everything in ../client as static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "..", "client")));

// Health check (optional)
app.get("/api/ping", (req, res) => {
    res.json({ status: "ok", message: "pong from Lab 7 server" });
});

// 🔹 Lab endpoint: return 5 random dice values [1..6]
app.get("/roll-dices", (req, res) => {
    const dice = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * 6) + 1
    );
    res.json(dice);
});

// For any other route, send index.html (so http://localhost:3000 works)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});