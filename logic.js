// Check that the page has loaded completely
window.addEventListener("load", ready);

// Main function of the game
function ready() {
    let playerInput = document.getElementById("playerInput");
    let playerTurnsText = document.getElementById("playerTurnsText");
    let responseText = document.getElementById("responseText");
    // Number to be guessed to win the game
    let myNumber = Math.floor(Math.random() * 9) + 1;
    let turnsLeft = 5;

    playerInput.addEventListener("submit", (e) => {
        e.preventDefault();

        // Handle the player's input
        decrementTurnsLeft();
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
        turnsLeft = 5;
        playerTurnsText.innerHTML = `You have ${turnsLeft} turns left`;
    });

    /**
     * Different guess results
     */
    function playerWins() {
        responseText.innerHTML = "You Win!"
    }

    function playerGuessesWrong(guess) {
        // Game is over if out of turns
        if (turnsLeft == 0) {
            playerLoses();
            return
        }

        // Else feedback to the player
        if (guess < myNumber) {
            responseText.innerHTML = `Your guess, ${guess}, is too low`;
        } else {
            responseText.innerHTML = `Your guess, ${guess}, is too high`;
        }       
    }

    function playerLoses() {
        responseText.innerHTML = "You Lose!"
    }

    /**
     * Functions for utility
     */
    function decrementTurnsLeft() {
        turnsLeft--;
        playerTurnsText.innerHTML = `You have ${turnsLeft} turns left`;
    }
}