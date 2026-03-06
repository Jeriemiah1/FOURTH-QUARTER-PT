// ========================================
// Application Name: Simple Quiz Website
// Author: Jeriemiah Huelma
// Description: An interactive quiz web application
// with timer, score tracking, dark mode,
// reset button, and leaderboard.
// Created using HTML, CSS, and JavaScript.
// ========================================


// Quiz questions, choices, and answers
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


// Track current question
let index = 0;

// Player score
let score = 0;

// Timer value
let timeLeft = 10;

// Timer controller
let timer;



// Start the countdown timer
function startTimer() {

  clearInterval(timer);

  timeLeft = 10;

  document.getElementById("timer").innerText = "Time Left: " + timeLeft;

  enableButtons();

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



// Load question and answer choices
function loadQuestion() {

  document.getElementById("question").innerText = quiz[index].question;

  document.getElementById("A").innerText = quiz[index].choices.A;
  document.getElementById("B").innerText = quiz[index].choices.B;
  document.getElementById("C").innerText = quiz[index].choices.C;

  document.getElementById("result").innerText = "";

  startTimer();
}



// Check if answer is correct
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



// Move to next question
function nextQuestion() {

  index++;

  if (index < quiz.length) {

    loadQuestion();

  } else {

    clearInterval(timer);

    // Ask player name
    let playerName = prompt("Enter your name:");

    // Save score
    saveScore(playerName, score);

    // Update leaderboard
    showLeaderboard();

    alert("Quiz Finished " + playerName + "!\nYour Score: " + score);
  }
}



// Restart the quiz
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



// Save player score to leaderboard
function saveScore(playerName, score) {

  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  leaderboard.push({ name: playerName, score: score });

  // Sort highest score first
  leaderboard.sort((a, b) => b.score - a.score);

  // Keep top 5 players
  leaderboard = leaderboard.slice(0, 5);

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}



// Display leaderboard
function showLeaderboard() {

  const leaderboardList = document.getElementById("leaderboard");

  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  leaderboardList.innerHTML = "";

  leaderboard.forEach((player, index) => {

    const li = document.createElement("li");

    li.textContent = `${index + 1}. ${player.name} - ${player.score}`;

    leaderboardList.appendChild(li);

  });
}



// Clear leaderboard
function clearLeaderboard() {

  localStorage.removeItem("leaderboard");

  showLeaderboard();
}



// Load first question when page opens
loadQuestion();

// Display leaderboard when page loads
showLeaderboard();
