const questions = [
    {
        question: "What is the average sleep time of a domestic cat per day?",
        answers: [
            {
                text: "8 hours", correct: false
            },
            {
                text: "12 hours", correct: false
            },
            {
                text: "16 hours", correct: false
            },
            {
                text: "18 hours", correct: true
            }
        ]
    },
    {
        question: "What does it mean when a cat slowly blinks at you?",
        answers: [
            {
                text: "They're sleepy", correct: false
            },
            {
                text: "They trust you and feel safe", correct: true
            },
            {
                text: "They're warning you", correct: false
            },
            {
                text: "They have dust in their eye", correct: false
            }
        ]
    },
    {
        question: "What's the primary reason cats knead (the “biscuit making” motion)?",
        answers: [
            {
                text: "Comfort and instinct from kittenhood", correct: true
            },
            {
                text: "Sharpening claws", correct: false
            },
            {
                text: "Marking territory aggressively", correct: false
            },
            {
                text: "Imitating their humans baking banana bread", correct: false
            }
        ]
    },
    {
        question: "Which ancient civilization considered cats sacred?",
        answers: [
            {
                text: "Romans", correct: false
            },
            {
                text: "Egyptians", correct: true
            },
            {
                text: "Vikings", correct: false
            },
            {
                text: "Atlanteans", correct: false
            }
        ]
    },
    {
        question: "What's the technical term for a group of cats?",
        answers: [
            {
                text: "A herd", correct: false
            },
            {
                text: "A pack", correct: false
            },
            {
                text: "A clowder", correct: true
            },
            {
                text: "A pride", correct: false
            }
        ]
    },
    {
        question: "Which sense is most powerful in cats?",
        answers: [
            {
                text: "Hearing", correct: false
            },
            {
                text: "Smell", correct: true
            },
            {
                text: "Taste", correct: false
            },
            {
                text: "Sight", correct: false
            }
        ]
    },
     {
        question: "What's the average number of kittens in one litter?",
        answers: [
            {
                text: "2-3", correct: false
            },
            {
                text: "4-6", correct: true
            },
            {
                text: "8-10", correct: false
            },
            {
                text: "10+", correct: false
            },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    ShowQuestion();
    document.getElementById('progress-bar').style.width = '0%';

}

function ShowQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button =  document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function  resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    updateProgressBar();
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block"

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        ShowQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();        
    }
    else{
        startQuiz();
    }

});

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progressPercent + '%';
}

startQuiz();