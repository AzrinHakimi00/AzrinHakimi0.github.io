let noQ = 0;
let nextQuestion = document.querySelector('.next-question');
let isAnswered = false; // Move isAnswered outside of loadJsonData function

async function loadJsonData() {
    try {
        var isAnswered = false;
        // Fetch the JSON data from the file
        const response = await fetch('data.json');

        // Parse the JSON data
        const jsonData = await response.json();

        // Clear the color of the selected answer from the previous question
        clearAnswerColors();

        // Update the DOM elements with the loaded data
        updateElements(jsonData[noQ], isAnswered);
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}


// Function to clear the color of the selected answer from the previous question
function clearAnswerColors() {
    let answerElements = document.querySelectorAll('.answer div');
    answerElements.forEach(answer => {
        answer.style.backgroundColor = '';
    });
}

// Function to update DOM elements with JSON data
function updateElements(data) {
    // Selecting the question element
    let question = document.querySelector('.question');
    question.textContent = data.question;

    // Selecting answer elements
    let ans1 = document.querySelector('.ans1');
    let ans2 = document.querySelector('.ans2');
    let ans3 = document.querySelector('.ans3');
    let ans4 = document.querySelector('.ans4');

    // Setting text content for each answer
    ans1.textContent = data.answers.ans1;
    ans2.textContent = data.answers.ans2;
    ans3.textContent = data.answers.ans3;
    ans4.textContent = data.answers.ans4;

    // Adding click event listeners to answer elements
    ans1.addEventListener('click', function() {
        
        checkAnswer(data.answers.ans1, data.correctAnswer, data.trivia, ans1);
        
    });

    ans2.addEventListener('click', function() {
       
        checkAnswer(data.answers.ans2, data.correctAnswer, data.trivia, ans2);
        
    });

    ans3.addEventListener('click', function() {
      
        checkAnswer(data.answers.ans3, data.correctAnswer, data.trivia, ans3);
        });

    ans4.addEventListener('click', function() {
       
        checkAnswer(data.answers.ans4, data.correctAnswer, data.trivia, ans4);
        
    });

    let triviaElement = document.querySelector('.trivia');
    triviaElement.textContent = '';
}

// Function to check the selected answer
function checkAnswer(selectedAnswer, correctAnswer, trivia, answer) {
    // Replace this with your logic to check if the selected answer is correct
    let row = document.querySelector('.right-or-wrong');
    let triviaElement = document.querySelector('.trivia');

    if (selectedAnswer === correctAnswer) {
        row.textContent = "Correct!";
        row.style.color = "#76FF03";
        answer.style.backgroundColor = "#76FF03";
    } else {
        row.textContent = "Wrong! The correct answer is " + correctAnswer;
        row.style.color = "#E53935";
        answer.style.backgroundColor = "#E53935";
    }
    triviaElement.textContent = trivia;

    nextQuestion.style.display = 'block';


}

// Add event listener for the "Next Question" button outside the function
nextQuestion.addEventListener('click', function() {
    let triviaElement = document.querySelector('.trivia');
    triviaElement.textContent = "";
    let row = document.querySelector('.right-or-wrong');
    row.textContent = "";
    noQ++;
    loadJsonData();
    if(noQ == 10) {
        alert('You have answered all the question')
    }
});

// Load JSON data when the script is executed
loadJsonData();



