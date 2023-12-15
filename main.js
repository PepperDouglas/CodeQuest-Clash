import * as questData from "./database.js";
let questD = questData.default;
let newGameButton = document.getElementById('new-game-button');
let highscoreButton = document.getElementById('high-score-button');
let answerButtons = document.querySelectorAll('.option');
let timer;
let timerText;
const questionsAmount = 10;
const maxTimer = 10.0;
let playerAnswerIndex;
let correctAnswerIndex;
let currentTimer = 0;
let gameActive = false;
let currentQuestion = 0;
let maxHearts = 3;
let hearts = 3;
let score = 0;
let questions = [];
let AddCheck = function(e){
    CheckAnswer(e.target.innerText);
}

//test modal
const modal = document.getElementById('end-game-modal');
window.onclick = function(event) {
    //alert(event.target);
    if (event.target == modal) {
        modal.style.display = "none";
    }
    
}

ReadLocalStorageScore();
AddClickEventForOptions();



highscoreButton.addEventListener('click', ShowHighscore);
newGameButton.addEventListener('click', InitGame);

function InitGame(){
    currentTimer = maxTimer;
    SwitchControlsToTimers();
    StartTimerBar();
    gameActive = true;
    currentQuestion = 0;
    score = 0;
    InitHearts();
    let questionsUsedPosition = [];
    
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
    LoadInQuestion(questions[currentQuestion]);
}

function LoadInQuestion(question){
    let mixedArr = RandomiseOptionOrder(4);
    document.getElementById('question').innerText = question.question;
    document.getElementById('optionOne').innerText = question.options[mixedArr[0]];
    document.getElementById('optionTwo').innerText = question.options[mixedArr[1]];
    document.getElementById('optionThree').innerText = question.options[mixedArr[2]];
    document.getElementById('optionFour').innerText = question.options[mixedArr[3]];
}

function RandomiseOptionOrder(intAmount){
    let arr = [];
    for(let i = 0; i < intAmount; i++){
        arr.push(i);
    }
    for(let a = 0; a < arr.length; a++){
        let rand = a;
        while(rand == a){
            rand = Math.floor(Math.random() * arr.length);
        }
        [arr[a], arr[rand]] = [arr[rand], arr[a]];
    }
    return arr;
}

function CheckAnswer(currentAnswer){
    if (!gameActive){
        return;
    }
    if (currentAnswer == questions[currentQuestion].answer){
        score++;
    } else {
        hearts--;
        UpdateHearts();
    }
    UpdateScore();
    StopTimerBar();
    DisplayCorrectAnswer(currentAnswer, questions[currentQuestion]);
    if (currentQuestion < questionsAmount){
        currentQuestion++;
    }
    if (currentQuestion == 10){
        Sleep(3000).then(() => {
            ResetGame();
        })
    } else if (hearts > 0) {
        RemoveClickEventForOptions();
        DisplayIntermissionMessage();
        Sleep(3000).then(() => {
            RemoveIntermissionMessage();
            ResetOptionColors();
            LoadInQuestion(questions[currentQuestion]);
            currentTimer = maxTimer;
            StartTimerBar();
            AddClickEventForOptions();
        })
    } else { 
        Sleep(3000).then(() => {
            ResetGame();
        })
    }
}

function Sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function ResetGame(){
    hearts = 3;
    gameActive = false;
    ResetOptionColors();
    StopTimerBar();
    UpdateHearts();
    EmptifyTextFields();
    UpdateScoreBoard(score);
    SetLocalStorageScore();
    UpdateScore();
    DisplayModalMessage();
    score = 0;
    SwitchTimersToControls();
}

function DisplayModalMessage(){
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

function AddClickEventForOptions(){
    answerButtons.forEach(b => {
        b.addEventListener('click', AddCheck);
    });
}

function RemoveClickEventForOptions(){
    answerButtons.forEach(b => {
        b.removeEventListener('click', AddCheck);
    });
}

function UpdateTimerText(){
    let timercounter = document.getElementById('timer-time');
    let newTime = (parseFloat(timercounter.innerText) - 0.1).toFixed(1);
    if (newTime <= 0){
        timercounter.innerText = '0.0'
        CheckAnswer('');
    } else {
        timercounter.innerText = `${newTime}`;
        
    }
    
}

function UpdateTimerBar(){
    let timerbar = document.getElementById('timer-fill');
    let newWidth = parseFloat(timerbar.style.width.split('em')[0]) - 0.5;
    timerbar.style.backgroundColor = `rgb(${255 - (newWidth*9)}, ${(newWidth*9)}, 0)`
    if (newWidth <= 0){
        timerbar.style.width = '0em';
    } else {
        timerbar.style.width = `${newWidth}em`;
    }
}

function PauseTimers(){
    clearInterval(timer);
    clearInterval(timerText);
}

function StartTimerBar(){
    document.getElementById('timer-fill').style.width = '27.75em';
    document.getElementById('timer-time').innerText = `${maxTimer}`
    timer = setInterval(UpdateTimerBar, 180);
    timerText = setInterval(UpdateTimerText, 100);
    timer.StartTimer;
    timerText.StartTimer;
}

function ResetTimerBar(){
    document.getElementById('timer-fill').style.width = '27.75em';
    document.getElementById('timer-time').innerText = `${maxTimer}`
}

function StopTimerBar(){
    ResetTimerBar();
    clearInterval(timer);
    clearInterval(timerText);
}

function InitHearts(){
    hearts = maxHearts;
    for(let i = 1; i <= maxHearts; i++){
        document.getElementById(`hearts${i}`).innerHTML = "<img src=\"./images/heart-icon.svg\" width=\"30px\" height=\"30px\">";
    }
}

function UpdateHearts(){
    for(let i = maxHearts; i > hearts; i--){
        document.getElementById(`hearts${i}`).innerHTML = "";
    }
}

function UpdateScore(){
    document.getElementById('score').innerText = `Score: ${score} / ${questionsAmount}`;
}

function DisplayCorrectAnswer(currentAnswer, question){
    //Here we cant check the index from the database becase we rand the pos of the options
    //Either we rand the fetched questions earlier, or we save the current rand options
    //to check against instead. Solution, check against 'class: option' divs
    let optionDivs = document.getElementsByClassName('option');
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

function ResetOptionColors(){
    let answerOptions = document.getElementsByClassName('option');
    for (let i = 0; i < answerOptions.length; i++){
        answerOptions[i].style.backgroundColor = 'rgb(55, 55, 188)';
    }
}

function DisplayIntermissionMessage(){
    const message = document.getElementById('timer-bar');
    message.innerHTML = '<div id="timer-fill">Get Ready!</div>';
    const timefillbar = document.getElementById('timer-fill');
    timefillbar.style.color = 'blue';
}

function RemoveIntermissionMessage(){
    const message = document.getElementById('timer-bar');
    message.innerHTML = '<div id="timer-fill"></div>';
}

function EmptifyTextFields(){
    document.getElementById('question').innerText = "QUESTION?";
    document.getElementById('optionOne').innerText = "Answer 1";
    document.getElementById('optionTwo').innerText = "Answer 2";
    document.getElementById('optionThree').innerText = "Answer 3";
    document.getElementById('optionFour').innerText = "Answer 4";
}

function UpdateScoreBoard(newResult){
    let scorelist = document.getElementById('scorelist').children;
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

function ShowHighscore(){
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

function ReadLocalStorageScore(){
    if (localStorage.getItem('scores') == null){
        return;
    }
    let scoreList = document.getElementById('scorelist').children;
    let scores = localStorage.getItem('scores').split(',');
    for(let i = 0; i < scores.length; i++){
        scoreList[i].innerText = scores[i];
    }
}

function SetLocalStorageScore(){
    let scores = document.getElementById('scorelist').children;
    let scoresArr = [];
    for(let i = 0; i < scores.length; i++){
        scoresArr.push(parseInt(scores[i].innerText));
    }
    localStorage.setItem('scores', scoresArr);
}

function SwitchControlsToTimers(){
    let controls = document.getElementById('control-buttons-container');
    controls.style.display = 'none';
    let timers = document.getElementById('timer-container-controls');
    timers.style.display = 'flex';
}

function SwitchTimersToControls(){
    let controls = document.getElementById('control-buttons-container');
    controls.style.display = 'flex';
    controls.style.flexDirection = 'column';
    let timers = document.getElementById('timer-container-controls');
    timers.style.display = 'none';
}
