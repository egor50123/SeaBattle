import {useSelector} from "react-redux";
import {getFirstRocketCoordinates, getSecondRocketCoordinates} from "../../selectors/selectors";

export const useRocketCoor = (fieldId) => {
  const firstRocketCoor = useSelector(getFirstRocketCoordinates)
  const secondRocketCoor = useSelector(getSecondRocketCoordinates)

  let coor = fieldId === 1 ? firstRocketCoor : secondRocketCoor,
      id = fieldId === 1 ? 1 : 2
  return {coor,id}
}