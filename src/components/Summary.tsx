import quizCompleteImg from '../assets/quiz-complete.png';
function Summary() {
  return (
    <div id='summary'>
      <img src={quizCompleteImg} alt='Trophy Icon' />
      <h2>Quiz is Complete!</h2>
    </div>
  );
}

export default Summary;
