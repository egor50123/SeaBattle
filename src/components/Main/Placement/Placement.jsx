import BattleField from "../BattleField/BattleField";
import "./placement.scss"
import React, {useRef} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getCurrentPage, getFirstShipsField} from "../../../selectors/selectors";
import {updateShipData} from "../../../redux/battleFieldReducer";
import {useRandomPlacement} from "../../../hooks/useRandomPlacement";
import {isSavedPlacementOpen, setCountOfSavedShips, setCurrentPage} from "../../../redux/appInitReducer";
import ShipsField from "./ShipsField/ShipsField";

import '../../Common/RoundButton/RoundButton.scss'
import RoundButton from "../../Common/RoundButton/RoundButton";
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
    if (firstShipField.length === 10)  {
      dispatch(setCurrentPage(battle))
      doRandomPlacement(2)
    }

  }

  function onSavePlacement() {
    if (!isDisable) {
      localStorage.setItem(`ship${getUnique()}`, JSON.stringify(firstShipField))
      dispatch(setCountOfSavedShips())
    }
  }

  function openMenu () {
    dispatch(isSavedPlacementOpen())
  }

  //console.log("RENDER CONTAINER")
  return (
      <div ref={ref} className={"placement"} >
        <div className={"placement__btn-menu"}>
          <RoundButton type={"placementMenu"} func={openMenu}/>
        </div>

        <div className={"placement__wrapper"}>
          <div className={"placement__name"}><span>Расстановка</span></div>
          <ShipsField isDraggable={true}/>
          <BattleField isBattleForPlacement={true} currentPage={currentPage}/>
        </div>
        <div className={"placement__buttons"}>
          <RoundButton type={"random"} text={"random"} func={onClickRandom}/>
          <RoundButton type={"save"}  text={"save"} disable={isDisable} func={onSavePlacement}/>
          <RoundButton type={"play"} text={'play'} disable={isDisable} func={onClickPlay}/>
        </div>

      </div>
  )
}
export default Placement