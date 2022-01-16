import {useRef} from "react";
import {
  clearDndSettings,
  deleteDeathZone,
  deleteShipFromField,
  setDndSettings
} from "../../../redux/battleFieldReducer";
import {useDispatch, useSelector} from "react-redux";
import {useDndCurrentPart} from "../../../hooks/useDndCurrentPart";

const Ship = (props) => {
  const ref = useRef(null);
  const dispatch = useDispatch()
  const findCurrent = useDndCurrentPart()
  const {id, key, size } = {...props}

  const dndStatus  = useSelector( state => state.battleField.dndSettings.status)
  const currentPart = useSelector( state => state.battleField.dndSettings.currentPart)
  const ships = useSelector( state => state.battleField.ships)
  const containerX = useSelector( state => state.battleField.containerCoordinates.x)
  const containerY = useSelector( state => state.battleField.containerCoordinates.y)
  const x = useSelector( state => state.battleField.dndSettings.x)
  const y = useSelector( state => state.battleField.dndSettings.y)
  const xShips = ships[id-1].x;
  const yShips = ships[id-1].y;

  if(ships[0].hasOwnProperty("x")) {
    for ( let i =0; i<ships.length;i++) {
      ref.current.style.top = yShips - containerY + "px"
      ref.current.style.left = xShips - containerX + "px"
    }
  }

  function dragStartHandler(e,shipsList) {
    let target = e.target
    let currentId =  target.id
    let shipSize = shipsList.find(item => +item.id === +currentId).size
    let currentPart = findCurrent(e)
    target.style.background = "yellow"
    setTimeout(() => target.style.display = "none",0)
    if (shipsList[currentId-1].hasOwnProperty('shipSquares')) {
      dispatch(deleteShipFromField(shipsList[currentId-1].shipSquares))
      dispatch(deleteDeathZone(shipsList[currentId-1].shipSquares))
    }

    dispatch(setDndSettings(currentPart,shipSize,currentId))
  }

  function dragEndHandler(e) {
    let container = e.target.closest('.container')
    let shiftX = container.getBoundingClientRect().left;
    let shiftY = container.getBoundingClientRect().top;
    let target = e.target
    target.style.background = "black"
    target.style.display = "block"
    if (dndStatus) {
      //target.style.display = "none"
      //setShips( () => ships.filter(item => +item.id !== +currentShip) )
      target.style.top = y - shiftY + 'px'
      target.style.left = x - shiftX - (currentPart-1)*30 + 'px';
    }
    dispatch(clearDndSettings())
  }

  return (
    <div ref={ref} id={id} key={key} draggable={true} className={`ship ship--${size}`}
         onDragStart={ (e) => dragStartHandler(e,ships)}
         onDragEnd={ (e) => dragEndHandler(e) }>{id}
    </div>
  )
}

export default Ship