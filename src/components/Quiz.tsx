import { useCallback, useState } from 'react';
import QUESTIONS from '../utils/questions';
import Summary from './Summary';
import Question from './Question';

export interface Answer {
  answer: 'answered' | 'unanswered' | 'correct' | 'wrong';
}

function Quiz() {
  const [answerState, setAnswerState] = useState<Answer>({
    answer: 'unanswered',
  });
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const activeQuestionIndex =
    answerState.answer === 'unanswered'
      ? userAnswers.length
      : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (selectedAnswer: string) => {
      setAnswerState({ answer: 'answered' });
      setUserAnswers((prevAnswers) => {
        return [...prevAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState({ answer: 'correct' });
        } else {
          setAnswerState({ answer: 'wrong' });
        }

        setTimeout(() => {
          setAnswerState({ answer: 'unanswered' });
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );
  // If the timer expired a question is skipped
  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer('');
  }, [handleSelectAnswer]);

  if (quizIsComplete) {
    return <Summary />;
  }

  return (
    <div id='quiz'>
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}

export default Quiz;
