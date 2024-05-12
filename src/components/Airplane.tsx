import * as Constants from '../constants/gameConstants';
import * as Styles from '../styles/gameContainerStyles';

const gameContainerWidth = Constants.GAME_WIDTH_PERCENTAGE * window.innerWidth;
export const initialPlaneXPosition = (gameContainerWidth - Constants.PLANE_WIDTH) / 2;

function Airplane({ gameOver, planePositionX }: { gameOver: boolean, planePositionX: number }) {
  return (
    <>
      {!gameOver && (
        <img
          src={Constants.airplane}
          alt='Airplane'
          style={{
            ...Styles.planeStyle,
            left: `${planePositionX}px`
          }}
          className='position-absolute translate-middle'
        />
      )}
    </>
  );
}

export default Airplane;