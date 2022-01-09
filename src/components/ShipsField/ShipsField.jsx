import "./ShipsField.scss"
import React, {useRef} from 'react';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearDndSettings, setDndSettings} from "../../redux/battleFieldReducer";
import {useDndCurrentPart} from "../../hooks/useDndCurrentPart";

const ShipsField = React.forwardRef((props,ref) => {

  const dispatch = useDispatch()
  const dndStatus  = useSelector( state => state.battleField.dndSettings.status)
  const shipsInit = useSelector( state => state.battleField.ships)
  const x = useSelector( state => state.battleField.dndSettings.x)
  const y = useSelector( state => state.battleField.dndSettings.y)
  const currentPart = useSelector( state => state.battleField.dndSettings.currentPart)
  //const shipField = useSelector(state => state.battleField.shipField)

  const [ships,setShips] = useState(shipsInit)

  //const [currentShip,setCurrentShip] = useState(null)
  const findCurrent = useDndCurrentPart()

  function dragStartHandler(e,shipsList) {
    let target = e.target
    console.log(target.id)
    let shipSize = shipsList.find(item => +item.id === +target.id).size
    let currentPart = findCurrent(e)
    target.style.background = "yellow"
    setTimeout(() => target.style.display = "none",0)
    //setCurrentShip(target.id)
    //console.log(currentShip)
    dispatch(setDndSettings(currentPart,shipSize,target.id))
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
      <div className={"shipsField"}>
        {ships.map(item => {
          return <div id={item.id} key={item.id} className={`shipWrapper shipWrapper--${item.size}`}>
            <div id={item.id} key={item.id} draggable={true} className={`ship ship--${item.size}`}
                 onDragStart={ (e) => dragStartHandler(e,ships)}
                 onDragEnd={ (e) => dragEndHandler(e) }
            >{item.id}</div>
          </div>
        })}
      </div>
  )
})

export default ShipsField