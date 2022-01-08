import "./ShipsField.scss"
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearDndSettings, setDndSettings} from "../../redux/battleFieldReducer";

const ShipsField = () => {
  const dispatch = useDispatch()
  const dndStatus  = useSelector( state => state.battleField.dndSettings.status)
  const shipsInit = useSelector( state => state.battleField.ships)
  const x = useSelector( state => state.battleField.dndSettings.x)
  const y = useSelector( state => state.battleField.dndSettings.y)

  const [ships,setShips] = useState(shipsInit)

  const [currentShip,setCurrentShip] = useState(null)

  function dragStartHandler(e,shipsList) {
    let target = e.target
    let shipSize = shipsList.find(item => +item.id === +target.id).size
    let shiftX = e.pageX - e.target.getBoundingClientRect().left
    let currentPart = null;

    if ( shiftX <= 30 ) {
      currentPart = 1
    } else if(shiftX > 30 && shiftX <= 60) {
      currentPart = 2
    } else if ( shiftX > 60 && shiftX <= 90 ) {
      currentPart = 3
    } else if ( shiftX <= 120 ) {
      currentPart = 4
    }

    target.style.background = "yellow"
    setTimeout(() => target.style.display = "none",0)
    dispatch(setDndSettings(currentPart,shipSize))
    setCurrentShip(target.id)
  }

  function dragOverHandler(e) {
    return undefined;
  }

  function dragEndHandler(e) {
    let target = e.target
    target.style.background = "black"
    target.style.display = "block"
    if (dndStatus) {
      //setShips( () => ships.filter(item => +item.id !== +currentShip) )
      target.style.top = 500 + 'px'
      target.style.left = 270 + 'px';
    }
    dispatch(clearDndSettings())
  }

  function dragLeaveHandler(e) {
    return undefined;
  }

  function dropHandler(e) {
    return undefined;
  }

  function dragOverWrapper(e) {
    //console.log(e.currentTarget)
    //e.currentTarget.style.zIndex = "15"
  }

  return (
      <div className={"shipsField"}>
        {ships.map(item => {
          return <div id={item.id} key={item.id} className={`shipWrapper shipWrapper--${item.size}`} onDragOver={(e) => dragOverWrapper(e)}>
            <div id={item.id} key={item.id} draggable={true} className={`ship ship--${item.size}`}
                 onDragStart={ (e) => dragStartHandler(e,ships)}
                 onDragOver={ (e) => dragOverHandler(e) }
                 onDragEnd={ (e) => dragEndHandler(e) }
                 onDragLeave={ (e) => dragLeaveHandler(e) }
                 onDrop={ (e) => dropHandler(e) }
            >{item.id}</div>
          </div>
        })}
      </div>
  )
}

export default ShipsField