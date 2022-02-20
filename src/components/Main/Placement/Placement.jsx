import BattleField from "../BattleField/BattleField";
import "./placement.scss"
import React, {useEffect, useRef} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getFirstShipsField} from "../../../selectors/selectors";
import {setContainerCoordinates, updateShipData} from "../../../redux/battleFieldReducer";
import {useRandomPlacement} from "../../../hooks/useRandomPlacement";
import {setCurrentPage} from "../../../redux/appInitReducer";
import ShipsField from "./ShipsField/ShipsField";

import '../../Common/RoundButton/RoundButton.scss'
import RoundButton from "../../Common/RoundButton/RoundButton";
import random from "../../../assets/img/random.svg"
import play from "../../../assets/img/play.svg"


const Placement = (props) => {
  const battle = props.nextPage
  const firstShipField = useSelector(getFirstShipsField,shallowEqual)
  const ref = useRef(null)
  const dispatch = useDispatch()
  const doRandomPlacement = useRandomPlacement()


  useEffect(() => {
    let x = ref.current.getBoundingClientRect().left
    let y = ref.current.getBoundingClientRect().top
    dispatch(setContainerCoordinates(x, y))
  }, [firstShipField])

  function onClickRandom() {
    doRandomPlacement(1)
    dispatch(updateShipData())
  }

  function onClickPlay() {
    dispatch(setCurrentPage(battle))
    doRandomPlacement(2)
  }

  //console.log("RENDER CONTAINER")
  return (
      <div ref={ref} className={"placement"}>
        <div className={"placement__wrapper"}>
          <ShipsField isDraggable={true}/>
          <BattleField isBattleForPlacement={true}/>
        </div>
        <div className={"placement__buttons"}>
          <RoundButton src={random} type={"random"} text={"random"} func={onClickRandom}/>
          <RoundButton type={"rotate"} text={"rotate"}/>
          <RoundButton src={play} text={'play'} type={"play"} func={onClickPlay}/>
        </div>

      </div>
  )
}
export default Placement