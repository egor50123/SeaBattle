import "./ShipsField.scss"
import React, {useCallback, useRef} from 'react';
import Ship from "./Ship/Ship";
import "../placement.scss"
import ship1 from "../../../../assets/img/ship1.png";
import ship2 from "../../../../assets/img/ship2.png";
import ship3 from "../../../../assets/img/ship3.png";
import ship4 from "../../../../assets/img/ship4.png";

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

    const setSrc = useCallback((size) => {
      let src
      switch (size) {
        case 1: src = ship1;break;
        case 2: src = ship2;break;
        case 3: src = ship3;break;
        case 4: src = ship4;break;
        default: break;
      }
      return src
    },[])
  // function setSrc (size) {
  //   let src
  //   switch (size) {
  //     case 1: src = ship1;break;
  //     case 2: src = ship2;break;
  //     case 3: src = ship3;break;
  //     case 4: src = ship4;break;
  //     default: break;
  //   }
  //   return src
  // }

  //console.log("RENDER ShipsField")
  return (
      <div className={"placement__box shipsField"} >
        {ships.map(item => {
          return (
              <div className={`shipWrapper shipWrapper--${item.size} shipWrapper-area--${item.id}`} key={item.id}>
                <Ship id={item.id} key={item.id} size={item.size} setSrc={setSrc}/>
              </div>
          )
        })}
      </div>
  )
}

export default ShipsField