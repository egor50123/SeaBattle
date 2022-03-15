import {useSelector} from "react-redux";
import {getFirstShipsField, getSecondShipsField} from "../../selectors/selectors";

export const useGetDamagedShip = (fieldId) => {
  const shipsOfFirstField = useSelector(getFirstShipsField)
  const shipsOfSecondField = useSelector(getSecondShipsField)
    return (squareOfShipId) => {
      let currentShip = []
      // в какое поле ведется стрельба
      if (fieldId === 1) {
        currentShip = shipsOfSecondField.find(ship => ship.find(square => squareOfShipId === square))
      } else {
        currentShip = shipsOfFirstField.find(ship => ship.find(square => squareOfShipId === square))
      }
      return currentShip === undefined ? [] :currentShip
    }
}