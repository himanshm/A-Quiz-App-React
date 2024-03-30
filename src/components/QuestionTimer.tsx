import { useEffect, useState } from 'react';

type QuestionTimerProps = {
  timeout: number;
  mode: string;
  onTimeout: (() => void) | null;
};

function QuestionTimer({ timeout, onTimeout, mode }: QuestionTimerProps) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onTimeout) {
        onTimeout();
      }
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress max={timeout} value={remainingTime} className={mode} />;
}

export default QuestionTimer;
