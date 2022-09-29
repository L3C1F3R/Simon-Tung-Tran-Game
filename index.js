var buttonColor = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickPattern = [];

var level = 0;

var gameStart = false;

$(document).keypress(function() {
  if(!gameStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
  }

});


$(".btn").click(function() {
  userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatedPress(userChosenColor);

  checkAnswer(userClickPattern.length - 1);
})

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    console.log("success");

    if(userClickPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }

  else {
    console.log("wrong");
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();

  }
}

function startOver() {
  gamePattern = [];
  gameStart = false;
  level = 0;
}

function nextSequence() {

  userClickPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  animatedPress(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatedPress(currentColor) {
  $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}
