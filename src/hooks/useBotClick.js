import {
  changePlayer,
  setDestroyedShip,
  setGameOver,
  setHit,
  setMiss,
  setTotalDestroyedShipsBot
} from "../redux/battleFieldReducer";
import {useDispatch, useSelector} from "react-redux";
import {useDeathZone} from "./useDeathZone";
import {getFirstShipsField, getSecondFieldDamagedSquares, getTotalDestroyedShipsBot} from "../selectors/selectors";
import {useGetDamagedShip} from "./useGetDamagedShip";
import {setIsBotMove} from "../redux/battleReducer";
import {useRocketAnimation} from "./useRocketAnimation";

export const useBotClick = ({TIMEOUT_DELAY, botShoot}) => {
  let totalDestroyedShips = useSelector(getTotalDestroyedShipsBot)
  const dispatch = useDispatch()
  const createDeathZone = useDeathZone()
  const findCurrentDamagedShip = useGetDamagedShip(2)
  const rocketAnimation = useRocketAnimation()
  const firstShipField = useSelector(getFirstShipsField),
      secondFieldDamagedSquares = useSelector(getSecondFieldDamagedSquares)


  function onBotClick({id, emptySquares, isDestroyed = false, destroyedShip = [],isRepeat=false}) {

    if (totalDestroyedShips === 10) {
      dispatch(setGameOver())
      return
    }
    if (!isRepeat) rocketAnimation({id,fieldId:2})

    let currentShip  = firstShipField.find(ship => ship.includes(id)),
        isHit = !!currentShip

    let isShipDestroyed = isDestroyed,
        newEmptySquares = emptySquares.filter(item => item !== id)

    let isHitSingleShip = currentShip && currentShip.length === 1

    if (!isHitSingleShip && isHit && !isShipDestroyed) {
      let square = null,
          isDestroyed = false,
          destroyedShip = []

      setTimeout(() => {
        if (!secondFieldDamagedSquares.includes(id)) dispatch(setHit(id, 1))
        newEmptySquares = newEmptySquares.filter(item => item !== id);

        [square, isDestroyed, destroyedShip] = botShoot(newEmptySquares, id, findCurrentDamagedShip)
        if (isDestroyed) {
          dispatch(setTotalDestroyedShipsBot())
          ++totalDestroyedShips
        }

        let options = {
          id: square,
          emptySquares: newEmptySquares,
          isDestroyed: isDestroyed,
          destroyedShip: destroyedShip,
        }
        onBotClick(options)
      }, TIMEOUT_DELAY)

    } else if (isShipDestroyed || isHitSingleShip) {
      if (currentShip.length === 1) {
        destroyedShip = [id]
        ++totalDestroyedShips
        dispatch(setTotalDestroyedShipsBot())
      }
      setTimeout(() => {
        let deathZone = createDeathZone(destroyedShip)
        let indexOfShip = firstShipField.indexOf(firstShipField.find(ship => ship.includes(destroyedShip[0])))
        dispatch(setHit(id, 1))

        dispatch(setMiss(deathZone, 1))
        dispatch(setDestroyedShip(destroyedShip,2,indexOfShip))

        newEmptySquares = newEmptySquares.filter(item => !deathZone.includes(item))
        let [square] = botShoot(newEmptySquares, null, findCurrentDamagedShip)
        let options = {
          id: square,
          emptySquares: newEmptySquares,
        }
        onBotClick(options)
      }, TIMEOUT_DELAY)

    } else{
      setTimeout(() => {
        dispatch(setMiss([id], 1))
        dispatch(changePlayer())
        dispatch(setIsBotMove(false))
      },TIMEOUT_DELAY)
    }
  }

  return onBotClick
}

