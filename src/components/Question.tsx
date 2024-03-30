import QuestionTimer from './QuestionTimer';
import Answers from './Answers';
import { Answer } from './Quiz';

type QuestionProps = {
  questionText: string;
  answers: string[];
  selectedAnswer: string;
  answerState: Answer;
  onSelectAnswer: (answer: string) => void;
  onSkipAnswer: () => void;
};

function Question({
  questionText,
  answers,
  selectedAnswer,
  answerState,
  onSelectAnswer,
  onSkipAnswer,
}: QuestionProps) {
  return (
    <div id='question'>
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        answerState={answerState}
        selectedAnswer={selectedAnswer} // Latest value stored in the userAnswers
        onSelect={onSelectAnswer}
      />
    </div>
  );
}

export default Question;
