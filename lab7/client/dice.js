export class Dice {
    constructor(numDice = 5) {
        this.numDice = numDice;
        // Show 1..5 on first render
        this.values = Array.from({ length: numDice }, (_, i) => i + 1);
        this.held   = Array(numDice).fill(false);
    }

    roll() {
        for (let i = 0; i < this.numDice; i++) {
            if (!this.held[i]) this.values[i] = Math.floor(Math.random() * 6) + 1;
        }
        return this.values;
    }

    toggleHold(i) {
        if (i < 0 || i >= this.numDice) return;
        this.held[i] = !this.held[i];
    }

    releaseAll() {
        this.held = this.held.map(() => false);
    }
}