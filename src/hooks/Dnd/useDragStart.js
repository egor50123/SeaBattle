import {
  deleteDeathZone,
  deleteShipFromField,
  savePrevShipPlacement,
  setDndSettings
} from "../../redux/battleFieldReducer";
import {useDispatch, useSelector} from "react-redux";
import {getShipsData} from "../../selectors/selectors";
import {useDeathZone} from "../useDeathZone";
import {getSizeAndDirectionOfShip} from "../../helpers/DndHelpers/getSizeAndDirectionOfShip";
import {getDndCurrentPart} from "../../helpers/DndHelpers/getDndCurrentPart";

export const useDragStart = () => {
  const ShipsInfo = useSelector(getShipsData)
  const dispatch = useDispatch()
  const createDeathZone = useDeathZone(true)

  return (e,id) => {
    const target = e.target.closest(".ship")
    let {direction} = getSizeAndDirectionOfShip(target)
    let shipSize = ShipsInfo[id-1].size,
        currentPart = getDndCurrentPart(e,direction)

    // Если корабль уже был расположен на поле , то удаляем его и запоминаем прошое местопожение
    if (ShipsInfo[id-1].hasOwnProperty('shipSquares')) {
      dispatch(savePrevShipPlacement(ShipsInfo[id-1].shipSquares))
      dispatch(deleteShipFromField(ShipsInfo[id-1].shipSquares))
      dispatch(deleteDeathZone(createDeathZone(ShipsInfo[id-1].shipSquares)))
    }
    dispatch(setDndSettings(currentPart,shipSize,id,direction))
  }
}