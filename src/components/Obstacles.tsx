import * as Constants from '../constants/gameConstants';
import * as Styles from '../styles/gameContainerStyles';
import { Obstacle } from '../datatypes/obstacle';

interface ObstaclesProps {
  obstacles: Obstacle[];
}

function Obstacles({ obstacles }: ObstaclesProps) {
  return (
    <>
      {obstacles.map((obstacle, index) => (
        <img
          key={index}
          src={Constants.asteroidObstacles[obstacle.id % Constants.asteroidObstacles.length]}
          alt='Obstacle'
          style={{
            ...Styles.obstacleStyle,
            left: `${obstacle.x}%`,
            top: `${obstacle.y}px`
          }}
        />
      ))}
    </>
  );
}

export default Obstacles;
