import {setDeathSquares, setDndStatus, setShipSquares} from "../../redux/battleFieldReducer";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {useDeathZone} from "../useDeathZone";
import {getDndData} from "../../selectors/selectors";

export const useDragDrop = () => {
  const dispatch = useDispatch()
  const {successShip,direction} = useSelector(getDndData, shallowEqual)
  const createDeathZone = useDeathZone()

  return () => {
    if (successShip) {
      let shipDeathZone = createDeathZone(successShip, direction)
      dispatch(setShipSquares([successShip]))
      dispatch(setDeathSquares([shipDeathZone]))
      dispatch(setDndStatus(successShip))
    }
  }
}