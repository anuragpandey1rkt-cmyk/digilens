const startButton2 = document.getElementById('start-btn-2')
const nextButton2 = document.getElementById('next-btn-2')
const closeButton2 = document.getElementById('close-btn-2')
const questionContainerElement2 = document.getElementById('question-container-2')
const questionElement2 = document.getElementById('question-2')
const answerButtonsElement2 = document.getElementById('answer-buttons-2')
const rightAnswers2 = document.getElementById('right-answers-2')
const testContainerElement2 = document.getElementById("main-test-2")

let shuffledQuestions2, currentQuestionIndex2
let countRightAnswers2 = 0

startButton2.addEventListener('click', callUsersLoginForm2)

nextButton2.addEventListener('click', () => {
  currentQuestionIndex2++
  setNextQuestion2()
}) 

closeButton2.addEventListener('click', () => {
  questionContainerElement2.classList.add('hide')
  elementBody.classList.remove('wrong', 'correct')
}) 


function callUsersLoginForm2() {
  usersFormElement.classList.remove('hide')
  testContainerElement2.classList.add('hide')
  createForm()
}

function startTest2() {
  countRightAnswers2 = 0
  rightAnswers2.innerHTML = countRightAnswers2 + " - out of 11 possible questions"
  answerButtonsElement2.classList.remove('disable')
  createUsersTest2(users_id, users_name)
  startButton2.classList.add('hide')
  shuffledQuestions2 = perceptionTest.sort(() => Math.random() - .5)
  currentQuestionIndex2 = 0
  questionContainerElement2.classList.remove('hide')
  setNextQuestion2()
}

function createUsersTest2(users_id, users_name){

  let users_test = {
    test_name: "Perception Test",
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

function setNextQuestion2() {
  resetState2()
  showQuestion2(shuffledQuestions2[currentQuestionIndex2])
}


function showQuestion2(question) {
  
  const img = document.createElement('img')
  img.src = 'images/' + question.question
  questionElement2.appendChild(img)
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.number
    button.classList.add('btn-2')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer2)
    answerButtonsElement2.appendChild(button)
  })
  answerButtonsElement2.classList.remove('disable')
}


function resetState2() {
  clearStatusClass2(document.body)
  nextButton2.classList.add('hide')
  while (answerButtonsElement2.firstChild) {
    answerButtonsElement2.removeChild(answerButtonsElement2.firstChild)
    while (questionElement2.firstChild) {
      questionElement2.removeChild(questionElement2.firstChild)
    }
  }
}

function selectAnswer2(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass2(document.body, correct)
  Array.from(answerButtonsElement2.children).forEach(button => {
    setStatusClass2(button, button.dataset.correct)
  })
  if (selectedButton.dataset = correct) {
    countRightAnswers2++
  } 
  if (shuffledQuestions2.length > (currentQuestionIndex2 + 1)) {
    nextButton2.classList.remove('hide') 
  } else {
    updateUsersTest(countRightAnswers2, users_tests_id)
    closeButton2.innerText = 'Done'
    closeButton2.classList.remove('hide')
  }
  answerButtonsElement2.classList.add('disable')
  rightAnswers2.innerHTML = countRightAnswers2 + " - out of 11 possible questions"
}

function updateUsersTest2(results, users_tests_id) {

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
    let ut = new UsersTest(users_test.id, users_test.test_name, users_test.test_result, users_test.user_id, users_test.users_name)
    ut.renderUsersTest();
  }

function setStatusClass2(element, correct) {
  clearStatusClass2(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass2(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

