const modeSelect = document.getElementById('mode-select');
const difficultySelect = document.getElementById('difficulty-select');
const scoreDisplay = document.getElementById('score');
const problemText = document.getElementById('problem-text');
const userInputDisplay = document.getElementById('user-input');
const feedbackBanner = document.getElementById('feedback-banner');
const numBtns = document.querySelectorAll('.num-btn');
const btnClear = document.getElementById('btn-clear');
const btnEnter = document.getElementById('btn-enter');

let score = 0;
let currentAnswer = 0;
let currentInput = '';
let currentMode = 'discount';
let currentDifficulty = 'medium';

// Utility for random numbers
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
    let text = '';
    
    if (currentMode === 'discount') {
        let price, discountPercent;
        if (currentDifficulty === 'easy') {
            price = getRandomInt(1, 10) * 10;
            discountPercent = getRandomInt(1, 5) * 10;
        } else if (currentDifficulty === 'medium') {
            price = getRandomInt(1, 10) * 20;
            discountPercent = getRandomInt(1, 10) * 5;
        } else {
            price = getRandomInt(1, 20) * 20;
            discountPercent = getRandomInt(1, 19) * 5;
        }
        
        currentAnswer = price - (price * (discountPercent / 100));
        text = `Item is <span style="color: var(--cyan)">$${price}</span>.<br>It is <span style="color: var(--pink)">${discountPercent}% off</span>.<br>Final price?`;
    } 
    else if (currentMode === 'multistep') {
        let start, add, mult;
        if (currentDifficulty === 'easy') {
            start = getRandomInt(1, 10);
            add = getRandomInt(1, 10);
            mult = getRandomInt(2, 3);
        } else if (currentDifficulty === 'medium') {
            start = getRandomInt(5, 20);
            add = getRandomInt(5, 15);
            mult = getRandomInt(2, 5);
        } else {
            start = getRandomInt(10, 50);
            add = getRandomInt(15, 40);
            mult = getRandomInt(3, 8);
        }
        
        currentAnswer = (start + add) * mult;
        text = `Start with <span style="color: var(--cyan)">${start}</span>.<br>Add <span style="color: var(--pink)">${add}</span>.<br>Multiply by <span style="color: var(--yellow)">${mult}</span>.`;
    }
    else if (currentMode === 'multiply') {
        let a, b;
        if (currentDifficulty === 'easy') {
            a = getRandomInt(2, 12);
            b = getRandomInt(2, 12);
        } else if (currentDifficulty === 'medium') {
            a = getRandomInt(12, 99);
            b = getRandomInt(3, 9);
        } else {
            const type = Math.random() > 0.5 ? 1 : 2;
            if (type === 1) {
                a = getRandomInt(12, 99);
                b = getRandomInt(3, 9);
            } else {
                a = getRandomInt(12, 25);
                b = getRandomInt(12, 25);
            }
        }
        currentAnswer = a * b;
        text = `What is <br><span style="color: var(--cyan)">${a}</span> x <span style="color: var(--pink)">${b}</span>?`;
    }
    
    problemText.innerHTML = text;
    currentInput = '';
    updateInputDisplay();
}

function updateInputDisplay() {
    userInputDisplay.textContent = currentInput;
}

function handleInput(val) {
    // Prevent huge inputs
    if (currentInput.length < 6) {
        currentInput += val;
        updateInputDisplay();
    }
}

function handleClear() {
    currentInput = '';
    updateInputDisplay();
}

function showFeedback(isCorrect) {
    feedbackBanner.textContent = isCorrect ? 'Correct!' : 'Incorrect';
    feedbackBanner.className = isCorrect ? 'correct' : 'incorrect';
    
    setTimeout(() => {
        feedbackBanner.className = 'hidden';
    }, 1000);
}

function handleEnter() {
    if (currentInput === '') return;
    
    const numInput = parseInt(currentInput, 10);
    
    if (numInput === currentAnswer) {
        score += 10;
        scoreDisplay.textContent = score;
        showFeedback(true);
        generateProblem();
    } else {
        score = Math.max(0, score - 5);
        scoreDisplay.textContent = score;
        showFeedback(false);
        handleClear();
    }
}

// Event Listeners
modeSelect.addEventListener('change', (e) => {
    currentMode = e.target.value;
    generateProblem();
});

difficultySelect.addEventListener('change', (e) => {
    currentDifficulty = e.target.value;
    generateProblem();
});

numBtns.forEach(btn => {
    btn.addEventListener('click', () => handleInput(btn.textContent));
});

btnClear.addEventListener('click', handleClear);
btnEnter.addEventListener('click', handleEnter);

// Initialize
generateProblem();
