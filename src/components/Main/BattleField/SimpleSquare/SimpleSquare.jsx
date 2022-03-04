import {useSelector} from "react-redux";
import {
  getCurrentPlayer, getFirstFieldDamagedSquares, getFirstFieldMissedSquares,
  getFirstFieldNotEmptySquares, getFirstShipsField, getIsGameOver,
  getSecondFieldDamagedSquares, getSecondFieldMissedSquares, getSecondShipsField
} from "../../../../selectors/selectors";

import {useEffect, useRef, useState} from "react";
import {useRocketAnimation} from "../../../../hooks/useRocketAnimation";
import {usePlayerClick} from "../../../../hooks/usePlayerClick";
import {useBotStartClick} from "../../../../hooks/useBotStartClick";

const SimpleSquare = (props) => {
  const TIMEOUT_DELAY = 100
  const {id, fieldId} = {...props}
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
      currentPlayer = useSelector(getCurrentPlayer),
      isGameOver = useSelector(getIsGameOver)


  const onPlayerClick = usePlayerClick({secondShipField}),
      onBotStartClick = useBotStartClick({TIMEOUT_DELAY, botShoot})

  const rocketAnimation = useRocketAnimation()
  let [flag, setFlag] = useState(false)

  // Если клетка принадлежит полю/игроку 2 - присваиваем  ей классы  в соответствии с информацией  из обЪекта
  // игрока 1 о вражеских клетках
  if (fieldId === 1) {
    shipClass = firstShipField.find(ship => ship.includes(id)) ? "square--ship" : ''
    missedClass = secondFieldMissedSquares.includes(id) ? "square--missed" : ''
    damagedClass = secondFieldDamagedSquares.includes(id) ? "square--damaged" : ''
  } else {
    shipClass = secondShipField.find(ship => ship.includes(id)) ? "square--ship" : ''
    //shipClass = ''
    missedClass = firstFieldMissedSquares.includes(id) ? "square--missed" : ''
    damagedClass = firstFieldDamagedSquares.includes(id) ? "square--damaged" : ''
  }

  function onClickHandler(e) {
    let target = e.target
    let targetSquare = +target.id
    // Если текующий игрок кликнул на свое поле - выходим (игрок 1 - true, игрок 2 - false)
    if (isGameOver || (fieldId === 1) || (!currentPlayer && fieldId === 2) || secondFieldNotEmptySquares.includes(targetSquare)) return

    let top = target.getBoundingClientRect().top,
        left = target.getBoundingClientRect().left
    //rocketAnimation({top,left})
    let result = onPlayerClick({targetSquare, currentPlayer})
    if (result === true) setFlag(true)
  }


  useEffect(() => {
    //если наступает ход бота
    if (flag) {
      let result = onBotStartClick()
      if (result === false) setFlag(false)
    }

  }, [flag])

  return (
      <span className={`square ${shipClass} ${missedClass} ${damagedClass}`} id={id} ref={ref} onClick={onClickHandler}>
        {id}
      </span>
  )
}

export default SimpleSquare