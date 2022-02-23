import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {
  deleteDndPrevPotentialShip, dndDropCoordinates,
  setDeathSquares, setDndPotentialShip,
  setDndPrevSquare, setDndStatus,
  setShipSquares, setStartShipDataCoordinates
} from "../../../../redux/battleFieldReducer";
import {useDeathZone} from "../../../../hooks/useDeathZone";
import {useEffect, useRef} from "react";
import {getFirstShipsField, getFirstDeathField, getFirstNotEmptySquares, getDndData
} from "../../../../selectors/selectors";
import {createPotentialShip} from "../../../../helpers/DndHelpers/createPotentialShip";
import {setShipAboveTheField} from "../../../../helpers/DndHelpers/setShipAboveTheField";
import {setPossibleToPlacement} from "../../../../helpers/DndHelpers/setPossibleToPlacement";

const Square = (props) => {
  const {id} = {...props},
      ref = useRef(id),
      dispatch = useDispatch(),
      createDeathZone = useDeathZone(true)

  const shipField = useSelector(getFirstShipsField),
      deathField = useSelector(getFirstDeathField),
      notEmptySquares = useSelector(getFirstNotEmptySquares),
      dndData = useSelector(getDndData, shallowEqual),
      ships = useSelector(state => state.battleField.ships)

  let shipClass, deathClass, successShipClass, unsuccessfulShipClass

  if (shipField.length > 0) {
    // shipClass = shipField.find(ship => ship.includes(id)) ? "square--ship" : ''
    shipClass = null
    deathClass = deathField.find(deathZone => deathZone.includes(id)) ? "square--death" : ''
  }
  if (dndData.successShip) successShipClass = dndData.successShip.includes(id) ? "square--dndSuccess" : '';
  if (dndData.unsuccessfulShip) unsuccessfulShipClass = dndData.unsuccessfulShip.includes(id) ? "square--dndUnsuccessful" : '';

  useEffect(() => {
    // Если номер квадррата соответсвует первой клетке корабля , то диспатчим координаты квадата для последующего размещения кораблей
    for (let i = 0; i < 10; i++) {
      if (ships[i].shipSquares && ships[i].shipSquares[0] === +ref.current.id) {
        let x = ref.current.getBoundingClientRect().left;
        let y = ref.current.getBoundingClientRect().top;
        // если координаты не изменились - выходим из цикла
        if (ships[i].x === x && ships[i].y === y) return
        dispatch(setStartShipDataCoordinates(x, y, ships[i].id))
        return;
      }
    }
  }, [ships])

  function dragOverHandler(options) {
    const {
      e, currentPart, shipSize, prevSquare,
      successShip: prevSuccessShip,
      unsuccessfulShip: prevUnsuccessfulShip,
      direction
    } = {...options}
    e.preventDefault();
    let currentSquare = +e.target.id
    // если корабль остается на месте - не делаем никаких действий
    if (currentSquare !== prevSquare) {
      // Проверяем находится ли весь корабль над инровым полем
      let isShipAboveTheField = setShipAboveTheField({currentPart, shipSize, currentSquare, direction})

      if (isShipAboveTheField) {
        // создаем потенциальный для дропа корабль и узнаем можно ли его дропнуть , в зависмости от этого - подсвечиваем поле соответствующим цветом
        let potentialShip = createPotentialShip({currentPart, shipSize, currentSquare, direction})
        let isPossibleToPlacement = setPossibleToPlacement({potentialShip, notEmptySquares})
        dispatch(setDndPrevSquare(currentSquare))
        dispatch(setDndPotentialShip(potentialShip, isPossibleToPlacement))
      } else if (prevSuccessShip || prevUnsuccessfulShip) {
        dispatch(deleteDndPrevPotentialShip())
      }
    }
  }

  function dropHandler(e, successShip, direction) {
    if (successShip) {
      let x = e.target.getBoundingClientRect().left
      let y = e.target.getBoundingClientRect().top
      let shipDeathZone = createDeathZone(successShip, direction)
      dispatch(setShipSquares([successShip]))
      dispatch(setDeathSquares([shipDeathZone]))
      dispatch(dndDropCoordinates(x, y))
      dispatch(setDndStatus(successShip))

    }
  }

  function dragLeaveHandler() {
    dispatch(deleteDndPrevPotentialShip())
  }

  //console.log("RENDER Square")
  return (
      <span ref={ref} className={`square ${deathClass} ${shipClass} ${successShipClass} ${unsuccessfulShipClass}`}
            id={id}
            onDragLeave={dragLeaveHandler}
            onDragOver={(e) => dragOverHandler({e, ...dndData})}
            onDrop={(e) => dropHandler(e, dndData.successShip, dndData.direction)}>{id}</span>
  )
}

export default Square