// Function to load JSON data from a file
async function loadJsonData() {
    try {
        // Fetch the JSON data from the file
        const response = await fetch('data.json');

        // Parse the JSON data
        const jsonData = await response.json();

        // Update the DOM elements with the loaded data
        updateElements(jsonData);
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
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
        checkAnswer(data.answers.ans1, data.correctAnswer, data.trivia);
        ans1.style.backgroundColor = "#76FF03";
    });

    ans2.addEventListener('click', function() {
        checkAnswer(data.answers.ans2, data.correctAnswer, data.trivia);
    });

    ans3.addEventListener('click', function() {
        checkAnswer(data.answers.ans3, data.correctAnswer, data.trivia);
    });

    ans4.addEventListener('click', function() {
        checkAnswer(data.answers.ans4, data.correctAnswer, data.trivia);
    });
}

// Function to check the selected answer
function checkAnswer(selectedAnswer, correctAnswer, trivia) {
    // Replace this with your logic to check if the selected answer is correct
    let row = document.querySelector('.right-or-wrong');
    let triviaElement = document.querySelector('.trivia');

    if (selectedAnswer === correctAnswer) {
        row.textContent = "Correct!";
        row.style.color = "#76FF03";
        
    } else {
        row.textContent = "Wrong!";
        row.style.color = "#E53935";
    }
    triviaElement.textContent = trivia;
}

// Load JSON data when the script is executed
loadJsonData();



