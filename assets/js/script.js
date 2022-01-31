//DOM Elements
var conStartEl = document.getElementById("starter-container");
var conQuizEl = document.getElementById("quiz-container");
var conEndEl = document.getElementById("end-container");
var conScoreEl = document.getElementById("score-banner");
var conHighScoresEl = document.getElementById("high-score-container");

var questionEl = document.getElementById("question");
var answerbuttonsEl = document.getElementById("answer-buttons");
var formInitials = document.getElementById("initials-form");
var viewHighScoresEl = document.getElementById("view-high-scores");
var listHighScoreEl = document.getElementById("high-score-list");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");

var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back");
var btnClearScoresEl = document.querySelector("#clear-high-scores");
var timerEl = document.querySelector("#timer");

//Variables
var score = 0;
var timeleft;
var gameover;
timerEl.innerText=0;

var HighScores = [];
var arrayShuffledQuestions;
var questionIndex = 0;

//Questions array
var questions = [
    {question: "Commonly used data types DO NOT include:",
    answer: "3. alerts",
    choices: [{choice: "1. strings"}, {choice: "2. booleans"}, {choice: "3. alerts"}, {choice: "4. numbers"}]
    },

    {question: "The condition in an if/then statement is enclosed within ________.",
    answer: "3. parentheses",
    choices: [{choice: "1. quotes"}, {choice: "2. curly brackets"}, {choice: "3. parentheses"}, {choice: "4. square brackets"}]
    },

    {question: "Arrays in JavaScript can be used to store ________.",
    answer: "4. all of the above",
    choices: [{choice: "1. numbers and strings"}, {choice: "2. other arrays"}, {choice: "3. booleans"}, {choice: "4. all of the above"}]
    },

    {question: "String values must be enclosed within ________ when being assigned to variables.",
    answer: "3. quotes",
    choices: [{choice: "1. commas"}, {choice: "2. curly brackets"}, {choice: "3. quotes"}, {choice: "4. parentheses"}]
    },

    {question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer: "4. console.log",
    choices: [{choice: "1. JavaScript"}, {choice: "2. terminal/bash"}, {choice: "3. for loops"}, {choice: "4. console.log"}]
    },

    {question: "What does HTML stand for?",
    answer: "2. Hyper Text Markup Language",
    choices: [{choice: "1. Hyper Training Marking Language"}, {choice: "2. Hyper Text Markup Language"}, {choice: "3. Hyper Text Marketing Language"}, {choice: "4. Hyper Text Markup Leveler"}]
    },

    {question: "In which HTML element do we put the JavaScript?",
    answer: "1. <script>",
    choices: [{choice: "1. <script>"}, {choice: "2. <javascript>"}, {choice: "3. <js>"}, {choice: "4. <scripting>"}]
    },

    {question: "Where is the correct place to insert a JavaScript?",
    answer: "4. The <body> section",
    choices: [{choice: "1. Both the <head> section and the <body> section"}, {choice: "2. The <head> section"}, {choice: "3. The <header> section"}, {choice: "4. The <body> section"}]
    },
];

//Start Page
//Set timer time and interval, start at 100
var setTime = function() {
    timeleft = 100;

var timercheck = setInterval(function() {
    timerEl.innerText = timeleft;
    timeleft--

    if (gameover) {
        clearInterval(timercheck)
    }

    if (timeleft < 0) {
        showScore()
        timerEl.innerText = 0
        clearInterval(timercheck)
    }

    }, 1000)
}

//Quiz Page
//Start Game
var startGame = function() {
    conStartEl.classList.add("hide");
    conStartEl.classList.remove("show");
    conQuizEl.classList.remove("hide");
    conQuizEl.classList.add("show");

    //Shuffle questions
    arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
}

//Set next question
var setQuestion = function() {
    resetAnswers()
    displayQuestion(arrayShuffledQuestions[questionIndex])
}

//Remove answer buttons
var resetAnswers = function() {
    while (answerbuttonsEl.firstChild) {
        answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
    };
};

//Display question and answer buttons
var displayQuestion = function(index) {
    questionEl.innerText = index.question
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement("button")
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add("btn")
        answerbutton.classList.add("answerbtn")
        answerbutton.addEventListener("click", answerCheck)
        answerbuttonsEl.appendChild(answerbutton)
    }
};

//Display correct/wrong prompt 
var answerCorrect = function() {
    if (correctEl.className = "hide") {
        correctEl.classList.remove("hide")
        correctEl.classList.add("banner")
        wrongEl.classList.remove("banner")
        wrongEl.classList.add("hide")
    }
}

var answerWrong = function() {
    if (wrongEl.className = "hide") {
        wrongEl.classList.remove("hide")
        wrongEl.classList.add("banner")
        correctEl.classList.add("hide")
    }
}

//Check if answer is correct; wrong answers are penalized
var answerCheck = function(event) {
    var selectedAnswer = event.target 
    if (arrayShuffledQuestions[questionIndex].answer === selectedAnswer.innerText) {
        answerCorrect()
        score = score + 10
    }

    else {
        answerWrong()
        score = score - 5;
        timeleft = timeleft - 10;
    };

//Go to next question
questionIndex++
    if (arrayShuffledQuestions.length > questionIndex + 1) {
        setQuestion()
    }
    else {
        gameover = "true";
        showScore();
    }
}
//Final score page
//Display final score when quiz ends
var showScore = function() {
    conQuizEl.classList.add("hide");
    conEndEl.classList.remove("hide");
    conEndEl.classList.add("show");

    var scoreDisplay = document.createElement("p")
    scoreDisplay.innerText = ("Your final score is " + score + ".");
    conScoreEl.appendChild(scoreDisplay);
}

//High Scores Page
//Create high score values
var createHighScore = function(event) {
    event.preventDefault()
    var initials = document.querySelector("#initials").value;
    if (!initials) {
        alert("You must  enter your initials.");
        return;
    }

    formInitials.reset();

    var HighScore = {
        initials: initials,
        score: score
    }

    HighScores.push(HighScore);
    HighScores.sort((a, b) => {return b.score-a.score});

//Clear visible high score list 
while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild)
}

//Create elements in order of high scores
for (var i = 0; i < HighScores.length; i++ ) {
    var highscoreEl = document.createElement("li");
    highscoreEl.className = "high-score";
    highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);
}

saveHighScore();
displayHighScores();

}

//Save high score on local storage
var  saveHighScore = function() {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))
}

//Get high scores and load them on page
var loadHighScore  = function() {
    var loadedHighScores = localStorage.getItem("HighScores")
    if (!loadedHighScores) {
        return false;
    }

    loadedHighScores = JSON.parse(loadedHighScores);
    loadedHighScores.sort((a,b) => {return b.score-a.score})

    for (var i = 0; i < loadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.className = "high-score";
        highscoreEl.innerText = loadedHighScores[i].initials + " - " + loadedHighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);

        HighScores.push(loadedHighScores[i]);
    }
}

//Display high scores when initials are submitted
var displayHighScores = function() {

    conHighScoresEl.classList.remove("hide");
    conHighScoresEl.classList.add("show");
    gameover = "true"

    if (conEndEl.className = "show") {
        conEndEl.classList.remove("show");
        conEndEl.classList.add("hide");
    }

    if (conStartEl.className = "show") {
        conStartEl.classList.remove("show");
        conStartEl.classList.add("hide");
    }

    if (conQuizEl.className = "show") {
        conQuizEl.classList.remove("show");
        conQuizEl.classList.add("hide");
    }

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }

    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
}

//Go Back button function
var renderStartPage = function() {
    conHighScoresEl.classList.add("hide")
    conHighScoresEl.classList.remove("show")
    conStartEl.classList.remove("hide")
    conStartEl.classList.add("show")
    conScoreEl.removeChild(conScoreEl.lastChild)
    questionIndex = 0
    gameover = ""
    timerEl.textContent = 0;
    score = 0

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }

    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
}


//Clear high scores
var clearHighScores = function() {
    HighScores = [];

    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    }

    localStorage.clear(HighScores);
}

loadHighScore()

//Event listeners
btnStartEl.addEventListener("click", startGame);

formInitials.addEventListener("submit", createHighScore);

viewHighScoresEl.addEventListener("click", displayHighScores);

btnGoBackEl.addEventListener("click", renderStartPage);

btnClearScoresEl.addEventListener("click", clearHighScores);








