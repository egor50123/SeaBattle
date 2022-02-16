import {useDispatch, useSelector} from "react-redux";
import {getCurrentPage, getIsGameOver} from "../../../selectors/selectors";
import BattleField from "../BattleField/BattleField";
import "./Battle.scss"
import {useBotShooting} from "../../../hooks/useBotShooting";
import {useEffect, useState} from "react";
import {setCurrentPage} from "../../../redux/appInitReducer";
import {clearShipsData} from "../../../redux/battleFieldReducer";

const Battle =() => {
  const currentPage = useSelector( getCurrentPage )
  const botShoot = useBotShooting()
  const gameOver = useSelector(getIsGameOver)
  const dispatch = useDispatch()

  let [isGameOver, setGameOver] = useState(false)
  useEffect( () => {
    setTimeout(() => {
      if (gameOver) {
        setGameOver(true)
      }
    },500)
  },[gameOver])


  function onClick() {
    dispatch(setCurrentPage('menu'))
    dispatch(clearShipsData())
    setGameOver(false)
  }

  return (
      currentPage === "battleField" ?
      <div className={"battleField-container"}>
        <BattleField isBattleForPlacement={false} id={1}/>
        <BattleField isBattleForPlacement={false} id={2} botShoot={botShoot}/>
        {isGameOver && <div className={"gameOver-modal"}><button onClick={onClick} style={{width: "150px", height: "40px" }}>Ок</button></div>}
      </div> : null
  )
}

export default Battle