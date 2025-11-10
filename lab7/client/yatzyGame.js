import { Dice } from "./dice.js";
import { YatzyEngine } from "./yatzyEngine.js";

export class YatzyGame {
    constructor(ui) {
        this.ui = ui;
        this.engine = new YatzyEngine();
        this.dice = new Dice(5);
        this.rollsLeft = 3;
        this.total = 0;
        this.scored = new Set();

        this.linkUI();
        this.renderDice();
    }

    linkUI() {
        this.ui.rollBtn.onclick = () => this.roll();
        this.ui.newGameBtn.onclick = () => this.newGame();
        this.ui.diceButtons.forEach((btn, i) =>
            btn.addEventListener("click", () => {
                this.dice.toggleHold(i);
                this.renderDice();
            })
        );
        this.ui.scoreRows.querySelectorAll("tr[data-cat]").forEach(row =>
            row.addEventListener("click", () => this.scoreCategory(row))
        );
    }

    roll() {
        if (this.rollsLeft <= 0) return;
        const result = this.dice.roll();
        this.rollsLeft--;
        this.renderDice();
        this.setStatus(`Rolled: ${result.join(", ")} (${this.rollsLeft} left)`);
    }

    scoreCategory(row) {
        const cat = row.dataset.cat;
        if (this.rollsLeft === 3 || this.scored.has(cat)) return;
        const pts = this.engine.score(cat, this.dice.values);
        row.classList.add("scored");
        row.querySelector(".pts").textContent = pts;
        this.total += pts;
        this.ui.totalScore.textContent = this.total;
        this.scored.add(cat);
        this.nextTurn();
    }

    nextTurn() {
        this.rollsLeft = 3;
        this.dice.releaseAll();
        this.renderDice();
        this.setStatus("Next turn — click Roll to continue!");
    }

    newGame() {
        this.rollsLeft = 3;
        this.total = 0;
        this.scored.clear();
        this.ui.totalScore.textContent = "0";
        this.dice.releaseAll();
        this.renderDice();
        this.ui.scoreRows.querySelectorAll("tr[data-cat]").forEach(r => {
            r.classList.remove("scored");
            r.querySelector(".pts").textContent = "–";
        });
        this.setStatus("New game started! Click Roll to begin.");
    }

    renderDice() {
        this.ui.diceButtons.forEach((btn, i) => {
            const value = this.dice.values[i];
            btn.dataset.face = value; // update pip pattern
            btn.setAttribute("aria-pressed", this.dice.held[i]);
        });
    }

    setStatus(msg) { this.ui.status.textContent = msg; }
}