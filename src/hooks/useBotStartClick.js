import {useBotClick} from "./useBotClick";
import {useGetDamagedShip} from "./useGetDamagedShip";
import {useSelector} from "react-redux";
import {
  getDamagedShipsSquares,
  getInitEmptySquares,
  getSecondFieldNotEmptySquares
} from "../selectors/selectors";

export const useBotStartClick = ({botShoot,TIMEOUT_DELAY}) => {
  const firstFieldNotEmptySquares = useSelector(getSecondFieldNotEmptySquares)
  let emptySquaresInit = useSelector(getInitEmptySquares)



  const onBotClick = useBotClick({TIMEOUT_DELAY,botShoot}),
        findCurrentDamagedShip = useGetDamagedShip(),
        damageShipSquares = useSelector(getDamagedShipsSquares)



  return () => {
    let emptySquares = emptySquaresInit.filter(item => !firstFieldNotEmptySquares.includes(item))

    let square = null
    // Если уже есть подбитый корабль - стреляем в его уже подбитую клетку
    if (damageShipSquares.length !== 0) {
      square = damageShipSquares[0]
    } // Если нет поврежденного корабля - выбираем клетку для стрельбы
    else {
      [square] = botShoot(emptySquares, null, findCurrentDamagedShip)
    }
    let options = {
      id: square,
      emptySquares: emptySquares,
    }
    setTimeout(() => {
      onBotClick(options)
      return false
    }, TIMEOUT_DELAY)
  }
}