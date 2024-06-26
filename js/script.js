const play_now_button = document.querySelector(".play_now_button")
const introductionContainer = document.querySelector(".introduction")
const categoryContainer = document.querySelector(".category_container")
const choose_question_container = document.querySelector(".choose_question_container");

const html_button = document.querySelector(".html_button");
const css_button = document.querySelector(".css_button");
const js_button = document.querySelector(".js_button");
const all_button = document.querySelector(".all_button");

const minutesLeft = document.querySelector(".minutesLeft");
const secondsLeft = document.querySelector(".seconds")

const amount_of_questions_container = document.querySelector(".amount_of_questions_container");
const amount_of_questions = document.querySelector(".amount_of_questions");

const gameContainer = document.querySelector(".gameContainer")
const questionContainer = document.querySelector(".questionContainer");

const userScoreContainer = document.querySelector(".userScoreContainer");
const user_score = document.querySelector(".user_score");

const submit_button = document.querySelector(".submit_button");

const restart_button = document.querySelector(".restart_button");

let option1Button;
let option2Button;
let option3Button;
let option4Button;

let questionObj
let questionArr = []
let choseCategory;
let questionsNumTotal;
let correctAnswerArr = [];
let userScore = 0


async function readJSONFile(url){
    const request = await fetch(url);
    const response = await request.json();
    return response;
}

async function getRandomQuestions(type, num){
    let questionResponse = await readJSONFile("./question.json");
    minutesLeft.textContent = num;
    secondsLeft.textContent = 10;
    if(num >= 5 && num <= 25){
        if(type !== "all"){
            questionObj = questionResponse[type]
        }else{
            questionObj = questionResponse
        }
        for(let x in questionObj){
            if(questionArr.length < num){
                questionArr.push(questionObj[x])
            }
        }
        minutesLeft.textContent--
        let timerInterval = setInterval(()=>{
            secondsLeft.textContent--
            if(secondsLeft.textContent === '0'){
                minutesLeft.textContent--
                secondsLeft.textContent = 10
            }

            if(minutesLeft.textContent < 0){
                alert("timer done, you'll automatically restart the quiz")
                clearInterval(timerInterval);
                window.location.reload();
            }
        },1000)
 
    }else{
        alert("please enter a valid number between 5 and 25")
    }
}


function displayQuestions(questions){
    let count;
    for(let x = 0; x < questions.length; x++){
        count = x
        // console.log(questions[x]);
        let div = document.createElement("div");
        let h1 = document.createElement("h1");

        h1.textContent = `${count+=1}. ${questions[x].question}`;

        let option1 = document.createElement("p");
        let option2 = document.createElement("p");
        let option3 = document.createElement("p");
        let option4 = document.createElement("p");

        option1.textContent = questions[x].choices.a;
        option2.textContent = questions[x].choices.b;
        option3.textContent = questions[x].choices.c;
        option4.textContent = questions[x].choices.d;

        correctAnswerArr.push(questionArr[x].choices[questionArr[x].correctAnswer])

        div.setAttribute("class", `question question${count+=1}`);
        option1.setAttribute("class", "option option1")
        option2.setAttribute("class", "option option2")
        option3.setAttribute("class", "option option3")
        option4.setAttribute("class", "option option4")

        questionContainer.append(div);
        div.append(h1);
        div.append(option1);
        div.append(option2);
        div.append(option3);
        div.append(option4);

        option1Button = document.querySelectorAll(".option1");
        option2Button = document.querySelectorAll(".option2");
        option3Button = document.querySelectorAll(".option3");
        option4Button = document.querySelectorAll(".option4");
    }

    option1Button.forEach((button)=>{
        button.addEventListener("click", ()=>{
            if(correctAnswerArr.includes(button.textContent)){
                button.style.background = "lightGreen";
                userScore += 1;
            }else{
                button.style.background = "red";
            }
        })
    })

    option2Button.forEach((button)=>{
        button.addEventListener("click", ()=>{
            if(correctAnswerArr.includes(button.textContent)){
                button.style.background = "lightGreen";
                userScore += 1;
            }else{
                button.style.background = "red";
            }
        })
    })

    option3Button.forEach((button)=>{
        button.addEventListener("click", ()=>{
            if(correctAnswerArr.includes(button.textContent)){
                button.style.background = "lightGreen";
                userScore += 1;
            }else{
                button.style.background = "red";
            }
        })
    })

    option4Button.forEach((button)=>{
        button.addEventListener("click", ()=>{
            if(correctAnswerArr.includes(button.textContent)){
                button.style.background = "lightGreen";
                userScore += 1;
            }else{
                button.style.background = "red";
            }
        })
    })

}


play_now_button.addEventListener("click", ()=>{
    introductionContainer.style.display = "none";
    categoryContainer.style.display = "block";
})

html_button.addEventListener("click", ()=>{
    choseCategory = html_button.textContent;
    choose_question_container.style.display = "block";
    categoryContainer.style.display = "none";
})

css_button.addEventListener("click", ()=>{
    choseCategory = css_button.textContent;
    choose_question_container.style.display = "block";
    categoryContainer.style.display = "none";

})

js_button.addEventListener("click", ()=>{
    choseCategory = js_button.textContent;
    choose_question_container.style.display = "block";
    categoryContainer.style.display = "none";
})

all_button.addEventListener("click", ()=>{
    choseCategory = all_button.textContent;
    choose_question_container.style.display = "block";
    categoryContainer.style.display = "none";
})

amount_of_questions_container.addEventListener("submit", (event)=>{
    questionsNumTotal = amount_of_questions.value;
    getRandomQuestions(choseCategory, questionsNumTotal);
    setTimeout(()=>{
        displayQuestions(questionArr);
        gameContainer.style.display = "block"
    },1000)
    choose_question_container.style.display = "none"
    event.preventDefault();
})

submit_button.addEventListener("click", ()=>{
    user_score.textContent = userScore;
    gameContainer.style.display = "none";
    userScoreContainer.style.display = "block";
})

restart_button.addEventListener("click", ()=>{
    window.location.reload();
})

