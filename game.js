//colours that we have
var buttonColours = ["red", "blue", "green", "yellow"];

// empty array to get user what they clicked(record).
var userClickedPattern = [];

//empty array to get pattern of game.
var gamePattern = [];

//starting value, level at 0 and not yet started i.e false.
var level = 0;
var started = false;

//to get when click so that we change the text according to level.
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

//button clicked.
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);  //pass the value(index) what user clicked in last.
});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

// for getting sound
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

// animation done through adding class which is already style in css.
function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

//to restart the game, that is why reset the value.
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
