import {useBotClick} from "./useBotClick";
import {useGetDamagedShip} from "./useGetDamagedShip";
import {useDispatch, useSelector} from "react-redux";
import {
  getDamagedShipsSquares,
  getInitEmptySquares,
  getSecondFieldNotEmptySquares
} from "../selectors/selectors";
import {TIMEOUT_DELAY} from "../constant/constant";
import {setBotMove} from "../redux/battleReducer";
import {useBotShooting} from "./useBotShooting";

export const useBotStartClick = ({botShoot}) => {
  const dispatch = useDispatch()
  const firstFieldNotEmptySquares = useSelector(getSecondFieldNotEmptySquares)
  let emptySquaresInit = useSelector(getInitEmptySquares)
  // const botShoot = useBotShooting()


  const onBotClick = useBotClick({TIMEOUT_DELAY,botShoot}),
        findCurrentDamagedShip = useGetDamagedShip(),
        damageShipSquares = useSelector(getDamagedShipsSquares)



  return () => {
    setBotMove(dispatch,true)
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
      onBotClick(options)
      return false
    // setTimeout(() => {
    //   onBotClick(options)
    //   return false
    // }, TIMEOUT_DELAY)
  }
}