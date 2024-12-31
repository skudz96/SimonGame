// Define game rules:
// 1. Logic to allow computer to select a random color
// 2. Store computer's selection in an array
// 3. Do the same to store the user's clicked selection
// 4. Compare computer array to user's array. If correct, next level. The user has to click from the beginning
// Start game when A is pressed
// Play sounds whenever a button is clicked using the sound files provided
// Animate a button being pressed

// Array of color choices
let colorChoice = ["green", "red", "yellow", "blue"];
// 1. storing computer's selection randomly using computerChoice() function
let computerPattern = [];

function computerChoice() {
  let randomNumber = Math.floor(Math.random() * colorChoice.length);
  let computerSelectedColor = colorChoice[randomNumber];
  computerPattern.push(computerSelectedColor);
  console.log(computerPattern);
  // The above aims to populate game array with computer's choices

  buttonPressed(computerSelectedColor);
}

function buttonPressed(color) {
  let selectedButton = document.getElementById(color);
  selectedButton.classList.add("pressed");
}

computerChoice();
