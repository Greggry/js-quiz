// new html element
function addToDOM(HTMLTag, classAttribute, parentElement, textInside = '') {
  const newElement = document.createElement(HTMLTag);
  newElement.className = classAttribute;
  newElement.textContent = textInside;

  if (parentElement != null) { // if we chose to append
    parentElement.appendChild(newElement);
  };

  return newElement;
}

// quiz div and contents
const quiz = addToDOM('div', 'quiz', document.body); // main node

const title = addToDOM('h3', 'title', quiz, 'quiz');
const questionBlock = addToDOM('div', 'question-block', quiz);
const question = addToDOM('h5', 'question', questionBlock, 'dummy-question');
const answerBlock = addToDOM('div', 'answer-block', questionBlock);
const answerList = addToDOM('ol', 'answer-list', answerBlock);

const answer = new Array(4);
for (let i = 0; i < 4; i++) {
  // .answer-0, .answer-1, .answer-2, .answer-3
  answer[i] = addToDOM('li', 'answer-' + i, answerList, 'answer' + i);
}

const statisticsBlock = addToDOM('div', 'statistics-block', quiz);
const currentQuestion = addToDOM('div', 'current-question', statisticsBlock);
const correctAnswers = addToDOM('div', 'correct-answers', statisticsBlock);
const wrongAnswers = addToDOM('div', 'wrong-answers', statisticsBlock);
const gameInfo = addToDOM('div', 'game-info', quiz);
gameInfo.style.display = 'none'; // initially hidden, we'll show it back later

const resetButton = addToDOM('button', 'reset-btn', null, 'Reset');
// we don't append the resetButton; we could append it later, to anything

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
], [
  'What is the square root of 16?',
  '2', '4', '8', '16',
  '4'
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

function toggleElement(element, whatState = 'opposite') {
  switch (whatState) {
    case 'none':
      element.style.display = 'none';
      break;
    case 'block':
      element.style.display = 'block';
      break;
    case 'initial':
      element.style.display = 'initial';
      break;
    case 'opposite':
      if (element.style.display == 'block' || element.style.display == '') {
        element.style.display = 'none'; // if shown, hide it
      } else {
        element.style.display = 'block'; // shows it back
      }
      break;
    default:
      console.log('toggleElement() error');
  }
}

// how the quiz works
for (let i = 0; i < 4; i++) {
  answer[i].addEventListener('click', (event) => {
    if (event.target.textContent == quizArray[currentQuestionStat][5]) { // correct, quizArray[x][5] is the correct answer to question number x
      correctAnswersStat++;
      currentQuestionStat++;

      if (currentQuestionStat >= quizArray.length) { // ran out of questions
        blink('green');
        toggleElement(questionBlock, 'none'); // hides question and answers
        toggleElement(gameInfo, 'block'); // shows gameInfo
        gameInfo.textContent = 'You won, congatulations!';
        gameInfo.appendChild(resetButton);

        updateStatistics(); // updates the statistics block for the last time
        return 0;
      }

      blink('green');
      displayQuestion(quizArray[currentQuestionStat]);
    } else { // wrong answer
      blink('red');
      wrongAnswerStat++;
    }

    updateStatistics();
  });
}

// reset quiz and start over when clicked
resetButton.addEventListener('click', () => {
  // reset stats
  currentQuestionStat = 0;
  correctAnswersStat = 0;
  wrongAnswerStat = 0;

  displayQuestion(quizArray[currentQuestionStat]) // prints the first question
  blink('green');
  toggleElement(questionBlock, 'block'); // shows the answers
  toggleElement(gameInfo, 'none'); // hides gameInfo
  updateStatistics(); // shows reset statistics
});
