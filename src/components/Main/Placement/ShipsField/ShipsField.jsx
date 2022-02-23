import "./ShipsField.scss"
import React, {useRef} from 'react';
import Ship from "./Ship/Ship";
import "../placement.scss"

const ShipsField = () => {
  const ships = [{id: 1, size: 4,},
    {id: 2, size: 3,},
    {id: 3, size: 3,},
    {id: 4, size: 2,},
    {id: 5, size: 2,},
    {id: 6, size: 2,},
    {id: 7, size: 1,},
    {id: 8, size: 1,},
    {id: 9, size: 1,},
    {id: 10, size: 1,}]
  const ref = useRef()

  function onDrop(e) {
    console.log("currentShip");
  }

  function onDragOver(e) {
    // const target = e.target.closest(".shipsField")
    // target.style.backgroundColor = "rgba(0,0,0,0.2)"
  }

  function onDragLeave(e) {
    // const target = e.target.closest(".shipsField")
    // target.style.backgroundColor = "rgba(0,0,0,0.1)"
  }

  //console.log("RENDER ShipsField")
  return (
      <div ref={ref} className={"placement__box shipsField"} onDrop={(e) => onDrop(e)}
           onDragOver={(e) => onDragOver(e)}
           onDragLeave={(e) => onDragLeave(e)}>
        {ships.map(item => {
          return <Ship id={item.id} key={item.id} size={item.size}/>
        })}
      </div>
  )
}

export default ShipsField