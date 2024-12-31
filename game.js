// Define game rules:
// 1. Logic to allow computer to select a random color
// 2. Store computer's selection in an array
// 3. Do the same to store the user's clicked selection
// 4. Compare computer array to user's array. If correct, next level. The user has to click from the beginning
// Start game when A is pressed
// Play sounds whenever a button is clicked using the sound files provided
// Animate a button being pressed

// global boolean that deals with game state
let gameActive = false;
// Array of color choices
let colorChoice = ["green", "red", "yellow", "blue"];
// 2. storing computer's selection randomly using nextSequence() function
let computerPattern = [];
// 3. storing user's selection
let userSelection = [];
// storing current level
let currentLevel = 1;

function nextSequence() {
  // Following lines aim to populate game array with computer's choices
  let randomNumber = Math.floor(Math.random() * colorChoice.length);
  let computerSelectedColor = colorChoice[randomNumber];
  computerPattern.push(computerSelectedColor);
  console.log(computerPattern);

  // Calling buttonPressed function, passing in the computer's randomly selected choice as an argument
  buttonPressed(computerSelectedColor);
  // Calling it here to play the correct sound depending on what random color was selected
  buttonSound(computerSelectedColor);
}

// Global event listener to all buttons. Only listenes when game is active
// Pushes the clicked button's ID (corresponding to color string) to userSelection array
// Also calls buttonPressed and buttonSound functions, with event click as argument to handle sounds and animations like in nextSequence function
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    if (gameActive) {
      let clickedColor = e.target.id;
      userSelection.push(clickedColor);
      buttonPressed(clickedColor);
      buttonSound(clickedColor);
      // Essentially making currentLevel the index of the most recent input to the userSelection array
      checkAnswer(userSelection.length - 1);
    }
  });
});

// 4. Comparing computer's array to user array
// Used chatGPT to help me with this one, which gave a very clever suggestion.
// Have an index of the most recent user input. Checks the value at this index in the userSelection array against the value at the same index in the computerPattern array. If these match, continue to next if statement. Otherwise, log that they are different and handle what happens
function checkAnswer(currentLevel) {
  if (userSelection[currentLevel] === computerPattern[currentLevel]) {
    // Then we need to check that the user has completed the whole sequence for the current round
    if (userSelection.length === computerPattern.length) {
      // Logging only happens if the most recent input is correct, and the whole sequence matches
      console.log("Sequence completed! Get ready for the next level..");
      // Then loads the next sequence after a short delay
      setTimeout(nextSequence, 1000);
      // Resets the userSelection array (so the user has to remember the pattern)
      userSelection = [];
      // Increments level
      currentLevel++;

      // Dynamically adding HTML text to display current level
      document.getElementById("current-level").innerHTML =
        "Current level " + currentLevel;
    }
  } else {
    // logs wrong answer
    console.log("wrong");
    // calls buttonSound function, passing "wrong" string to play wrong.mp3
    buttonSound("wrong");
    // Adds and removes game-over class to the body after a timeout
    let body = document.querySelector("body");
    body.classList.add("game-over");
    setTimeout(function () {
      body.classList.remove("game-over");
    }, 500);

    // Changes HTML of level-title
    document.getElementById("level-title").innerHTML =
      "Game Over! Start Game to retry";

    resetGame();
  }
}

// Runs when user makes a mistake in the sequence
function resetGame() {
  currentLevel = 1;
  userSelection = [];
  computerPattern = [];
  gameActive = false;

  document.getElementById("start-button").style.display = "inline-block";
}

function buttonPressed(color) {
  // This function works by finding a button with an ID equal to the argument passed, adding the ".pressed" class on it, and removing the class after 500 miliseconds using setTimeout
  // this function is called in nextSequence
  let selectedButton = document.getElementById(color);
  selectedButton.classList.add("pressed");

  setTimeout(function () {
    selectedButton.classList.remove("pressed");
  }, 500);
}

function buttonSound(color) {
  // Similar to buttonPressed, but for playing sounds instead
  let selectedButton = document.getElementById(color);
  let audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

document.getElementById("start-button").addEventListener("click", (event) => {
  // Wrapped everything here in an if, so the user cannot start a game when there is already one in progress
  if (!gameActive) {
    // Logging game start
    console.log("Game started!");
    // Resetting user selection
    userSelection = [];
    // Setting boolean to true when game has started
    gameActive = true;
    // Running next sequence
    nextSequence();

    // Also dynamically adding HTML text to display current level
    document.getElementById("current-level").innerHTML =
      "Current level " + currentLevel;

    document.getElementById("level-title").innerHTML = "";

    document.getElementById("start-button").style.display = "none";
  }
});
