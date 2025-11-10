// server/server.js  (CommonJS)
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve the built-in client (our static files)
const clientDir = path.join(__dirname, "../client");
app.use(express.static(clientDir));

// Simple API to verify server <-> client
app.get("/api/ping", (req, res) => {
    res.json({ ok: true, time: new Date().toISOString() });
});

// For any other route, return index.html (so refresh works)
app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDir, "index.html"));
});

// Start
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});