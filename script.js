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


// Keeps track of the current question index
let index = 0;

// Stores the player's score
let score = 0;

// Starting time for each question
let timeLeft = 10;

// Variable to control the timer
let timer;


// Function to start the countdown timer
function startTimer() {

  clearInterval(timer); // Stops any previous timer
  timeLeft = 10; // Reset timer

  // Display the time on the webpage
  document.getElementById("timer").innerText = "Time Left: " + timeLeft;

  enableButtons(); // Enable answer buttons

  // Runs every 1 second
  timer = setInterval(() => {

    timeLeft--; // Decrease time

    // Update timer display
    document.getElementById("timer").innerText = "Time Left: " + timeLeft;

    // If time reaches zero
    if (timeLeft === 0) {

      clearInterval(timer); // Stop timer

      document.getElementById("result").innerText = "Time's up!";

      disableButtons(); // Prevent answering
    }

  }, 1000);
}


// Loads the current question and choices on the page
function loadQuestion() {

  // Display question
  document.getElementById("question").innerText = quiz[index].question;

  // Display choices
  document.getElementById("A").innerText = quiz[index].choices.A;
  document.getElementById("B").innerText = quiz[index].choices.B;
  document.getElementById("C").innerText = quiz[index].choices.C;

  // Clear previous result text
  document.getElementById("result").innerText = "";

  // Start timer for the question
  startTimer();
}


// Function to check if selected answer is correct
function checkAnswer(choice) {

  clearInterval(timer); // Stop timer after answering
  disableButtons(); // Prevent clicking multiple times

  // Compare selected answer with correct answer
  if (choice === quiz[index].answer) {

    score++; // Increase score

    // Update score display
    document.getElementById("score").innerText = "Score: " + score;

    document.getElementById("result").innerText = "Correct!";

  } else {

    document.getElementById("result").innerText = "Wrong!";

  }
}


// Function to move to the next question
function nextQuestion() {

  index++; // Move to next question

  if (index < quiz.length) {

    loadQuestion(); // Load next question

  } else {

    clearInterval(timer); // Stop timer

    // Display final score
    alert("Quiz Finished! Your Score: " + score);
  }
}


// Function to restart the quiz
function resetQuiz() {

  location.reload(); // Reloads the webpage
}


// Disables answer buttons
function disableButtons() {

  document.getElementById("A").disabled = true;
  document.getElementById("B").disabled = true;
  document.getElementById("C").disabled = true;

}


// Enables answer buttons
function enableButtons() {

  document.getElementById("A").disabled = false;
  document.getElementById("B").disabled = false;
  document.getElementById("C").disabled = false;

}


// Toggles dark mode
function toggleDarkMode() {

  document.body.classList.toggle("dark");

}


// Automatically loads the first question when the page opens
loadQuestion();