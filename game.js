var gamePattern = [];
var level = 1;
var numOfClicks = 0;
var openToClick = false;
var gameOff = true;

// User press keyboard key to start the game
$(document).keypress(function() {
  if (gameOff) {
    startNewGame();
    nextSeq();
    screenPattern(0);
  }
});

// Animate game pattern
function screenPattern(index) {
  if (index == gamePattern.length) {
    openToClick = true;
  } else {
    setTimeout(function() {
      animateButton(gamePattern[index]);
      screenPattern(index + 1);
    }, 1000);
  }
}

// User input - detect click on the buttons, compare and count
$(".btn").on("click",
  function() {
    if (openToClick) {
      // UI pressing
      buttonPressed(this.id);
      animateButton(this.id);

      numOfClicks += 1;
      if (gamePattern[numOfClicks - 1] == this.id) {
        if (numOfClicks == gamePattern.length) {
          patternMatched();
        }
      } else {
        failed();
      }
    }
  }
)

function patternMatched() {
  openToClick = false;
  numOfClicks = 0;
  success();
  level += 1;
  $("#level-title").text("Level:" + level);
  setTimeout(function() {
    screenPattern(0);
  }, 500);
}

// Add one more color to the current game pattern
function nextSeq() {
  var randomNum = Math.floor(Math.random() * 4);
  var colors = ["red", "blue", "green", "yellow"];
  gamePattern.push(colors[randomNum]);
}

// Animate button pressed by adding gray shadow
function buttonPressed(color) {
  $("." + color).addClass("pressed");
  setTimeout(function() {
    $("." + color).removeClass('pressed');
  }, 40);
}

// if user answer correct - blink a green background
function success() {
  nextSeq();
  console.log(1);
  $("body").addClass("green-screen");
  console.log(2);
   // $("body").css("background-color", "#2E8B57");
  setTimeout(function() {
    $("body").removeClass("green-screen");
    // $("body").css("background-color", "#011F3F");
  }, 150);
}

// Case that user failed. change bg color to red and present final score
function failed() {
  openToClick = false;
  $("body").addClass("red-screen");
  new Audio("sounds/wrong.mp3").play();
  $("#level-title").text("Failed!");

  // sum game score
  setTimeout(function() {
    $("#level-title").text("Final score is: " + level);
    setTimeout(function() {
      $("#level-title").text("Press A key to start a new game");
      gameOff = true;
    }, 1500);
  }, 1000);
}

// initialize new game
function startNewGame() {
  gameOff = false;
  gamePattern = [];
  level = 1;
  numOfClicks = 0;
  $("body").removeClass("red-screen");
  $("#level-title").text("Level:" + level);
}

// Animate button use (pressed by user or by the script)
function animateButton(color) {
  $("#" + color).fadeOut(150).fadeIn(30);
  new Audio("sounds/" + color + ".mp3").play();
}
