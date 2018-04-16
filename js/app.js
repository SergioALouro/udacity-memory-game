// Variables definition

const deck = document.querySelector('.deck');
const counter = document.querySelector('.moves');
const stars = document.getElementsByClassName('stars');
const timer = document.querySelector('.timer');
const star = document.getElementsByClassName('fa fa-star');
const popup = document.querySelector('.popup-background');
const closepopup = document.querySelector('.close');

let card = document.getElementsByClassName('card');
let matchCard = document.getElementsByClassName('match');
let listOfCards = [...card];
let listOfStars = [...star];
let finalScore;
let moves;
let minute;
let second;
let showCards;
let openedCards= [];
let openedCardsLength;
let interval;








// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// runs function on page load
document.body.onload = startGame();

function startGame() {
	//shuffle deck
	listOfCards= shuffle(listOfCards);

	for ( const listOfCard of listOfCards) {
		deck.innerHTML ='';
		[].forEach.call(listOfCards, function(item) {
			deck.appendChild(item);
		});
		// remove classes
		listOfCard.classList.remove('open', 'match', 'disabled', 'unmatch', 'show');
	}
	
	//reset moves
	moves = 0;
	counter.innerHTML = moves;

	//reset stars
	listOfStars[2].style.display ='block';
	listOfStars[2].style.display ='block';
	listOfStars[1].style.display ='block';
	listOfStars[2].style.color ='#FFD700';
	listOfStars[1].style.color ='#FFD700';
	listOfStars[0].style.color ='#FFD700';
	stars[0].style.color = "#FFD700";

	// reset timer
	second = 0;
	minute = 0;
	timer.innerHTML = '0 mins 0 secs';
	clearInterval(interval);
}

//show card function
showCards = function() {
	this.classList.toggle('open');
	this.classList.toggle('show');
	this.classList.toggle("disabled");
};

//card open function
function cardOpen() {
	moveCounter();
	openedCards.push(this);
	openedCardsLength = openedCards.length;
	if(openedCardsLength ===2) {
		if(openedCards[0].type === openedCards[1].type){
			match();
		} else {
			unmatch();
		}
	}
};

// apply match class
function match() {
	openedCards[0].classList.add('match', 'disabled','show');
	openedCards[1].classList.add('match', 'disabled','show');
	openedCards[0].classList.remove('open','show');
	openedCards[1].classList.remove('open','show');
	openedCards = [];
}

//apply unmatch class
function unmatch() {
	openedCards[0].classList.add('unmatch','show');
	openedCards[1].classList.add('unmatch','show');

	//define timeout when unmatch is applied 
	setTimeout(function(){
		openedCards[0].classList.remove('open', 'unmatch', 'disabled','show');
		openedCards[1].classList.remove('open', 'unmatch', 'disabled','show');
		openedCards = [];
	},1250);
}


// move counter function
function moveCounter() {
	moves++;
	counter.innerHTML = moves;
	if(moves == 1){
		startTimer();
	}

// define score
	if(moves > 26 && moves < 32){
		listOfStars[2].style.display ='none';
		listOfStars[1].style.color ='#C0C0C0';
		listOfStars[0].style.color ='#C0C0C0';
	} else if (moves > 33){
		listOfStars[2].style.display ='none';
		listOfStars[1].style.display ='none';
		listOfStars[0].style.color ='#CD7f32';
	}
}

// start time definition
function startTimer() {
	interval = setInterval(function(){
		timer.innerHTML = minute + ' mins' + second + ' secs';
		second ++;
		if(second == 60) {
			minute++;
			second = 0;
		}
	},1000);
}


// show win screen 
function endGame() {
    if(matchCard.length === 16) {
        clearInterval(interval);
        totalTime = timer.innerHTML;

        popup.style.display = 'block';

        finalScore = document.querySelector('.stars').innerHTML;

        document.getElementById('finalScore').innerHTML = finalScore;
        document.getElementById('totalMoves').innerHTML = moves;
        document.getElementById('totalTime').innerHTML = totalTime;

	}
}

// play again action button
function playAgain() {
	popup.style.display = 'none';
	startGame();
}

// popup close action
function popupClose(){
	closepopup.addEventListener('click', function(){
		popup.style.display = 'none';
	});
}


// Event listener setup 
for( const listOfCard of listOfCards) {
	card = listOfCard;
	card.addEventListener('click', showCards);
	card.addEventListener('click', cardOpen);
	card.addEventListener("click",endGame);
};



