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
  },
  {
    question: "Which tag creates a button?",
    choices: {
      A: "<div>",
      B: "<button>",
      C: "<input>"
    },
    answer: "B"
  },
  {
    question: "What symbol is used for JS comments?",
    choices: {
      A: "//",
      B: "#",
      C: "<!-- -->"
    },
    answer: "A"
  }
];

let index = 0;
let score = 0;
let timeLeft = 10;
let timer;

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

function loadQuestion() {
  document.getElementById("question").innerText = quiz[index].question;
  document.getElementById("A").innerText = quiz[index].choices.A;
  document.getElementById("B").innerText = quiz[index].choices.B;
  document.getElementById("C").innerText = quiz[index].choices.C;
  document.getElementById("result").innerText = "";
  startTimer();
}

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

function nextQuestion() {
  index++;
  if (index < quiz.length) {
    loadQuestion();
  } else {
    clearInterval(timer);
    saveScore();
    showLeaderboard();
    alert("Quiz Finished! Your Score: " + score);
  }
}

function resetQuiz() {
  location.reload();
}

function disableButtons() {
  document.getElementById("A").disabled = true;
  document.getElementById("B").disabled = true;
  document.getElementById("C").disabled = true;
}

function enableButtons() {
  document.getElementById("A").disabled = false;
  document.getElementById("B").disabled = false;
  document.getElementById("C").disabled = false;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

/* ===== LEADERBOARD FUNCTIONS ===== */

function saveScore() {
  let playerName = prompt("Enter your name:");
  if (!playerName) playerName = "Anonymous";

  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  leaderboard.push({ name: playerName, score: score });

  leaderboard.sort((a, b) => b.score - a.score);

  leaderboard = leaderboard.slice(0, 5);

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function showLeaderboard() {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const list = document.getElementById("leaderboard");
  list.innerHTML = "";

  leaderboard.forEach((player, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${player.name} - ${player.score}`;
    list.appendChild(li);
  });
}

function clearLeaderboard() {
  localStorage.removeItem("leaderboard");
  showLeaderboard();
}

loadQuestion();
showLeaderboard();