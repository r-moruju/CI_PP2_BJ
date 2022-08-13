
/*Global Variables*/
let deck = []

document.getElementById("run-game").addEventListener("click", runGame);
document.getElementById("deal").addEventListener("click", deal)

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

/**
 * Create card deck
 * Shuffle deck
 * Deal cards
 */
function deal() {
    let cardsSuits = ["clubs", "diamonds", "hearts", "spades"];
    let cardsValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "ace", "jack", "queen", "king"];
    for (let suit of cardsSuits) {
        for (let value of cardsValues) {
            let card = {}
            card.name = value + "_of_" + suit;
            if (value.length < 3) {
                card.value = parseInt(value);
            } else {
                card.value = 10;
            }
            deck.push(card)
        }
    }
    /* Shuffle deck */
    deck.sort(() => (Math.random() > .5) ? 1 : -1);
    dealCardsFromDeck();
}

function dealCardsFromDeck () {
    let dealerHand = document.getElementById("dealer-hand");
    let playerHand = document.getElementById("player-hand");
    dealerHand.innerHTML = `
        <img src="assets/images/deck/${deck.pop().name}.png" alt="A game card">
        <img src="assets/images/deck/card_back.png" alt="A game card">
    `;
    playerHand.innerHTML = `
        <img src="assets/images/deck/${deck.pop().name}.png" alt="A game card">
        <img src="assets/images/deck/${deck.pop().name}.png" alt="A game card">
    `;
}