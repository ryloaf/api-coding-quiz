const quizQuestions = [
    {
        question: "1: Which is the correct HTML element for the largest heading?",
        options: [
            "<h6>",
            "<heading",
            "<head>",
            "<h1>"
        ],
        correctAnswer: "<h1>"
    },
    {
        question: "To declare an array in Java, you define the variable type with:",
        options: [
            "()",
            "[]",
            "{}",
        ],
        correctAnswer: "[]"
    },
    {
        question: "In Java, what is the difference between == and equals() when comparing objects?",
        options: [
            "`==` compares object references, while equals() compares object values.",
            "`==` compares object values, while `equals()` compares object references",
            "`==` compares object types, while `equals()` compares object references.",
            "There is no difference."
        ],
        correctAnswer: "`==` compares object references, while `equals()` compares object values."
    },
    {
        question: "How do you declare a constant in JavaScript?",
        options: [
            "var PI = 3.14;",
            "let PI = 3.14;",
            "constant PI = 3.14;",
            "const PI = 3.14"
        ],
        correctAnswer: "const PI = 3.14;"
    },
];

let currentQuestion = 0;
let score = 0;
let saveScoreClicked = false;
let timer;
let timeRemaining = 60;

function displayQuestion() {
    const quizContainer = document.getElementById("quiz-container");
    const questionData = quizQuestions[currentQuestion];

    quizContainer.innerHTML = "";

    const questionElement = document.createElement("h2");
    questionElement.textContent = questionData.question;
    quizContainer.appendChild(questionElement);
    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement("button");
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => checkAnswer(option));
        quizContainer.appendChild(optionElement); 
    });

    startTimer();
}

function startTimer() {
    timer = setInterval(function () {
        document.getElementById('timer').textContent = `Time Remaining: ${timeRemaining}s`;
        timeRemaining--;

        if(timeRemaining < 0) {
            clearInterval(timer);
        }
    }, 1000);
}

function checkAnswer(selectedOption) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    if (selectedOption === correctAnswer) {
        const resultElement = document.createElement("div");
        resultElement.innerHTML = `
        <p>Correct</p>`;
        score++;
    } else {
        const resultElement = document.createElement("div");
        resultElement.innerHTML = `
        <p>Incorrect!</p>`;
        score--;
    }

    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        displayQuestion();
    } else {
        displayResult();
    }
}

function displayResult() {
    const quizContainer = document.getElementById("quiz-container");
    const resultElement = document.createElement("div");

    resultElement.innerHTML = `
    <h2>Quiz Complete!</h2>
    <p>Your Score: ${score}/${quizQuestions.length}</p>
    <label for="playerInitials>Enter your initials: </label>
    <input type="text" id="playerInitials" placeholder="Your Initals">
    <button onclick="saveHighScore(document.getElementById('playerInitials').value)">Save Score</button>
    <button onlcick="proceedToHighScores()">Show High Scores</button>
    `;
    quizContainer.innerHTML = '';
    quizContainer.appendChild(resultElement);
}

function saveHighScore() {
    if (!saveScoreClicked) {
        saveScoreClicked = true;
        const playerInitials = document.getElementById('playerInitials').value;
        if (playerInitials.trim() !== "") {
            console.log("Score saved!");
        }
    }
}

function submitQuiz() {
    const selectedOption = document.querySelector('button.selected');

    if (selectedOption) {
        const userAnswer = selectedOption.textContent;
        checkAnswer(userAnswer);
    }

    if(currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        displayResult();
    }
}

displayQuestion();
saveHighScore();