import {useDispatch, useSelector} from "react-redux";
import {
  getCurrentPlayer,
  getDamagedShipsSquares,
  getFirstFieldDamagedSquares,
  getFirstFieldMissedSquares,
  getFirstFieldNotEmptySquares,
  getFirstShipsField,
  getInitEmptySquares, getIsGameOver,
  getSecondFieldDamagedSquares,
  getSecondFieldMissedSquares,
  getSecondFieldNotEmptySquares,
  getSecondShipsField
} from "../../../../selectors/selectors";
import {changePlayer, setDamagedShipsPlayer, setHit, setMiss} from "../../../../redux/battleFieldReducer";
import {useEffect, useRef, useState} from "react";
import {useBotClick} from "../../../../hooks/useBotClick";

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
        isGameOver = useSelector(getIsGameOver)


  let emptySquaresInit = useSelector(getInitEmptySquares)

  const onBotClick = useBotClick({TIMEOUT_DELAY,secondFieldDamagedSquares,firstShipField,botShoot,findCurrentDamagedShip})

  let [flag, setFlag] = useState(false)

  // Если клетка принадлежит полю/игроку 2 - присваиваем  ей классы  в соответствии с информацией  из обЪекта
  // игрока 1 о вражеских клетках
  if (fieldId === 1) {
    shipClass = firstShipField.find(ship => ship.includes(id)) ? "square--ship" : ''
    missedClass = secondFieldMissedSquares.includes(id) ? "square--missed" : ''
    damagedClass = secondFieldDamagedSquares.includes(id) ? "square--damaged" : ''
  } else {
    shipClass = secondShipField.find(ship => ship.includes(id)) ? "square--ship" : ''
    missedClass = firstFieldMissedSquares.includes(id) ? "square--missed" : ''
    damagedClass = firstFieldDamagedSquares.includes(id) ? "square--damaged" : ''
  }

  function onClickHandler(e) {
    let targetSquare = +e.target.id
    // Если текующий игрок кликнул на свое поле - выходим (игрок 1 - true, игрок 2 - false)
    if (isGameOver || (fieldId === 1) || (!currentPlayer && fieldId === 2) || secondFieldNotEmptySquares.includes(targetSquare)) return

    if (!!shipClass) {
      dispatch(setHit(targetSquare, 2))
      dispatch(setDamagedShipsPlayer(id))
    } else {
      dispatch(setMiss([targetSquare], 2))
      dispatch(changePlayer())

      if (currentPlayer) {
        setFlag(true)
      }
    }
  }

  // function onBotClick({id, emptySquares, isDestroyed = false, destroyedShip = [], isGameOver = false}) {
  //   let isHit = !!firstShipField.find(ship => ship.includes(id))
  //   let isShipDestroyed = isDestroyed
  //   let newEmptySquares = emptySquares.filter(item => item !== id)
  //   if (isHit && !isShipDestroyed && !isGameOver) {
  //     let square = null,
  //         isDestroyed = false,
  //         destroyedShip = [],
  //         isGameOver = false
  //     if (!secondFieldDamagedSquares.includes(id)) dispatch(setHit(id, 1))
  //
  //     setTimeout(() => {
  //       [square, isDestroyed, destroyedShip, isGameOver] = botShoot(newEmptySquares, id, findCurrentDamagedShip)
  //       let options = {
  //         id: square,
  //         emptySquares: newEmptySquares,
  //         isDestroyed: isDestroyed,
  //         destroyedShip: destroyedShip,
  //         isGameOver: isGameOver
  //       }
  //       onBotClick(options)
  //     }, TIMEOUT_DELAY)
  //
  //   } else if (isShipDestroyed && !isGameOver) {
  //     let deathZone = createDeathZone(destroyedShip)
  //     if (destroyedShip.length > 1) dispatch(setHit(id, 1))
  //     dispatch(setMiss(deathZone, 1))
  //     newEmptySquares = emptySquares.filter(item => !deathZone.includes(item))
  //     setTimeout(() => {
  //       let [square] = botShoot(newEmptySquares, null, findCurrentDamagedShip)
  //       let options = {
  //         id: square,
  //         emptySquares: newEmptySquares,
  //       }
  //       onBotClick(options)
  //     }, TIMEOUT_DELAY)
  //
  //   } else if (isGameOver) {
  //     alert("GameOver")
  //   } else {
  //     dispatch(setMiss([id], 1))
  //     dispatch(changePlayer())
  //   }
  // }

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

  //console.log("!", fieldId)
  return (
      <span className={`square ${shipClass} ${missedClass} ${damagedClass}`} id={id} ref={ref} onClick={onClickHandler}>
        {id}
      </span>
  )
}

export default SimpleSquare