// Array with quiz questions
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

// Declare global variables
let questionText = document.getElementsByClassName("question-text")[0];
let questionOptions = document.getElementsByClassName("question-options")[0];
let questionNumber = 0;
let correctAnswers = 0;
let allQuestionsAtTheEnd = "";

// Add event listeners
document.getElementById("next-question").addEventListener("click", nextQuestion);
document.getElementById("quiz-start").addEventListener("click",startQuiz);

/**
 * Shuffle the list of questions and display the next question by calling the "nextQuestion" function.
 */
 function startQuiz () {
    questions.sort(() => (Math.random() > 0.5) ? 1 : -1);
    document.getElementById("questions").style.display = "unset"
    nextQuestion();
}

/**
 * Get a question from the question list and display it on the screen
 */
function nextQuestion() {
    checkAnswer();
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
    document.getElementById("question-number").innerText = questionNumber + 1;
    questionNumber += 1;
    // Disable "Next" button
    document.getElementById("next-question").removeEventListener("click", nextQuestion);
    document.getElementById("next-question").classList.remove("hover");

    // Re-enable the "Next" button after a selection has been made
    let selection = document.getElementsByTagName("input");
    for (let element of selection){
        // Re-enable only if not last question
        if(questionNumber !== 10){
            element.addEventListener("click", reactivateNext);
        } else {
            document.getElementById("next-question").classList.add("hover");
        }
    }
    checkLastQuestion();
}

/**
 * Check if the user's selection matches the answer to the question
 */
function checkAnswer() {
    let selection = document.getElementsByTagName("input");
    for (let element of selection){
        if (element.checked) {
            if (element.value === questions[questionNumber-1].answer){
                correctAnswers += 1;
            }
        }
    }
}

/**
 * Check if the quiz has reached the last question and change the "next question" button.
 */
function checkLastQuestion () {
    if(questionNumber === 10){
        document.getElementById("next-question").removeEventListener("click", nextQuestion);
        document.getElementById("next-question").innerText = "See Results";
        document.getElementById("next-question").addEventListener("click", seeResults);
    }
}

/**
 * Calculate the results and display them on the screen 
 */
function seeResults () {
    checkAnswer();
    let percentage = (correctAnswers / 10) * 100;
    document.getElementById("questions").innerHTML = `
        <p>You scored ${percentage}%</p>
    `;
    //Loop through the questions and display them on the screen along with the answer
    for (let item of questions){
        let questionChoices = "";
        for( let choice of item.choices){
            questionChoices += `
                <li>${choice}</li>
            `
        }
        document.getElementById("questions").innerHTML += `
            <div class="question-end">
                <p>${item.question}</p>
                <ul>${questionChoices}</ul>
                <p class="question-end-answer">Correct answer is <strong>${item.answer}</strong></p>
            </div>
        `
    }
    // Add links at the end of questions list
    document.getElementById("questions").innerHTML += `<a href="index.html">Return Home</a>`;
    document.getElementById("questions").innerHTML += `<a href="quiz.html">Re-do Quiz</a>`;
    document.getElementById("questions").style.overflow = "auto";
}


/**
 * Re-enable the "Next" button
 */
function reactivateNext () {
    document.getElementById("next-question").addEventListener("click", nextQuestion);
    document.getElementById("next-question").classList.add("hover");
}