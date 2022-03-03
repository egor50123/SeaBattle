import rocket from "../../../assets/img/Rocket.png"
import "./rocket.scss"
import {useDispatch, useSelector} from "react-redux";
import {getRocketCoordinates} from "../../../selectors/selectors";
import {useEffect, useRef} from "react";
import {setInitRocketCoordinates} from "../../../redux/animationReducer";

const Rocket = () => {
  const dispatch = useDispatch()
  let ref = useRef(null)
  let coor = useSelector(getRocketCoordinates)
  let initCoorRef = useRef()
  let animateSettings = null

  let initWindowHeightRef = useRef(null)
  let initWindowWidthRef = useRef(null)

  function resize () {
    initWindowHeightRef.current = document.documentElement.clientHeight
    initWindowWidthRef.current = document.documentElement.clientWidth
    dispatch(setInitRocketCoordinates(initCoorRef.current.top,initCoorRef.current.left))
  }




  // useEffect( () => {
  //   window.addEventListener("resize", resize)
  //
  //   initCoorRef.current = ref.current.getBoundingClientRect()
  //   initWindowHeightRef.current = document.documentElement.clientHeight
  //   initWindowWidthRef.current = document.documentElement.clientWidth
  //   dispatch(setInitRocketCoordinates(initCoorRef.current.top,initCoorRef.current.left))
  //   //return window.removeEventListener("resize", resize)
  // },[initWindowHeightRef.current,initWindowWidthRef.current])


  if (initCoorRef.current !== undefined) {
    animateSettings = {
      top: `${100 + coor.top}px`,
      left: `${100 + coor.left}px`,
      transform: `rotate(${coor.rotate}deg) scale(${coor.scale})`}
  }





  //console.log("render Rocket")
  return (
      <div ref={ref} className={"rocket"} style={animateSettings}>
        <img src={rocket} alt=""/>
      </div>
  )
}

export default Rocket