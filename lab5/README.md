# 🎲 Yatzy Game – Design Documentation

## 1. Overview
Yatzy is a five-dice game where players roll the dice up to three times per turn to make the best scoring combinations.

## 2. Rules Summary
- Roll 5 dice at the start of each turn.
- You can keep or reroll any dice (two rerolls maximum).
- Each turn you must record a score in a category.
- The game ends when all categories are filled.
- Highest total wins.

## 3. Design System
| Role | Color | Hex |
|-------|--------|------|
| Primary | Deep Blue | `#007BFF` |
| Secondary | Gold | `#FFD700` |
| Accent | Slate Gray | `#555555` |
| Background | White | `#FFFFFF` |

### Fonts
- **Headings:** Poppins (sans-serif)
- **Body:** Roboto (sans-serif)

**Rationale:** Blue and gold give a playful but professional look. Slate gray balances contrast and white keeps it clean.

## 4. Dice Design
- Square dice (80 × 80 px)
- Rounded corners (12 px)
- White background with black pips
- Subtle shadow for depth

## 5. Game Layout and Flow
The game mock-up includes:
- Title header
- Dice area with five dice elements
- Buttons for roll / reset
- Scorecard table to record scores
- Footer with total score section