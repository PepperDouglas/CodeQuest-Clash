import * as questData from "./database.js";
let questD = questData.default;
let newGameButton = document.getElementById('new-game-button');
let answerButtons = document.querySelectorAll('.option');
const questionsAmount = 10;
let gameActive = false;
let currentQuestion = 0;
let maxHearts = 3;
let hearts = 3;
let score = 0;
let questions = [];

answerButtons.forEach(b => {
    b.addEventListener('click', function(e){
        CheckAnswer(e.target.innerText);
    });
});

newGameButton.addEventListener('click', InitGame);

function InitGame(){
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
    //test load in first question
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
        alert('Correct!')
        UpdateScore();
    } else {
        hearts--;
        alert('Wrong!');
        UpdateHearts();
    }
    if (currentQuestion < questionsAmount){
        currentQuestion++;
    }
    if (currentQuestion == 10){
        alert('You won!');
        ResetGame();
    } else if (hearts > 0) {
        LoadInQuestion(questions[currentQuestion]);
    } else {
        alert('You lost!');
        ResetGame();
    }
}

function ResetGame(){
    hearts = 3;
    gameActive = false;
    UpdateScore();
    UpdateHearts();
    EmptifyTextFields();
    UpdateScoreBoard(score);
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
