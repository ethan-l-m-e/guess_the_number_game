// Check that the page has loaded completely
window.addEventListener("load", ready);

// Main function of the game
function ready() {
    let gameForm = document.getElementById("gameForm");

    // Number to be guessed to win the game
    let myNumber = Math.floor(Math.random() * 9) + 1;

    gameForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Handle the player's input
        let guess = document.getElementById("guess");
        console.log(guess.value == myNumber);

        // Clear the player's input
        guess.value = "";
    })
}