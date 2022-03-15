import {shallowEqual, useSelector} from "react-redux";
import {
  getDestroyedSquaresFirst,
  getDestroyedSquaresSecond, getDndData, getFirstDeathField,
  getFirstFieldDamagedSquares,
  getFirstFieldMissedSquares, getFirstShipsField,
  getSecondFieldDamagedSquares,
  getSecondFieldMissedSquares,
} from "../selectors/selectors";

export const useGetSquareCss = () => {

  const firstFieldMissedSquares = useSelector(getFirstFieldMissedSquares),
        secondFieldMissedSquares = useSelector(getSecondFieldMissedSquares),
        firstFieldDamagedSquares = useSelector(getFirstFieldDamagedSquares),
        secondFieldDamagedSquares = useSelector(getSecondFieldDamagedSquares),
        firstDestroyedSquares = useSelector(getDestroyedSquaresSecond),
        secondDestroyedSquares = useSelector(getDestroyedSquaresFirst),
        shipField = useSelector(getFirstShipsField),
        deathField = useSelector(getFirstDeathField),
        dndData = useSelector(getDndData, shallowEqual)

  let missedClass, damagedClass, destroyedClass, shipClass

  let deathClass, successShipClass, unsuccessfulShipClass

  function getForDnd (id) {
    if (shipField.length > 0) deathClass = deathField.find(deathZone => deathZone.includes(id)) ? "square--death" : ""
    if (dndData.successShip) successShipClass = dndData.successShip.includes(id) ? "square--dndSuccess" : "";
    if (dndData.unsuccessfulShip) unsuccessfulShipClass = dndData.unsuccessfulShip.includes(id) ? "square--dndUnsuccessful" : "";

    return {deathClass, successShipClass, unsuccessfulShipClass}
  }

  function getForStatic ({fieldId, id}) {
    if (fieldId === 1) {
      missedClass = secondFieldMissedSquares.includes(id) ? "square--missed" : ""
      damagedClass = secondFieldDamagedSquares.includes(id) ? "square--damaged" : ""
      destroyedClass = firstDestroyedSquares.includes(id) ? "square--destroyed" : ""
    } else {
      //shipClass = secondShipField.find(ship => ship.includes(id)) ? "square--ship" : ""
      shipClass = ""
      destroyedClass = secondDestroyedSquares.includes(id) ? "square--destroyed" : ""
      missedClass = firstFieldMissedSquares.includes(id) ? "square--missed" : ""
      damagedClass = firstFieldDamagedSquares.includes(id) ? "square--damaged" : ""
    }

    return {missedClass,damagedClass,destroyedClass,shipClass}
  }

  return {getForStatic,getForDnd}
}