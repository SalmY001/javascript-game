const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let currentQ = {}  //currentQuestion
let answerOptions = true //acceptingAnswers
let score = 0
let questionCounter = 0
let availableQ = [] //availableQuestions

let questions = [
    {
        question: 'Which statement declares a variable in JavaScript?',
        choice1: 'Variable', 
        choice2: 'var', 
        choice3: 'Var', 
        choice4: 'variable',
        answer: 2,
    },
    {
        question: 'What does DOM represent?',
        choice1: 'Document One Model', 
        choice2: 'Derive One Model', 
        choice3: 'Document Object Model', 
        choice4: 'Delete One Model',
        answer: 3,
    },
    {
        question: 'Which one of the following is NOT a DOM Input Event?',
        choice1: 'onsubmit', 
        choice2: 'onkeydown', 
        choice3: 'onfocus', 
        choice4: 'onturnup',
        answer: 4,
    },
    {
        question: 'In best practice, where should the script element be placed in the HTML document?',
        choice1: 'Near the beginning', 
        choice2: 'Near the end', 
        choice3: 'In the middle', 
        choice4: 'Anywhere',
        answer: 2,
    },
    {
        question: 'When is the const keyword used?',
        choice1: 'To define a constant array', 
        choice2: 'To declare a variable with an unchanging value', 
        choice3: 'To constantly change text', 
        choice4: 'To display code in the console',
        answer: 2,
    }
]

const MAX_POINTS = 20 // SCORE_POINTS
const MAX_QUESTIONS = 5 // MAX_QUESTIONS

startQuiz = () => { //startGame
    questionCounter = 0
    score = 0
    availableQ = [...questions] //avaialableQuestions
    getNextQuestion() //getNewQuestion
}

getNextQuestion = () => {
    if(availableQ.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQ.length)
    currentQ = availableQ[questionsIndex]
    question.innerText = currentQ.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innterText = currentQ['choice' + number]
    })

    availableQ.splice(questionsIndex, 1)

    answerOptions = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!answerOptions) return

        answerOptions = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let appliedClass = selectedAnswer == currentQ.answer ? 'correct' : 'incorrect'

        if(appliedClass === 'correct') {
            incrementScore(MAX_POINTS)
        }

        selectedChoice.parentElement.classList.add(appliedClass)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(appliedClass)
            getNextQuestion()
        }, 1000)
        
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startQuiz()