// client/yatzyGame.js
import { Dice } from "./dice.js";

/**
 * Simple scoring helper functions
 */
function countFaces(values) {
    const counts = {};
    for (const v of values) {
        counts[v] = (counts[v] || 0) + 1;
    }
    return counts;
}

function sum(values) {
    return values.reduce((a, b) => a + b, 0);
}

export class YatzyGame {
    constructor(ui) {
        this.ui = ui;
        this.dice = new Dice(5);
        this.rollsLeft = 3;
        this.total = 0;

        // Category scores (null = not yet used)
        this.scores = {
            Ones: null,
            Twos: null,
            Threes: null,
            Fours: null,
            Fives: null,
            Sixes: null,
            "Three of a Kind": null,
            "Four of a Kind": null,
            "Full House": null,
            "Small Straight": null,
            "Large Straight": null,
            Chance: null,
            Yatzy: null
        };

        // Wire up buttons
        this.ui.rollBtn?.addEventListener("click", () => this.handleRoll());
        this.ui.newGameBtn?.addEventListener("click", () => this.newGame());
        this.ui.endTurnBtn?.addEventListener("click", () => this.endTurn());

        // Wire scoreboard rows (they need data-cat="Ones", etc.)
        this.ui.scoreRows
            ?.querySelectorAll("tr[data-cat]")
            .forEach((row) => {
                row.addEventListener("click", () => {
                    const cat = row.dataset.cat;
                    this.scoreCategory(cat, row);
                });
            });

        // Dice click to hold/release
        this.ui.diceButtons.forEach((btn, i) => {
            btn.addEventListener("click", () => {
                this.dice.toggleHold(i);
                this.renderDice();
            });
        });

        this.renderDice();
        this.updateStatus("Welcome! Click Roll to start.");
    }

    // 🔹 NEW: Roll using async dice.roll() (server)
    async handleRoll() {
        if (this.rollsLeft <= 0) {
            this.updateStatus("No rolls left. Please score a category or start a new turn.");
            return;
        }

        const values = await this.dice.roll(); // 👈 awaits server /roll-dices
        this.rollsLeft--;

        this.renderDice();
        this.updateStatus(`Rolls left: ${this.rollsLeft}`);

        if (this.rollsLeft === 0) {
            this.updateStatus("No rolls left. Choose a category on the scoreboard.");
        }
    }

    endTurn() {
        this.rollsLeft = 3;
        this.dice.releaseAll();
        this.renderDice();
        this.updateStatus("New turn started. Click Roll.");
    }

    newGame() {
        this.total = 0;
        this.rollsLeft = 3;
        this.dice = new Dice(5);

        // Reset scores
        for (const key of Object.keys(this.scores)) {
            this.scores[key] = null;
        }

        // Clear scoreboard UI
        this.ui.scoreRows
            ?.querySelectorAll("tr[data-cat]")
            .forEach((row) => {
                const ptsCell = row.querySelector(".pts");
                if (ptsCell) ptsCell.textContent = "–";
                row.classList.remove("scored");
            });

        if (this.ui.totalScore) this.ui.totalScore.textContent = "0";

        this.renderDice();
        this.updateStatus("New game started! Click Roll to begin.");
    }

    /**
     * Score selected category with current dice values
     */
    scoreCategory(cat, row) {
        if (!cat) return;
        if (this.scores[cat] !== null) {
            this.updateStatus(`${cat} already scored.`);
            return;
        }

        const values = this.dice.getValues();
        const pts = this.computeScore(cat, values);
        this.scores[cat] = pts;
        this.total = Object.values(this.scores)
            .filter((v) => typeof v === "number")
            .reduce((a, b) => a + b, 0);

        const ptsCell = row.querySelector(".pts");
        if (ptsCell) ptsCell.textContent = pts;
        row.classList.add("scored");

        if (this.ui.totalScore) this.ui.totalScore.textContent = String(this.total);

        // Start next turn automatically
        this.endTurn();

        // Check if game finished
        if (Object.values(this.scores).every((v) => v !== null)) {
            this.updateStatus(`Game over! Final score: ${this.total}`);
            alert(`Game finished! Your total score is ${this.total}.`);
        }
    }

    /**
     * Scoring rules – same idea as your assignment & friend’s code
     */
    computeScore(cat, values) {
        const counts = countFaces(values);
        const byCount = Object.values(counts).sort((a, b) => b - a); // e.g. [3,2]
        const uniqueVals = Object.keys(counts).map(Number);
        const total = sum(values);

        switch (cat) {
            case "Ones":
            case "Twos":
            case "Threes":
            case "Fours":
            case "Fives":
            case "Sixes": {
                const face = ["Ones", "Twos", "Threes", "Fours", "Fives", "Sixes"].indexOf(cat) + 1;
                return (counts[face] || 0) * face;
            }
            case "Three of a Kind":
                return byCount[0] >= 3 ? total : 0;
            case "Four of a Kind":
                return byCount[0] >= 4 ? total : 0;
            case "Full House":
                return byCount[0] === 3 && byCount[1] === 2 ? 25 : 0;
            case "Small Straight": {
                const s = new Set(values);
                if (
                    [1, 2, 3, 4].every((n) => s.has(n)) ||
                    [2, 3, 4, 5].every((n) => s.has(n)) ||
                    [3, 4, 5, 6].every((n) => s.has(n))
                ) {
                    return 30;
                }
                return 0;
            }
            case "Large Straight": {
                const sorted = [...new Set(values)].sort((a, b) => a - b).join("");
                return sorted === "12345" || sorted === "23456" ? 40 : 0;
            }
            case "Chance":
                return total;
            case "Yatzy":
                return uniqueVals.length === 1 ? 50 : 0;
            default:
                return 0;
        }
    }

    /**
     * Update pip faces on the 5 dice buttons
     */
    renderDice() {
        const vals = this.dice.getValues();
        this.ui.diceButtons.forEach((btn, i) => {
            const v = vals[i] || 1;
            btn.dataset.face = String(v);
        });
    }

    updateStatus(msg) {
        if (this.ui.status) {
            this.ui.status.textContent = msg;
            this.ui.status.style.color = "#004B87";
        }
    }
}