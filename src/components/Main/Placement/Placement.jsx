import BattleField from "../BattleField/BattleField";
import "./placement.scss"
import React, {useEffect, useRef} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getCurrentPage, getFirstShipsField} from "../../../selectors/selectors";
import {setContainerCoordinates, updateShipData} from "../../../redux/battleFieldReducer";
import {useRandomPlacement} from "../../../hooks/useRandomPlacement";
import {setCountOfSavedShips, setCurrentPage} from "../../../redux/appInitReducer";
import ShipsField from "./ShipsField/ShipsField";

import '../../Common/RoundButton/RoundButton.scss'
import RoundButton from "../../Common/RoundButton/RoundButton";
import random from "../../../assets/img/random.svg"
import play from "../../../assets/img/play.svg"
import save from "../../../assets/img/save.svg"
import {getUnique} from "../../../helpers/getUnique";


const Placement = (props) => {
  const battle = props.nextPage
  const firstShipField = useSelector(getFirstShipsField,shallowEqual),
        currentPage = useSelector(getCurrentPage)
  const ref = useRef(null)
  const dispatch = useDispatch()
  const doRandomPlacement = useRandomPlacement()

  let isDisable = firstShipField.length !== 10


  function onClickRandom() {
    doRandomPlacement(1)
    dispatch(updateShipData())
  }

  function onClickPlay() {
    dispatch(setCurrentPage(battle))
    doRandomPlacement(2)
  }

  function onSavePlacement() {
    if (!isDisable) {
      localStorage.setItem(`ship${getUnique()}`, JSON.stringify(firstShipField))
      dispatch(setCountOfSavedShips())
    }
  }

  //console.log("RENDER CONTAINER")
  return (
      <div ref={ref} className={"placement"}>
        <div className={"placement__wrapper"}>
          <ShipsField isDraggable={true}/>
          <BattleField isBattleForPlacement={true} currentPage={currentPage}/>
        </div>
        <div className={"placement__buttons"}>
          <RoundButton src={random} type={"random"} text={"random"} func={onClickRandom}/>
          <RoundButton src={save} type={"save"}  text={"save"} disable={isDisable} func={onSavePlacement}/>
          <RoundButton src={play} type={"play"} text={'play'} disable={isDisable} func={onClickPlay}/>
        </div>

      </div>
  )
}
export default Placement