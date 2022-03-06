import rocket from "../../../assets/img/Rocket.png"
import "./rocket.scss"
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPlayer, getFirstRocketCoordinates, getSecondRocketCoordinates} from "../../../selectors/selectors";
import {useEffect, useRef} from "react";
import {setInitRocketCoordinates} from "../../../redux/animationReducer";

const Rocket = (props) => {
  const fieldId = props.fieldId
  const dispatch = useDispatch()
  let ref = useRef(null)
  const firstCoor = useSelector(getFirstRocketCoordinates)
  const secondCoor = useSelector(getSecondRocketCoordinates)

  let coor = firstCoor
        // let isRocketOn = coor.isAnimation
  const currentPlayer = useSelector(getCurrentPlayer)
  let curPlayerNum = 1
  if (currentPlayer === false) curPlayerNum = 2

  let isRocketActive = coor.isAnimation

  let initCoorRef = useRef()
  let animateSettings = null

  let initWindowHeightRef = useRef(null)
  let initWindowWidthRef = useRef(null)

  function resize () {
    initWindowHeightRef.current = document.documentElement.clientHeight
    initWindowWidthRef.current = document.documentElement.clientWidth
    dispatch(setInitRocketCoordinates(initCoorRef.current.top,initCoorRef.current.left))
  }


  useEffect( () => {
    if (ref.current !== null) {
      window.addEventListener("resize", resize)
      initCoorRef.current = ref.current.getBoundingClientRect()
      initWindowHeightRef.current = document.documentElement.clientHeight
      initWindowWidthRef.current = document.documentElement.clientWidth
      dispatch(setInitRocketCoordinates(initCoorRef.current.top,initCoorRef.current.left))
    }
    //return window.removeEventListener("resize", resize)
  },[initWindowHeightRef.current,initWindowWidthRef.current,isRocketActive])


  if (initCoorRef.current !== undefined) {
    animateSettings = {
      top: `${0 + coor.top}px`,
      left: `${0 + coor.left}px`,
      transform: `rotate(${coor.rotate}deg) scale(${coor.scale})`}
  }

  return (
      fieldId === curPlayerNum ? <div ref={ref} className={"rocket"} style={animateSettings}>
        <img src={rocket} alt=""/>
      </div> : null
  )
}

export default Rocket