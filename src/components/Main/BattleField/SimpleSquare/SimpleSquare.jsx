import {useDispatch, useSelector} from "react-redux";
import {
  getCurrentPlayer, getFirstFieldNotEmptySquares, getIsAnimationActive,
  getIsFieldDisable, getIsGameOver, getSecondShipsField
} from "../../../../selectors/selectors";

import {useEffect, useRef, useState} from "react";
import {useRocketAnimation} from "../../../../hooks/Animation/useRocketAnimation";
import {usePlayerClick} from "../../../../hooks/Battle/usePlayerClick";
import {useBotStartClick} from "../../../../hooks/Battle/useBotStartClick";
import {disableField} from "../../../../redux/battleReducer";
import {TIMEOUT_DELAY} from "../../../../constant/constant";
import {useGetSquareCss} from "../../../../hooks/useGetSquareCss";

const SimpleSquare = ({id,fieldId,botShoot}) => {
  const ref = useRef(null),
        dispatch = useDispatch()
  let [flag, setFlag] = useState(false)

  const secondShipField = useSelector(getSecondShipsField),
        secondFieldNotEmptySquares = useSelector(getFirstFieldNotEmptySquares),
        currentPlayer = useSelector(getCurrentPlayer),
        isGameOver = useSelector(getIsGameOver),
        isFieldDisable = useSelector(getIsFieldDisable),
        isAnimationOn = useSelector(getIsAnimationActive)


  const onPlayerClick = usePlayerClick({secondShipField}),
        onBotStartClick = useBotStartClick({botShoot}),
        {getForStatic} = useGetSquareCss(),
        rocketAnimation = useRocketAnimation()

  let {missedClass,damagedClass,destroyedClass,shipClass} = getForStatic({fieldId,id})


  function onClickHandler(e) {
    let targetSquare = +e.target.id
    let delay = TIMEOUT_DELAY
    // Если текующий игрок кликнул на свое поле - выходим (игрок 1 - true, игрок 2 - false)
    if (isGameOver || (fieldId === 1) || (!currentPlayer && fieldId === 2) || secondFieldNotEmptySquares.includes(targetSquare)) return
    // отключаем поле на время анимации
    if (isFieldDisable) {return} else {dispatch(disableField(true))}
    // не проигрываем анимацию если она выключена
    isAnimationOn && rocketAnimation({id:targetSquare,fieldId:1})
    if (!isAnimationOn) delay = 0
    setTimeout (()=> {
      dispatch(disableField(false))
      let result = onPlayerClick({targetSquare, currentPlayer})
      if (result === true) setFlag(true)
    },delay)
  }


  useEffect(() => {
    //если наступает ход бота - запускаем его.
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