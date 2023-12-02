import * as questData from "./database.js";
let questD = questData.default;
let newGameButton = document.getElementById('new-game-button');
let answerButtons = document.querySelectorAll('.option');
let timer;
let timerText;
const questionsAmount = 10;
const maxTimer = 10.0;
let currentTimer = 0;
let gameActive = false;
let currentQuestion = 0;
let maxHearts = 3;
let hearts = 3;
let score = 0;
let questions = [];

ReadLocalStorageScore();

answerButtons.forEach(b => {
    b.addEventListener('click', function(e){
        CheckAnswer(e.target.innerText);
    });
});

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
    document.getElementById('question').innerText = question.question;
    document.getElementById('optionOne').innerText = question.options[0];
    document.getElementById('optionTwo').innerText = question.options[1];
    document.getElementById('optionThree').innerText = question.options[2];
    document.getElementById('optionFour').innerText = question.options[3];
}

function CheckAnswer(currentAnswer){
    if (!gameActive){
        return;
    }
    if (currentAnswer == questions[currentQuestion].answer){
        score++;
        //alert('Correct!')
        UpdateScore();
    } else {
        hearts--;
        //alert('Wrong!');
        UpdateHearts();
    }
    if (currentQuestion < questionsAmount){
        currentQuestion++;
        ResetTimerBar();
    }
    if (currentQuestion == 10){
        //alert('You won!');
        ResetGame();
    } else if (hearts > 0) {
        LoadInQuestion(questions[currentQuestion]);
        currentTimer = maxTimer;
    } else {
        //alert('You lost!'); 
        ResetGame();
    }
}

function ResetGame(){
    hearts = 3;
    gameActive = false;
    StopTimerBar();
    UpdateHearts();
    EmptifyTextFields();
    UpdateScoreBoard(score);
    SetLocalStorageScore();
    score = 0;
    UpdateScore();
    SwitchTimersToControls();
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
    if (newWidth <= 0){
        timerbar.style.width = '0em';
    } else {
        timerbar.style.width = `${newWidth}em`;
    }
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
    document.getElementById('score').innerText = `Score: ${score}`;
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
    let timers = document.getElementById('timer-container-controls');
    timers.style.display = 'none';
}
