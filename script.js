const cards = [
    { question: "What is 'Hello' in Spanish?", answer: "Hola" },
    { question: "What is 'Thank you' in French?", answer: "Merci" },
    { question: "What is 'Goodbye' in German?", answer: "Auf Wiedersehen" },
    { question: "What is 'Please' in Italian?", answer: "Per favore" },
    { question: "What is 'Yes' in Japanese?", answer: "Hai" },
];

let currentCard = 0;
let score = 0;
let incorrectCards = [];
let studyMode = true; // Default mode

function showCard() {
    const card = cards[currentCard];
    document.getElementById('card-text').innerText = card.question;
    document.getElementById('user-input').value = '';
    document.getElementById('result').innerText = '';
}

function nextCard() {
    currentCard = (currentCard + 1) % cards.length;
    showCard();
}

function checkAnswer() {
    const userAnswer = document.getElementById('user-input').value.trim();
    const correctAnswer = cards[currentCard].answer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        document.getElementById('result').innerText = "Correct!";
        score++;
    } else {
        document.getElementById('result').innerText = `Incorrect! The correct answer is: ${correctAnswer}`;
        incorrectCards.push(currentCard);
    }
    document.getElementById('score').innerText = `Score: ${score}`;
}

function resetCards() {
    currentCard = 0;
    score = 0;
    incorrectCards = [];
    showCard();
}

function saveProgress() {
    localStorage.setItem('currentCard', currentCard);
    localStorage.setItem('score', score);
}

function loadProgress() {
    currentCard = parseInt(localStorage.getItem('currentCard')) || 0;
    score = parseInt(localStorage.getItem('score')) || 0;
    document.getElementById('score').innerText = `Score: ${score}`;
    showCard();
}

// Call loadProgress() when the page loads
window.onload = loadProgress;

function showHint() {
    const hints = {
        "What is 'Hello' in Spanish?": "It starts with 'H'.",
        "What is 'Thank you' in French?": "It has 'M' in it.",
        // Add hints for other questions as needed
    };
    const hint = hints[cards[currentCard].question];
    document.getElementById('result').innerText = hint || "No hint available.";
}

function saveUserScore(username) {
    let users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[username]) {
        users[username] = { score: 0 };
    }
    users[username].score += score;
    localStorage.setItem('users', JSON.stringify(users));
}

function customizeCard() {
    const cardColor = prompt("Enter a color for your flashcard (e.g., #ffcc00):");
    document.getElementById('flashcard').style.backgroundColor = cardColor;
}

function toggleMode() {
    studyMode = !studyMode;
    document.getElementById('mode').innerText = studyMode ? "Study Mode" : "Quiz Mode";
    if (!studyMode) {
        checkAnswer(); // Call to check answer immediately in quiz mode
    }
}

function reviewIncorrect() {
    if (incorrectCards.length > 0) {
        currentCard = incorrectCards.pop(); // Get the last incorrect card
        showCard();
    } else {
        alert("No incorrect answers to review!");
    }
}