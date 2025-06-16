var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var started = false;  
var level = 0




$(document).keydown(function () {
  if (!started) {
    // Step 3: Update the title to "Level 0"
    $("#level-title").text("Level " + level);
    
    nextSequence();
    started = true;
  }
});
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence()
{
userClickedPattern = []; 

 
level++;


  $("#level-title").text("Level " + level);

var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}



$(".btn").click(function()
{
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    

  $("#" + userChosenColour).fadeOut(100).fadeIn(100);
  playSound(userChosenColour);
  animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length - 1);

});
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    // Check if the full pattern has been entered
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {
    // ======= Step 1: Play the "wrong" sound =======
    playSound("wrong");

    // ======= Step 2: Add "game-over" class to body =======
    $("body").addClass("game-over");

    // Remove "game-over" class after 200ms
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Update the h1 to show game over message
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Reset the game
    startOver();
  }
  

}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
