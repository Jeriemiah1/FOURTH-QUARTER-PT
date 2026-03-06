// ========================================
// Application Name: Simple Quiz Website
// Author: Jeriemiah Huelma
// Description: An interactive quiz web application
// with timer, score tracking, dark mode, and reset.
// Created using HTML, CSS, and JavaScript.
// ========================================


// Array containing quiz questions, answer choices, and correct answers
const quiz = [
  {
    question: "What does HTML stand for?",
    choices: {
      A: "Hyper Text Markup Language",
      B: "Home Tool Markup Language",
      C: "Hyperlinks Text Mark Language"
    },
    answer: "A"
  },
  {
    question: "Which language is used for styling?",
    choices: {
      A: "HTML",
      B: "JavaScript",
      C: "CSS"
    },
    answer: "C"
  },
  {
    question: "Which language makes websites interactive?",
    choices: {
      A: "CSS",
      B: "JavaScript",
      C: "HTML"
    },
    answer: "B"
  }
];


// Keeps track of the current question
let index = 0;

// Stores the player's score
let score = 0;

// Starting time for each question
let timeLeft = 10;

// Timer controller
let timer;


// Function to start the countdown timer
function startTimer() {

  clearInterval(timer); // Stop previous timer
  timeLeft = 10;

  document.getElementById("timer").innerText = "Time Left: " + timeLeft;

  enableButtons(); // Enable answer buttons

  timer = setInterval(() => {

    timeLeft--;

    document.getElementById("timer").innerText = "Time Left: " + timeLeft;

    if (timeLeft === 0) {

      clearInterval(timer);

      document.getElementById("result").innerText = "Time's up!";

      disableButtons();
    }

  }, 1000);
}


// Loads the current question and answer choices
function loadQuestion() {

  document.getElementById("question").innerText = quiz[index].question;

  document.getElementById("A").innerText = quiz[index].choices.A;
  document.getElementById("B").innerText = quiz[index].choices.B;
  document.getElementById("C").innerText = quiz[index].choices.C;

  document.getElementById("result").innerText = "";

  startTimer();
}


// Checks if the selected answer is correct
function checkAnswer(choice) {

  clearInterval(timer);
  disableButtons();

  if (choice === quiz[index].answer) {

    score++;

    document.getElementById("score").innerText = "Score: " + score;

    document.getElementById("result").innerText = "Correct!";

  } else {

    document.getElementById("result").innerText = "Wrong!";

  }
}


// Moves to the next question
function nextQuestion() {

  index++;

  if (index < quiz.length) {

    loadQuestion();

  } else {

    clearInterval(timer);

    // Ask for player's name
    let playerName = prompt("Enter your name:");

    // Display final score
    alert("Quiz Finished " + playerName + "!\nYour Score: " + score);
  }
}


// Restarts the quiz
function resetQuiz() {

  location.reload();
}


// Disable answer buttons
function disableButtons() {

  document.getElementById("A").disabled = true;
  document.getElementById("B").disabled = true;
  document.getElementById("C").disabled = true;

}


// Enable answer buttons
function enableButtons() {

  document.getElementById("A").disabled = false;
  document.getElementById("B").disabled = false;
  document.getElementById("C").disabled = false;

}


// Toggle dark mode
function toggleDarkMode() {

  document.body.classList.toggle("dark");

}


// Load the first question when the page opens
loadQuestion();
