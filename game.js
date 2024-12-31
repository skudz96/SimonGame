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

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    if (gameActive) {
      let clickedColor = e.target.id;
      userSelection.push(clickedColor);
      console.log("chose " + userSelection);
    }
  });
});

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

document.addEventListener("keydown", (event) => {
  // Event listener to start the game when user presses A
  if (event.code === "KeyA") {
    // Logging game start
    console.log("Game started!");
    // Resetting user selection
    userSelection = [];
    // Setting boolean to true when game has started
    gameActive = true;
    // Running next sequence
    nextSequence();
  }
});
