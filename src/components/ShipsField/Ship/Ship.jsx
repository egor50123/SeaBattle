import {useRef} from "react";
import {
  clearDndSettings,
  deleteDeathZone,
  deleteShipFromField,
  setDndSettings
} from "../../../redux/battleFieldReducer";
import {useDispatch, useSelector} from "react-redux";
import {useDndCurrentPart} from "../../../hooks/useDndCurrentPart";
import {useDeathZone} from "../../../hooks/useDeathZone";

const Ship = (props) => {
  const ref = useRef(null),
   dispatch = useDispatch(),
   findCurrent = useDndCurrentPart(),
   createDeathZone = useDeathZone(),
   {id, key, size } = {...props}

  const dndStatus  = useSelector( state => state.battleField.dndSettings.status),
     currentPart = useSelector( state => state.battleField.dndSettings.currentPart),
     ships = useSelector( state => state.battleField.ships),
     containerX = useSelector( state => state.battleField.containerCoordinates.x),
     containerY = useSelector( state => state.battleField.containerCoordinates.y),
     x = useSelector( state => state.battleField.dndSettings.x),
     y = useSelector( state => state.battleField.dndSettings.y),
     xShips = ships[id-1].x,
     yShips = ships[id-1].y

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
      dispatch(deleteDeathZone(createDeathZone(shipsList[currentId-1].shipSquares,1)))
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