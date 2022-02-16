import ShipsField from "../ShipsField/ShipsField";
import BattleField from "../BattleField/BattleField";
import "./container.scss"
import "../../Common/RoundButton.scss"
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPage, getFirstShipsField} from "../../../selectors/selectors";
import {setContainerCoordinates, updateShipData} from "../../../redux/battleFieldReducer";
import {useRandomPlacement} from "../../../hooks/useRandomPlacement";
import {setCurrentPage} from "../../../redux/appInitReducer";



const Container = () => {
  const firstShipField  = useSelector( getFirstShipsField)
  const ref = useRef(null)
  const dispatch = useDispatch()
  const currentPage = useSelector( getCurrentPage )
  const doRandomPlacement = useRandomPlacement()


  useEffect(()=> {
    if (currentPage === 'placement') {
      let x = ref.current.getBoundingClientRect().left
      let y = ref.current.getBoundingClientRect().top
      dispatch(setContainerCoordinates(x, y))
    }
  },[firstShipField,currentPage])

  function onClickRandom() {
    doRandomPlacement(1)
    dispatch(updateShipData())
  }

  function onClickPlay() {
    dispatch(setCurrentPage("battleField"))
    doRandomPlacement(2)
  }

  //console.log("RENDER CONTAINER")
  return (
      currentPage === "placement" ?
      <div ref={ref} className={"container"}>
          <ShipsField isDraggable={true}/>
          <BattleField isBattleForPlacement={true}/>
          <div className={"container__wrapper"}>
            <div className={"container__buttons"}>
              <button className={"btn-round btn-round--random"} onClick={onClickRandom}>Случайно</button>
              <button className={"btn-round btn-round--rotate"}>Поворот</button>
              <button className={"btn-round btn-round--play"} onClick={onClickPlay}>Играть</button>
            </div>

          </div>
      </div> : null
  )
}
export default Container