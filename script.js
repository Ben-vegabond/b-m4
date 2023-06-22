const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const feedbackElement = document.getElementById("feedback");
const startButton = document.getElementById("start");
const timerElement = document.getElementById("timer");
const highScoreElement = document.getElementById("high-score");





let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60; // Set the initial time in seconds

let timerInterval; // Variable to store the timer interval

// Function to get the high score and initials from local storage
function getHighScore() {
  return JSON.parse(localStorage.getItem("highScore")) || { score: 0, initials: "" };
}

// Function to set the high score and initials in local storage
function setHighScore(score, initials) {
  localStorage.setItem("highScore", JSON.stringify({ score, initials }));
}

function showQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  choicesElement.innerHTML = "";
  currentQuestion.choices.forEach(choice => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener("click", handleAnswer);
    choicesElement.appendChild(li);
  });
}

function handleAnswer(event) {
  const selectedAnswer = event.target.textContent;
  const currentQuestion = quizData[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.answer) {
    feedbackElement.textContent = "Correct!";
    score++;
  } else {
    feedbackElement.textContent = "Wrong!";
    // Deduct 10 seconds from the timer for a wrong answer
    timeLeft -= 10;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function startQuiz() {
  startButton.style.display = "none";
  showQuestion();

  // Start the timer interval
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  timerElement.textContent = `Time Left: ${timeLeft} seconds`;

  if (timeLeft <= 0) {
    // Stop the timer and end the quiz
    clearInterval(timerInterval);
    endQuiz();
  }
}

function endQuiz() {
   
  // Stop the timer
  clearInterval(timerInterval);

  // Get the current high score and initials from local storage
  const { score: currentHighScore, initials: currentInitials } = getHighScore();

  if (score ) {
    // > currentHighScore
    // Prompt the player to enter their initials
    const playerInitials = prompt("Congratulations! You achieved a new high score. Please enter your initials:");
    if (playerInitials) {
      // Save the new high score and initials
      setHighScore(score, playerInitials);
      highScoreElement.textContent = `High Score: ${score} (${playerInitials})`;
    }
  } else {
    highScoreElement.textContent = `High Score: ${currentHighScore} (${currentInitials})`;
  }

  const result = `You scored ${score} out of ${quizData.length} questions.`;
  questionElement.textContent = "Quiz completed!";
  choicesElement.innerHTML = "";
  feedbackElement.textContent = result;
}
startButton.addEventListener("click",startQuiz)

// Get the initial high score and initials from local storage and display them

const { score: initialHighScore, initials: initialInitials } = getHighScore();
highScoreElement.textContent = `High Score: ${initialHighScore} (${initialInitials})`;



