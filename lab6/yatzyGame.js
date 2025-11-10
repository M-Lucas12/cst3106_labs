// ============================================================
// 🎮 Yatzy Game Module – Assignment 1
// Controls full game flow: dice rolls, holding, scoring, and UI
// ============================================================

import { Dice } from "./dice.js";
import { YatzyEngine } from "./yatzyEngine.js";

export class YatzyGame {
    constructor() {
        // === GAME STATE ===
        this.round = 1;
        this.rollsLeft = 3;
        this.totalScore = 0;
        this.dice = new Dice(5);             // 5 dice
        this.engine = new YatzyEngine();     // scoring logic

        // === UI ELEMENTS ===
        this.ui = {
            rollBtn: document.getElementById("roll-btn"),
            endBtn: document.getElementById("end-btn"),
            newBtn: document.getElementById("new-btn"),
            status: document.getElementById("status"),
            diceRow: document.getElementById("dice-row"),
            totalCell: document.getElementById("total-points"),
            scoreboard: document.querySelector("#scoreboard table tbody")
        };

        // Initialize UI
        this.setupUI();
    }

    // ============================================================
    // 🔧 SETUP METHODS
    // ============================================================
    setupUI() {
        // Create 5 dice buttons
        for (let i = 0; i < 5; i++) {
            const btn = document.createElement("button");
            btn.className = "die";
            btn.innerHTML = `
                <span class="pip p1"></span><span class="pip p2"></span><span class="pip p3"></span>
                <span class="pip p4"></span><span class="pip p5"></span><span class="pip p6"></span>
                <span class="pip p7"></span><span class="pip p8"></span><span class="pip p9"></span>
            `;
            btn.dataset.face = "1";
            btn.dataset.index = i;
            btn.onclick = () => this.toggleHold(i);
            this.ui.diceRow.appendChild(btn);
        }
        this.ui.diceButtons = this.ui.diceRow.querySelectorAll(".die");

        // Hook up buttons
        this.ui.rollBtn.onclick = () => this.rollDice();
        this.ui.endBtn.onclick = () => this.endTurn();
        this.ui.newBtn.onclick = () => this.startNewGame();

        // Initial state
        this.updateButtons();
        this.renderDice(true);
        this.setStatus("Welcome! Click Roll to start.");
    }

    // ============================================================
    // 🎲 GAME ACTIONS
    // ============================================================
    rollDice() {
        if (this.rollsLeft <= 0) return;
        const results = this.dice.roll();
        this.rollsLeft--;
        this.renderDice();
        this.setStatus(`You rolled: ${results.join(", ")} (${this.rollsLeft} rolls left)`);
        this.updateButtons();
    }

    toggleHold(index) {
        this.dice.toggleHold(index);
        this.renderDice();
    }

    endTurn() {
        // Simple scoring example (sum of dice)
        const roundScore = this.dice.values.reduce((a, b) => a + b, 0);
        this.totalScore += roundScore;
        this.ui.totalCell.textContent = this.totalScore;
        this.setStatus(`Round ${this.round} scored ${roundScore} points!`);
        this.round++;
        this.rollsLeft = 3;
        this.dice.resetHold();
        this.renderDice(true);
        this.updateButtons();
    }

    startNewGame() {
        this.round = 1;
        this.rollsLeft = 3;
        this.totalScore = 0;
        this.ui.totalCell.textContent = "0";
        this.dice.resetHold();
        this.renderDice(true);
        this.setStatus("New game started! Click Roll to begin.");
        this.updateButtons();
    }

    // ============================================================
    // 🎯 RENDERING + UI
    // ============================================================
    renderDice(reset = false) {
        this.ui.diceButtons.forEach((btn, i) => {
            btn.setAttribute("data-face", this.dice.values[i]);
            btn.setAttribute("aria-pressed", reset ? "false" : String(this.dice.held[i]));
        });
    }

    updateButtons() {
        this.ui.rollBtn.disabled = this.rollsLeft <= 0;
        this.ui.endBtn.disabled = this.rollsLeft === 3; // can't end before rolling
    }

    setStatus(msg) {
        this.ui.status.textContent = msg;
    }
}