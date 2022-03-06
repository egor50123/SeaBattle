import {useBotClick} from "./useBotClick";
import {useGetDamagedShip} from "./useGetDamagedShip";
import {useDispatch, useSelector} from "react-redux";
import {
  getDamagedShipsSquares,
  getInitEmptySquares,
  getSecondFieldNotEmptySquares
} from "../selectors/selectors";
import {TIMEOUT_DELAY} from "../constant/constant";
import {setIsBotMove} from "../redux/battleReducer";

export const useBotStartClick = ({botShoot}) => {
  const dispatch = useDispatch()
  const firstFieldNotEmptySquares = useSelector(getSecondFieldNotEmptySquares)
  let emptySquaresInit = useSelector(getInitEmptySquares)


  const onBotClick = useBotClick({TIMEOUT_DELAY,botShoot}),
        findCurrentDamagedShip = useGetDamagedShip(),
        damageShipSquares = useSelector(getDamagedShipsSquares)



  return () => {
    dispatch(setIsBotMove(true))
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

  }
}