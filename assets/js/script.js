console.log('my first console log');

document.getElementById("run-game").addEventListener("click", runGame);
/**
 * Clear the wellcome message.
 * Get player name and credit.
 */
function runGame() {
    let credit = document.getElementById("credit").value;
    let playerName = document.getElementById("player-name").value;
    document.getElementById("message").style.display = "none";
    if (credit.length < 20) {
        document.getElementById("credit-left").innerText = "20";
    } else {
        document.getElementById("credit-left").innerText = credit;
    }
    if (playerName.length < 1) {
        document.getElementById("player-name-display").innerText = "Player";
    } else {
        document.getElementById("player-name-display").innerText = playerName;
    } 
}