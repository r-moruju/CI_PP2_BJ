
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

document.getElementsByClassName("close")[0].addEventListener("click", closeModal);

/**
 * Clear the wellcome message.
 * Get player name and credit.
 */
function runGame() {
    enableListener("deal", deal);
    disableListener("hit", hit);
    disableListener("stand" ,stand);
    let credit = document.getElementById("credit").value;
    let playerName = document.getElementById("player-name").value;
    document.getElementById("welcome-message").style.display = "none";
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
    checkForCredit()
    enableListener("hit", hit);
    enableListener("stand", stand);
    disableListener("deal", deal);
    document.getElementById("end-game").style.display = "none";
    let cardsSuits = ["clubs", "diamonds", "hearts", "spades"];
    let cardsValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "ace", "jack", "queen", "king"];
    // Reset deck
    deck = [];
    // Create deck
    for (let suit of cardsSuits) {
        for (let value of cardsValues) {
            let card = {};
            card.name = value + "_of_" + suit;
            if (value.length < 3) {
                card.value = parseInt(value);
            // Set ace value to 11
            } else if (value.length === 3) {
                card.value = 11;
            // Set face cards value to 10
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
    
    checkForCredit()
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
    disableListener ("stand", stand);
    disableListener ("hit", hit);
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
            let alert = document.getElementById("alert");
            let bet = document.getElementById("bet").value;
            let wins = parseInt(document.getElementById("wins").innerText);
            
            alert.innerText = `Dealer won! You lost ${bet}.`;

            // Adjust credit
            let credit = parseInt(document.getElementById("credit-left").innerText);
            credit -= bet;
            wins -= bet;
            document.getElementById("credit-left").innerText = credit;
            document.getElementById("wins").innerText = wins;

            endGame.style.display = "unset";
            enableListener("deal", deal);
        }
        displayWins();
    }
}

/**
 * Check if any of the players got bust
 */
function checkForBust() {
    let endGame = document.getElementById("end-game");
    let alert = document.getElementById("alert");
    let bet = parseInt(document.getElementById("bet").value);
    let wins = parseInt(document.getElementById("wins").innerText);

    if (playerValue > 21) {
        alert.innerText = `Bust! You lost ${bet}.`;
        // Silence listeners
        disableListener("stand", stand);
        disableListener("hit", hit)

        // Adjust credit
        let credit = parseInt(document.getElementById("credit-left").innerText);
        credit -= bet;
        wins -= bet;
        document.getElementById("credit-left").innerText = credit;
        document.getElementById("wins").innerText = wins;

        endGame.style.display = "unset";
        enableListener("deal", deal);
    } else if (dealerValue > 21) {
        alert.innerText = `Dealer Bust! You won ${bet}!`;

        // Adjust credit
        let credit = parseInt(document.getElementById("credit-left").innerText);
        credit += bet;
        wins += bet;
        document.getElementById("credit-left").innerText = credit;
        document.getElementById("wins").innerText = wins;

        endGame.style.display = "unset";
        enableListener("deal", deal);
    } else if (playerValue === dealerValue) {
        alert.innerText = "It's a draw!";
        endGame.style.display = "unset";
        enableListener("deal", deal);
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
 * @param {*} list Player cards
 * @param {*} value Player cards value
 * @returns New updated cards value
 */
function checkForAce (list, value) {
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

/**
 * Check if player have enough credit
 */
function checkForCredit() {
    let bet = parseInt(document.getElementById("bet").value);
    let credit = parseInt(document.getElementById("credit-left").innerText);

    if (bet > credit) {
        document.getElementById("alert").innerHTML = `<p>You are out of credit</p><p>Back <a href="index.html">home</a></p><p>Or change bet</p>`;
        document.getElementById("end-game").style.height = "200px";
        document.getElementById("end-game").style.display = "unset";
        javascript_abort();
    }
}

/**
 * This is to abort javascript in case credit is low
 */
function javascript_abort() {
    throw new Error('This is not an error. This is just to abort javascript');
}

/**
 * Close Modal window
 */
 function closeModal() {
    let endGame = document.getElementById("end-game");
    endGame.style.display = "none";
}

/**
 * Remove event listener and ajust css hover feature
 * @param {*} id targeted id 
 * @param {*} func function to be removed from listener
 */
function disableListener (id, func) {
    document.getElementById(id).removeEventListener("click", func);
    document.getElementById(id).classList.remove("hover");
}

/**
 * Add event listener and ajust css hover feature
 * @param {*} id targeted id
 * @param {*} func function to be executed when listener trigger
 */
function enableListener (id, func) {
    document.getElementById(id).addEventListener("click", func);
    document.getElementById(id).classList.add("hover");
}