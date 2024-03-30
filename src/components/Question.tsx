import { useState } from 'react';

import QUESTIONS from '../utils/questions';
import QuestionTimer from './QuestionTimer';
import Answers from './Answers';

export interface Answer {
  answer: 'answered' | 'unanswered' | 'correct' | 'wrong';
}

type SelectedAnswer = {
  selectedAnswer: string;
  isCorrect: boolean | null;
};

type QuestionProps = {
  questionIndex: number;
  onSelectAnswer: (answer: string) => void;
  onSkipAnswer: () => void;
};

function Question({
  questionIndex,
  onSelectAnswer,
  onSkipAnswer,
}: QuestionProps) {
  const [answer, setAnswer] = useState<SelectedAnswer>({
    selectedAnswer: '',
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer: string) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[questionIndex].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState: Answer = { answer: 'unanswered' };

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect
      ? { answer: 'correct' }
      : { answer: 'wrong' };
  } else if (answer.selectedAnswer) {
    answerState = { answer: 'answered' };
  }
  return (
    <div id='question'>
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        // onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : () => {}}   // Use a no-op function instaed of null
        mode={answerState.answer}
      />
      <h2>{QUESTIONS[questionIndex].text}</h2>
      <Answers
        answers={QUESTIONS[questionIndex].answers}
        answerState={answerState}
        selectedAnswer={answer.selectedAnswer} // Latest value stored in the userAnswers
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}

export default Question;
