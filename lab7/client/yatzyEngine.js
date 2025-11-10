export class YatzyEngine {
    sum(d) { return d.reduce((a, b) => a + b, 0); }
    counts(d) {
        const c = {1:0,2:0,3:0,4:0,5:0,6:0};
        d.forEach(v => c[v]++);
        return c;
    }
    isFullHouse(d) {
        const v = Object.values(this.counts(d));
        return v.includes(3) && v.includes(2);
    }
    isSmallStraight(d) {
        const s = [...new Set(d)].sort().join('');
        return s.includes('1234') || s.includes('2345') || s.includes('3456');
    }
    isLargeStraight(d) {
        const s = [...new Set(d)].sort().join('');
        return s === '12345' || s === '23456';
    }
    isYatzy(d) { return d.every(v => v === d[0]); }

    score(cat, d) {
        const sum = this.sum(d);
        const counts = this.counts(d);
        switch(cat) {
            case "Ones": return (counts[1] || 0) * 1;
            case "Twos": return (counts[2] || 0) * 2;
            case "Threes": return (counts[3] || 0) * 3;
            case "Fours": return (counts[4] || 0) * 4;
            case "Fives": return (counts[5] || 0) * 5;
            case "Sixes": return (counts[6] || 0) * 6;
            case "Full House": return this.isFullHouse(d) ? 25 : 0;
            case "Small Straight": return this.isSmallStraight(d) ? 30 : 0;
            case "Large Straight": return this.isLargeStraight(d) ? 40 : 0;
            case "Yatzy": return this.isYatzy(d) ? 50 : 0;
            case "Chance": return sum;
            default: return 0;
        }
    }
}