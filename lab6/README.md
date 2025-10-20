# 🎲 Yatzy Game – Design Documentation

## 1️⃣ Overview
This project is a visual mock-up for the classic dice game **Yatzy**.  
The goal is to create a calm, minimal, and relaxing web layout using **blue and white** tones.

## 2️⃣ Rules Summary
- Players roll five dice up to three times per turn.
- They may keep or re-roll any dice between rolls.
- After each turn, a category must be scored.
- The game ends when all categories are filled.
- Highest total wins 🎉

## 3️⃣ Design System
| Role | Color | Hex |
|------|--------|------|
| Primary | Soft Sky Blue | `#5DA9E9` |
| Secondary | Deep Blue | `#004B87` |
| Background | White | `#FFFFFF` |
| Accent | Light Gray | `#F2F4F7` |

**Fonts**
- Headings → `Poppins, sans-serif`
- Body → `Roboto, sans-serif`

**Rationale:** Blue tones feel peaceful and clean against white. Soft gray accents keep the layout balanced and relaxing.

## 4️⃣ Layout Plan
| Panel | Content |
|--------|-----------|
| Left Panel | Five dice in one row inside a tall panel for future features |
| Right Panel | Scoreboard table showing Category / Scoring Rule / Points |

The mock-up focuses on structure and visual design, not game logic.

---

## 5️⃣ Yatzy Game Design & Modularization Discussion

The **Yatzy game** is designed around **modular programming principles**, where each part of the system handles a specific responsibility.  
This makes the code easier to maintain, extend, and debug. The game logic is divided into three main modules:

### 🧩 1. `dice.js` – Dice Module
- Responsible for representing a die or a set of dice.
- Handles rolling functionality and generating random values.
- Can be reused independently in other dice-based games.

### ⚙️ 2. `yatzyEngine.js` – Game Engine Module
- Contains the rules and scoring logic of Yatzy.
- Calculates scores for each category (e.g., full house, straight, yatzy).
- Manages validation of rolls and combinations.

### 🎮 3. `yatzyGame.js` – Game Controller Module
- Manages the flow of the game: rounds, turns, and total score.
- Communicates between the dice and engine modules.
- Could later connect to a graphical interface or player system.

### 🧱 Design Benefits
- **Modularity:** Each file focuses on one task, improving clarity and separation of concerns.
- **Reusability:** The `Dice` and `YatzyEngine` modules can be reused in other games or projects.
- **Scalability:** Future features (e.g., multiplayer mode or leaderboard) can be added without breaking existing code.
- **Maintainability:** Debugging and updates are easier since logic is organized by purpose.

This modular approach reflects good software engineering practices, ensuring the Yatzy project is **organized, flexible, and ready for future development**.

---

## 6️⃣ Future Enhancements
- Add interactive dice rolling with animations.
- Connect scoring logic to the visual scoreboard.
- Implement player turns and real-time score updates.
- Introduce sound and light effects for a more engaging experience.

---

© 2025 Lucas Muteta – CST3106 Lab 06