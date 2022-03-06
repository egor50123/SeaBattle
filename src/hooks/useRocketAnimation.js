import {timingFunc} from "../helpers/animation/timingFunc";
import {useDrawMoving} from "./useDrawMoving";
import {useDispatch} from "react-redux";
import {clearAnimation, isAnimationOn} from "../redux/animationReducer";



export const useRocketAnimation = () => {
  const TIME = 1000
  const drawMoving = useDrawMoving()
  const timingFunctions = timingFunc()
  const dispatch = useDispatch()
  return ({id:square,fieldId}) => {
    dispatch(isAnimationOn(true))
    function animate ({timing,draw,duration,type}) {
      let start = performance.now();
      requestAnimationFrame(function animate(time) {
        let progress
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // вычисление текущего состояния анимации
        progress = timing([timeFraction,5]);

        draw({progress,fieldId,square}); // отрисовать её

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        } else {
          dispatch(isAnimationOn(false))
          dispatch(clearAnimation())
        }

      });
    }

    animate({timing: timingFunctions.quad, draw: drawMoving.moveX, duration: TIME,type:"moveX"})
    animate( {timing: timingFunctions.back, draw: drawMoving.moveY, duration: TIME})
    animate({timing:timingFunctions.quad,draw: drawMoving.rotate,duration:TIME})
    animate({timing:timingFunctions.sqrt,draw: drawMoving.scale,duration:TIME,type:"scale"})

  }
}