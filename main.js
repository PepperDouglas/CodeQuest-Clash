import * as questData from "./database.js";
const questD = questData.default;
const newGameButton = document.getElementById('new-game-button');
const highscoreButton = document.getElementById('high-score-button');
const answerButtons = document.querySelectorAll('.option');
const modal = document.getElementById('end-game-modal');
const questionsAmount = 10;
const maxTimer = 10.0;
const maxHearts = 3;
let currentTimer = 0;
let isGameActive = false;
let currentQuestion = 0;
let hearts = 3;
let score = 0;
let questions = [];
let timer;
let timerText;
let playerAnswerIndex;
let correctAnswerIndex;

let addCheck = function(e){
    checkAnswer(e.target.innerText);
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

readLocalStorageScore();
addClickEventForOptions();

highscoreButton.addEventListener('click', showHighscore);
newGameButton.addEventListener('click', initGame);

function initGame(){
    let questionsUsedPosition = [];
    currentTimer = maxTimer;
    isGameActive = true;
    currentQuestion = 0;
    score = 0;

    switchControlsToTimers();
    startTimerBar();
    initHearts();
    
    for(let i = 0; i < questionsAmount;){
        let qPos;
        qPos = Math.floor(Math.random() * 52);
        if(!questionsUsedPosition.includes(qPos)){
            questionsUsedPosition.push(qPos);
            i++;
        }
    }

    questionsUsedPosition.forEach(e => {
        questions.push(questD[e]);
    });

    loadInQuestion(questions[currentQuestion]);
}

function loadInQuestion(question){
    const mixedArr = randomiseOptionOrder(4);
    document.getElementById('question').innerText = question.question;
    document.getElementById('optionOne').innerText = question.options[mixedArr[0]];
    document.getElementById('optionTwo').innerText = question.options[mixedArr[1]];
    document.getElementById('optionThree').innerText = question.options[mixedArr[2]];
    document.getElementById('optionFour').innerText = question.options[mixedArr[3]];
}

function randomiseOptionOrder(intAmount){
    let arr = [];
    for(let i = 0; i < intAmount; i++){
        arr.push(i);
    }
    for(let a = 0; a < arr.length; a++){
        let rand = a;
        while(rand === a){
            rand = Math.floor(Math.random() * arr.length);
        }
        [arr[a], arr[rand]] = [arr[rand], arr[a]];
    }
    return arr;
}

function checkAnswer(currentAnswer){
    if (!isGameActive){
        return;
    }
    if (currentAnswer === questions[currentQuestion].answer){
        score++;
    } else {
        hearts--;
        updateHearts();
    }
    updateScore();
    stopTimerBar();
    displayCorrectAnswer(currentAnswer, questions[currentQuestion]);
    if (currentQuestion < questionsAmount){
        currentQuestion++;
    }
    if (currentQuestion === 10){
        sleepTime(3000).then(() => {
            resetGame();
        })
    } else if (hearts > 0) {
        removeClickEventForOptions();
        displayIntermissionMessage();
        sleepTime(3000).then(() => {
            removeIntermissionMessage();
            resetOptionColors();
            loadInQuestion(questions[currentQuestion]);
            currentTimer = maxTimer;
            startTimerBar();
            addClickEventForOptions();
        })
    } else { 
        sleepTime(3000).then(() => {
            resetGame();
        })
    }
}

function sleepTime(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resetGame(){
    hearts = 3;
    isGameActive = false;
    resetOptionColors();
    stopTimerBar();
    updateHearts();
    emptifyTextFields();
    updateScoreBoard(score);
    setLocalStorageScore();
    updateScore();
    displayModalMessage();
    score = 0;
    switchTimersToControls();
}

function displayModalMessage(){
    document.getElementById('modal-header-text').innerText = 'Game round finished!';
    const modalMessage = document.getElementById('modal-message');
    const lowestHighscore = parseInt(document.getElementById('hs6').innerText);
    let message = `You got ${score} points! `;
    let appendMessage = '';
    if (lowestHighscore <= score){
        appendMessage += 'You got a new highscore!';
    } else {
        appendMessage += 'Try again!';
    }
    modal.style.display = "block";
    modalMessage.innerText = message + appendMessage;
}

function addClickEventForOptions(){
    answerButtons.forEach(b => {
        b.addEventListener('click', addCheck);
    });
}

function removeClickEventForOptions(){
    answerButtons.forEach(b => {
        b.removeEventListener('click', addCheck);
    });
}

function updateTimerText(){
    const timercounter = document.getElementById('timer-time');
    let newTime = (parseFloat(timercounter.innerText) - 0.1).toFixed(1);
    if (newTime <= 0){
        timercounter.innerText = '0.0'
        checkAnswer('');
    } else {
        timercounter.innerText = `${newTime}`;
    }
}

function updateTimerBar(){
    const timerbar = document.getElementById('timer-fill');
    let newWidth = parseFloat(timerbar.style.width.split('vw')[0]) - 1.24;
    timerbar.style.backgroundColor = `rgb(${255 - (newWidth*9)}, ${(newWidth*9)}, 0)`
    if (newWidth <= 0){
        timerbar.style.width = '0vw';
    } else {
        timerbar.style.width = `${newWidth}vw`;
    }
}

function startTimerBar(){
    document.getElementById('timer-fill').style.width = '68.75vw';
    document.getElementById('timer-time').innerText = `${maxTimer}`
    timer = setInterval(updateTimerBar, 180);
    timerText = setInterval(updateTimerText, 100);
    timer.StartTimer;
    timerText.StartTimer;
}

function resetTimerBar(){
    document.getElementById('timer-fill').style.width = '68.75vh';
    document.getElementById('timer-time').innerText = `${maxTimer}`
}

function stopTimerBar(){
    resetTimerBar();
    clearInterval(timer);
    clearInterval(timerText);
}

function initHearts(){
    hearts = maxHearts;
    for(let i = 1; i <= maxHearts; i++){
        document.getElementById(`hearts${i}`).innerHTML = "<img src=\"./images/heart-icon.svg\" width=\"30px\" height=\"30px\">";
    }
}

function updateHearts(){
    for(let i = maxHearts; i > hearts; i--){
        document.getElementById(`hearts${i}`).innerHTML = "";
    }
}

function updateScore(){
    document.getElementById('score').innerText = `Score: ${score} / ${questionsAmount}`;
}

function displayCorrectAnswer(currentAnswer, question){
    //Here we cant check the index from the database becase we rand the pos of the options
    //Solution, check against 'class: option' divs
    const optionDivs = document.getElementsByClassName('option');
    let optionDivsArr = [];
    for(let i = 0; i < optionDivs.length; i++){
        optionDivsArr.push(optionDivs[i].innerText);
    }
    if (!currentAnswer == ''){
        playerAnswerIndex = optionDivsArr.indexOf(currentAnswer);
        document.getElementsByClassName('option')[playerAnswerIndex].style.backgroundColor = 'red';
    }
    correctAnswerIndex = optionDivsArr.indexOf(question.answer)
    document.getElementsByClassName('option')[correctAnswerIndex].style.backgroundColor = 'green';
}

function resetOptionColors(){
    const answerOptions = document.getElementsByClassName('option');
    for (let i = 0; i < answerOptions.length; i++){
        answerOptions[i].style.backgroundColor = 'rgb(55, 55, 188)';
    }
}

function displayIntermissionMessage(){
    const message = document.getElementById('timer-bar');
    message.innerHTML = '<div id="timer-fill">Get Ready!</div>';
    const timefillbar = document.getElementById('timer-fill');
    timefillbar.style.color = 'Orange';
    
}

function removeIntermissionMessage(){
    const message = document.getElementById('timer-bar');
    message.innerHTML = '<div id="timer-fill"></div>';
}

function emptifyTextFields(){
    document.getElementById('question').innerText = "CodeQuest-Clash";
    document.getElementById('optionOne').innerText = " ";
    document.getElementById('optionTwo').innerText = " ";
    document.getElementById('optionThree').innerText = " ";
    document.getElementById('optionFour').innerText = " ";
}

function updateScoreBoard(newResult){
    const scorelist = document.getElementById('scorelist').children;
    let scoreArr = [];
    for(let i = 0; i < scorelist.length; i++){
        scoreArr.push(parseInt(scorelist[i].innerText));
    }
    for(let i = 0; i < scoreArr.length; i++){
        if(newResult > scoreArr[i]){
            scoreArr.splice(i, 0, newResult);
            scoreArr.pop();
            break;
        }
    }
    for(let i = 0; i < scorelist.length; i++){
        scorelist[i].innerText = scoreArr[i].toString();
    }
}

function showHighscore(){
    document.getElementById('modal-header-text').innerText = 'High-score Table';
    const modalMessage = document.getElementById('modal-message');
    const scoreList = document.getElementById('scorelist').children;
    let scoreHtml = `<ol id="modalscore">`;
    for(let i = 0; i < scoreList.length; i++){
        scoreHtml += `<li>${document.getElementById(`hs${i + 1}`).innerText}</li>`
    }
    scoreHtml += `</ol>`;
    modal.style.display = "block";
    modalMessage.innerHTML = scoreHtml;
}

function readLocalStorageScore(){
    if (localStorage.getItem('scores') == null){
        return;
    }
    let scoreList = document.getElementById('scorelist').children;
    let scores = localStorage.getItem('scores').split(',');
    for(let i = 0; i < scores.length; i++){
        scoreList[i].innerText = scores[i];
    }
}

function setLocalStorageScore(){
    let scores = document.getElementById('scorelist').children;
    let scoresArr = [];
    for(let i = 0; i < scores.length; i++){
        scoresArr.push(parseInt(scores[i].innerText));
    }
    localStorage.setItem('scores', scoresArr);
}

function switchControlsToTimers(){
    let controls = document.getElementById('control-buttons-container');
    controls.style.display = 'none';
    let timers = document.getElementById('timer-container-controls');
    timers.style.display = 'flex';
}

function switchTimersToControls(){
    let controls = document.getElementById('control-buttons-container');
    controls.style.display = 'flex';
    controls.style.flexDirection = 'column';
    let timers = document.getElementById('timer-container-controls');
    timers.style.display = 'none';
}
