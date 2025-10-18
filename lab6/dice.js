// === Dice Module ===
// This class handles rolling dice and storing their values
export class Dice {
    constructor(numDice) {
        this.numDice = numDice;   // number of dice to roll
        this.values = [];         // stores dice values
    }

    // Roll all dice and return random values 1–6
    roll() {
        this.values = [];
        for (let i = 0; i < this.numDice; i++) {
            let value = Math.floor(Math.random() * 6) + 1;
            this.values.push(value);
        }
        return this.values;
    }
}