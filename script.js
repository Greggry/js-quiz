let quiz = document.createElement('div'); // main node
quiz.className = 'quiz';
document.body.appendChild(quiz);


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

// dummy quiz. format: question, a, b, c, d, correct
// note that the correct answer is always at quiz[n][5]
let quizContent = new Array([
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
let wrongQuestionStat = 0; // technically it's equal to curentQuestionStat - correctAnswersStat, if we give one shot for each question
displayQuestion(quizContent[currentQuestionStat]) // prints the first question
updateStatistics(); // shows statistics

function updateStatistics() {
  correctAnswers.textContent = 'Correct: ' + correctAnswersStat;
  wrongAnswers.textContent = 'Wrong: ' + wrongQuestionStat;
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

// how the game works
for (let i = 0; i < 4; i++) {
  answer[i].addEventListener('click', (event) => {
    if (event.target.textContent == quizContent[currentQuestionStat][5]) {
      correctAnswersStat++;
      currentQuestionStat++;

      if (currentQuestionStat >= quizContent.length) {
        blink('green');
        toggleQuestionsBlock(); // hides the answers
        toggleGameInfo(); // shows gameInfo
        gameInfo.textContent = 'You won, congatulations!';
        updateStatistics();
        return 0;
      }

      blink('green');
      displayQuestion(quizContent[currentQuestionStat]);
      updateStatistics();

    } else {
      blink('red');
      wrongQuestionStat++;
      updateStatistics();
    }
  });
}