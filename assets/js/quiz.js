let questions = [
    {
        question: "If you get a pair of Aces, you should always__?",
        choices: ["Hit",
        "Split",
        "Double Down",
        "Stand"
    ],
        answer: "Split",
    },
    {
        question: "You should always split a pair of 9s if the dealer gets a 7.",
        choices: [
            "True",
            "False"
        ],
        answer: "False"
    },
    {
        question: "If you are dealt a 16 and the dealer has a face card. What should you always do?",
        choices: [
            "Hit",
            "Stand"
        ],
        answer: "Hit"
    },
    {
        question: "You got a pair of 9s against the dealer's 7 upcard. Should you double down after splitting the 9s?",
        choices: [
            "True",
            "False"
        ],
        answer: "False"
    },
    {
        question: "Always take Even Money on a blackjack hand when the dealer up card is an Ace.",
        choices: [
            "True",
            "False"
        ],
        answer: "False"
    },
    {
        question: "What constitutes a 'blackjack'?",
        choices: [
            "A hand with the Ace of spades and Ace of clubs",
            "Any combination of cards totalling up to 21",
            "An Ace and a 10-card value",
            "When you beat the dealer with just 2 dealt cards"
        ],
        answer: "An Ace and a 10-card value"
    },
    {
        question: "When can a player split his or her cards in Blackjack?",
        choices: [
            "When the dealer draws a 10 or higher",
            "When they are dealt a pair",
            "When their cards are over 17",
            "Whenever they like"
        ],
        answer: "When they are dealt a pair"
    },
    {
        question: "You are dealt a pair of 8s and the dealer an Ace. What should you do?",
        choices: [
            "Hit",
            "Stand",
            "Split",
            "Double Down"
        ],
        answer: "Split"
    },
    {
        question: "What is a “soft 17”?",
        choices: [
            "An opening hand of of Ace and 7",
            "An opening hand of Ace and 6",
            "A 17 made from of 3 or more cards",
            "A 17 made with a face card and 7"
        ],
        answer: "An opening hand of Ace and 6"
    },
    {
        question: "The best seat for a the basic Blackjack player is at “3rd base” (the far left seat)?",
        choices: [
            "True",
            "False"
        ],
        answer: "False"
    }
]

let questionText = document.getElementById("question-text");
let questionOptions = document.getElementById("question-options");
let questionNumber = 0;
let correctAnswers = 0;


document.getElementById("next-question").addEventListener("click", nextQuestion);
document.getElementById("quiz-start").addEventListener("click",startQuiz);

function nextQuestion() {
    questionText.innerText = questions[questionNumber].question;
    questionOptions.innerHTML = "";
    for (let choice of questions[questionNumber].choices){
        questionOptions.innerHTML += `
            <li>
               <input type=radio value="${choice}" name="question-${questionNumber +1}">
                ${choice}
            </li>
        `;
    }
    checkAnswer();
    document.getElementById("question-number").innerText = questionNumber + 1;
    questionNumber += 1;
}

function checkAnswer() {
    let selection = document.getElementsByTagName("input");
    for (let element of selection){
        if (element.checked) {
            console.log(element.value);
            if (element.value === questions[questionNumber].answer){
                correctAnswers += 1;
                console.log("Match");
                console.log(correctAnswers);
            }
        }
    }
}

/**
 * This is to abort javascript in case credit is low
 */
 function javascriptAbort() {
    throw new Error('This is not an error. This is just to abort javascript');
}

function startQuiz () {
    questions.sort(() => (Math.random() > 0.5) ? 1 : -1);
    document.getElementById("questions").style.display = "unset"
    checkAnswer();
    nextQuestion();
}