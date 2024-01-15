
const questions = [
    {
        question: "which one of these is a javascript framework?",
        answers: [
            { text: "python", correct: false },
            { text: "Django", correct: false },
            { text: "React", correct: true },
            { text: "Eclipse", correct: false }
        ]
    },
    {
        question: "Who is the prime minister of Nepal?",
        answers: [
            { text: "KP Oli", correct: false },
            { text: "Prachanda", correct: true },
            { text: "BP Koirala", correct: false },
            { text: "Ram shah", correct: false }
        ]
    },
    {
        question: "Which is not the type of loop?",
        answers: [
            { text: "for", correct: false },
            { text: "do while", correct: false },
            { text: "nested", correct: false },
            { text: "float", correct: true }
        ]
    },
    {
        question: "what is the value of  10-3(2-7)?",
        answers: [
            { text: "25", correct: true },
            { text: "-35", correct: false },
            { text: "10", correct: false },
            { text: "-10", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let Score =0;

function startQuiz(){
    currentQuestionIndex = 0;
    Score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect) {
       selectedBtn.classList.remove("correct");
       Score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `you scored ${Score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();