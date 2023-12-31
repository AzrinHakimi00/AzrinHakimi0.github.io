import { useEffect, useState } from 'react';
import './App.css';
import thumbsUpImage from './like.png'; // Replace with the correct path to your image
import thumbsDownImage from './dislike.png'; // Replace with the correct path to your image

interface Question {
  question: string;
  answers: Record<string, string>;
  correctAnswer: string;
  trivia: string;
}

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('src\\data.json');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: Question[] = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error during fetch operation:', error);
      }
    };

    loadQuestions();
  }, []);

  const handleAnswerClick = (selectedAnswer: string) => {
    setSelectedAnswer(selectedAnswer);
  };

  const handleNextQuestion = () => {
    // Check if the user selected an answer before moving to the next question
    if (selectedAnswer !== null) {
      // Check if the selected answer is correct and update the score
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }

      // Move to the next question or show results if it's the last question
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null); // Reset selected answer for the next question
      } else {
        setShowResult(true);
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  return (
    <div>
      <h1 className='title'>Environmental Quiz</h1>

      {showResult ? (
        <div className='result-cont'>
          <h2 className='score'>Your Score: {score} / {questions.length}</h2>
          <button className='btn-score' onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div>
          <h2 className='question-No'>Question {currentQuestion + 1}</h2>
          <h3 className='question'>{questions[currentQuestion]?.question}</h3>
          <ul className='answer-list'>
            {Object.entries(questions[currentQuestion]?.answers || {}).map(([key, value]) => (
              <li
                className={`answer ${selectedAnswer === value ? 'selected' : ''}`}
                key={key}
                onClick={() => handleAnswerClick(value)}
              >
                {value}
              </li>
            ))}
          </ul>
          {selectedAnswer && (
            <div className='triv-cont'>
              <p className='trivia'>{questions[currentQuestion]?.trivia}</p>
              {selectedAnswer === questions[currentQuestion]?.correctAnswer ? (
                <img src={thumbsUpImage} alt='Thumbs Up' className='thumbs-up' />
              ) : (
                <img src={thumbsDownImage} alt='Thumbs Down' className='thumbs-down' />
              )}
              <button onClick={handleNextQuestion} className='next-button'>
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;












