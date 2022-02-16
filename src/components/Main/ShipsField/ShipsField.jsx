import "./ShipsField.scss"
import React from 'react';
import Ship from "./Ship/Ship";

const ShipsField = () => {
  const ships =  [{id:1,size:4,},
    {id:2,size:3,},
    {id:3,size:3,},
    {id:4,size:2,},
    {id:5,size:2,},
    {id:6,size:2,},
    {id:7,size:1,},
    {id:8,size:1,},
    {id:9,size:1,},
    {id:10,size:1,}]

  console.log("RENDER ShipsField")
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