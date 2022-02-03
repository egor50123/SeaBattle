import {useSelector} from "react-redux";
import {getFirstShipsField, getSecondShipsField} from "../selectors/selectors";

export const useIsShipKilled = (fieldId) => {
  const shipsOfFirstField = useSelector(getFirstShipsField)
  const shipsOfSecondField = useSelector(getSecondShipsField)
  return (squareOfShipId) => {
    let currentShip = null
    // в какое поле ведется стрельба
    if (fieldId === 1) {
      currentShip = shipsOfFirstField.find(ship => ship.find(square => squareOfShipId === square))
    } else {
      currentShip = shipsOfSecondField.find(ship => ship.find(square => squareOfShipId === square))
    }
    return currentShip
  }
}