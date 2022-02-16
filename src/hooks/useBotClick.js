import {changePlayer, clearShipsData, setGameOver, setHit, setMiss} from "../redux/battleFieldReducer";
import {useDispatch} from "react-redux";
import {useDeathZone} from "./useDeathZone";

export const useBotClick = ({TIMEOUT_DELAY, secondFieldDamagedSquares, firstShipField,botShoot,findCurrentDamagedShip}) => {
  const dispatch = useDispatch()
  const createDeathZone = useDeathZone()

  const onBotClick = ({id, emptySquares, isDestroyed = false, destroyedShip = [], isGameOver = false}) =>  {
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
      newEmptySquares = emptySquares.filter(item => !deathZone.includes(item))
      setTimeout(() => {
        let [square] = botShoot(newEmptySquares, null, findCurrentDamagedShip)
        let options = {
          id: square,
          emptySquares: newEmptySquares,
        }
        onBotClick(options)
      }, TIMEOUT_DELAY)

    } else if (isGameOver) {
      dispatch(setGameOver())
      //alert("GameOver")
    } else {
      dispatch(setMiss([id], 1))
      dispatch(changePlayer())
    }
  }

  return onBotClick
}

