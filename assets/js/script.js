/* jshint esversion: 8 */
const restartBtn = document.getElementById('restart-btn');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainer = document.querySelector('.question-container');
const questionEl = document.getElementById('question');
const answerBtnEl = document.getElementById('answer-buttons');
const mainContainer = document.querySelector('.container');

let mixQuestion, QuestionIndex;

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
  QuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startBtn.classList.add('hide');
  mainContainer.classList.add('hide');
  restartBtn.classList.add('hide');
  nextBtn.classList.remove('hide');
  mixQuestion = questions.sort(() => Math.random() - .5);
  QuestionIndex = 0;
  questionContainer.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(mixQuestion[QuestionIndex]);
}

function showQuestion(question) {
    questionEl.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerBtnEl.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextBtn.classList.add('hide');
  while (answerBtnEl.firstChild) {
    answerBtnEl.removeChild(answerBtnEl.firstChild);
  }
}

function selectAnswer(e) {
  const selBtn = e.target;
  const correct = selBtn.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerBtnEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (mixQuestion.length > QuestionIndex + 2) {
    nextBtn.classList.remove('hide');
  } else {
    restartBtn;
    restartBtn.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false },
      { text: '20', correct: false },
      { text: '8', correct: false }
    ]
  },
  {
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'Web Dev Simplified', correct: true },
      { text: 'Traversy Media', correct: true },
      { text: 'Dev Ed', correct: true },
      { text: 'Fun Fun Function', correct: true }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '42', correct: false },
      { text: '10', correct: false },
      { text: '24', correct: false },
      { text: '8', correct: true }
    ]
  }
];