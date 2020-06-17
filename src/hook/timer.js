import { useState, useEffect, useCallback } from 'react';
import moment from 'moment';

export default function useTimer() {
  const [time, setTime] = useState(moment().startOf('day'));
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    const timeout = setInterval(() => {
      if (isCounting) {
        setTime(moment(time.add(1, 's')));
      }
    }, 1000);
    return () => clearInterval(timeout);
  });

  const play = useCallback(() => setIsCounting(true), []);
  const pause = useCallback(() => setIsCounting(false), []);

  return {
    time: time.format('mm:ss'),
    isCounting,
    play,
    pause
  };
}
