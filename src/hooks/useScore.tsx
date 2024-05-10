import { useState, useEffect } from 'react';
import * as Constants from '../constants/gameConstants';

const useScore = (gameOver: boolean): [number, () => void] => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setScore((prevScore) => prevScore + Constants.SCORE_INCREMENT);
      }, Constants.UPDATE_SCORE_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [gameOver]);

  const resetScore = () => {
    setScore(0);
  };

  return [score, resetScore];
};

export default useScore;
