import { useEffect } from 'react';
import * as Constants from '../constants/gameConstants';
import { Obstacle } from '../datatypes/obstacle';

const useCheckCollision = (obstacles: Obstacle[], planePositionX: number, gameContainerWidth: number, 
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>): void => {
  useEffect(() => {
    const checkCollision = () => {
      for (let obstacle of obstacles) {
        const planeLeft = planePositionX - (Constants.PLANE_WIDTH / 2);
        const planeRight = planePositionX + (Constants.PLANE_WIDTH / 2);
        const planeTop = window.innerHeight - Constants.PLANE_HEIGHT * 1.25;
        const planeBottom = window.innerHeight - Constants.PLANE_HEIGHT * 0.25;
        const obstacleLeft = (obstacle.x / 100) * gameContainerWidth;
        const obstacleRight = obstacleLeft + Constants.OBSTACLE_WIDTH;
        const obstacleTop = obstacle.y;
        const obstacleBottom = obstacle.y + Constants.OBSTACLE_HEIGHT;

        if (
          planeRight > obstacleLeft &&
          planeLeft < obstacleRight &&
          planeBottom > obstacleTop &&
          planeTop < obstacleBottom
        ) {
          setGameOver(true);
          return;
        }
      }
    };

    const collisionInterval = setInterval(checkCollision, Constants.CHECK_COLLISION_INTERVAL);
    return () => clearInterval(collisionInterval);
  }, [obstacles, planePositionX, gameContainerWidth, setGameOver]);
};

export default useCheckCollision;
