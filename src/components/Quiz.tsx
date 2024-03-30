import { useCallback, useState } from 'react';
import QUESTIONS from '../utils/questions';
import Summary from './Summary';
import QuestionTimer from './QuestionTimer';

function Quiz() {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnswer: string) => {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });
  }, []);

  // If the timer expired a question is skipped
  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer('');
  }, [handleSelectAnswer]);

  if (quizIsComplete) {
    return <Summary />;
  }

  const shuffledAnswers: string[] = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id='quiz'>
      <div id='question'>
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={() => handleSelectAnswer('')}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {shuffledAnswers.map((answer) => (
            <li key={answer} className='answer'>
              <button onClick={handleSkipAnswer}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Quiz;
