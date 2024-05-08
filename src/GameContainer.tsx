import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

interface Obstacle {
  id: number;
  x: number;
  y: number;
}

const GAME_WIDTH_PERCENTAGE = 0.6;
const OBSTACLE_WIDTH = 70;
const OBSTACLE_HEIGHT = 70;
const PLANE_WIDTH = 100;
const PLANE_HEIGHT = 100;
const FALL_SPEED_INCREMENT = 1;
const SCORE_INCREMENT = 1;
const INITIAL_FALL_SPEED = 5;
const GENERATE_INTERVAL = 1000;
const MAX_POSITION_PERCENTAGE = 90;
const CHECK_COLLISION_INTERVAL = 20;
const FALL_INTERVAL = 50;
const UPDATE_SCORE_INTERVAL = 1000;
const POSITION_MODIFIER = 10

const asteroidObstacles = [
	'/src/assets/images/asteroid1.png',
	'/src/assets/images/asteroid2.png',
	'/src/assets/images/asteroid3.png',
	'/src/assets/images/asteroid4.png'
];

const gameContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: `${GAME_WIDTH_PERCENTAGE * 100}vw`,
  height: '100vh',
  overflow: 'hidden',
  margin: '0 auto',
};

const obstacleStyle: React.CSSProperties = {
  position: 'absolute',
  width: `${OBSTACLE_WIDTH}px`,
  height: `${OBSTACLE_HEIGHT}px`,
};

const planeStyle: React.CSSProperties = {
  width: `${PLANE_WIDTH}px`,
  height: `${PLANE_HEIGHT}px`,
};

function generateRandomPosition(maxPosition: number): number {
  return Math.floor(Math.random() * maxPosition);
}

function GameContainer() {
  const [score, setScore] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [fallSpeed, setFallSpeed] = useState(INITIAL_FALL_SPEED);
  const [gameOver, setGameOver] = useState(false);
  const gameContainerWidth = GAME_WIDTH_PERCENTAGE * window.innerWidth;
  const initialPlaneXPosition = (gameContainerWidth - PLANE_WIDTH) / 2;
  const [planePosition, setPlanePosition] = useState({ x: initialPlaneXPosition, y: 0 });

  const generateObstacle = () => {
    const randomObstacleIndex = Math.floor(Math.random() * asteroidObstacles.length);
    const randomXPosition = generateRandomPosition(MAX_POSITION_PERCENTAGE);
    const newObstacle: Obstacle = {
      id: randomObstacleIndex,
      x: randomXPosition,
      y: 0
    };
    setObstacles((prevObstacles) => [...prevObstacles, newObstacle]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        generateObstacle();
      }
    }, GENERATE_INTERVAL);
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    const fallInterval = setInterval(() => {
      if (!gameOver) {
        setObstacles((prevObstacles) =>
          prevObstacles.map((obstacle) => ({
            ...obstacle,
            y: obstacle.y + fallSpeed
          }))
        );
      }
    }, FALL_INTERVAL);

    return () => clearInterval(fallInterval);
  }, [fallSpeed, gameOver]);

  useEffect(() => {
    const scoreInterval = setInterval(() => {
      if (!gameOver) {
        setScore((prevScore) => prevScore + SCORE_INCREMENT);
      }
    }, UPDATE_SCORE_INTERVAL);
    return () => clearInterval(scoreInterval);
  }, [gameOver]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameOver) return;

    if (event.key === 'ArrowLeft') {
      setPlanePosition((prevPosition) => ({
        ...prevPosition,
        x: Math.max(prevPosition.x - POSITION_MODIFIER, 0)
      }));
    } else if (event.key === 'ArrowRight') {
      setPlanePosition((prevPosition) => ({
        ...prevPosition,
        x: Math.min(prevPosition.x + POSITION_MODIFIER, gameContainerWidth - PLANE_WIDTH)
      }));
    }
  }, [gameOver, gameContainerWidth]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    const speedIncreaseInterval = setInterval(() => {
      if (!gameOver) {
        setFallSpeed((prevSpeed) => prevSpeed + FALL_SPEED_INCREMENT);
      }
    }, UPDATE_SCORE_INTERVAL);
    return () => clearInterval(speedIncreaseInterval);
  }, [gameOver]);

  useEffect(() => {
    const checkCollision = () => {
      for (let obstacle of obstacles) {
        const planeLeft = planePosition.x - (PLANE_WIDTH / 2);
				const planeRight = planePosition.x + (PLANE_WIDTH / 2);
				const planeTop = window.innerHeight - PLANE_HEIGHT * 1.25;
				const planeBottom = window.innerHeight - PLANE_HEIGHT * 0.25;
				const obstacleLeft = (obstacle.x / 100) * gameContainerWidth;
				const obstacleRight = obstacleLeft + OBSTACLE_WIDTH;
				const obstacleTop = obstacle.y;
				const obstacleBottom = obstacle.y + OBSTACLE_HEIGHT;

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

    const collisionInterval = setInterval(checkCollision, CHECK_COLLISION_INTERVAL);
    return () => clearInterval(collisionInterval);
  }, [obstacles, planePosition.x, gameContainerWidth]);

  const resetGame = () => {
    setScore(0);
    setObstacles([]);
    setFallSpeed(INITIAL_FALL_SPEED);
    setPlanePosition({ x: initialPlaneXPosition, y: 0 });
    setGameOver(false);
  };

  const airplane = '/src/assets/images/fighter-jet.png';

  return (
    <div className='mx-auto my-5 position-relative'>
      <h3 className='text-end text-primary text-center pb-5'>
        {' '}
        Score: {score}{' '}
      </h3>
      <div className='bg-dark' style={gameContainerStyle}>
        {obstacles.map((obstacle, index) => (
          <img
            key={index}
            src={asteroidObstacles[obstacle.id % asteroidObstacles.length]}
            alt='Obstacle'
            style={{
              ...obstacleStyle,
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
            src={airplane}
            alt='Airplane'
            style={{
              ...planeStyle,
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
