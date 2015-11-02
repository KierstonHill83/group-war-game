var deck = [
  {card: ["🂡"], score: 14 },
  {card: ["🂮"], score: 13 },
  {card: ["🂭"], score: 12 },
  {card: ["🂫"], score: 11 },
  {card: ["🂪"], score: 10 },
  {card: ["🂩"], score: 9 },
  {card: ["🂨"], score: 8 },
  {card: ["🂧"], score: 7 },
  {card: ["🂦"], score: 6 },
  {card: ["🂥"], score: 5 },
  {card: ["🂤"], score: 4 },
  {card: ["🂣"], score: 3 },
  {card: ["🂢"], score: 2 },
  {card: ["🂡"], score: 14 },
  {card: ["🂾"], score: 13 },
  {card: ["🂽"], score: 12 },
  {card: ["🂻"], score: 11 },
  {card: ["🂺"], score: 10 },
  {card: ["🂹"], score: 9 },
  {card: ["🂸"], score: 8 },
  {card: ["🂷"], score: 7 },
  {card: ["🂶"], score: 6 },
  {card: ["🂵"], score: 5 },
  {card: ["🂴"], score: 4 },
  {card: ["🂳"], score: 3 },
  {card: ["🂲"], score: 2 },
  {card: ["🃑"], score: 14 },
  {card: ["🃞"], score: 13 },
  {card: ["🃝"], score: 12 },
  {card: ["🃛"], score: 11 },
  {card: ["🃚"], score: 10 },
  {card: ["🃙"], score: 9 },
  {card: ["🃘"], score: 8 },
  {card: ["🃗"], score: 7 },
  {card: ["🃖"], score: 6 },
  {card: ["🃕"], score: 5 },
  {card: ["🃔"], score: 4 },
  {card: ["🃓"], score: 3 },
  {card: ["🃒"], score: 2 },
  {card: ["🃁"], score: 14 },
  {card: ["🃎"], score: 13 },
  {card: ["🃍"], score: 12 },
  {card: ["🃋"], score: 11 },
  {card: ["🃊"], score: 10 },
  {card: ["🃉"], score: 9 },
  {card: ["🃈"], score: 8 },
  {card: ["🃇"], score: 7 },
  {card: ["🃆"], score: 6 },
  {card: ["🃅"], score: 5 },
  {card: ["🃄"], score: 4 },
  {card: ["🃃"], score: 3 },
  {card: ["🃂"], score: 2 },
];

var deckCopy = deck.slice();
var deck1 = [];
var deck2 = [];

function shuffle(shuffledCards) {
  var currentIndex = deckCopy.length;
  var tempValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    tempValue = deckCopy[currentIndex];
    deckCopy[currentIndex] = deckCopy[randomIndex];
    deckCopy[randomIndex] = tempValue;
  }
  return deckCopy;
}

function splitDeck(shuffledDeck) {
  splitDeckArray = [];
  deck1 = deckCopy.slice(0, 26);
  deck2 = deckCopy.slice(26, 53);
  splitDeckArray.push(deck1, deck2);
  return splitDeckArray;
}

function drawCards(handArray) {
  console.log(handArray, "HAND ARRAY");
  newCardsArray = [];
  var card1 = handArray[0].shift();
  var card2 = handArray[1].shift();
  newCardsArray.push(card1, card2);
  return newCardsArray;
}

function moveCardsToWinner(winnersArray) {
    if (winnersArray[0].score > winnersArray[1].score) {
      deck1.push(winnersArray[0], winnersArray[1]);
      console.log("player 1 wins");
    }
    else if (winnersArray[0].score === winnersArray[1].score) {
      miniGame(winnersArray[0], winnersArray[1]);
      console.log("minigame");
    }
    else {
      deck2.push(winnersArray[1], winnersArray[0]);
      console.log("player 2 wins");
    }
}

//Mini War Function
function miniGame(card1, card2) {
    var p1War = deck1.splice(0, 4);
    var p2War = deck2.splice(0, 4);

    if (p1War.length < p2War.length) {
      console.log("Player 2 WINS");
    }
    else if (p2War.length < p1War.length) {
      console.log("Player 1 WINS");
    }
    else {
      if (p1War[p1War.length -1].score > p2War[p2War.length - 1].score) {
        deck1.push(card1, card2);
        for (var i = 0; i < p1War.length; i++) {
          deck1.push(p1War[i]);
          deck1.push(p2War[i]);
        }
      }
      else if (p1War[p1War.length -1].score === p2War[p2War.length - 1].score) {
        miniGame(p1War[p1War.length - 1], p2War[p2War.length - 1]);
      }
      else {
        deck2.push(card1, card2);
        for (var j = 0; j < p2War.length; j++) {
          deck2.push(p1War[j]);
          deck2.push(p2War[j]);
        }
      }
    }
}


function declareWinner() {
  if (deck1.length > 0) {
    alert("Player 1 WINS");
  }
  else {
    alert("Player 2 WINS");
  }
}

function confirmPlay() {
    var again = confirm("Play again?");
      if (again === true) {
        playGame();
      }
}


function playGame () {
  splitDeck(shuffle(deckCopy));
  while (deck1.length > 0 && deck2.length > 0) {
    moveCardsToWinner(drawCards([deck1, deck2]));
  }
  declareWinner();
  confirmPlay();
}

function startGame(){
  splitDeck(shuffle(deckCopy));
  console.log();
}

function playRound(){
  if (deck1.length > 0 && deck2.length > 0){
    moveCardsToWinner(drawCards([deck1, deck2]));
  }
  displayCards(deck);
  declareWinner();
  confirmPlay();
  }

