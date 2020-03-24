// main node
let app = document.createElement('div');
app.className = 'app';
document.body.appendChild(app);

// quiz maker div and contents
let quizMaker = document.createElement('div');
quizMaker.className = 'quiz-maker';
app.appendChild(quizMaker);

let quizMakerInfo = document.createElement('h3');
quizMakerInfo.className = 'quiz-maker-info';
quizMakerInfo.textContent = 'Quiz Maker'
quizMaker.appendChild(quizMakerInfo);

let newQuizTable = document.createElement('table');
newQuizTable.className = 'new-quiz-table';
quizMaker.appendChild(newQuizTable);

let newQuizTableHeaders = document.createElement('tr');
newQuizTable.appendChild(newQuizTableHeaders);

let tableHeaderContent = new Array(6); // question, a, b, c, d, correct. example: '2+2=', 3, 4, 5, 6, 4
/* tableHeaderContent[0] = question
 * tableHeaderContent[1] = answer a
 * tableHeaderContent[2] = answer b
 * tableHeaderContent[3] = answer c
 * tableHeaderContent[4] = answer d
 * tableHeaderContent[5] = correct answer
 */
tableHeaderContent[0] = document.createElement('th');
tableHeaderContent[0].textContent = 'question';
newQuizTableHeaders.appendChild(tableHeaderContent[0]);

for (let i = 1; i <= 4; i++) {
  tableHeaderContent[i] = document.createElement('th');
  tableHeaderContent[i].textContent = "answer " + i; // answer 1, answer 2, answer 3, answer 4
  newQuizTableHeaders.appendChild(tableHeaderContent[i]);
}

tableHeaderContent[5] = document.createElement('th');
tableHeaderContent[5].textContent = 'correct';
newQuizTableHeaders.appendChild(tableHeaderContent[5]);


let newQuestionBtn = document.createElement('button');
newQuestionBtn.className = 'new-question-btn';
newQuestionBtn.textContent = 'Add a question';
quizMaker.appendChild(newQuestionBtn);

// quiz div and contents
let quiz = document.createElement('div');
quiz.className = 'quiz';
app.appendChild(quiz);


let title = document.createElement('h3');
title.className = 'title';
title.textContent = 'quiz';
quiz.appendChild(title);


let questionBlock = document.createElement('div');
questionBlock.className = 'question-block';
quiz.appendChild(questionBlock);

let question = document.createElement('h5');
question.className = 'question';
question.textContent = 'dummy question?';
questionBlock.appendChild(question);


let answerBlock = document.createElement('div');
answerBlock.className = 'answer-block';
questionBlock.appendChild(answerBlock);

let answerList = document.createElement('ol');
answerList.className = 'answer-list';
answerBlock.appendChild(answerList);

let answer = new Array(4);
for (let i = 0; i < 4; i++) {
  answer[i] = document.createElement('li');
  answer[i].className = 'answer-' + i; // .answer-0, .answer-1, .answer-2, .answer-3
  answer[i].textContent = 'answer ' + i;
  answerList.appendChild(answer[i]);
}


let statisticsBlock = document.createElement('div');
statisticsBlock.className = 'statistics-block';
quiz.appendChild(statisticsBlock);

let currentQuestion = document.createElement('div');
currentQuestion.className = 'current-question';
statisticsBlock.appendChild(currentQuestion);

let correctAnswers = document.createElement('div');
correctAnswers.className = 'correct-answers';
statisticsBlock.appendChild(correctAnswers);

let wrongAnswers = document.createElement('div');
wrongAnswers.className = 'wrong-answers';
statisticsBlock.appendChild(wrongAnswers);


let gameInfo = document.createElement('div');
gameInfo.className = 'game-info';
quiz.appendChild(gameInfo);
gameInfo.style.display = 'none'; // initially hidden, we show it back later

let resetButton = document.createElement('button');
resetButton.className = 'reset-btn';
resetButton.textContent = 'Reset';
// we don't append; we could append it later, to anything

// dummy quiz. format: question, a, b, c, d, correct
// note that the correct answer is always at quiz[n][5]
let quizArray = new Array([
  'What is 2+2?',
  '3', '4', '5', '6',
  '4'
], [
  'What is 2+2*2?',
  '4', '6', '8', '16',
  '6'
], [
  'What is 2^5+4?',
  '12', '20', '36', '68',
  '36'
]);

// quiz setup
let correctAnswersStat = 0;
let currentQuestionStat = 0; // count from 0 to n-1st question
let wrongAnswerStat = 0; // technically it's equal to curentQuestionStat - correctAnswersStat, if we give one shot for each question
displayQuestion(quizArray[currentQuestionStat]) // prints the first question
updateStatistics(); // shows statistics

function updateStatistics() {
  correctAnswers.textContent = 'Correct: ' + correctAnswersStat;
  wrongAnswers.textContent = 'Wrong: ' + wrongAnswerStat;
  currentQuestion.textContent = 'Question: ' + currentQuestionStat;
}

// displays a question and possible answers
function displayQuestion(questionArray) {
  question.textContent = questionArray[0];
  for (let i = 0; i < 4; i++) {
    answer[i].textContent = questionArray[i + 1]; // 1st, 2nd, 3rd, 4th
  }
}

function blink(color) {
  let colorClass = 'blink-' + color;

  quiz.classList.add(colorClass);

  setTimeout(() => {
    quiz.classList.remove(colorClass);
  }, 150); // removes the class after 0.15 seconds

}

function toggleQuestionsBlock() {
  if (questionBlock.style.display == 'initial' || questionBlock.style.display == '') {
    questionBlock.style.display = 'none'; // if shown, hide it
  } else {
    questionBlock.style.display = 'initial'; // shows it back
  }
}

function toggleGameInfo() {
  if (gameInfo.style.display == 'initial' || gameInfo.style.display == '') {
    gameInfo.style.display = 'none'; // if shown, hide it
  } else {
    gameInfo.style.display = 'initial'; // shows it back
  }
}

function applyQuizAndReset(event) {
  // set newQuiz as the quiz currently happening
  quizArray = event.currentTarget.newQuizArray;
  // reset stats
  currentQuestionStat = 0;
  correctAnswersStat = 0;
  wrongAnswerStat = 0;

  displayQuestion(quizArray[currentQuestionStat]) // prints the first question
  blink('green');
  toggleQuestionsBlock(); // shows the answers
  toggleGameInfo(); // hides gameInfo
  updateStatistics(); // shows reset statistics
}

// how the quiz works
for (let i = 0; i < 4; i++) {
  answer[i].addEventListener('click', (event) => {
    if (event.target.textContent == quizArray[currentQuestionStat][5]) {
      correctAnswersStat++;
      currentQuestionStat++;

      if (currentQuestionStat >= quizArray.length) {
        blink('green');
        toggleQuestionsBlock(); // hides the answers
        toggleGameInfo(); // shows gameInfo
        gameInfo.textContent = 'You won, congatulations!';
        gameInfo.appendChild(resetButton);


        updateStatistics();
        return 0;
      }

      blink('green');
      displayQuestion(quizArray[currentQuestionStat]);
      updateStatistics();

    } else {
      blink('red');
      wrongAnswerStat++;
      updateStatistics();
    }
  });
}

resetButton.newQuizArray = quizArray; // this property is later invoked by event.currentTarget.newQuizArray (in a function)
resetButton.addEventListener('click', applyQuizAndReset); // reset quiz and start over when clicked

// quiz maker