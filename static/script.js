//Challenge 1: Your age in days

function ageInDays(){
    var birthYear = prompt('What year were you born?');
    var days = (2021-birthYear)*365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are '+ days + " days old");
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}

//Challenge 2: generate gif
function generateGif(){
  var gifImg = document.createElement('img');
  gifImg.src = 'https://media.giphy.com/media/l0ExaAxJrEtQro8BW/giphy.gif'
  document.getElementById('gif-img').appendChild(gifImg);
}

//Challenge 3: rock paper scissors
function rpsGame(yourChoice){
  let humanChoice, computerChoice;
  humanChoice = yourChoice.id;
  computerChoice = numberToChoice(randToRpsInt());
  
  let result = decideWinner(humanChoice, computerChoice); // [0,1]: you lose, [0.5, 0.5]: tied
  var message = finalMessage(result);
  
  rpsFrontEnd(humanChoice, computerChoice, message);
}

function randToRpsInt(){
  return Math.floor(Math.random()*3);
}

function numberToChoice(num){
  return ['rock','paper','scissors'][num];
}

function decideWinner(humanChoice, computerChoice){
  var rpsDatabase = {
    'rock':{'rock':0.5, 'paper':0, 'scissors':1},
    'paper':{'rock':1, 'paper':0.5, 'scissors':0},
    'scissors':{'rock':0, 'paper':1, 'scissors':0.5}
  };

  var yourScore = rpsDatabase[humanChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][humanChoice];
  
  return [yourScore,computerScore];
}

function finalMessage([yourScore, computerScore]){
  if(yourScore === 0){
    return {'message':'you lost', color:'red'};
  }else if(yourScore ===1){
    return {'message':'you win', color:'green'};
  }else{
    return {'message':'tied', color:'yealow'};
  }
}

function rpsFrontEnd(humanImageChoice, computerImageChoice, finalMessage ){
  var imgData = {
    'rock':'https://i.pinimg.com/originals/6a/08/b1/6a08b1872ee794835beab73563d10f38.png',
    'paper':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV5wNWTD3pNoAwb4z0PdA_O0_I2mkc2rOs-A&usqp=CAU',
    'scissors':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4x4hAaTfvWFGjbRnXurb9ZIcnYbav2CV1GA&usqp=CAU' 
  };

  //remove all the images
  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var humanDiv = document.createElement('div');
  var computerDiv = document.createElement('div');
  var messageDiv = document.createElement('div');

  humanDiv.innerHTML="<img src=\"" + imgData[humanImageChoice] + "\">";
  messageDiv.innerHTML="<h2 style='color:"+finalMessage['color']+"'>"+finalMessage['message']+"</h2>";
  computerDiv.innerHTML= "<img src=\"" + imgData[computerImageChoice] + "\">";

  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(computerDiv);
}

//challenge 4: change color of all buttons
let all_buttons = document.getElementsByTagName('button');
let copyAllButtons = []; 
for(let i=0; i<all_buttons.length; i++){
  copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(colorSelected){
  if(colorSelected.value === 'red'){
    buttonsRed();
  } else if(colorSelected.value === 'green'){
    buttonsGreen();
  } else if(colorSelected.value === 'random'){
    buttonRandomColor();
  } else if (colorSelected.value ==='reset'){
    buttonResetColor();
  }
}

function buttonsRed() {
  for(let i=0; i<all_buttons.length; i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger');
  }
}

function buttonsGreen() {
  for(let i=0; i<all_buttons.length; i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
  }
}

function buttonRandomColor(){
  for(let i=0; i<all_buttons.length; i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(getRandomColor());
  }
}

function buttonResetColor(){
  for(let i=0; i<all_buttons.length; i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randToColorInt(){
  return Math.floor(Math.random()*6);
}

function getRandomColor(){
  let btnClass = [
    'btn-primary',
    'btn-secondary',
    'btn-success',
    'btn-danger',
    'btn-info',
    'btn-wanring'
  ];
  return btnClass[randToColorInt()];
}

//Challenge 5: Blackjack
documen