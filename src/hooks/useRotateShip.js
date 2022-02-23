import {getSizeAndDirectionOfShip} from "../helpers/getSizeAndDirectionOfShip";
import {getRotatedShip} from "../helpers/getRotatedShip";
import {
  deleteDeathZone,
  deleteShipFromField,
  setDeathSquares,
  setShipSquares,
  updateShipSquares
} from "../redux/battleFieldReducer";
import {useDispatch} from "react-redux";
import {useDeathZone} from "./useDeathZone";

export const useRotateShip = () => {
  const dispatch = useDispatch()
  const createDeathZone = useDeathZone()
  return (options) => {
    const {id, target, notEmptySquares, allSquares, shipSquares, createStrictShip} = {...options}
    const {direction} = getSizeAndDirectionOfShip(target),
        newShip = getRotatedShip({notEmptySquares, allSquares, direction, shipSquares, createStrictShip})
    // Если корабль можно повернуть - поворачиваем
    if (newShip) {
      let reverseDirection = direction === 1 ? 0 : 1,
          oldDeathZone = createDeathZone(shipSquares, direction),
          newShipDeathZone = createDeathZone(newShip, reverseDirection)

      target.style.transform = `rotate(${direction === 1 ? 90 : 0}deg)`
      dispatch(deleteShipFromField(shipSquares))
      dispatch(deleteDeathZone(oldDeathZone))
      dispatch(setShipSquares([newShip]))
      dispatch(setDeathSquares([newShipDeathZone]))
      dispatch(updateShipSquares(id, newShip))
    } else {
      throw new Error("Нельзя повернуть корабль");
    }
  }
}