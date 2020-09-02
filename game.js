var userClickedPatterns = [];

var gamePattern = [];

var buttonColor = ["red", "blue", "green", "yellow"];

var level = 0;




// Starting Sequence


$(document).keydown(function() {
  nextSequence()

  $(document).unbind();
});




$(".btn").click(function(event) {
  var userChosenColor = event.target.id;

  var name = "sounds/" + event.target.id + ".mp3";

  playSound(name);
  animatePress(userChosenColor);

  userClickedPatterns.push(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPatterns.length - 1);

})

// nextSequence();

function nextSequence() {
  userClickedPatterns = [];

  var randomNumber = Math.floor((Math.random() * 4));

  var randomChosenColor = buttonColor[randomNumber];

  gamePattern.push(randomChosenColor);

  $("." + randomChosenColor).fadeOut(100).fadeIn(100);

  var sound = "sounds/" + randomChosenColor + ".mp3";
  playSound(sound);

  level++;

  $("h1").text("Level " + level);
  // console.log(event.target.id);
}




// Sounds


function playSound(name) {
  var audio = new Audio(name);
  audio.play();
};


// Animation

function animatePress(currentColor) {

  $("." + currentColor).addClass("pressed");

  setTimeout(function() {
    $("." + currentColor).removeClass("pressed")
  }, 100);
};

// Logical check


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPatterns[currentLevel]) {

    console.log(gamePattern, userClickedPatterns);

    // To knoe when you are done clicking
    if (userClickedPatterns.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();

      }, 1000)

    }

  } else {
    $("h1").text("Game Over, press any key to restart");

    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    //To restart When you get the sequence wrong
    startOver();


  }
}



function startOver() {
  level = 0;
  gamePattern = [];

  //The startig sequence Again!
  $(document).keydown(function() {
    nextSequence()

    $(document).unbind();
  });
}
