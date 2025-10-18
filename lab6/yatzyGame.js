// === Yatzy Game Module ===
// This file connects the Dice and YatzyEngine modules

import { Dice } from "./dice.js";
import { YatzyEngine } from "./yatzyEngine.js";

// This class manages the game flow and keeps track of rounds and score
class YatzyGame {
    constructor() {
        this.round = 1;           // current round number
        this.totalScore = 0;      // player’s total score
        this.currentPlayer = 1;   // player turn tracker
        this.dice = new Dice(5);  // create 5 dice
        this.engine = new YatzyEngine(); // scoring engine
    }
}