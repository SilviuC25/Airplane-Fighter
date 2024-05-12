import { useEffect } from 'react';
import { Obstacle } from '../datatypes/obstacle';
import * as Constants from '../constants/gameConstants';

const useMoveObstacles = (obstacles: Obstacle[], setObstacles: React.Dispatch<React.SetStateAction<Obstacle[]>>, 
  fallSpeed: number, gameOver: boolean): void => {
  useEffect(() => {
    const moveObstacles = () => {
      if (!gameOver) {
        const updatedObstacles = obstacles.map((obstacle) => ({
          ...obstacle,
          y: obstacle.y + fallSpeed
        }));
        setObstacles(updatedObstacles);
      }
    };

    const interval = setInterval(moveObstacles, Constants.FALL_INTERVAL);

    return () => clearInterval(interval);
  }, [obstacles, setObstacles, gameOver]);
};

export default useMoveObstacles;