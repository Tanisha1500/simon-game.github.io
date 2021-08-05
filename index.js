var gamePattern=[];
var userClickedPattern=[];

var buttonColors=["red","blue","green","yellow"];

var started=false;
var level=0;

$(document).keypress(function()
{
  if(!started)
  {
    $("#level-title").text("Level  "+level);
    nextSequence();
    started=true;
  }
});



  $(".btn").on("click",function()
{
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animate(userChosenColor);
  // checkAnswer(userClickedPattern.length-1);
  checkAnswer(userClickedPattern);

});

function nextSequence()
{
   userClickedPattern=[];
   level++;
   $("#level-title").text("Level "+level);
  var randomNumber=(Math.floor(Math.random()*4));
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);



}

function playSound(randomChosenColor)
{
  var audio=new Audio("sounds/"+randomChosenColor+".mp3");
  audio.play();
}

function animate(currentColor)
{


   $("#"+currentColor).addClass("pressed");
   setTimeout(function() {
   $("#"+currentColor).removeClass("pressed");
}, 100);
}

function checkAnswer(userClickedPattern)
{
  var count=0;
      for(var i=0;i<userClickedPattern.length;i++)
      {
        if(userClickedPattern[i]===gamePattern[i])

          count++;

      }
      if(count===userClickedPattern.length)
      {
        console.log("sucess");
        if(gamePattern.length==userClickedPattern.length)
             {
               setTimeout(function()
             {
               nextSequence();
             },1000);
      }
    }

//    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
//    {
//      console.log("success");
//      if(gamePattern.length==userClickedPattern.length)
//      {
//        setTimeout(function()
//      {
//        nextSequence();
//      },1000);
// }

   else {
     var audio=new Audio("sounds/wrong.mp3");
     audio.play();
     $("body").addClass("game-over");
     setTimeout(function()
  {
    $("body").removeClass("game-over")
  },1000);

  $("#level-title").text("Game Over, Press any key to Start Over");
  setTimeout(function()
{
  startOver();
},1000);
   }

}

function startOver()
{
  started=false;
  level=0;
  gamePattern=[];
}
