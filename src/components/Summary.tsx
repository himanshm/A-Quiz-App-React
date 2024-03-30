import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../utils/questions.ts';
import Stats from './Stats';

type SummaryProps = {
  answers: string[];
};
function Summary({ answers }: SummaryProps) {
  const skippedAnswers = answers.filter((answer) => answer === '');
  const correctAnswers = answers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / answers.length) * 100
  );

  const correctAnswersShare = Math.round(
    (correctAnswers.length / answers.length) * 100
  );

  const wrongAnswersShare = 100 - correctAnswersShare - skippedAnswersShare;

  return (
    <div id='summary'>
      <img src={quizCompleteImg} alt='Trophy Icon' />
      <h2>Quiz is Complete!</h2>
      <div id='summary-stats'>
        <Stats numStat={skippedAnswersShare} textStat='skipped' />
        <Stats numStat={correctAnswersShare} textStat='answered correctly' />
        <Stats numStat={wrongAnswersShare} textStat='answered incorrectly' />
      </div>
      <ol>
        {answers.map((answer, index) => {
          let userAnsClass = `user-answer`;
          let displayAnswer = answer;

          if (answer === '') {
            userAnsClass += ` skipped`;
            displayAnswer = 'Skipped';
          } else if (answer === QUESTIONS[index].answers[0]) {
            userAnsClass += ` correct`;
          } else {
            userAnsClass += ' wrong';
          }
          return (
            <li key={answer + index}>
              <h2>{index + 1}</h2>
              <p className='question'>{QUESTIONS[index].text}</p>
              <p className={userAnsClass}>{displayAnswer}</p>
              {/* <p className={userAnsClass}>{answer ?? 'Skipped'}</p> this only works when answer
               is either null or undefined but I am handling skipped answers as empty string */}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Summary;
