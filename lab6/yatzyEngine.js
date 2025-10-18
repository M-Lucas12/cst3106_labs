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

    // Check if 3 dice have the same value
    isThreeOfAKind(dice) {
        let counts = this.countDice(dice);
        for (let key in counts) {
            if (counts[key] >= 3) {
                return true;
            }
        }
        return false;
    }

    // Check if we have a Full House (3 of one + 2 of another)
    isFullHouse(dice) {
        let counts = Object.values(this.countDice(dice));
        return counts.includes(3) && counts.includes(2);
    }

    // Check if we have a Small Straight (1-2-3-4-5 or 2-3-4-5-6)
    isSmallStraight(dice) {
        let unique = [...new Set(dice)].sort().join("");
        return unique === "12345" || unique === "23456";
    }

    // Check if all dice are the same
    isYatzy(dice) {
        return dice.every(value => value === dice[0]);
    }
}