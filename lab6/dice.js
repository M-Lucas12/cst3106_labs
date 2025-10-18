// === Dice Module ===
// This class will handle the creation and rolling of dice values
class Dice {
    constructor(numDice) {
        this.numDice = numDice;   // number of dice to roll
        this.values = [];         // store dice values
    }

    // Roll all dice and store the random results
    roll() {
        this.values = [];
        for (let i = 0; i < this.numDice; i++) {
            let value = Math.floor(Math.random() * 6) + 1;
            this.values.push(value);
        }
        return this.values;
    }
}