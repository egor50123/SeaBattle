import ShipsField from "../ShipsField/ShipsField";
import BattleField from "../BattleField/BattleField";
import "./container.scss"
import React, {useRef} from 'react';


const Container = () => {
  const ref = useRef(null)

  return (
      <div ref={ref} className={"container"}>
        <ShipsField ref={ref}/>
        <BattleField/>
      </div>
  )
}

export default Container