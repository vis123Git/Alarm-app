// GET ALL INPUT FIELD AND BUTTON BY ELEMENT BY ID
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const setButton = document.querySelector(".set");

setButton.addEventListener("click", () => {
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;

  //CHECK FOR A VALID TIME
  if (hours === 0 && minutes === 0 && seconds === 0) {
    // IF TIME IS NOT VALID SHOW MESSAGE PLEASE ENTER A VALID TIME
    const timerTab = document.querySelector(".timer-tab");
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Please enter a valid time!";
    errorMessage.classList.add("error-message");
    timerTab.insertAdjacentElement("afterend", errorMessage);

    //REMOVE MESSAGE AFTER 3 SECONDS
    setTimeout(() => {
      errorMessage.remove();
    }, 3000);

    return;
  }
  startNewTimer(hours, minutes, seconds);
});

//IF YOU DONT HAVE ANY TIME THAN DISPLAY MESSAGE, NO TIMER
let timers = [];
if (timers.length == 0) {
  const currenttimers = document.querySelector(".current-timers");
  const noTimer = document.createElement("p");
  noTimer.textContent = "You have no timers currently!";
  currenttimers.appendChild(noTimer);
}

function startNewTimer(hours, minutes, seconds) {
  //REMOVE NO CURRENT TIMER MESSAGE
  const currenttimers = document.querySelector(".current-timers>p");
  currenttimers.remove();
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const timer = {
    hours,
    minutes,
    seconds,
    totalSeconds,
    id: Date.now(), // Unique ID for the timer
  };

  timers.push(timer);

  // DISPLAY TIME FUNCTION
  displayTimer(timer);

  const intervalId = setInterval(() => {
    timer.totalSeconds--;

    // UPDATE TIME FUNCTION
    updateTimerDisplay(timer);

    if (timer.totalSeconds <= 0) {
      clearInterval(intervalId);
      // AT TIME OF COMPLETION
      handleTimerCompletion(timer);
    }
  }, 1000);
}

function displayTimer(timer) {
  // CREATE MAIN DIV AS TIMER TAB
  const timerElement = document.createElement("div");
  timerElement.dataset.timerId = timer.id;
  timerElement.classList.add("timer-tab2");

  // CREATE ANTOHER DIV FOR LABEL AND ADD TIME LEFT LABLE
  const setTimeDiv = document.createElement("div");
  setTimeDiv.classList.add("set-time");
  const timeLeftLabel = document.createElement("p");
  timeLeftLabel.textContent = "Time Left :";
  setTimeDiv.appendChild(timeLeftLabel);
  timerElement.appendChild(setTimeDiv);

  //CREATE ANOTHER DIV TO SHOW THE TIME
  const timerDiv = document.createElement("div");
  timerDiv.classList.add("timer");

  // Create an element to display the timer time
  const timerTimeElement = document.createElement("div");
  timerTimeElement.classList.add("timer-time");
  timerElement.appendChild(timerTimeElement);

  // Add the timer element to the "current-timers" section
  const currentTimersSection = document.querySelector(".current-timers");
  currentTimersSection.appendChild(timerElement);

  // CREATE ANOTHER DIV FOR STOP BUTTON
  const stopButtonDiv = document.createElement("div");
  stopButtonDiv.classList.add("set-time-button");
  const stopButton = document.createElement("button");
  stopButton.textContent = "Stop";
  stopButton.classList.add("stop");
  stopButtonDiv.appendChild(stopButton);
  timerElement.appendChild(stopButtonDiv);

  let intervalId; 
  let remainingTime = timer.totalSeconds;

  stopButton.addEventListener("click", () => {
    if (stopButton.textContent === "Stop") {
      clearInterval(intervalId); 
      stopButton.textContent = "Resume";
    } else if (stopButton.textContent === "Resume") {
      // Resume the timer by creating a new interval
      intervalId = setInterval(() => {
        remainingTime--;

        updateTimerDisplay(timer);

        if (remainingTime <= 0) {
          clearInterval(intervalId);
          handleTimerCompletion(timer);
        }
      }, 1000);
      
      stopButton.textContent = "Stop"; 
    }
  });
}

function updateTimerDisplay(timer) {
  const timerElement = document.querySelector(`[data-timer-id="${timer.id}"]`);
  const timerTimeElement = timerElement.querySelector(".timer-time");

  const hours = Math.floor(timer.totalSeconds / 3600);
  const minutes = Math.floor((timer.totalSeconds % 3600) / 60);
  const seconds = timer.totalSeconds % 60;

  // Format the time as HH:MM:SS
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  // Update the timer display
  timerTimeElement.textContent = formattedTime;
}

function handleTimerCompletion(timer) {
  const timerElement = document.querySelector(`[data-timer-id="${timer.id}"]`);

  if (timerElement) {
    timerElement.classList.add("completed-timer");

    const stopButton = timerElement.querySelector(".stop");
    if (stopButton) {
      stopButton.textContent = "Delete";
    }

    stopButton.addEventListener("click", () => {
      if (stopButton.textContent == "Delete") {
        const timerTab = document.querySelector(".timer-tab2");
        timerTab.remove();
        return;
      }
    });
  }
}
