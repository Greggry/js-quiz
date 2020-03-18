let app = document.createElement('div'); // main window
app.className = 'app';
document.body.appendChild(app);


let title = document.createElement('h3');
title.className = 'title';
title.textContent = 'quiz';
app.appendChild(title);


let questionBlock = document.createElement('div');
questionBlock.className = 'question-block';
app.appendChild(questionBlock);

let question = document.createElement('h5');
question.className = 'question';
question.textContent = 'dummy question?';
questionBlock.appendChild(question);


let answerBlock = document.createElement('div');
answerBlock.className = 'answerBlock';
questionBlock.appendChild(answerBlock);

let answer = new Array(4);
for (let i = 0; i < 4; i++) {
  answer[i] = document.createElement('div');
  answer[i].className = 'answer ' + i;
  answer[i].textContent = 'answer ' + i;
  answerBlock.appendChild(answer[i]);
}