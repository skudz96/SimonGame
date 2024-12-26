var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var gameRestarted = false;
var level = 0;

function playSound(name) {
  var playASound = new Audio("sounds/" + name + ".mp3");
  playASound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(200)
    .fadeIn(200);

  playSound(randomChosenColor);
}

$(".btn").on("click", function () {
  var chosenColorID = $(this).attr("id");
  userClickedPattern.push(chosenColorID);

  playSound(chosenColorID);
  animatePress(chosenColorID);

  checkAnswer(userClickedPattern.length - 1);
});

// start the game when key has been pressed
$(document).on("keydown", function (event) {
  if (event.key === "a" && !started) {
    nextSequence();
    started = true;
    $("#level-title").text("Level " + level);
  }
});

// function that sets rules of the game
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    $(document).on("keydown", function () {
      if (!gameRestarted) {
        $("#level-title").text("Level " + level);
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        nextSequence();
        gameRestarted = false;
      }
    });
  }
}
