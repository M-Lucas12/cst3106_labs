// main.js
import { YatzyGame } from "./yatzyGame.js";

/** Ensure the 5 dice buttons exist (with 9 pip spans each) */
function ensureDiceButtons(rowEl, count = 5) {
    if (!rowEl) return;
    if (rowEl.querySelector(".die")) return; // already present

    for (let i = 0; i < count; i++) {
        const btn = document.createElement("button");
        btn.className = "die";
        btn.dataset.index = i;
        btn.dataset.face = "1";
        btn.setAttribute("aria-pressed", "false");
        btn.title = "Toggle hold";
        for (let p = 1; p <= 9; p++) {
            const s = document.createElement("span");
            s.className = `pip p${p}`;
            btn.appendChild(s);
        }
        rowEl.appendChild(btn);
    }
}

// Make sure the dice exist before initializing the game
const diceRow = document.getElementById("dice-row");
ensureDiceButtons(diceRow);

// Collect all UI references for YatzyGame (game status stays here)
const ui = {
    diceButtons: [...document.querySelectorAll(".die")],
    rollBtn: document.getElementById("rollBtn"),
    newGameBtn: document.getElementById("newGameBtn"),
    status: document.getElementById("status"),        // <-- game messages only
    scoreRows: document.getElementById("scoreRows"),
    totalScore: document.getElementById("totalScore"),
};

// Initialize game
new YatzyGame(ui);

// -------- Server connectivity badge (separate from game status) --------
const API_BASE =
    location.hostname === "localhost" || location.hostname === "127.0.0.1"
        ? "http://localhost:3000"
        : ""; // same-origin in production

const serverBadge = document.getElementById("serverStatus");

fetch(`${API_BASE}/api/ping`)
    .then((res) => res.json())
    .then((data) => {
        console.log("✅ Server says:", data);
        if (serverBadge) {
            serverBadge.textContent = "🟢 Server Online";
            serverBadge.style.color = "#118a32";
        }
    })
    .catch(() => {
        if (serverBadge) {
            serverBadge.textContent = "🔴 Server Offline (Local Only)";
            serverBadge.style.color = "#b01515";
        }
    });