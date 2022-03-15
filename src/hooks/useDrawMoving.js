import {useDispatch} from "react-redux";
import {setAnimateRocket} from "../redux/animationReducer";
import {BATTLEFIELD_GAP, SQUARE_SIZE, TRIANGLE_WIDTH} from "../constant/constant";

export const useDrawMoving = () => {
  const dispatch = useDispatch()

  let x0 = null, y0 = null,
      x = null, y = null,
      rotate = null,
      a = null, b = null

  return {
    moveX({progress,fieldId,square}) {
      let col = square % 10,
          newx1 = col !== 0 ?  (col-1) * SQUARE_SIZE : 9 * SQUARE_SIZE,
          newx2 = col !== 0 ?  (11 - col) * SQUARE_SIZE : SQUARE_SIZE
      let left = fieldId === 1 ? progress * (SQUARE_SIZE*10 + BATTLEFIELD_GAP + TRIANGLE_WIDTH +newx1 - 20 -200) : -progress * (BATTLEFIELD_GAP + TRIANGLE_WIDTH + newx2 +20 + 200)
      if (x0 === null) {
        x0 = left
      } else {
        x = left
        a = x - x0
        x0 = x
      }
      dispatch(setAnimateRocket({left,fieldId}))
    },
    moveY({progress,fieldId,square}) {
      let row = Math.ceil(square/10),
          newy = (row-1) * SQUARE_SIZE
      let top = progress * (newy - 5 - 200);
      if (y0 === null) {
        y0 = top
      } else {
        y = top
        b = y - y0
        y0 = y
      }
      dispatch(setAnimateRocket({top,fieldId}))
    },
    rotate({fieldId}) {
      rotate = fieldId === 1 ? Math.atan(b/a)*180/Math.PI : 180 + Math.atan(b/a)*180/Math.PI
      if (!isNaN(rotate)) {
        dispatch(setAnimateRocket({rotate,fieldId}))
      }
    },
    scale({progress,fieldId}) {
      let scale = progress*1.2
      dispatch(setAnimateRocket({scale,fieldId}))
    }
  }
}