// client/main.js
import { YatzyGame } from "./yatzyGame.js";

/**
 * Create the 5 dice buttons (with 9 pip spans each) if they don't already exist.
 */
function ensureDiceButtons(rowEl, count = 5) {
    if (!rowEl) return;
    if (rowEl.querySelector(".die")) return; // already there

    for (let i = 0; i < count; i++) {
        const btn = document.createElement("button");
        btn.className = "die";
        btn.dataset.index = i;
        btn.dataset.face = "1";
        btn.setAttribute("aria-pressed", "false");
        btn.title = "Toggle hold";

        // 9 pip spans (p1–p9) for the CSS grid
        for (let p = 1; p <= 9; p++) {
            const s = document.createElement("span");
            s.className = `pip p${p}`;
            btn.appendChild(s);
        }

        rowEl.appendChild(btn);
    }
}

// Run once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    const diceRow = document.getElementById("dice-row");
    ensureDiceButtons(diceRow);

    const ui = {
        diceButtons: [...document.querySelectorAll(".die")],
        rollBtn: document.getElementById("rollBtn"),
        endTurnBtn: document.getElementById("endTurnBtn"),
        newGameBtn: document.getElementById("newGameBtn"),
        status: document.getElementById("status"),
        scoreRows: document.getElementById("scoreRows"),
        totalScore: document.getElementById("totalScore"),
    };

    // Initialize the game – inside here, handleRoll() calls Dice.roll() which uses fetch("/roll-dices")
    const game = new YatzyGame(ui);

    // (Optional) log to show game is created
    console.log("✅ YatzyGame instance created:", game);
});