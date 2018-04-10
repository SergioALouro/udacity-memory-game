// Variables definition

const deck = document.getElementsByClassName('card-deck');
const counter = document.querySelector('.moves');
const stars = document.getElementsByClassName('stars');
const timer = document.querySelector('.timer');
const star = document.getElementsByClassName('fa fa-star');

let card = document.getElementsByClassName('card');
let listOfCards = [...card];
let listOfStars = [...star];
let moves;
let minute;
let second;
let showCards;
let openedCards= [];
let openedCardsLength;
let interval;






/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
	
	moves = 0;
	counter.innerHTML = moves;

	stars[0].style.color = "#FFD700";

	second = 0;
	minute = 0;
	timer.innerHTML = '0 mins 0 secs';
	clearInterval(interval);
}

showCards = function() {
	this.classList.toggle('open');
	this.classList.toggle("disabled");
};

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

function match() {
	openedCards[0].classList.add('match','disabled');
	openedCards[1].classList.add('match','disabled');
	openedCards[0].classList.remove('open');
	openedCards[1].classList.remove('open');
	openedCards = [];
}

function unmatch() {
	openedCards[0].classList.add('unmatch');
	openedCards[1].classList.add('unmatch');
	setTimeout(function(){
		openedCards[0].classList.remove('open');
		openedCards[1].classList.remove('open');
		openedCards = [];
	},700);
}

function moveCounter() {
	moves++;
	counter.innerHTML = moves;
	if(moves == 1){
		startTimer();
	}

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

for(let i = 0; i < listOfCards.length; i++) {
	card = listOfCards[i];
	card.addEventListener('click', showCards);
	card.addEventListener('click', cardOpen);
};


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 *    function showCard() {
	$(".card").click(function(){
		$(this).toggleClass('open');
		$(this).toggleClass('show');
	});
}
showCard();
 */
