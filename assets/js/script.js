const pomodoroBtn = document.querySelector("#pomodoro");
const shortBreakBtn = document.querySelector("#shortbreak");
const longBreakBtn = document.querySelector("#longbreak");
const startBtn = document.querySelector("#btn-start");
const pauseBtn = document.querySelector("#btn-pause");
const resetBtn = document.querySelector("#btn-reset");
const time = document.querySelector("#time");
const body = document.querySelector("#body");
const sessionCountElem = document.querySelector("#session-count");
const toggleButton = document.getElementById('dark-mode-toggle');
let sessionCount = 0;

let interval;
let timeLeft;
const pomodoroTime = 1500;
const shortBreakTime = 300;
const longBreakTime = 900;

//DARK MODE 
toggleButton.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
});
function updateSessionCount() {
    sessionCountElem.innerHTML = `Sessions Completed: ${sessionCount}`;
  }
  

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  time.innerHTML = formattedTime;
}

// START BUTTON FUNCTIONALITY
function startTimer() {
  startBtn.disabled = true; 
  interval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft === 0) {
      clearInterval(interval);

        alert("Time's Up!!!");
        sessionCount++;
        updateSessionCount();
        startBtn.disabled = false; 
        
    }
  }, 1000);
}

function removeBgClasses() {
  body.classList.remove("bg-red-700", "bg-yellow-600", "bg-blue-600");
}

// PAUSE BUTTON FUNCTIONALITY
function pauseTimer() {
  clearInterval(interval);
  startBtn.disabled = false; 
}

// RESET BUTTON FUNCTIONALITY
function resetTimer() {
  clearInterval(interval);
  timeLeft = pomodoroTime;
  updateTimer();
  startBtn.disabled = false;
}

// POMODORO TIMER
function setPomodoro() {
  clearInterval(interval);
  timeLeft = pomodoroTime;
  updateTimer();
  removeBgClasses();
  body.classList.add("bg-red-700");
  startBtn.disabled = false;
}

// SHORTBREAK TIMER
function setShortBreak() {
  clearInterval(interval);
  timeLeft = shortBreakTime;
  removeBgClasses();
  updateTimer();
  body.classList.add("bg-yellow-600");
  startBtn.disabled = false;
}

// LONGBREAK TIMER
function setLongBreak() {
  clearInterval(interval);
  timeLeft = longBreakTime;
  updateTimer();
  removeBgClasses();
  body.classList.add("bg-blue-600");
  startBtn.disabled = false;
}

pomodoroBtn.addEventListener("click", setPomodoro);
shortBreakBtn.addEventListener("click", setShortBreak);
longBreakBtn.addEventListener("click", setLongBreak);
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Initialize default time
timeLeft = pomodoroTime;
updateTimer();
updateSessionCount();