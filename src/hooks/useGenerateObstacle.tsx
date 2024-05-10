import { useEffect } from 'react';
import * as Constants from '../constants/gameConstants';
import { Obstacle } from '../datatypes/obstacle';

const useGenerateObstacle = (setObstacles: React.Dispatch<React.SetStateAction<Obstacle[]>>, gameOver: boolean): void => {
  useEffect(() => {
    const generateObstacle = () => {
      const randomObstacleIndex = Math.floor(Math.random() * Constants.asteroidObstacles.length);
      const randomXPosition = Math.floor(Math.random() * Constants.MAX_POSITION_PERCENTAGE);
      const newObstacle: Obstacle = {
        id: randomObstacleIndex,
        x: randomXPosition,
        y: 0
      };
      setObstacles((prevObstacles) => [...prevObstacles, newObstacle]);
    };

    const interval = setInterval(() => {
      if (!gameOver) {
        generateObstacle();
      }
    }, Constants.GENERATE_INTERVAL);

    return () => clearInterval(interval);
  }, [setObstacles, gameOver]);
};

export default useGenerateObstacle;
