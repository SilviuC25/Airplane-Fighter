import { useEffect } from 'react';
import * as Constants from '../constants/gameConstants';

const useIncreaseSpeed = (setFallSpeed: React.Dispatch<React.SetStateAction<number>>, gameOver: boolean): void => {
  useEffect(() => {
    const speedIncreaseInterval = setInterval(() => {
      if (!gameOver) {
        setFallSpeed((prevSpeed) => prevSpeed + Constants.FALL_SPEED_INCREMENT);
      }
    }, Constants.FALL_SPEED_INCREMENT_INTERVAL);
    return () => clearInterval(speedIncreaseInterval);
  }, [gameOver, setFallSpeed]);
};

export default useIncreaseSpeed;
