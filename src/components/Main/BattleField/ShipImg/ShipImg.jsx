import ship1 from "../../../../assets/img/ship1.png"
import ship2 from "../../../../assets/img/ship2.png"
import ship3 from "../../../../assets/img/ship3.png"
import ship4 from "../../../../assets/img/ship4.png"
import "../BattleField.scss"
import "../../Placement/ShipsField/ShipsField.scss"
import {useMemo, useRef} from "react";
import "../../../../App.scss"

const ShipImg = (props) => {
  const {x,y,size,direction,isVisible,id,shipsId} = {...props}
  let verticalClass = direction === 0 ? "ship--vertical" : null,
      visibleClass = isVisible ? "" : "visuallyHidden",
      sizeClassRef = useRef(null),
      destroyedClass = ""

  if (shipsId.includes(id)) {
    visibleClass = ""
    destroyedClass = "ship--destroyed"
  }

  let src = useMemo(() => {
    let src = null
    switch (size) {
      case 1: src = ship1; sizeClassRef.current = "ship--1";break;
      case 2: src = ship2; sizeClassRef.current = "ship--2";break;
      case 3: src = ship3; sizeClassRef.current = "ship--3";break;
      case 4: src = ship4; sizeClassRef.current = "ship--4";break;
      default: break;
    }
    return src
  },[size])

  return (
      <div id={id} className={`ship ${verticalClass} ${sizeClassRef.current} ${visibleClass} ${destroyedClass}`} style={{left: `${x}px`, top: `${y}px`}}>
        <img src={src} alt="ship"/>
      </div>
  )
}

export default ShipImg