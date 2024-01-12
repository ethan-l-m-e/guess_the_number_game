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

    clearTable();

    playerInput.addEventListener("submit", (e) => {
        e.preventDefault();

        decrementTurnsLeft();
        showTable();

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
        turnsLeft = 5;
        playerTurnsText.innerHTML = `You have ${turnsLeft} turns left`;
        toggleAcceptInput();
        clearTable();
        hideTable();
    });

    /**
     * Different guess results
     */
    function playerWins() {
        responseText.innerHTML = "You Win!"
        toggleAcceptInput();
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
            tableInsertLow(guess);
        } else {
            responseText.innerHTML = `Your guess, ${guess}, is too high`;
            tableInsertHigh(guess);
        }       
    }

    function playerLoses() {
        responseText.innerHTML = "You Lose!"
        toggleAcceptInput();
    }

    /**
     * Functions for utility
     */
    function decrementTurnsLeft() {
        turnsLeft--;
        playerTurnsText.innerHTML = `You have ${turnsLeft} turns left`;
    }

    // Disables or enables player from entering a new guess
    function toggleAcceptInput() {
        document.getElementById("guess").toggleAttribute("disabled");
        document.getElementById("submitButton").toggleAttribute("disabled");
    }

    // Inserts low guesses into table for player's reference
    function tableInsertLow(guess) {
        let lowGuesses = document.getElementById("lowGuesses");
        if (lowGuesses.innerHTML == "") {
            lowGuesses.innerHTML = guess;
        } else {
            lowGuesses.innerHTML = lowGuesses.innerHTML + "<br>" + guess;
        }
    }

    // Inserts high guesses into table for player's reference
    function tableInsertHigh(guess) {
        let highGuesses = document.getElementById("highGuesses");
        if (highGuesses.innerHTML == "") {
            highGuesses.innerHTML = guess;
        } else {
            highGuesses.innerHTML = highGuesses.innerHTML + "<br>" + guess;
        }
    }

    // Clears table of guess data when a new game begins
    function clearTable() {
        document.getElementById("lowGuesses").innerHTML = "";
        document.getElementById("highGuesses").innerHTML = "";
    }

    // Table visibility when player has not made any guesses yet
    function hideTable() {
        document.getElementById("guessHistory").style.display = "none";
    }

    function showTable() {
        document.getElementById("guessHistory").style.display = "block";
    }
}