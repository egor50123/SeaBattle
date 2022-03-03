import {useDispatch, useSelector} from "react-redux";
import {setAnimateRocket} from "../redux/animationReducer";
import {getRocketInitCoordinatesLeft, getRocketInitCoordinatesTop} from "../selectors/selectors";

export const useDrawMoving = () => {
  const dispatch = useDispatch()
  const initRocketTop = useSelector(getRocketInitCoordinatesTop),
        initRocketLeft = useSelector(getRocketInitCoordinatesLeft)

  let x0 = null, y0 = null,
      x = null, y = null,
      rotate = null,
      a = null, b = null

  return {
    moveX({progress,left:newLeft}) {
      let left = progress * (newLeft - initRocketLeft - 30);
      if (x0 === null) {
        x0 = left
      } else {
        x = left
        a = x - x0
        x0 = x
      }
      dispatch(setAnimateRocket({left}))
    },
    moveY({progress,top:newTop}) {
      let top = progress * (newTop-initRocketTop -5);
      if (y0 === null) {
        y0 = top
      } else {
        y = top
        b = y - y0
        y0 = y
      }
      dispatch(setAnimateRocket({top}))
    },
    rotate() {
      rotate = Math.atan(b/a)*180/Math.PI
      if (!isNaN(rotate)) {
        dispatch(setAnimateRocket({rotate}))
      }
    },
    scale({progress}) {
      let scale = progress*1.2
      dispatch(setAnimateRocket({scale}))
    }
  }
}