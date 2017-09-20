
//variables
var userSeq = [];
var simonSeq = []; 
var NUM_OF_LEVELS = 20;
var id, color, level = 0;
var boardSound=[
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",  //green
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",  //red
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",  //yellow
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"   //blue
  ];


// start sequence
$(document).ready(function(){
    $(".start").click(function(){
      level++;
      simonSequence();
    });
    
    // user pad listener 
    $('.pad').click(function(){
      id = $(this).attr("id");
      color = $(this).attr("class").split(" ")[1];
      userSeq.push(id);
      console.log(id+" "+color);
      addClassSound(id, color);
      
      //check user sequence
      if(!checkUserSeq()){
        displayError();
        userSeq = [];
      }
      // checking end of sequence
      if(userSeq.length === simonSeq.length  && userSeq.length < NUM_OF_LEVELS){
        level++;
        userSeq = [];
        simonSequence();
      }
      
      if(userSeq.length === NUM_OF_LEVELS){
        $(".display").text("Win");
      }
    });
});

//checking user seq vs simons
function checkUserSeq(){
  for(var i = 0; i < userSeq.length; i++){
    if(userSeq[i] != simonSeq[i]){
      return false;
    }
  }return true;
}

// display error
function displayError(){
  console.log("error!");
  $(".display").text("!!");
  var counter = 0;
  var myError = setInterval(function(){
    counter++;
    if(counter ==3){
      $(".display").text(level);
      clearInterval(myError);
      userSeq = [];
      counter = 0;
    }
  },500 );
}

/*simon sequence*/
function simonSequence() {
  console.log(level);
    $('.display').text(level);
    
    getRandomNum(); 
    var i = 0;
    var myInterval = setInterval(function() {
      id = simonSeq[i];
      color = $("#" + id).attr("class").split(" ")[1];
      console.log(id+" "+color);
      
      addClassSound(id, color);
      i++;
      if (i == simonSeq.length){
        clearInterval(myInterval);
      }
    }, 1000);
    
    
}
// Strict mode button
function strictMode(){
  $(".strict").click(function(){
  level = 0;   console.log (level);
  $(".display").text('X_X');
  alert("strict mode enabled");
  simonSequence();
  });  
}


//generate random number
function getRandomNum() {
  var random = Math.floor(Math.random() * 4);
  simonSeq.push(random);
}

/*add temporary class and sound*/
function addClassSound() {
  $("#"+id).addClass(color + "-active");
  playSound(id);                      
  setTimeout(function() {
    $("#"+id).removeClass(color + "-active");
  }, 500);
}



/* play board sound */
function playSound(id) {
  var sound = new Audio(boardSound[id]);
  sound.play();
}
