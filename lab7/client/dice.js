// client/dice.js

/**
 * Dice class – rolls are fetched from the server (Lab 7 requirement).
 * This is very similar to your friend's version.
 */
export class Dice {
    constructor(numDice = 5) {
        this.numDice = numDice;

        // First render shows 1,2,3,4,5
        this.values = Array.from({ length: numDice }, (_, i) => i + 1);

        // Which dice are held (true = stay the same on next roll)
        this.held = Array(numDice).fill(false);
    }

    /**
     * Roll dice via the Node/Express server.
     * GET /roll-dices  →  [3, 5, 1, 6, 2]
     */
    async roll() {
        try {
            // same origin: http://localhost:3000/roll-dices
            const res = await fetch("/roll-dices");
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            const serverValues = await res.json(); // e.g. [3, 5, 1, 6, 2]

            // Only replace dice that are NOT held
            this.values = this.values.map((oldVal, i) => {
                if (this.held[i]) return oldVal;
                const newVal = serverValues[i];
                return typeof newVal === "number" ? newVal : oldVal;
            });

            console.log("🎲 /roll-dices from server:", this.values);
            return this.values;
        } catch (err) {
            console.error("❌ Error fetching dice from server:", err);

            // Fallback: local random roll so the game still works
            for (let i = 0; i < this.numDice; i++) {
                if (!this.held[i]) {
                    this.values[i] = Math.floor(Math.random() * 6) + 1;
                }
            }
            return this.values;
        }
    }

    toggleHold(i) {
        if (i < 0 || i >= this.numDice) return;
        this.held[i] = !this.held[i];
    }

    releaseAll() {
        this.held = this.held.map(() => false);
    }

    getValues() {
        return [...this.values];
    }
}