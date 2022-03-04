import {changePlayer, setGameOver, setHit, setMiss} from "../redux/battleFieldReducer";
import {useDispatch, useSelector} from "react-redux";
import {useDeathZone} from "./useDeathZone";
import {getFirstShipsField, getSecondFieldDamagedSquares} from "../selectors/selectors";
import {useGetDamagedShip} from "./useGetDamagedShip";

export const useBotClick = ({TIMEOUT_DELAY, botShoot}) => {
  const dispatch = useDispatch()
  const createDeathZone = useDeathZone()
  const findCurrentDamagedShip = useGetDamagedShip(2)
  const firstShipField = useSelector(getFirstShipsField),
      secondFieldDamagedSquares = useSelector(getSecondFieldDamagedSquares)

  function onBotClick({id, emptySquares, isDestroyed = false, destroyedShip = [], isGameOver = false}) {
    let isHit = !!firstShipField.find(ship => ship.includes(id))
    let isShipDestroyed = isDestroyed
    let newEmptySquares = emptySquares.filter(item => item !== id)
    if (isHit && !isShipDestroyed && !isGameOver) {
      let square = null,
          isDestroyed = false,
          destroyedShip = [],
          isGameOver = false
      if (!secondFieldDamagedSquares.includes(id)) dispatch(setHit(id, 1))

      setTimeout(() => {
        newEmptySquares = newEmptySquares.filter(item => item !== id);

        [square, isDestroyed, destroyedShip, isGameOver] = botShoot(newEmptySquares, id, findCurrentDamagedShip)
        let options = {
          id: square,
          emptySquares: newEmptySquares,
          isDestroyed: isDestroyed,
          destroyedShip: destroyedShip,
          isGameOver: isGameOver
        }
        onBotClick(options)
      }, TIMEOUT_DELAY)

    } else if (isShipDestroyed && !isGameOver) {
      let deathZone = createDeathZone(destroyedShip)
      if (destroyedShip.length > 1) dispatch(setHit(id, 1))
      dispatch(setMiss(deathZone, 1))
      setTimeout(() => {
        newEmptySquares = newEmptySquares.filter(item => !deathZone.includes(item))
        let [square] = botShoot(newEmptySquares, null, findCurrentDamagedShip)
        let options = {
          id: square,
          emptySquares: newEmptySquares,
        }
        onBotClick(options)
      }, TIMEOUT_DELAY)

    } else if (isGameOver) {
      dispatch(setGameOver())
    } else {
      dispatch(setMiss([id], 1))
      dispatch(changePlayer())
    }
  }

  return onBotClick
}

