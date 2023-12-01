import * as questData from "./database.js";
let questD = questData.default;
let newGameButton = document.getElementById('new-game-button');
let answerButtons = document.querySelectorAll('.option');
let currentQuestion = 0;
let maxHearts = 3;
let hearts = 3;
let questions = [];

answerButtons.forEach(b => {
    b.addEventListener('click', function(e){
        CheckAnswer(e.target.innerText);
    });
});

newGameButton.addEventListener('click', InitGame);

function InitGame(){
    InitHearts();
    const questionsAmount = 10;
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
    if (currentAnswer == questions[0].answer){
        alert('Correct!')
    } else {
        hearts--;
        alert('Wrong!');
        UpdateHearts();
    }
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
