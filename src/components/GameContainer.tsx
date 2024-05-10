import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import useGenerateObstacle from '../hooks/useGenerateObstacle';
import useIncreaseSpeed from '../hooks/useIncreaseSpeed';
import useCheckCollision from '../hooks/useCheckCollision';
import useMoveObstacles from '../hooks/useMoveObstacles';
import useHandleKeyPress from '../hooks/useHandleKeyPress';
import useScore from '../hooks/useScore';
import * as Constants from '../constants/gameConstants';
import * as Styles from '../styles/gameContainerStyles';
import { Obstacle } from '../datatypes/obstacle';

function GameContainer() {
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [fallSpeed, setFallSpeed] = useState(Constants.INITIAL_FALL_SPEED);
  const [gameOver, setGameOver] = useState(false);
  const [score, resetScore] = useScore(gameOver);
  const gameContainerWidth = Constants.GAME_WIDTH_PERCENTAGE * window.innerWidth;
  const initialPlaneXPosition = (gameContainerWidth - Constants.PLANE_WIDTH) / 2;
  const [planePosition, setPlanePosition] = useState({ x: initialPlaneXPosition, y: 0 });

  useGenerateObstacle(setObstacles, gameOver);
  useIncreaseSpeed(setFallSpeed, gameOver);
  useCheckCollision(obstacles, planePosition.x, gameContainerWidth, setGameOver);
  useMoveObstacles(obstacles, setObstacles, fallSpeed, gameOver);
  useHandleKeyPress(gameOver, gameContainerWidth, setPlanePosition);

  const resetGame = () => {
    resetScore(); // Resetează scorul
    setObstacles([]);
    setFallSpeed(Constants.INITIAL_FALL_SPEED);
    setPlanePosition({ x: initialPlaneXPosition, y: 0 });
    setGameOver(false);
  };

  return (
    <div className='mx-auto my-5 position-relative'>
      <h3 className='text-end text-primary text-center pb-5'>
        {' '}
        Score: {score}{' '}
      </h3>
      <div className='bg-dark' style={Styles.gameContainerStyle}>
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
        {gameOver && (
          <div
            className='text-center position-absolute text-light'
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '24px'
            }}
          >
            Game Over! Score: {score}
            <button onClick={resetGame} className='btn btn-primary mx-2'>
              Restart
            </button>
          </div>
        )}
        {!gameOver && (
          <img
            src={Constants.airplane}
            alt='Airplane'
            style={{
              ...Styles.planeStyle,
              left: `${planePosition.x}px`,
              bottom: '0'
            }}
            className='position-absolute translate-middle'
          />
        )}
      </div>
    </div>
  );
}

export default GameContainer;
