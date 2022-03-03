import {timingFunc} from "../helpers/animation/timingFunc";
import {useDrawMoving} from "./useDrawMoving";
import {useDispatch} from "react-redux";
import {clearAnimation} from "../redux/animationReducer";



export const useRocketAnimation = () => {
  const drawMoving = useDrawMoving()
  const timingFunctions = timingFunc()
  const dispatch = useDispatch()
  return ({top,left}) => {
    function animate ({timing,draw,duration,type}) {
      let start = performance.now();
      requestAnimationFrame(function animate(time) {
        let progress
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // вычисление текущего состояния анимации
        if (type === 'scale') {
          progress = timing([timeFraction,2]);
        } else {
          progress = timing([timeFraction,-3]);
        }


        draw({progress,top,left}); // отрисовать её

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        } else {
          dispatch(clearAnimation())
        }

      });
    }

    animate({timing: timingFunctions.quad, draw: drawMoving.moveX, duration: 1000})
    animate( {timing: timingFunctions.back, draw: drawMoving.moveY, duration: 1000})
    animate({timing:timingFunctions.quad,draw: drawMoving.rotate,duration:1000})
    animate({timing:timingFunctions.sqrt,draw: drawMoving.scale,duration:1000,type:"scale"})

  }
}