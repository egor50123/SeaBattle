import {changePlayer, setDestroyedShip, setGameOver, setHit, setMiss} from "../redux/battleFieldReducer";
import {useDispatch, useSelector} from "react-redux";
import {useDeathZone} from "./useDeathZone";
import {getFirstShipsField, getSecondFieldDamagedSquares} from "../selectors/selectors";
import {useGetDamagedShip} from "./useGetDamagedShip";
import {setBotMove} from "../redux/battleReducer";
import {useRef} from "react";
import {useRocketAnimation} from "./useRocketAnimation";

export const useBotClick = ({TIMEOUT_DELAY, botShoot}) => {
  const dispatch = useDispatch()
  const createDeathZone = useDeathZone()
  const findCurrentDamagedShip = useGetDamagedShip(2)
  const rocketAnimation = useRocketAnimation()
  const firstShipField = useSelector(getFirstShipsField),
      secondFieldDamagedSquares = useSelector(getSecondFieldDamagedSquares)

  let isPrevSquareHitRef = useRef(false)

  function onBotClick({id, emptySquares, isDestroyed = false, destroyedShip = [], isGameOver = false}) {
    rocketAnimation({id,fieldId:2})
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
        setBotMove(dispatch,true,0)
        isPrevSquareHitRef.current  = true
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
      let indexOfShip = firstShipField.indexOf(firstShipField.find(ship => ship.includes(destroyedShip[0])))
      if (destroyedShip.length > 1) dispatch(setHit(id, 1))
      dispatch(setMiss(deathZone, 1))
      dispatch(setDestroyedShip(destroyedShip,2,indexOfShip))
      setTimeout(() => {
        isPrevSquareHitRef.current  = true
        setBotMove(dispatch,true,0)
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
      let time = isPrevSquareHitRef.current ? TIMEOUT_DELAY/2 : TIMEOUT_DELAY
      setTimeout(() => {
        isPrevSquareHitRef.current  = false
        setBotMove(dispatch,false,0)
        dispatch(setMiss([id], 1))
        dispatch(changePlayer())
      },time)
    }
  }

  return onBotClick
}

