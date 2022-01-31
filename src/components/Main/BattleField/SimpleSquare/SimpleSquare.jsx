import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {
  getCurrentPlayer,
  getFirstFieldDamagedSquares,
  getFirstFieldMissedSquares, getFirstFieldNotEmptySquares,
  getFirstShipsField, getInitEmptySquares,
  getSecondFieldDamagedSquares,
  getSecondFieldMissedSquares, getSecondFieldNotEmptySquares,
  getSecondShipsField
} from "../../../../selectors/selectors";
import {changePlayer, setHit, setMiss} from "../../../../redux/battleFieldReducer";
import {useEffect, useRef, useState} from "react";
import {useRandomSquare} from "../../../../hooks/useRandomSquare";

const SimpleSquare = (props) => {
  const {id, fieldId} = {...props}
  const dispatch = useDispatch()
  const getRandom = useRandomSquare()
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

  let [flag, setFlag] = useState(false)
  let [endGame, setEndgame] = useState(false)


  // Если клетка принадлежит полю/игроку 2 - присваиваем  ей классы  в соответствии с информацией  из обЪекта
  // игрока 1 о вражеских клетках
  if (fieldId === 2) {
    shipClass = firstShipField.find(ship => ship.includes(id)) ? "square--ship" : ''
    missedClass = firstFieldMissedSquares.includes(id) ? "square--missed" : ''
    damagedClass = firstFieldDamagedSquares.includes(id) ? "square--damaged" : ''
  } else {
    shipClass = secondShipField.find(ship => ship.includes(id)) ? "square--ship" : ''
    missedClass = secondFieldMissedSquares.includes(id) ? "square--missed" : ''
    damagedClass = secondFieldDamagedSquares.includes(id) ? "square--damaged" : ''
  }
  function onClickHandler(e,) {
    // Если текующий игрок кликнул на свое поле - выходим (игрок 1 - true, игрок 2 - false)
    if ((fieldId === 1) || (!currentPlayer && fieldId === 2)) return

    if (!!shipClass) {
      dispatch(setHit(id,fieldId))
    } else {
      dispatch(setMiss(id,fieldId))
      dispatch(changePlayer())

      if(currentPlayer) {
        setFlag(true)
      }
    }
  }

    function onBotClick(id,emptySquares,damagedSquares=0) {
    let isHit = !!secondShipField.find(ship => ship.includes(id))
    let total = damagedSquares

    if (isHit) {
      dispatch(setHit(id,1))
      total++
      let newEmptySquares = emptySquares.filter(item => item !==id)
      setTimeout(() => {
        if (emptySquares === 0) {
          alert("game over")
          return
        }
        onBotClick(getRandom(newEmptySquares), newEmptySquares, total)
      },300)
    } else {
      dispatch(setMiss(id,1))
      dispatch(changePlayer())
    }
  }


  useEffect( () => {
    if (flag) {
      console.clear()
      console.log(secondFieldDamagedSquares)
      if (secondFieldDamagedSquares.length === 20) {
        alert("end")
      }
      let emptySquares = emptySquaresInit.filter( item => !firstFieldNotEmptySquares.includes(item))
      setTimeout ( () => {
        onBotClick(getRandom(emptySquares),emptySquares)
        setFlag(false)
      },10)
    }
  },[flag])


  return (
      <span className={`square ${shipClass} ${missedClass} ${damagedClass}`} id={id} ref={ref} onClick={onClickHandler}>
        {id}
      </span>
  )
}

export default SimpleSquare