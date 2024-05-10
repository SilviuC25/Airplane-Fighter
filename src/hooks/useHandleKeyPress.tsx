import { useEffect } from 'react';
import * as Constants from '../constants/gameConstants';

const useHandleKeyPress = (gameOver: boolean, gameContainerWidth: number, setPlanePosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameOver) return;

      const POSITION_MODIFIER = 10;

      if (event.key === 'ArrowLeft') {
        setPlanePosition((prevPosition) => ({
          ...prevPosition,
          x: Math.max(prevPosition.x - POSITION_MODIFIER, 0)
        }));
      } else if (event.key === 'ArrowRight') {
        setPlanePosition((prevPosition) => ({
          ...prevPosition,
          x: Math.min(prevPosition.x + POSITION_MODIFIER, gameContainerWidth - Constants.PLANE_WIDTH)
        }));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameOver, gameContainerWidth, setPlanePosition]);
};

export default useHandleKeyPress;
