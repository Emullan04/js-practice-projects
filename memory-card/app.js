//select all cards
const cards = document.querySelectorAll('.memory-card');

let hasCardFlipped = false;
let firstCard, secondCard;
let boardLocked = false;

//event listener
cards.forEach(card => card.addEventListener('click', flipCard));

//functions
function flipCard() {
    if (boardLocked) return;
    if (this === firstCard) return;
    this.classList.toggle('flip');

    if (!hasCardFlipped) {
        //first click
        hasCardFlipped = true;
        firstCard = this;

        return;
    }
    //second click
    hasCardFlipped = false;
    secondCard = this;
    checkforMatch();

}

function checkforMatch() {
    let doCardsMatch = firstCard.dataset.id === secondCard.dataset.id;
    doCardsMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    boardLocked = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);

}

function resetBoard() {
    [hasCardFlipped, boardLocked] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();