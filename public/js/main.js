let words = [];
let currentIndex = 0;
let errors = 0;
let correctWords = 0;
let typedChars = 0;
let startTime;
let timerInterval;
let time = 60;

const wordLine = document.getElementById('wordLine');
const typingInput = document.getElementById('typingInput');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const errorsDisplay = document.getElementById('errors');

function generateWords(num) {
    const wordList = ['example', 'typing', 'speed', 'test', 'practice', 'keyboard', 'improve', 'accuracy', 'random', 'words'];
    words = Array(num).fill().map(() => wordList[Math.floor(Math.random() * wordList.length)]);
    updateWordLine(); // Call this function to display the words correctly
}

function updateWordLine() {
    // Clear the existing content
    wordLine.innerHTML = '';
    
    // Add each word as a span element
    words.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word + ' '; // Add space between words
        if (index === currentIndex) {
            wordSpan.classList.add('highlight'); // Highlight the current word
        }
        wordLine.appendChild(wordSpan);
    });
}

function startTest() {
    resetTest();
    generateWords(200);  // Generate a large number of words for continuous typing
    typingInput.disabled = false;
    typingInput.value = '';
    typingInput.focus();
    startTime = new Date().getTime();
    startTimer();
}

function startTimer() {
    time = 60;
    timerDisplay.textContent = time;
    timerInterval = setInterval(() => {
        time--;
        timerDisplay.textContent = time;
        if (time === 0) {
            clearInterval(timerInterval);
            endTest();
        }
    }, 1000);
}

function checkInput() {
    const inputText = typingInput.value.trim();
    const currentWord = words[currentIndex];
    
    if (inputText === currentWord && event.inputType === "insertText" && inputText.length > 1) {
        correctWords++;
        typedChars += inputText.length + 1;  // Include space
        currentIndex++;
        typingInput.value = '';
        updateWordLine();
    } else if (currentWord.startsWith(inputText)) {
        highlightCurrentWord('highlight');
    } else {
        highlightCurrentWord('wrong');
        errors++;
    }
    updateStats();
}

function highlightCurrentWord(className) {
    const wordSpans = wordLine.children;
    wordSpans[currentIndex].className = className;
}

function updateStats() {
    const elapsedMinutes = (new Date().getTime() - startTime) / 1000 / 60;
    const wpm = Math.round((typedChars / 5) / elapsedMinutes);
    const accuracy = Math.round((correctWords / (correctWords + errors)) * 100);

    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
    errorsDisplay.textContent = errors;
}

function endTest() {
    typingInput.disabled = true;
    updateStats();
}

function resetTest() {
    clearInterval(timerInterval);
    time = 60;
    currentIndex = 0;
    errors = 0;
    correctWords = 0;
    typedChars = 0;
    timerDisplay.textContent = time;
    wordLine.innerHTML = '';
    typingInput.disabled = true;
}
