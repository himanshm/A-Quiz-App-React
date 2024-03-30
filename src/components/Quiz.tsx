import { useCallback, useState } from 'react';
import QUESTIONS from '../utils/questions';
import Summary from './Summary';
import QuestionTimer from './QuestionTimer';

interface Answer {
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

  const shuffledAnswers: string[] = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id='quiz'>
      <div id='question'>
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {shuffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let answerClass = ``;

            if (answerState.answer === 'answered' && isSelected) {
              answerClass = `selected`;
            }

            if (
              (answerState.answer === 'correct' ||
                answerState.answer === 'wrong') &&
              isSelected
            ) {
              answerClass = answerState.answer;
            }
            return (
              <li key={answer} className='answer'>
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={answerClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Quiz;
