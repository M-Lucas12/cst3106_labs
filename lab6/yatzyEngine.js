// === Yatzy Engine Module ===
// This class will contain all the game rules and scoring functions
class YatzyEngine {
    constructor() {
        this.scores = {};   // to keep track of category scores
    }

    // Add up all dice values
    sumDice(dice) {
        let total = 0;
        for (let i = 0; i < dice.length; i++) {
            total += dice[i];
        }
        return total;
    }

    // Count how many times each number appears
    countDice(dice) {
        let counts = {};
        for (let i = 0; i < dice.length; i++) {
            let value = dice[i];
            if (counts[value]) {
                counts[value]++;
            } else {
                counts[value] = 1;
            }
        }
        return counts;
    }
}