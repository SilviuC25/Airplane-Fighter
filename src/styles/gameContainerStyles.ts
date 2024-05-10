import * as Constants from '../constants/gameConstants';

export const gameContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: `${Constants.GAME_WIDTH_PERCENTAGE * 100}vw`,
  height: '100vh',
  overflow: 'hidden',
  margin: '0 auto',
};

export const obstacleStyle: React.CSSProperties = {
  position: 'absolute',
  width: `${Constants.OBSTACLE_WIDTH}px`,
  height: `${Constants.OBSTACLE_HEIGHT}px`,
};

export const planeStyle: React.CSSProperties = {
  width: `${Constants.PLANE_WIDTH}px`,
  height: `${Constants.PLANE_HEIGHT}px`,
};
