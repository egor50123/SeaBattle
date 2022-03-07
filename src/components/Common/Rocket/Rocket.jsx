import rocket from "../../../assets/img/Rocket.png"
import "./rocket.scss"
import {useSelector} from "react-redux";
import {getCurrentPlayer, getFirstRocketCoordinates, getIsBotMove} from "../../../selectors/selectors";

const Rocket = (props) => {
  const fieldId = props.fieldId
  const rocketData = useSelector(getFirstRocketCoordinates)

  const currentPlayer = useSelector(getCurrentPlayer)
  const isBotMove = useSelector(getIsBotMove)
  let curPlayerNum = 1
  if (isBotMove === true) curPlayerNum = 2

  // let startCoordinates = curPlayerNum === 1 ? {initTop: 200,} : {b:1}

  let animateSettings = {
    top: `${200 + rocketData.top}px`,
    left: `${200 + rocketData.left}px`,
    transform: `rotate(${rocketData.rotate}deg) scale(${rocketData.scale})`}

  return (
      fieldId === curPlayerNum ? <div  className={"rocket"} style={animateSettings}>
        <img src={rocket} alt=""/>
      </div> : null
  )
}

export default Rocket