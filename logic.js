// Check that the page has loaded completely
window.addEventListener("load", ready);

// Main function of the game
function ready() {
    let gameForm = document.getElementById("gameForm");
    let responseText = document.getElementById("responseText");
    // Number to be guessed to win the game
    let myNumber = Math.floor(Math.random() * 9) + 1;

    gameForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Handle the player's input
        let guess = document.getElementById("guess");
        if (guess.value == myNumber) {
            responseText.innerHTML = "You Win!"
        } else {
            if (guess.value < myNumber) {
                responseText.innerHTML = `Your guess, ${guess.value}, is too low`;
            } else {
                responseText.innerHTML = `Your guess, ${guess.value}, is too high`;
            }
        }

        // Clear the player's input
        guess.value = "";
    })
}