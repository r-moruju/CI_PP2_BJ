
/*Global Variables*/
let deck = [];
let dealerCards = [];
let playerCards = [];
let dealerHand = document.getElementById("dealer-hand");
let playerHand = document.getElementById("player-hand");
let dealerValue = 0;
let playerValue = 0;
let screenSize = screen.width;
let screenHeight = screen.height;

adjustWrapperHeight();

/**
 * This function adjusts the height of the main page wrapper based on the screen size
 */
function adjustWrapperHeight() {
    if(screenHeight > 700){
        document.getElementById("main-wrapper").style.height = `${screenHeight - 100}px`;
    }
}

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
    // Error handdle if user does not enter any detail
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
    checkForCredit();
    disableBet();
    enableListener("hit", hit);
    enableListener("stand", stand);
    disableListener("deal", deal);
    document.getElementById("end-game").style.display = "none";
    let playerHandValue = document.getElementById("player-score");
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
    
    checkForCredit();
    dealCardsFromDeck();
    showHandValue();
    // Check if player got 21 and force to stand
    if (playerValue === 21){
        disableListener("hit", hit);
        disableListener("stand" ,stand);
        playerHandValue.innerText = "Blackjack";
        let endGame = document.getElementById("end-game");
        let alert = document.getElementById("alert");
        let bet = parseInt(document.getElementById("bet").value);
        let wins = parseInt(document.getElementById("wins").innerText);
        alert.innerHTML = `Blackjack!! <br> You won 1.5x${bet}`;
        // Adjust credit
        let credit = parseInt(document.getElementById("credit-left").innerText);
        credit += bet * 1.5;
        wins += bet * 1.5;
        // update credit
        document.getElementById("credit-left").innerText = credit;
        document.getElementById("wins").innerText = wins;

        endGame.style.display = "unset";
        enableBet();
        enableListener("deal", deal);
    }
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
    // Check if player got 21 and force to stand
    if (playerValue === 21){
        stand();
    }
}

/**
 * deal cards to dealer and check if dealer won
 */
function stand() {
    disableListener ("stand", stand);
    disableListener ("hit", hit);
    while (dealerValue < playerValue && dealerValue < 17) {
        let newCard = deck.pop();
        dealerCards.push(newCard);
        dealerHand.innerHTML = ""; // reset dealer hand
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
            
            alert.innerText = `Dealer won! You lost ${bet} credits.`;
            // Adjust credit
            let credit = parseInt(document.getElementById("credit-left").innerText);
            credit -= bet;
            wins -= bet;
            // update credit
            document.getElementById("credit-left").innerText = credit;
            document.getElementById("wins").innerText = wins;

            endGame.style.display = "unset";
            enableListener("deal", deal);
            enableBet();
        }
        displayWins();
    }
    // Check if player won by points value
    if (playerValue > dealerValue) {
        let endGame = document.getElementById("end-game");
        let alert = document.getElementById("alert");
        let bet = parseInt(document.getElementById("bet").value);
        let wins = parseInt(document.getElementById("wins").innerText);
        alert.innerHTML = `Dealer stand on ${dealerValue}<br>You won ${bet} credits!`;
        // Adjust credit
        let credit = parseInt(document.getElementById("credit-left").innerText);
        credit += bet;
        wins += bet;
        // update credit on screen
        document.getElementById("credit-left").innerText = credit;
        document.getElementById("wins").innerText = wins;

        endGame.style.display = "unset";
        enableBet();
        enableListener("deal", deal);
    }
}

/**
 * Check if any of the players got bust
 */
function checkForBust() {
    addResponsiveness("dealer-hand");
    addResponsiveness("player-hand");
    let endGame = document.getElementById("end-game");
    let alert = document.getElementById("alert");
    let bet = parseInt(document.getElementById("bet").value);
    let wins = parseInt(document.getElementById("wins").innerText);
    // Check if player got bust
    if (playerValue > 21) {
        alert.innerText = `Bust! You lost ${bet} credits.`;
        // Silence listeners
        disableListener("stand", stand);
        disableListener("hit", hit);
        // Adjust credit
        let credit = parseInt(document.getElementById("credit-left").innerText);
        credit -= bet;
        wins -= bet;
        // update credit on screen
        document.getElementById("credit-left").innerText = credit;
        document.getElementById("wins").innerText = wins;

        endGame.style.display = "unset";
        enableBet();
        enableListener("deal", deal);
    // Check if the dealer got bust
    } else if (dealerValue > 21) {
        alert.innerText = `Dealer Bust! You won ${bet} credits!`;
        // Adjust credit
        let credit = parseInt(document.getElementById("credit-left").innerText);
        credit += bet;
        wins += bet;
        // update credit on screen
        document.getElementById("credit-left").innerText = credit;
        document.getElementById("wins").innerText = wins;

        endGame.style.display = "unset";
        enableBet();
        enableListener("deal", deal);
    // Check if draw
    } else if (playerValue === dealerValue) {
        alert.innerText = "It's a draw!";
        endGame.style.display = "unset";
        enableBet();
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
        //document.getElementById("end-game").style.height = "200px";
        document.getElementById("end-game").style.display = "unset";
        javascriptAbort();
    }
}

/**
 * This is to abort javascript in case credit is low
 */
function javascriptAbort() {
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

/**
 * Disable select element to lock in the bet
 */
function disableBet () {
    document.getElementById("bet").setAttribute("disabled", "");
}

/**
 * Re-Enable select element
 */
function enableBet () {
    document.getElementById("bet").removeAttribute("disabled");
}

/**
 * This funtion check the screen size and number of players card in hand
 * and adjust css for responsiveness
 * @param {*} id targeted id
 */
function addResponsiveness(id) {
    let imgChildrens = document.getElementById(id).children;
    let ofSetLeft = 20;
    if (screenSize < 400 & imgChildrens.length > 4){
        ofSetLeft -= 10;
        for( let img of imgChildrens){
            img.style.position = "absolute";
            img.style.left = `${ofSetLeft}%`;
            ofSetLeft += 10;
        }
    } else if (screenSize < 750 & imgChildrens.length > 3){
        for( let img of imgChildrens){
            img.style.position = "absolute";
            img.style.left = `${ofSetLeft}%`;
            ofSetLeft += 10;
        }
    } else if (screenSize < 400 & imgChildrens.length > 2){
        for( let img of imgChildrens){
            img.style.position = "absolute";
            img.style.left = `${ofSetLeft}%`;
            ofSetLeft += 10;
        }
    } 
}