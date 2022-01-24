import ShipsField from "../ShipsField/ShipsField";
import BattleField from "../BattleField/BattleField";
import "./container.scss"
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setContainerCoordinates} from "../../redux/battleFieldReducer";


const Container = () => {
  //const isRandom = useSelector(state => state.battleField.isRandom)
  const shipField = useSelector( state => state.battleField.shipField)
  const ref = useRef(null)
  const dispatch = useDispatch()

  useEffect(()=> {
    let x = ref.current.getBoundingClientRect().left
    let y = ref.current.getBoundingClientRect().top
    dispatch(setContainerCoordinates(x,y))
  },[shipField])

  //console.log("RENDER CONTAINER")

  return (
      <div ref={ref} className={"container"}>
        <ShipsField/>
        <BattleField/>
      </div>
  )
}
export default Container