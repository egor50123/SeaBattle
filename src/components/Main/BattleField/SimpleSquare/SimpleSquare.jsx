import {useDispatch, useSelector} from "react-redux";
import {
  getCurrentPlayer,
  getDestroyedSquaresFirst,
  getDestroyedSquaresSecond,
  getFirstFieldDamagedSquares,
  getFirstFieldMissedSquares,
  getFirstFieldNotEmptySquares,
  getFirstShipsField, getIsAnimationActive, getIsAnimationOn, getIsFieldDisable,
  getIsGameOver,
  getSecondFieldDamagedSquares,
  getSecondFieldMissedSquares,
  getSecondShipsField, isFieldDisable
} from "../../../../selectors/selectors";

import {useEffect, useRef, useState} from "react";
import {useRocketAnimation} from "../../../../hooks/useRocketAnimation";
import {usePlayerClick} from "../../../../hooks/usePlayerClick";
import {useBotStartClick} from "../../../../hooks/useBotStartClick";
import {disableField} from "../../../../redux/battleReducer";
import {TIMEOUT_DELAY} from "../../../../constant/constant";

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
      isGameOver = useSelector(getIsGameOver),
      isFieldDisable = useSelector(getIsFieldDisable),
      isAnimationOn = useSelector(getIsAnimationActive)


  const onPlayerClick = usePlayerClick({secondShipField}),
      onBotStartClick = useBotStartClick({botShoot})

  const dispatch = useDispatch()
  const rocketAnimation = useRocketAnimation()
  let [flag, setFlag] = useState(false)

  // Если клетка принадлежит полю/игроку 2 - присваиваем  ей классы  в соответствии с информацией  из обЪекта
  // игрока 1 о вражеских клетках
  if (fieldId === 1) {
    missedClass = secondFieldMissedSquares.includes(id) ? "square--missed" : ''
    damagedClass = secondFieldDamagedSquares.includes(id) ? "square--damaged" : ''
    destroyedClass = firstDestroyedSquares.includes(id) ? "square--destroyed" : ''
  } else {
    //shipClass = secondShipField.find(ship => ship.includes(id)) ? "square--ship" : ''
    shipClass = ''
    destroyedClass = secondDestroyedSquares.includes(id) ? "square--destroyed" : ''
    missedClass = firstFieldMissedSquares.includes(id) ? "square--missed" : ''
    damagedClass = firstFieldDamagedSquares.includes(id) ? "square--damaged" : ''
  }

  function onClickHandler(e) {
    let targetSquare = +e.target.id
    let delay = TIMEOUT_DELAY
    // Если текующий игрок кликнул на свое поле - выходим (игрок 1 - true, игрок 2 - false)
    if (isGameOver || (fieldId === 1) || (!currentPlayer && fieldId === 2) || secondFieldNotEmptySquares.includes(targetSquare)) return
    // отключаем поле на время анимации
    if (isFieldDisable) {return} else {dispatch(disableField(true))}

    isAnimationOn && rocketAnimation({id:targetSquare,fieldId:1})
    if (!isAnimationOn) delay = 0
    setTimeout (()=> {
      dispatch(disableField(false))
      let result = onPlayerClick({targetSquare, currentPlayer})
      if (result === true) setFlag(true)
    },delay)

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