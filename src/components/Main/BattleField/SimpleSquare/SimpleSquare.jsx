import {useDispatch, useSelector} from "react-redux";
import {
  getCurrentPlayer, getDamagedShipsForPlayer,
  getDamagedShipsSquares,
  getFirstFieldDamagedSquares,
  getFirstFieldMissedSquares,
  getFirstFieldNotEmptySquares,
  getFirstShipsField,
  getInitEmptySquares, getIsGameOver,
  getSecondFieldDamagedSquares,
  getSecondFieldMissedSquares,
  getSecondFieldNotEmptySquares,
  getSecondShipsField, getTotalDamagedShipsByPlayer
} from "../../../../selectors/selectors";
import {
  changePlayer,
  setDamagedShipsPlayer,
  setGameOver,
  setHit,
  setMiss, setTotalDestroyedShipsPlayer
} from "../../../../redux/battleFieldReducer";
import {useEffect, useRef, useState} from "react";
import {useBotClick} from "../../../../hooks/useBotClick";
import {useGetDamagedShip} from "../../../../hooks/useGetDamagedShip";
import {useDeathZone} from "../../../../hooks/useDeathZone";

const SimpleSquare = (props) => {
  const TIMEOUT_DELAY = 10
  const {id, fieldId} = {...props}
  const dispatch = useDispatch()
  const findCurrentDamagedShip = props.currentDamagedShip
  const botShoot = props.botShoot
  const ref = useRef(null)
  let shipClass, missedClass, damagedClass
  const firstShipField = useSelector(getFirstShipsField),
        secondShipField = useSelector(getSecondShipsField),
        firstFieldMissedSquares = useSelector(getFirstFieldMissedSquares),
        secondFieldMissedSquares = useSelector(getSecondFieldMissedSquares),
        firstFieldDamagedSquares = useSelector(getFirstFieldDamagedSquares),
        secondFieldDamagedSquares = useSelector(getSecondFieldDamagedSquares),
        secondFieldNotEmptySquares = useSelector(getFirstFieldNotEmptySquares),
        firstFieldNotEmptySquares = useSelector(getSecondFieldNotEmptySquares),
        currentPlayer = useSelector(getCurrentPlayer),
        damageShipSquares = useSelector(getDamagedShipsSquares),
        isGameOver = useSelector(getIsGameOver),
        damagedShips = useSelector(getDamagedShipsForPlayer)


  let totalDestroeydShipsByPlayer = useSelector(getTotalDamagedShipsByPlayer)
  let emptySquaresInit = useSelector(getInitEmptySquares)

  const onBotClick = useBotClick({TIMEOUT_DELAY,secondFieldDamagedSquares,firstShipField,botShoot,findCurrentDamagedShip})
  const getCurrentDamagedShip = (useGetDamagedShip(1))
  const createDeathZone = useDeathZone()
  let [flag, setFlag] = useState(false)

  // Если клетка принадлежит полю/игроку 2 - присваиваем  ей классы  в соответствии с информацией  из обЪекта
  // игрока 1 о вражеских клетках
  if (fieldId === 1) {
    shipClass = firstShipField.find(ship => ship.includes(id)) ? "square--ship" : ''
    missedClass = secondFieldMissedSquares.includes(id) ? "square--missed" : ''
    damagedClass = secondFieldDamagedSquares.includes(id) ? "square--damaged" : ''
  } else {
    //shipClass = secondShipField.find(ship => ship.includes(id)) ? "square--ship" : ''
    shipClass = ''
    missedClass = firstFieldMissedSquares.includes(id) ? "square--missed" : ''
    damagedClass = firstFieldDamagedSquares.includes(id) ? "square--damaged" : ''
  }

  function onClickHandler(e) {
    let targetSquare = +e.target.id
    // Если текующий игрок кликнул на свое поле - выходим (игрок 1 - true, игрок 2 - false)
    if (isGameOver || (fieldId === 1) || (!currentPlayer && fieldId === 2) || secondFieldNotEmptySquares.includes(targetSquare)) return

    //secondShipField.find(item => item.includes(targetSquare))
    let isHit = !!secondShipField.find(item => item.includes(targetSquare))
    if (isHit) {
      let damagedCurrentShip = getCurrentDamagedShip(targetSquare)
      let indexOfShip = secondShipField.indexOf(secondShipField.find(ship => ship.includes(targetSquare)))
      dispatch(setHit(targetSquare, 2))

      if (damagedCurrentShip.length === 1) {
        let deathZone = createDeathZone(damagedCurrentShip)
        dispatch(setMiss(deathZone,2))
        dispatch(setTotalDestroyedShipsPlayer())
        if(++totalDestroeydShipsByPlayer === 10) dispatch(setGameOver())
      } else {
        dispatch(setDamagedShipsPlayer(id))
        let damagedShip = damagedShips.find(obj => obj.id === indexOfShip)

        if (damagedShip && damagedCurrentShip.length === damagedShip.squares.length) {
          let deathZone = createDeathZone(damagedCurrentShip)
          dispatch(setMiss(deathZone,2))
          dispatch(setTotalDestroyedShipsPlayer())
          if(++totalDestroeydShipsByPlayer === 10) dispatch(setGameOver())
        }
      }



    } else {
      dispatch(setMiss([targetSquare], 2))
      dispatch(changePlayer())

      if (currentPlayer) {
        setFlag(true)
      }
    }
  }


  useEffect(() => {
    //если наступает ход бота
    if (flag) {
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
        setFlag(false)
      }, TIMEOUT_DELAY)
    }

  }, [flag])

  return (
      <span className={`square ${shipClass} ${missedClass} ${damagedClass}`} id={id} ref={ref} onClick={onClickHandler}>
        {id}
      </span>
  )
}

export default SimpleSquare