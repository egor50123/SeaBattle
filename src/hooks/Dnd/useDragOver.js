import {setShipAboveTheField} from "../../helpers/DndHelpers/setShipAboveTheField";
import {createPotentialShip} from "../../helpers/DndHelpers/createPotentialShip";
import {setPossibleToPlacement} from "../../helpers/DndHelpers/setPossibleToPlacement";
import {deleteDndPrevPotentialShip, setDndPotentialShip, setDndPrevSquare} from "../../redux/battleFieldReducer";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getDndData, getFirstNotEmptySquares} from "../../selectors/selectors";

export const useDragOver = () => {
  const dispatch = useDispatch()
  const dndData = useSelector(getDndData, shallowEqual),
      notEmptySquares = useSelector(getFirstNotEmptySquares)

  return (e) => {
    const {
      currentPart, shipSize, prevSquare,
      successShip: prevSuccessShip,
      unsuccessfulShip: prevUnsuccessfulShip,
      direction
    } = {...dndData}
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
}