
//array of questions with answers and correct answer
const questions = [
    {
        question: "What is the Capital City of Australia?",
        answers: [
            {text: "Sydney", answer: false },
            {text: "Canberra", answer: true},
            {text: "Vancouver", answer: false}, 
            {text: "Brisbane", answer: false}
        ]
    },

    {
        question: "What is 6 x 7?",
        answers: [
            {text: "45", answer: false },
            {text: "13", answer: false},
            {text: "24", answer: false}, 
            {text: "42", answer: true}
        ]
    },

    {
        question: "What planet are we on?",
        answers: [
            {text: "Earth", answer: true },
            {text: "Jupiter", answer: false},
            {text: "Saturn", answer: false}, 
            {text: "Krypton", answer: false}
        ]
    },

    {
        question: "What is currency of Canada?",
        answers: [
            {text: "Euro", answer: false },
            {text: "Yen", answer: false},
            {text: "Monopoly Money", answer: false}, 
            {text: "Dollar", answer: true}
        ]
    }, 

        {
            question: "What year is it?",
            answers: [
                {text: "2024", answer: true },
                {text: "2023", answer: false},
                {text: "1945", answer: false}, 
                {text: "2256", answer: false}
            ]
        }
]

//Variables
const answerKeyElement = document.getElementById("answerKey");

const questionElement = document.getElementById("question")

const answerElement = document.getElementById("answer-buttons")

const nextButton = document.getElementById("next-btn")

let currentQIndex = 0; 

let score = 0; 


function beginQuiz() { 
    //hides answer key 
    answerKeyElement.style.display = "none";
    currentQIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    displayQuestion();

}

//Displays questions with four possible answers
function displayQuestion() {

    answerElement.innerHTML = "";
    
    nextButton.style.display = "none"

    let currentQuestion = questions[currentQIndex];
    let questionNumber = currentQIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;


    currentQuestion.answers.forEach( answ => {
        const button = document.createElement("button");
        button.innerHTML = answ.text;
        button.classList.add("ans");
        answerElement.appendChild(button);
        button.dataset.answer = answ.answer;
        button.addEventListener("click", selectAnswer);

    })
}

//checks if answer selected is correct or not
function selectAnswer(e) { 
    const selectedBtn = e.target; 
    const isCorrect = selectedBtn.dataset.answer === "true"; 
    if (isCorrect) { 
        score++;
        selectedBtn.classList.add("correct");
    }
    else { 
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerElement.children).forEach(button => {
        if (button.dataset.answer === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

//Displays results and reveals answer key at end of quiz
function showScore() { 
    answerElement.innerHTML = "";
    questionElement.innerHTML = `Your Score is ${score} out of ${questions.length}!`;


    answerKeyElement.style.display = "block";




    nextButton.innerHTML = "Restart Quiz";
    nextButton.style.display = "block";
}

//will display the next question unless last question reached, then will
//display results.
function handleNextQuestion() { 
    currentQIndex++; 

    if (currentQIndex === questions.length-1) { 
        nextButton.innerHTML = "Submit"; 
        displayQuestion();
    }

    if (currentQIndex < questions.length)  {
        displayQuestion();
    }
    
    else { 
        showScore();
    }
     
}

//displays the next question after hitting next. Or restart the quiz.
nextButton.addEventListener("click", () =>{
    if (currentQIndex < questions.length) { 
        handleNextQuestion();
    }
    else { 
        beginQuiz();
    }
})

beginQuiz();