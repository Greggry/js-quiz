let appDiv = document.createElement('div'); // main window

let title = document.createElement('h3');
let questionDiv = document.createElement('div');

let questionDivQuestion = document.createElement('h5');
let questionDivAnswers = document.createElement('div');

let answer1 = document.createElement('div');
let answer2 = document.createElement('div');
let answer3 = document.createElement('div');
let answer4 = document.createElement('div');

title.textContent = 'quiz';
questionDivQuestion.textContent = 'dummy question?';
answer1.textContent = 'answer1';
answer2.textContent = 'answer2';
answer3.textContent = 'answer3';
answer4.textContent = 'answer4';


appDiv.className = 'app';
title.className = 'title';
questionDiv.className = 'question';
questionDivQuestion.className = 'questionDivQuestion';
questionDivAnswers.className = 'questionDivAnswers';
answer1.className = 'answer1';
answer2.className = 'answer2';
answer3.className = 'answer3';
answer4.className = 'answer4';

document.body.appendChild(appDiv);

appDiv.appendChild(title);
appDiv.appendChild(questionDiv);

questionDiv.appendChild(questionDivQuestion);
questionDiv.appendChild(questionDivAnswers);

questionDivAnswers.appendChild(answer1);
questionDivAnswers.appendChild(answer2);
questionDivAnswers.appendChild(answer3);
questionDivAnswers.appendChild(answer4);