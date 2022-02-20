import Menu from "./Menu/Menu";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPage, getIsGameOver} from "../../selectors/selectors";
import Battle from "./Battle/Battle";
import Placement from "./Placement/Placement";
import GameOverModal from "../Common/GameOverModal/GameOverModal";
import "./Main.scss"
import RoundButton from "../Common/RoundButton/RoundButton";
import back from "../../assets/img/back.svg"
import {clearShipsData} from "../../redux/battleFieldReducer";
import {setCurrentPage} from "../../redux/appInitReducer";
import {useCallback} from "react";

const Main = () => {
  const currentPage = useSelector(getCurrentPage),
        gameOver = useSelector(getIsGameOver)

  const menu = "menu",
        placement = "placement",
        battle = "battle"

  const dispatch = useDispatch()

  const onPrevPage = useCallback((() => {
    switch (currentPage) {
      case placement: {
        dispatch(clearShipsData())
        dispatch(setCurrentPage(menu));
        break
      }
      case battle: {
        dispatch(clearShipsData())
        dispatch(setCurrentPage(placement));
        break
      }
      default: break
    }
  }),[currentPage])

  return (
      <div className={"main"}>
        <div className={"main__btns-wrapper"}>
          <RoundButton src={back} text={"назад"} func={onPrevPage}/>
        </div>
        {currentPage === menu && <Menu nextPage={placement}/>}
        {currentPage === placement && <Placement nextPage={battle}/>}
        {currentPage === battle && <Battle/>}
        {gameOver && <GameOverModal/>}
      </div>
  )
}

export default Main