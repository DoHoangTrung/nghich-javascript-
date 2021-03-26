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
let blackjackGame = {
  'you': {'scoreSpan':'#your-blackjack-result', 'div':'#your-box', 'score':0},
  'dealer': {'scoreSpan':'#dealer-blackjack-result', 'div':'#dealer-box', 'score':0},
  'cards': ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  'cardsMap': {'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'10': 10,'J': 10,'Q': 10,'K': 10,'A': [1,11],},
  'wins' : 0,
  'losses': 0,
  'draws': 0,
  'isStand': false,
  'turnOver': false,
  'isHit': false
};
const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const loseSound = new Audio('static/sounds/aww.mp3');
hitSound.volume = 0.2;
winSound.volume = 0.2;
loseSound.volume = 0.2;

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click',blackjackStand);

document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){
  if(blackjackGame['isStand'] === false){
    let card = randomCard();
    showCard(YOU,card);
    let score = updateScore(YOU,card);
    showScore(YOU);
    blackjackGame['isHit'] = true;
  }
}

function blackjackDeal(){
  if(blackjackGame['turnOver'] === true){
    let yourCard = document.getElementById('your-box').querySelectorAll('img');
    let dealerCard = document.getElementById('dealer-box').querySelectorAll('img');
  
    //delete card
    for(let i=0; i<yourCard.length; i++){
      yourCard[i].remove();
    }
  
    for(let i=0; i<dealerCard.length; i++){
      dealerCard[i].remove();
    }
  
    YOU['score'] = 0;
    DEALER['score'] = 0;
  
    showScore(YOU);
    showScore(DEALER);
  
    document.querySelector('#your-blackjack-result').style.color = 'white';
    document.querySelector('#dealer-blackjack-result').style.color = 'white';

    //set hit, stand and deal button weren't click
    blackjackGame['turnOver'] = false;
    blackjackGame['isHit'] = false;
    blackjackGame['isStand'] = false;
  }
}

function blackjackStand(){
  if(blackjackGame['isHit']===true){
    dealerLogic();
    blackjackGame['isStand'] = true;
  }
}

function randomCard(){
  let randomIndex = Math.floor(Math.random()*13);
  return blackjackGame['cards'][randomIndex];
}

function showCard(activePlayer, card){
  if(activePlayer['score'] <= 21){
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function updateScore(activePlayer, card){
  if(card === 'A'){
    //if adding 11 keep me under 21, add 11, otherwise add 1
    if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  }
  else{
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}

function showScore(activePlayer){
  if(activePlayer['score'] > 21){
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';

  } else{
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){
  while(DEALER['score'] <= 15){
    let card = randomCard();
    showCard(DEALER,card);
    updateScore(DEALER,card);
    showScore(DEALER,card);

    if(DEALER['score'] > 15){
      let winner = computeWinner();
      showResult(winner);
      showWinsLossesDrawsTable();
      
      blackjackGame['turnOver'] = true;
    }

    await sleep(1000);
    
  }
}

function computeWinner(){
  let winner;

  //condition: if you not BUST
  if(YOU['score'] <= 21){
    //condition: higher score than dealer or dealer busts
    if(DEALER['score'] < YOU['score'] || DEALER['score'] > 21){
      console.log('you won');
      winner = YOU;
    } else if(DEALER['score'] === YOU['score']){
      console.log('you drew');
    } else if(DEALER['score'] > YOU['score']){
      console.log('you lost');
      winner = DEALER;
    }
  } else if( YOU['score'] > 21 && DEALER['score'] <= 21){
    console.log('you lost');
    winner = DEALER;

    //condition: you AND dealer busts
  } else if (YOU['score'] > 21 && DEALER['score'] > 21){
    console.log('you drew');
  }

  updateWinsLossesDrawsTable(winner);

  return winner;
}

function showResult(winner){
  let message, messageColor;

  if(winner === YOU){
    message = 'You won';
    messageColor = 'green';
    winSound.play();

  } else if( winner === DEALER){
    message = 'You lost';
    messageColor = 'red';
    loseSound.play();

  } else {
    message = 'You drew';
    messageColor = 'black';
  }

  document.querySelector('#blackjack-result').textContent = message;
  document.querySelector('#blackjack-result').style.color = messageColor;
}

function updateWinsLossesDrawsTable(winner){
  if(winner === YOU){
    blackjackGame['wins'] ++;
  } else if(winner === DEALER){
    blackjackGame['losses'] ++;
  } else {
    blackjackGame['draws'] ++;
  }
}

function showWinsLossesDrawsTable(){
  document.querySelector('#wins').textContent = blackjackGame['wins'];
  document.querySelector('#losses').textContent = blackjackGame['losses'];
  document.querySelector('#draws').textContent = blackjackGame['draws'];
}