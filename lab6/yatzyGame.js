// === Yatzy Game Module ===
// This file connects the Dice and YatzyEngine modules to control game flow

import { Dice } from "./dice.js";
import { YatzyEngine } from "./yatzyEngine.js";

export class YatzyGame {
    constructor() {
        this.round = 1;           // current round number
        this.totalScore = 0;      // player's total score
        this.currentPlayer = 1;   // player turn tracker
        this.dice = new Dice(5);  // 5 dice
        this.engine = new YatzyEngine(); // scoring engine
    }

    // Start a new game
    startNewGame() {
        this.round = 1;
        this.totalScore = 0;
        console.log("🎲 New Yatzy game started!");
    }

    // Play one round
    playRound() {
        let result = this.dice.roll();
        console.log("Round " + this.round + " roll: " + result);
    }

    // End current turn
    endTurn() {
        console.log("End of round " + this.round);
        this.round++;
    }

    // End game
    endGame() {
        console.log("Game Over! Final Score: " + this.totalScore);
    }
}