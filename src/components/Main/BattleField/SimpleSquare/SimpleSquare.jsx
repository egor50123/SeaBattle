import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {
  getCurrentPlayer, getDamagedShipsSquares,
  getFirstFieldDamagedSquares,
  getFirstFieldMissedSquares, getFirstFieldNotEmptySquares,
  getFirstShipsField, getInitEmptySquares,
  getSecondFieldDamagedSquares,
  getSecondFieldMissedSquares, getSecondFieldNotEmptySquares,
  getSecondShipsField
} from "../../../../selectors/selectors";
import {changePlayer, setDamageShip, setDeathSquares, setHit, setMiss} from "../../../../redux/battleFieldReducer";
import {useEffect, useRef, useState} from "react";
import {useRandomSquare} from "../../../../hooks/useRandomSquare";
import {useBotShooting} from "../../../../hooks/useBotShooting";
import {useDeathZone} from "../../../../hooks/useDeathZone";

const SimpleSquare = (props) => {
  const TIMEOUT_DELAY = 200
  const {id, fieldId} = {...props}
  const dispatch = useDispatch()
  const botShoot = fieldId === 2 ? props.botShoot : null
  const currentDamagedShipFunc = props.currentDamagedShip
  const ref = useRef(null)
  let shipClass,missedClass,damagedClass
  // !!!!!!!!!!!!!НАЗВАНИЯ НОРМ СДЕЛАТЬ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const firstShipField = useSelector(getFirstShipsField)
  const secondShipField = useSelector(getSecondShipsField)
  const firstFieldMissedSquares = useSelector(getFirstFieldMissedSquares)
  const secondFieldMissedSquares = useSelector(getSecondFieldMissedSquares)
  const firstFieldDamagedSquares = useSelector(getFirstFieldDamagedSquares)
  const secondFieldDamagedSquares = useSelector(getSecondFieldDamagedSquares)
  const secondFieldNotEmptySquares = useSelector(getFirstFieldNotEmptySquares)
  const firstFieldNotEmptySquares = useSelector(getSecondFieldNotEmptySquares)
  const currentPlayer = useSelector(getCurrentPlayer)
  let emptySquaresInit = useSelector(getInitEmptySquares,shallowEqual)

  const createDeathZone = useDeathZone()

  const damageShipSquares = useSelector(getDamagedShipsSquares)

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
    // Если текующий игрок кликнул на свое поле - выходим (игрок 1 - true, игрок 2 - false)
    if ((fieldId === 1) || (!currentPlayer && fieldId === 2)) return

    if (!!shipClass) {
      dispatch(setHit(id,2))
    } else {
      dispatch(setMiss([id],2))
      dispatch(changePlayer())

      if(currentPlayer) {
        setFlag(true)
      }
    }
  }

    function onBotClick({id, emptySquares, isDestroyed = false,destroyedShip=[], isGameOver = false}) {
    let isHit = !!firstShipField.find(ship => ship.includes(id))
    let isShipDestroyed = isDestroyed
    let newEmptySquares = emptySquares.filter(item => item !==id)
    if (isHit && !isShipDestroyed && !isGameOver) {
      let square = null,
          isDestroyed = false,
          destroyedShip = [],
          isGameOver = false
      if (!secondFieldDamagedSquares.includes(id)) dispatch(setHit(id,1))

      setTimeout(() => {
        [square,isDestroyed,destroyedShip,isGameOver] = botShoot(newEmptySquares,id,currentDamagedShipFunc)
        let options = {
          id:square,
          emptySquares:newEmptySquares,
          isDestroyed:isDestroyed,
          destroyedShip:destroyedShip,
          isGameOver:isGameOver
        }
        onBotClick(options)
      },TIMEOUT_DELAY)

    } else if (isShipDestroyed && !isGameOver) {
      let deathZone = createDeathZone(destroyedShip,1)
      if (destroyedShip.length > 1) dispatch(setHit(id,1))
      dispatch(setMiss(deathZone,1))
      setTimeout(() => {
        let [square] = botShoot(newEmptySquares,null,currentDamagedShipFunc)
        let options = {
          id:square,
          emptySquares:newEmptySquares,
        }
        onBotClick(options)
      },TIMEOUT_DELAY)

    } else if (isGameOver){
        alert("GameOver")
    } else {
      dispatch(setMiss([id],1))
      dispatch(changePlayer())
    }
  }


  useEffect( () => {
    if (flag) {
      let emptySquares = emptySquaresInit.filter( item => !firstFieldNotEmptySquares.includes(item))
      let square = null
      // Если уже есть подбитый корабль
      if ( damageShipSquares.length !== 0 ) {
        square = damageShipSquares[0]
      } // Если нет поврежденного корабля
      else {
        [square] = botShoot(emptySquares,null,currentDamagedShipFunc)
      }
      let options = {
        id:square,
        emptySquares:emptySquares,
      }
      setTimeout ( () => {
        onBotClick(options)
        setFlag(false)
      },TIMEOUT_DELAY)
    }
  },[flag])


  return (
      <span className={`square ${shipClass} ${missedClass} ${damagedClass}`} id={id} ref={ref} onClick={onClickHandler}>
        {id}
      </span>
  )
}

export default SimpleSquare