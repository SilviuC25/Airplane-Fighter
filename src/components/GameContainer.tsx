import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import useScore from '../hooks/useScore';
import useGenerateObstacle from '../hooks/useGenerateObstacle';
import useIncreaseSpeed from '../hooks/useIncreaseSpeed';
import useMoveObstacles from '../hooks/useMoveObstacles';
import useCheckCollision from '../hooks/useCheckCollision';
import useHandleKeyPress from '../hooks/useHandleKeyPress';
import * as Constants from '../constants/gameConstants';
import * as Styles from '../styles/gameContainerStyles';
import Obstacles from './Obstacles';
import Airplane from './Airplane';
import { Obstacle } from '../datatypes/obstacle'

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
    resetScore();
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
        <Obstacles obstacles={obstacles} />
        {gameOver && (
          <div
            className='text-center position-absolute text-light'
            style={{
              ...Styles.gameOverStyle
            }}
          >
            Game Over! Score: {score}
            <button onClick={resetGame} className='btn btn-primary mx-2'>
              Restart
            </button>
          </div>
        )}
        <Airplane gameOver={gameOver} planePositionX={planePosition.x} />
      </div>
    </div>
  );
}

export default GameContainer;
