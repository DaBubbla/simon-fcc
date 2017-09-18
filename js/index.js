
//variables
var userSeq = [];
var simonSeq = [];
var id, color, level = 0;
var boardSound=[
  "https://www.soundjay.com/button/sounds/button-4.mp3", //green
  "https://www.soundjay.com/button/sounds/button-09.mp3", //red
  "https://www.soundjay.com/button/sounds/button-10.mp3", //yellow
  "https://www.soundjay.com/button/sounds/button-7.mp3"  //blue
  ];

// start sequence
$(document).ready(function(){
    $(".start").click(function(){
      level++;
      startSequence();
        
    });
});
/*simon sequence*/
function startSequence() {
  console.log(level);
    $('.display').text(level);
    getRandomNum();
    var i = 0;
    var myInterval = setInterval(function() {
      id = simonSeq[i];
      color = $("#" + id).att("class").split(" ")[1];
      console.log(id+" "+color);
      addClassSound(id, color);
      i++;
      if (i == simonSeq.length){
        clearInterval(myInterval);
      }
    }, 1000);
    
    
}

//generate random number
function getRandomNum() {
  var random = Math.floor(Math.random() * 4);
  simonSeq.push(random);
}

/*add temporary class and sound*/
function addClassSound() {
  $("#"+id).addClass(color+ ".active");
  //playSound()
  setTimeout(function() {
    $("#"+id).removeClass(color + ".active")
  }, 500);
}

/* play board sound */
function playSound(id) {
  
}
// user copies sequence