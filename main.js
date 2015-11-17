var deck = [
{"card":"a","score":14,"suit":"d"},
{"card":"a","score":14,"suit":"c"},
{"card":"a","score":14,"suit":"s"},
{"card":"a","score":14,"suit":"h"},
{"card":"2","score":2,"suit":"d"},
{"card":"2","score":2,"suit":"c"},
{"card":"2","score":2,"suit":"s"},
{"card":"2","score":2,"suit":"h"},
{"card":"3","score":3,"suit":"d"},
{"card":"3","score":3,"suit":"c"},
{"card":"3","score":3,"suit":"s"},
{"card":"3","score":3,"suit":"h"},
{"card":"4","score":4,"suit":"d"},
{"card":"4","score":4,"suit":"c"},
{"card":"4","score":4,"suit":"s"},
{"card":"4","score":4,"suit":"h"},
{"card":"5","score":5,"suit":"d"},
{"card":"5","score":5,"suit":"c"},
{"card":"5","score":5,"suit":"s"},
{"card":"5","score":5,"suit":"h"},
{"card":"6","score":6,"suit":"d"},
{"card":"6","score":6,"suit":"c"},
{"card":"6","score":6,"suit":"s"},
{"card":"6","score":6,"suit":"h"},
{"card":"7","score":7,"suit":"d"},
{"card":"7","score":7,"suit":"c"},
{"card":"7","score":7,"suit":"s"},
{"card":"7","score":7,"suit":"h"},
{"card":"8","score":8,"suit":"d"},
{"card":"8","score":8,"suit":"c"},
{"card":"8","score":8,"suit":"s"},
{"card":"8","score":8,"suit":"h"},
{"card":"9","score":9,"suit":"d"},
{"card":"9","score":9,"suit":"c"},
{"card":"9","score":9,"suit":"s"},
{"card":"9","score":9,"suit":"h"},
{"card":"10","score":10,"suit":"d"},
{"card":"10","score":10,"suit":"c"},
{"card":"10","score":10,"suit":"s"},
{"card":"10","score":10,"suit":"h"},
{"card":"j","score":11,"suit":"d"},
{"card":"j","score":11,"suit":"c"},
{"card":"j","score":11,"suit":"s"},
{"card":"j","score":11,"suit":"h"},
{"card":"q","score":12,"suit":"d"},
{"card":"q","score":12,"suit":"c"},
{"card":"q","score":12,"suit":"s"},
{"card":"q","score":12,"suit":"h"},
{"card":"k","score":13,"suit":"d"},
{"card":"k","score":13,"suit":"c"},
{"card":"k","score":13,"suit":"s"},
{"card":"k","score":13,"suit":"h"}
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

  $('#player-cards').append('<img class="card-img" src="'+ 'img/' + card1.suit + "-" + card1.card + '.png' + '">'); 

  $('#computer-cards').append('<img class="card-img" src="'+ 'img/' + card2.suit + "-" + card2.card + '.png' + '">');

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
    console.log("Player 1 WINS");
  }
  else {
    console.log("Player 2 WINS");
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
  $('#player-cards').append('<img class="card-img" src="'+ 'img/back.png">');
  $('#computer-cards').append('<img class="card-img" src="'+ 'img/back.png">');
  $('#start-button').hide();
  $('#play-button').show();
}

function startGame(){
  splitDeck(shuffle(deckCopy));
}

function playRound(){
  $('#player-cards').html('');
  $('#computer-cards').html('');
  $('.back').html('');
  $('.back').append('<img class="card-img" src="'+ 'img/back.png">');
  if (deck1.length > 0 && deck2.length > 0){
    moveCardsToWinner(drawCards([deck1, deck2]));
  } else {
    declareWinner();
    confirmPlay();
  }
}

