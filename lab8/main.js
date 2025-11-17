// main.js – Lab 8: jQuery dice animation on top of Yatzy-style UI

/**
 * Create 5 dice buttons inside #dice-row (each with 9 pips).
 * This is like your Lab 7 ensureDiceButtons helper.
 */
function createDiceButtons(rowEl, count = 5) {
    if (!rowEl) return;
    if (rowEl.querySelector(".die")) return; // already created

    for (let i = 0; i < count; i++) {
        const btn = document.createElement("button");
        btn.className = "die";
        btn.dataset.index = i;
        btn.dataset.face = "1"; // start with face 1 by default
        btn.setAttribute("aria-pressed", "false");
        btn.title = "Dice";

        // 9 pip spans (p1...p9) for CSS grid
        for (let p = 1; p <= 9; p++) {
            const span = document.createElement("span");
            span.className = `pip p${p}`;
            btn.appendChild(span);
        }

        rowEl.appendChild(btn);
    }
}

// Normal DOM ready to build dice,
// then jQuery for behavior/animation.
document.addEventListener("DOMContentLoaded", () => {
    const diceRow = document.getElementById("dice-row");
    createDiceButtons(diceRow);

    // Now switch to jQuery for the Lab 8 behavior
    const $dice = $(".die");
    const $rollBtn = $("#rollBtn");
    const $status = $("#status");

    /**
     * Helper to set face (1..6) on all dice or a single one.
     */
    function setFace($die, value) {
        const v = Math.min(6, Math.max(1, value));
        $die.attr("data-face", v);
    }

    /**
     * Roll button: animate + random dice
     */
    $rollBtn.on("click", function () {
        let rollsLeft = 3; // just for the label, not strict game logic
        $rollBtn.text(`Roll (${rollsLeft})`);

        // Disable while animating
        $rollBtn.prop("disabled", true);
        $status.text("Rolling...");

        // Add animation class to all dice
        $dice.addClass("rolling");

        let ticks = 0;
        const maxTicks = 15;    // how many “random flashes”
        const intervalMs = 80;  // speed of fake rolling

        const intervalId = setInterval(() => {
            // On each tick, show random faces on all dice
            $dice.each((i, el) => {
                const randomFace = Math.floor(Math.random() * 6) + 1;
                setFace($(el), randomFace);
            });

            ticks++;
            if (ticks >= maxTicks) {
                clearInterval(intervalId);

                // Stop CSS animation
                $dice.removeClass("rolling");

                // Final stable result for each die
                const finalValues = [];
                $dice.each((i, el) => {
                    const finalFace = Math.floor(Math.random() * 6) + 1;
                    setFace($(el), finalFace);
                    finalValues.push(finalFace);
                });

                const total = finalValues.reduce((a, b) => a + b, 0);

                $status.text(
                    `Final roll: ${finalValues.join(", ")} (Total = ${total})`
                );
                $rollBtn.text("Roll Again");
                $rollBtn.prop("disabled", false);
            }
        }, intervalMs);
    });

    // Optional: you can wire New Game to reset status + faces
    $("#newGameBtn").on("click", function () {
        $dice.each((i, el) => setFace($(el), 1));
        $status.text("New game (Lab 8) – click Roll to animate the dice.");
    });

    // End Turn in this lab just updates status (no full Yatzy scoring)
    $("#endTurnBtn").on("click", function () {
        $status.text("End Turn clicked – in Lab 8 focus is on the roll animation.");
    });
});