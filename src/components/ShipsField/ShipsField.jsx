import "./ShipsField.scss"
import React from 'react';
import {useSelector} from "react-redux";
import Ship from "./Ship/Ship";

const ShipsField = () => {
  const ships = useSelector( state => state.battleField.ships)

  //console.log("RENDER ShipsField")
  return (
      <div className={"shipsField"}>
        {ships.map(item => {
          return <div id={item.id} key={item.id} className={`shipWrapper shipWrapper--${item.size}`}>
              <Ship id={item.id} key={item.id} size={item.size}/>
          </div>
        })}
      </div>
  )
}

export default ShipsField