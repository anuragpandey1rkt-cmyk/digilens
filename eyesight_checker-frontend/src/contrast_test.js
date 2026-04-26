const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const closeButton = document.getElementById('close-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const rightAnswers = document.getElementById('right-answers')
const usersFormElement = document.getElementById('users-form')
const testContainerElement = document.getElementById("main-test")
const elementBody = document.body


let users_tests_id;
let shuffledQuestions, currentQuestionIndex
let countRightAnswers = 0

startButton.addEventListener('click', callUsersLoginForm)

nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
}) 

closeButton.addEventListener('click', () => {
  questionContainerElement.classList.add('hide')
  elementBody.classList.remove('wrong', 'correct')
}) 

function callUsersLoginForm() {
  usersFormElement.classList.remove('hide')
  testContainerElement.classList.add('hide')
  createForm()
}

function startTest(users_id, users_name) {
  // debugger
  countRightAnswers = 0
  rightAnswers.innerHTML = countRightAnswers + " - out of 5 possible questions"
  answerButtonsElement.classList.remove('disable')
  createUsersTest(users_id, users_name)
  startButton.classList.add('hide')
  shuffledQuestions = contrastTest.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function createUsersTest(users_id, users_name){

  let users_test = {
    test_name: "Contrast Test",
    test_result: 0,
    user_id: users_id,
    users_name: users_name
}

fetch("http://127.0.0.1:3000/users_tests", { 
  method: "POST",
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(users_test)
})
.then(resp => resp.json())
.then(users_test => {
  users_tests_id = users_test.id
  })
}


function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const img = document.createElement('img')
    img.src = 'images/' + answer.image
    img.classList.add('btn')
    if (answer.correct) {
      img.dataset.correct = answer.correct
    }
    img.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(img)
  })
  answerButtonsElement.classList.remove('disable')
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (selectedButton.dataset = correct) {
    countRightAnswers++
  } 
  if (shuffledQuestions.length > (currentQuestionIndex + 1)) {
    nextButton.classList.remove('hide') 
  } else {
    updateUsersTest(countRightAnswers, users_tests_id)
    closeButton.innerText = 'Done'
    closeButton.classList.remove('hide')
  }
  answerButtonsElement.classList.add('disable')
  rightAnswers.innerHTML = countRightAnswers + " - out of 5 possible questions"
}

function updateUsersTest(results, users_tests_id) {

  fetch(`http://127.0.0.1:3000/users_tests/${users_tests_id}`, { 
    method: "PATCH",
    body: JSON.stringify({
      test_result: results,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
  })
    .then(res => res.json())
    .then(users_test => {
      let ut = new UsersTest(users_test.id, users_test.test_name, users_test.test_result, users_test.user_id, users_test.users_name)
      ut.renderUsersTest();
      })
  }

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

