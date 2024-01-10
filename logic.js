// Check that the page has loaded completely
window.addEventListener("load", ready);

// Main function of the game
function ready() {
    let gameForm = document.getElementById("gameForm");
    gameForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Handle the player's input
        let guess = document.getElementById("guess");
        console.log(guess.value);
    })
}