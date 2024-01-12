// Check that the page has loaded completely
window.addEventListener("load", ready);

// Rules for this game
const maxGuess = 20;
const minGuess = 1;
const turns = 3;

// Main function of the game
function ready() {
    let gameInstructions = document.getElementById("gameInstructions");
    let playerInput = document.getElementById("playerInput");
    let playerTurnsText = document.getElementById("playerTurnsText");
    let responseText = document.getElementById("responseText");

    gameInit();
    
    // Reset the game to a starting state
    gameRestart();

    playerInput.addEventListener("submit", (e) => {
        e.preventDefault();

        decrementTurnsLeft();

        // Handle the player's input
        let guess = document.getElementById("guess");
        if (guess.value == myNumber) {
            playerWins();
        } else {
            showTable();
            playerGuessesWrong(guess.value);
        }

        // Clear the player's input
        guess.value = "";
    });

    // Game reset button
    document.getElementById("resetButton").addEventListener("click", gameRestart);

    function gameRestart() {
        myNumber = Math.floor(Math.random() * maxGuess) + 1;
        responseText.innerHTML = "";
        turnsLeft = turns;
        playerTurnsText.innerHTML = `You have ${turnsLeft} turns left`;
        enablePlayerInput();
        clearTable();
        hideTable();
        // Bring player straight into the input box
        guess.focus();
    }

    function gameOver() {
        disablePlayerInput();
        // Make it easy for player to press enter to restart
        document.getElementById("resetButton").focus();
    }

    // Sets up the game based on the predefined constants
    function gameInit() {
        gameInstructions.innerHTML = `Guess the secret number from ${minGuess} to ${maxGuess}. <br>
        Get closer with each guess! You'll get a hint if your guess is too high or too low.`;
        guess.setAttribute("min", minGuess);
        guess.setAttribute("max", maxGuess);
    }

    /**
     * Different guess results
     */
    function playerWins() {
        responseText.innerHTML = `You Win! The number was ${myNumber}!`
        gameOver();
    }

    function playerGuessesWrong(guess) {
        // Feedback to the player
        if (guess < myNumber) {
            responseText.innerHTML = `Your guess, ${guess}, is too low`;
            tableInsertLow(guess);
        } else {
            responseText.innerHTML = `Your guess, ${guess}, is too high`;
            tableInsertHigh(guess);
        }

        // Game is over if out of turns
        if (turnsLeft == 0) {
            playerLoses();
            return
        }
    }

    function playerLoses() {
        responseText.innerHTML = `You Lose! The number was ${myNumber}!`
        gameOver();
    }

    /**
     * Functions for utility
     */
    function decrementTurnsLeft() {
        turnsLeft--;
        playerTurnsText.innerHTML = `You have ${turnsLeft} turns left`;
    }

    // Disables or enables player from entering a new guess
    function disablePlayerInput() {
        document.getElementById("guess").setAttribute("disabled", "");
        document.getElementById("submitButton").setAttribute("disabled", "");
    }

    function enablePlayerInput() {
        document.getElementById("guess").removeAttribute("disabled", "");
        document.getElementById("submitButton").removeAttribute("disabled", "");
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