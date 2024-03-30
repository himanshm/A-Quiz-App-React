import { useCallback, useState } from 'react';
import QUESTIONS from '../utils/questions';
import Summary from './Summary';
import Question from './Question';

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
    return <Summary answers={userAnswers} />;
  }

  return (
    <div id='quiz'>
      <Question
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}

export default Quiz;
