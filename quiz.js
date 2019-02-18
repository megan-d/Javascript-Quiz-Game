(function() {
//set up selectors
const quizContainer = document.querySelector('#quiz');
const resultsContainer = document.querySelector('#results');
const startButton = document.querySelector('#start-quiz');
const submitButton = document.querySelector('#submit');

//create quiz questions in array
const myQuestions = [
    {
        question: 'What is the capital of Pennsylvania?',
        
        answers: {
            a: "Pittsburgh",
            b: "Philadelphia",
            c: "Harrisburg"
        },

        correctAnswer: 'c'
    },

    {
        question: 'What is the capital of Vermont?',
        
        answers: {
            a: "Montpelier",
            b: "Killington",
            c: "Burlington"
        },

        correctAnswer: 'a'
    },

    {
        question: 'What is the capital of Ohio?',
        
        answers: {
            a: "Cleveland",
            b: "Akron",
            c: "Columbus"
        },

        correctAnswer: 'c'
    },

    {
        question: 'What is the capital of Florida?',
        
        answers: {
            a: "Tampa",
            b: "Tallahasse",
            c: "Orlando"
        },

        correctAnswer: 'b'
    },

    {
        question: 'What is the capital of Georgia?',
        
        answers: {
            a: "Atlanta",
            b: "Augusta",
            c: "Savannah"
        },

        correctAnswer: 'a'
    }
]

//function to build the quiz
function buildQuiz() {
    //create variable to store the html output
    const output = [];
    //for each question
    myQuestions.forEach((currentQuestion, questionNumber) => {
        //store the list of answer choices
        const answers = [];
        //add html for each available answer choice
        for(letter in currentQuestion.answers) {
            //add an HTML radio button
            answers.push(
                `<label>
                    <input type='radio' name='question${questionNumber}' value='${letter}'>
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`
            );
        }
        //add this question and its answers to the output
        output.push(
            `<div class='question'> ${currentQuestion.question} </div>
            <div class='answers'> ${answers.join('')} </div>`
        )
    });

    quizContainer.innerHTML = output.join('');
    submitButton.innerHTML = `<button id='submit' class='sub-button'>Submit Quiz</button>`;
    startButton.remove();
}

//function to show the quiz results
function showResults() {
    //gather answer containers from quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    //keep track of user's answers
    let numCorrect = 0;
    //for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {
        //find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = 'input[name=question' + questionNumber +']:checked';
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        //if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++
            answerContainers[questionNumber].style.color = 'lightgreen';
        } else {
            //if answer is wrong or blank
            answerContainers[questionNumber].style.color = 'red';
        }
    });
    //show number of correct answers out of total
    resultsContainer.innerHTML = `You got ${numCorrect} question out of ${myQuestions.length} questions correct`;
}

//when click start button, start the quiz
startButton.addEventListener('click', buildQuiz);

//when click the submit button, show the results
submitButton.addEventListener('click', showResults);

})();
