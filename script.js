const cardImages = [
    'Images/mal.jpeg', // Add the paths to your character images here
    'Images/evie.jpeg',
    'Images/jay.jpeg',
    'Images/carlos.jpeg',
    'Images/uma.jpeg',
    'Images/ben.jpeg'
];

let cards = [...cardImages, ...cardImages]; // Duplicate the array for matching pairs
let shuffledCards = [];
let flippedCards = [];
let matchedPairs = 0;

// Shuffle the cards
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Create the game board
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    shuffledCards = shuffle(cards);
    shuffledCards.forEach((cardImage, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;

        const front = document.createElement('div');
        front.classList.add('front');
        const back = document.createElement('div');
        back.classList.add('back');

        const img = document.createElement('img');
        img.src = cardImage;
        front.appendChild(img);

        card.appendChild(front);
        card.appendChild(back);
        gameBoard.appendChild(card);

        // Add click event listener to each card
        card.addEventListener('click', flipCard);
    });
}

// Flip the card
function flipCard() {
    const card = this;
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

// Check for a match
function checkMatch() {
    const [card1, card2] = flippedCards;
    const card1Index = card1.dataset.index;
    const card2Index = card2.dataset.index;

    if (shuffledCards[card1Index] === shuffledCards[card2Index]) {
        matchedPairs++;
        if (matchedPairs === cardImages.length) {
            setTimeout(() => alert('You found all pairs!'), 500);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
}

// Restart the game
function restartGame() {
    document.getElementById('game-board').innerHTML = '';
    matchedPairs = 0;
    flippedCards = [];
    createBoard();
}

// Add event listener to the restart button
document.getElementById('restart').addEventListener('click', restartGame);

// Start the game when the page loads
createBoard();
