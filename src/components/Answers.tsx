import { useRef } from 'react';
import { Answer } from './Question';

type AnswersProps = {
  answers: string[];
  selectedAnswer: string;
  answerState: Answer;
  onSelect: (answer: string) => void;
};

function Answers({
  answers,
  answerState,
  selectedAnswer,
  onSelect,
}: AnswersProps) {
  const shuffledAnswers = useRef<string[]>();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id='answers'>
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
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
              onClick={() => onSelect(answer)}
              className={answerClass}
              disabled={answerState.answer !== 'unanswered'}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Answers;
