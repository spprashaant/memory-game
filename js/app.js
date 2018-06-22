/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName('card');
let moveCounterTag = document.getElementsByClassName('moves')[0];
let deck = document.getElementsByClassName('deck')[0];
let retstartButton = document.getElementsByClassName('restart')[0];
let starsElement = document.getElementsByClassName('stars')[0];
let modal = document.getElementById('myModal'); 
let modalTextElement = modal.getElementsByTagName('p')[0];  
let resetButton = document.getElementsByClassName('reset-button')[0];
let openCards = [];
let matchedCards = [];
let moveCounter = 0;
let stars = 5;
const increment = 5;

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function displayCardSymbol(card){
    card.classList.add('match');
}

function lockTheCards(existingCard, newCardClass){
    existingCard.removeEventListener('click', cardClick);
    newCardClass.removeEventListener('click', cardClick);
}

function hideCardSymbol(existingCard, newCardClass){
    existingCard.classList.remove('match');
    newCardClass.classList.remove('match');
}

function updateMoveCounter(){
    moveCounter++;
        if(moveCounter % increment === 0){
            if(stars > 1){
                stars--;
                starsElement.removeChild(starsElement.children[0]);
            }
        }
    moveCounterTag.textContent = moveCounter;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

function checkDone(){
    if(matchedCards.length === cards.length){
        modalTextElement.innerHTML = "<h1>Congratulations! You Won!</h1> With "+ moveCounter+" Moves and "+ stars +" Stars.<br> Wooooo!";
        modal.style.display = "block";
    }
}

function addCardToOpenCards(card){
    if(openCards.length === 1){
        const existingCard = openCards.pop();
        existingCardClass = existingCard.getElementsByTagName('i')[0].classList[1];
        newCardClass = card.getElementsByTagName('i')[0].classList[1];
        if(existingCardClass === newCardClass){
            lockTheCards(existingCard, card);
            matchedCards.push(existingCard);
            matchedCards.push(card);
            checkDone();
            
        }
        else{
            hideCardSymbol(existingCard, card);
        }
        updateMoveCounter();
    }
    else{
        openCards.push(card);
    }
}
function cardClick(){
    displayCardSymbol(this);
    addCardToOpenCards(this);
}
for(const card of cards){
    card.addEventListener('click', cardClick);
}

retstartButton.addEventListener('click', function(){
    location.reload();
});

resetButton.addEventListener('click', function(){
    location.reload();
});


