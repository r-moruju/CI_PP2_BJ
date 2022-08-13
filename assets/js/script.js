
/*Global Variables*/
let deck = [];
let dealerCards = [];
let playerCards = [];
let dealerHand = document.getElementById("dealer-hand");
let playerHand = document.getElementById("player-hand");
let dealerValue = 0;
let playerValue = 0;

// Wait for page to load
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("run-game").addEventListener("click", runGame); 
})

/**
 * Clear the wellcome message.
 * Get player name and credit.
 */
function runGame() {
    document.getElementById("deal").addEventListener("click", deal);
    let credit = document.getElementById("credit").value;
    let playerName = document.getElementById("player-name").value;
    document.getElementById("message").style.display = "none";
    if (credit.length < 2) {
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
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);
    document.getElementById("deal").removeEventListener("click", deal);
    document.getElementById("end-game").style.display = "none";
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
    // Shuffle deck
    deck.sort(() => (Math.random() > .5) ? 1 : -1);

    // reset hands
    dealerHand.innerHTML = "";
    playerHand.innerHTML = "";
    playerCards = [];
    dealerCards = [];

    dealCardsFromDeck();
    showHandValue();
}

/**
 * Deal starting cards and display corresponding images
 */
function dealCardsFromDeck () {

    dealerCards.push(deck.pop());

    for (let i = 1; i <= 2; i++) {
        playerCards.push(deck.pop());
    }

    dealerHand.innerHTML = `
        <img src="assets/images/deck/${dealerCards[0].name}.png" alt="A game card">
        <img src="assets/images/deck/card_back.png" alt="A game card">
    `;

    for (let card of playerCards) {
        playerHand.innerHTML += `
            <img src="assets/images/deck/${card.name}.png" alt="A game card"></img>
        `;
    }
}

/**
 * Get hands value and update it on screen
 */
function showHandValue (){
    let playerHandValue = document.getElementById("player-score");
    let dealerHandValue = document.getElementById("dealer-score");

    dealerValue = 0;
    for (let card of dealerCards){
        dealerValue += card.value;
        dealerHandValue.innerText = dealerValue;
    }

    playerValue = 0;
    for (let card of playerCards){
        playerValue += card.value;
        playerHandValue.innerText = playerValue;
    }
}

/**
 * Add one card to player hand
 */
function hit() {
    let newCard = deck.pop();
    playerCards.push(newCard);
    playerHand.innerHTML += `
    <img src="assets/images/deck/${newCard.name}.png" alt="A game card"></img>
    `;
    showHandValue();
    checkForBust();
}

/**
 * deal cards to dealer
 */
function stand() {
    document.getElementById("stand").removeEventListener("click", stand);
    document.getElementById("hit").removeEventListener("click", hit);
    while (dealerValue < playerValue && dealerValue < 21) {
        let newCard = deck.pop();
        dealerCards.push(newCard);
        dealerHand.innerHTML = "";
        for (card of dealerCards) {
            dealerHand.innerHTML += `
                <img src="assets/images/deck/${card.name}.png" alt="A game card"></img>
            `;
        }
        showHandValue();
        checkForBust();
        if (dealerValue > playerValue) {
            let endGame = document.getElementById("end-game")
            let bet = document.getElementById("bet").value;
            endGame.innerHTML += `<p>Dealer won! You lost ${bet}.</p>`;
            endGame.style.display = "unset";
            document.getElementById("deal").addEventListener("click", deal);
        }
    }
}

function checkForBust() {
    let endGame = document.getElementById("end-game")
    let bet = document.getElementById("bet").value;
    endGame.innerHTML = ""
    if (playerValue > 21) {
        endGame.innerHTML += `<p>Bust! You lost ${bet}.</p>`;
        endGame.style.display = "unset";
        document.getElementById("deal").addEventListener("click", deal);
    } else if (dealerValue > 21) {
        endGame.innerHTML += `<p>Dealer Bust! You won ${bet}!</p>`;
        endGame.style.display = "unset";
        document.getElementById("deal").addEventListener("click", deal);
    } else if (playerValue === dealerValue) {
        endGame.innerHTML += "<p>It's a draw!</p>"
        endGame.style.display = "unset";
        document.getElementById("deal").addEventListener("click", deal);
    }
}