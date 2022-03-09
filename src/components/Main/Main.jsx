import Menu from "./Menu/Menu";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPage, getIsGameOver, getIsSavedPlacementOpen} from "../../selectors/selectors";
import Battle from "./Battle/Battle";
import Placement from "./Placement/Placement";
import GameOverModal from "../Common/GameOverModal/GameOverModal";
import "./Main.scss"
import RoundButton from "../Common/RoundButton/RoundButton";
import back from "../../assets/img/back.svg"
import {clearShipsData} from "../../redux/battleFieldReducer";
import {isSavedPlacementOpen, setCurrentPage} from "../../redux/appInitReducer";
import {useCallback} from "react";
import SavedPlacementMenu from "./SavedPlacementList/SavedPlacementMenu";

const Main = () => {
  const currentPage = useSelector(getCurrentPage),
        gameOver = useSelector(getIsGameOver),
        isListOpen = useSelector(getIsSavedPlacementOpen)

  const menu = "menu",
        placement = "placement",
        battle = "battle"

  const dispatch = useDispatch()

  let openClass = !isListOpen ? "main--open" : "main--compressed";

  if (currentPage !== placement) openClass = "main--open"


  const onPrevPage = useCallback((() => {
    dispatch(isSavedPlacementOpen(false))
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

  //localStorage.setItem('test', "someInfo");
  return (
      <div className={`main ${openClass}`}>
        <div className={"main__btns-wrapper"}>
          <RoundButton src={back} text={"назад"} func={onPrevPage}/>
        </div>
        {currentPage === menu && <Menu nextPage={placement}/>}
        {currentPage === placement && <Placement nextPage={battle}/>}
        {currentPage === placement && <SavedPlacementMenu/>}
        {currentPage === battle && <Battle/>}
        {gameOver && <GameOverModal/>}
      </div>
  )
}

export default Main