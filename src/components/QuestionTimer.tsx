import { useEffect, useState } from 'react';

type QuestionTimerProps = {
  timeout: number;
  onTimeout: () => void;
};

function QuestionTimer({ timeout, onTimeout }: QuestionTimerProps) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    setTimeout(onTimeout, timeout);
  }, [timeout, onTimeout]);

  useEffect(() => {
    setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
  }, []);

  return <progress max={timeout} value={remainingTime} />;
}

export default QuestionTimer;
