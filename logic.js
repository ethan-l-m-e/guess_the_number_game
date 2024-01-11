// Check that the page has loaded completely
window.addEventListener("load", ready);

// Main function of the game
function ready() {
    let playerInput = document.getElementById("playerInput");
    let responseText = document.getElementById("responseText");
    // Number to be guessed to win the game
    let myNumber = Math.floor(Math.random() * 9) + 1;

    playerInput.addEventListener("submit", (e) => {
        e.preventDefault();

        // Handle the player's input
        let guess = document.getElementById("guess");
        if (guess.value == myNumber) {
            playerWins();
        } else {
            playerGuessesWrong(guess.value);
        }

        // Clear the player's input
        guess.value = "";
    });

    // Game reset button
    document.getElementById("resetButton").addEventListener("click", () => {
        myNumber = Math.floor(Math.random() * 9) + 1;
        responseText.innerHTML = "";
    });

    /**
     * Different guess results
     */
    function playerWins() {
        responseText.innerHTML = "You Win!"
    }

    function playerGuessesWrong(guess) {
        if (guess < myNumber) {
            responseText.innerHTML = `Your guess, ${guess}, is too low`;
        } else {
            responseText.innerHTML = `Your guess, ${guess}, is too high`;
        }
    }
}