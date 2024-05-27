// Quiz questions data
var quizQuestions = [
    {
        question: "1: Which is the correct HTML element for the largest heading?",
        options: [
            "A) <h6>",
            "B) <heading>",
            "C) <head>",
            "D) <h1>"
        ],
        correctAnswer: 3
    },
    {
        question: "To declare an array in Java, you define the variable type with:",
        options: [
            "A) ()",
            "B) []",
            "C) {}"
        ],
        correctAnswer: 1
    },
    {
        question: "In Java, what is the difference between == and equals() when comparing objects?",
        options: [
            "A) `==` compares object references, while equals() compares object values.",
            "B) `==` compares object values, while `equals()` compares object references",
            "C) `==` compares object types, while `equals()` compares object references.",
            "D) There is no difference."
        ],
        correctAnswer: 0
    },
    {
        question: "How do you declare a constant in JavaScript?",
        options: [
            "A) var PI = 3.14;",
            "B) let PI = 3.14;",
            "C) constant PI = 3.14;",
            "D) const PI = 3.14"
        ],
        correctAnswer: 3
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeRemaining = 60;

// Display the current question
function displayQuestion() {
    const questionData = quizQuestions[currentQuestion];
    document.getElementById("questionHeading").textContent = questionData.question;

    const choices = document.querySelectorAll('#quizContainer button');
    choices.forEach((button, index) => {
        button.textContent = questionData.options[index];
        button.onclick = () => checkAnswer(index);
    });
}

// Start the timer
function startTimer() {
    timeRemaining = 60; // Reset timer for each new quiz
    document.getElementById('timer').textContent = `${timeRemaining}s`;
    timer = setInterval(function () {
        timeRemaining--;
        document.getElementById('timer').textContent = `${timeRemaining}s`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            displayResult();
        }
    }, 1000);
}

// Check the selected answer
function checkAnswer(selectedOptionIndex) {
    const correctAnswerIndex = quizQuestions[currentQuestion].correctAnswer;
    if (selectedOptionIndex === correctAnswerIndex) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        displayQuestion();
    } else {
        clearInterval(timer);
        displayResult();
    }
}

// Display the result
function displayResult() {
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("nice_try").style.display = "block";
    document.getElementById("final_score").textContent = score;
}

// Save high score
function saveHighScore() {
    if (!saveScoreClicked) {
        saveScoreClicked = true;
        const playerInitials = document.getElementById('initials').value;
        if (playerInitials.trim() !== "") {
            console.log("Score saved!");
        }
    }
}

// Start quiz
document.getElementById('startBtn').addEventListener('click', function () {
    document.getElementById('homeContainer').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('countdownTimer').style.display = 'block';
    displayQuestion();
    startTimer();
});

// Go back to home
function go_home() {
    document.getElementById('high_scores_page').style.display = 'none';
    document.getElementById('homeContainer').style.display = 'block';
}

// Show high scores (Dummy function, you need to implement high scores logic)
function show_high_scores() {
    document.getElementById('homeContainer').style.display = 'none';
    document.getElementById('high_scores_page').style.display = 'block';
}

// Submit score
document.getElementById('submit_initials').addEventListener('click', saveHighScore);
document.getElementById('go_back').addEventListener('click', go_home);
