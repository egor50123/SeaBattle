import {useBotClick} from "./useBotClick";
import {useGetDamagedShip} from "./useGetDamagedShip";
import {useDispatch, useSelector} from "react-redux";
import {
  getDamagedShipsSquares, getFirstShipsField,
  getInitEmptySquares, getIsAnimationActive,
  getSecondFieldNotEmptySquares
} from "../../selectors/selectors";
import {TIMEOUT_DELAY} from "../../constant/constant";
import {setIsBotMove} from "../../redux/battleReducer";

export const useBotStartClick = ({botShoot}) => {
  const dispatch = useDispatch()
  const firstFieldNotEmptySquares = useSelector(getSecondFieldNotEmptySquares)
  let emptySquaresInit = useSelector(getInitEmptySquares)
  const isAnimationOn = useSelector(getIsAnimationActive)

  let delay = isAnimationOn ? TIMEOUT_DELAY : 700

  const onBotClick = useBotClick({delay,botShoot}),
        findCurrentDamagedShip = useGetDamagedShip(),
        damageShipSquares = useSelector(getDamagedShipsSquares)



  const SHIPS = useSelector(getFirstShipsField)
  return () => {
    dispatch(setIsBotMove(true))
    let test = []
    for (let i = 0; i<SHIPS.length; i++) {
      test = test.concat(SHIPS[i])
    }
    let emptySquares = emptySquaresInit.filter(item => !firstFieldNotEmptySquares.includes(item))
    //let emptySquares = test.filter(item => !firstFieldNotEmptySquares.includes(item))
    let delay = isAnimationOn ? TIMEOUT_DELAY : 400
    let square = null
    let isRepeat = false
    // Если уже есть подбитый корабль - стреляем в его уже подбитую клетку
    if (damageShipSquares.length !== 0) {
      square = damageShipSquares[0]
      delay = 0
      isRepeat = true
    } // Если нет поврежденного корабля - выбираем клетку для стрельбы
    else {
      [square] = botShoot(emptySquares, null, findCurrentDamagedShip)
    }
    let options = {
      id: square,
      emptySquares: emptySquares,
      isRepeat: isRepeat
    }
      setTimeout(() => onBotClick(options),delay)
      return false

  }
}