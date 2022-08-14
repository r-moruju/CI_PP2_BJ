
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
});

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
            let card = {};
            card.name = value + "_of_" + suit;
            if (value.length < 3) {
                card.value = parseInt(value);
            } else if (value.length === 3) {
                card.value = 11;
            } else {
                card.value = 10;
            }
            deck.push(card);
        }
    }
    // Shuffle deck
    deck.sort(() => (Math.random() > 0.5) ? 1 : -1);

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
    }
    dealerValue = checkForAce(dealerCards, dealerValue);
     dealerHandValue.innerText = dealerValue;

    playerValue = 0;
    for (let card of playerCards){
        playerValue += card.value;
    }
    playerValue = checkForAce(playerCards, playerValue);
    playerHandValue.innerText = playerValue;
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
 * deal cards to dealer and check if dealer won
 */
function stand() {
    document.getElementById("stand").removeEventListener("click", stand);
    document.getElementById("hit").removeEventListener("click", hit);
    while (dealerValue < playerValue && dealerValue < 21) {
        let newCard = deck.pop();
        dealerCards.push(newCard);
        dealerHand.innerHTML = "";
        for (let card of dealerCards) {
            dealerHand.innerHTML += `
                <img src="assets/images/deck/${card.name}.png" alt="A game card"></img>
            `;
        }
        showHandValue();
        checkForBust();

        // Check if dealer won by points value
        if (dealerValue > playerValue && dealerValue < 22) {
            let endGame = document.getElementById("end-game");
            let bet = document.getElementById("bet").value;
            let wins = parseInt(document.getElementById("wins").innerText);
            endGame.innerHTML = "";
            endGame.innerHTML += `<p>Dealer won! You lost ${bet}.</p>`;

            // Adjust credit
            let credit = parseInt(document.getElementById("credit-left").innerText);
            credit -= bet;
            wins -= bet;
            document.getElementById("credit-left").innerText = credit;
            document.getElementById("wins").innerText = wins;

            endGame.style.display = "unset";
            document.getElementById("deal").addEventListener("click", deal);
        }
        displayWins();
    }
}

/**
 * Check if any of the players got bust
 */
function checkForBust() {
    let endGame = document.getElementById("end-game");
    let bet = parseInt(document.getElementById("bet").value);
    let wins = parseInt(document.getElementById("wins").innerText);
    endGame.innerHTML = "";

    if (playerValue > 21) {
        endGame.innerHTML += `<p>Bust! You lost ${bet}.</p>`;

        // Adjust credit
        let credit = parseInt(document.getElementById("credit-left").innerText);
        credit -= bet;
        wins -= bet;
        document.getElementById("credit-left").innerText = credit;
        document.getElementById("wins").innerText = wins;

        endGame.style.display = "unset";
        document.getElementById("deal").addEventListener("click", deal);
    } else if (dealerValue > 21) {
        endGame.innerHTML += `<p>Dealer Bust! You won ${bet}!</p>`;

        // Adjust credit
        let credit = parseInt(document.getElementById("credit-left").innerText);
        credit += bet;
        wins += bet;
        document.getElementById("credit-left").innerText = credit;
        document.getElementById("wins").innerText = wins;

        endGame.style.display = "unset";
        document.getElementById("deal").addEventListener("click", deal);
    } else if (playerValue === dealerValue) {
        endGame.innerHTML += "<p>It's a draw!</p>";
        endGame.style.display = "unset";
        document.getElementById("deal").addEventListener("click", deal);
    }
    displayWins();
}

/**
 * Change wins color for negative or positive values
 */
function displayWins () {
    let wins = parseInt(document.getElementById("wins").innerText);
    if (wins < 0) {
        document.getElementById("wins").style.color = "#fa0000";
    } else {
        document.getElementById("wins").style.color = "green";
    }
}

/**
 * Check if players hands have aces and adjust hand value if over 21
 */
function checkForAce (list, value) {
    console.log(value);
    for (let i = 0; i < list.length; i++) {
        if (list[i].value === 11 && value > 21) {
            list[i].value = 1;
        }
    }
    value = 0;
    for (let card of list){
        value += card.value;
    }

    return value;
}