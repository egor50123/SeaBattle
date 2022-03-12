import {getSizeAndDirectionOfShip} from "../../helpers/getSizeAndDirectionOfShip";
import {clearDndSettings, setDeathSquares, setShipSquares} from "../../redux/battleFieldReducer";
import {useDeathZone} from "../useDeathZone";
import {useDispatch, useSelector} from "react-redux";
import {getDndData, getIsPossibleToPlacement} from "../../selectors/selectors";

export const useDragEnd = () => {
  const createDeathZone = useDeathZone(true),
        isPossibleToPlacement = useSelector( getIsPossibleToPlacement)
  const dispatch = useDispatch()
  const dndData = useSelector(getDndData)
  return (e,setShip) => {
    const target = e.target.closest(".ship")
    let coordinates = null
    target.style.display = "block"
    if (dndData.dndStatus) {
      coordinates = setShip()
    }
    // если в текующем месте нельзя разместить корабль - возвращаем корабль на предыдущее место (если оно было)
    if( !isPossibleToPlacement && dndData.prevShipPlacement !== null) {
      let {direction} = getSizeAndDirectionOfShip(target)
      let shipDeathZone = createDeathZone(dndData.prevShipPlacement,direction)
      dispatch(setShipSquares([dndData.prevShipPlacement]))
      dispatch(setDeathSquares([shipDeathZone]))
    }
    dispatch(clearDndSettings())
    return coordinates
  }
}