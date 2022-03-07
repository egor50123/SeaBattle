import {changePlayer, setDestroyedShip, setGameOver, setHit, setMiss} from "../redux/battleFieldReducer";
import {useDispatch, useSelector} from "react-redux";
import {useDeathZone} from "./useDeathZone";
import {getFirstShipsField, getSecondFieldDamagedSquares} from "../selectors/selectors";
import {useGetDamagedShip} from "./useGetDamagedShip";
import {setIsBotMove} from "../redux/battleReducer";
import {useRef} from "react";
import {useRocketAnimation} from "./useRocketAnimation";

export const useBotClick = ({TIMEOUT_DELAY, botShoot}) => {
  const dispatch = useDispatch()
  const createDeathZone = useDeathZone()
  const findCurrentDamagedShip = useGetDamagedShip(2)
  const rocketAnimation = useRocketAnimation()
  const firstShipField = useSelector(getFirstShipsField),
      secondFieldDamagedSquares = useSelector(getSecondFieldDamagedSquares)

  let totalDestroyedShips = 0
  let isGameOver = false

  let ref = useRef(0)

  const SHIPS = useSelector(getFirstShipsField)

  function onBotClick({id, emptySquares, isDestroyed = false, destroyedShip = [],isRepeat=false}) {
    console.log('ref',ref.current)
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

    if (!isHitSingleShip && isHit && !isShipDestroyed && !isGameOver) {
      let square = null,
          isDestroyed = false,
          destroyedShip = []

      setTimeout(() => {
        if (!secondFieldDamagedSquares.includes(id)) dispatch(setHit(id, 1))
        newEmptySquares = newEmptySquares.filter(item => item !== id);

        [square, isDestroyed, destroyedShip] = botShoot(newEmptySquares, id, findCurrentDamagedShip)
        if (isDestroyed) ++totalDestroyedShips
        if (isDestroyed) ref.current++
        let options = {
          id: square,
          emptySquares: newEmptySquares,
          isDestroyed: isDestroyed,
          destroyedShip: destroyedShip,
        }
        onBotClick(options)
      }, TIMEOUT_DELAY)

    } else if ((isShipDestroyed || isHitSingleShip) && !isGameOver) {
      if (currentShip.length === 1) {
        destroyedShip = [id]
        ++totalDestroyedShips
        ref.current++
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

