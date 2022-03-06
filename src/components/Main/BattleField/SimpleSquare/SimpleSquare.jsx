import {useSelector} from "react-redux";
import {
  getCurrentPlayer,
  getDestroyedSquaresFirst,
  getDestroyedSquaresSecond,
  getFirstFieldDamagedSquares,
  getFirstFieldMissedSquares,
  getFirstFieldNotEmptySquares,
  getFirstShipsField,
  getIsGameOver,
  getSecondFieldDamagedSquares,
  getSecondFieldMissedSquares,
  getSecondShipsField
} from "../../../../selectors/selectors";

import {useEffect, useRef, useState} from "react";
import {useRocketAnimation} from "../../../../hooks/useRocketAnimation";
import {usePlayerClick} from "../../../../hooks/usePlayerClick";
import {useBotStartClick} from "../../../../hooks/useBotStartClick";

const SimpleSquare = (props) => {
  const {id, fieldId} = {...props}
  const botShoot = props.botShoot
  const ref = useRef(null)
  let shipClass, missedClass, damagedClass,destroyedClass
  const firstShipField = useSelector(getFirstShipsField),
      secondShipField = useSelector(getSecondShipsField),
      firstFieldMissedSquares = useSelector(getFirstFieldMissedSquares),
      secondFieldMissedSquares = useSelector(getSecondFieldMissedSquares),
      firstFieldDamagedSquares = useSelector(getFirstFieldDamagedSquares),
      secondFieldDamagedSquares = useSelector(getSecondFieldDamagedSquares),
      secondFieldNotEmptySquares = useSelector(getFirstFieldNotEmptySquares),
      firstDestroyedSquares = useSelector(getDestroyedSquaresSecond),
      secondDestroyedSquares = useSelector(getDestroyedSquaresFirst),
      currentPlayer = useSelector(getCurrentPlayer),
      isGameOver = useSelector(getIsGameOver)


  const onPlayerClick = usePlayerClick({secondShipField}),
      onBotStartClick = useBotStartClick({botShoot})

  const rocketAnimation = useRocketAnimation()
  let [flag, setFlag] = useState(false)

  // Если клетка принадлежит полю/игроку 2 - присваиваем  ей классы  в соответствии с информацией  из обЪекта
  // игрока 1 о вражеских клетках
  if (fieldId === 1) {
    shipClass = firstShipField.find(ship => ship.includes(id)) ? "square--ship" : ''
    missedClass = secondFieldMissedSquares.includes(id) ? "square--missed" : ''
    damagedClass = secondFieldDamagedSquares.includes(id) ? "square--damaged" : ''
    destroyedClass = firstDestroyedSquares.includes(id) ? "square--destroyed" : ''
  } else {
    shipClass = secondShipField.find(ship => ship.includes(id)) ? "square--ship" : ''
    //shipClass = ''
    destroyedClass = secondDestroyedSquares.includes(id) ? "square--destroyed" : ''
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
    // const fieldId = 1
    rocketAnimation({id:targetSquare,fieldId:1})
    setTimeout (()=> {
      let result = onPlayerClick({targetSquare, currentPlayer})
      if (result === true) setFlag(true)
    },1000)
    // rocketAnimation({top,left,fieldId})
    // let result = onPlayerClick({targetSquare, currentPlayer})
    // if (result === true) setFlag(true)
  }


  useEffect(() => {
    //если наступает ход бота
    if (flag) {
      let result = onBotStartClick()
      if (result === false) setFlag(false)
    }

  }, [flag])

  return (
      <span className={`square ${shipClass} ${missedClass} ${damagedClass} ${destroyedClass}`} id={id} ref={ref} onClick={onClickHandler}>
        {id}
      </span>
  )
}

export default SimpleSquare