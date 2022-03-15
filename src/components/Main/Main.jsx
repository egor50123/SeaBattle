import Menu from "./Menu/Menu";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPage, getIsGameOver, getIsSavedPlacementOpen} from "../../selectors/selectors";
import Battle from "./Battle/Battle";
import Placement from "./Placement/Placement";
import GameOverModal from "../Common/GameOverModal/GameOverModal";
import "./Main.scss"
import RoundButton from "../Common/RoundButton/RoundButton";
import back from "../../assets/img/back.svg"
import settings from "../../assets/img/settings.svg"
import {clearShipsData} from "../../redux/battleFieldReducer";
import {isSavedPlacementOpen, setCurrentPage, setIsExit, setSettingsOpen} from "../../redux/appInitReducer";
import {useCallback} from "react";
import SavedPlacementMenu from "./SavedPlacementList/SavedPlacementMenu";
import {BATTLE_PAGE, MENU_PAGE, PLACEMENT_PAGE} from "../../constant/constant";

const Main = () => {
  const currentPage = useSelector(getCurrentPage),
        gameOver = useSelector(getIsGameOver),
        isListOpen = useSelector(getIsSavedPlacementOpen)
  const dispatch = useDispatch()

  let openClass = !isListOpen ? "main--open" : "main--compressed";
  let placementClass = currentPage === PLACEMENT_PAGE ? "main--placement" : ""
  if (currentPage !== PLACEMENT_PAGE) openClass = "main--open"


  const onPrevPage = useCallback((() => {
    dispatch(isSavedPlacementOpen(false))
    switch (currentPage) {
      case PLACEMENT_PAGE: {
        dispatch(clearShipsData())
        dispatch(setCurrentPage(MENU_PAGE));
        break
      }
      case BATTLE_PAGE: {
        dispatch(setIsExit(true))
        break
      }
      default: break
    }
  }),[currentPage])

  const onSettingsOpen = useCallback(() => {
    dispatch(setSettingsOpen(true))
  },[])

  return (
      <div className={`main ${openClass} ${placementClass}`}>
        <div className={"main__btns-wrapper"}>
          <RoundButton src={back} type={"back"} text={"назад"} func={onPrevPage}/>
          <RoundButton src={settings} type={"settings"} text={"settings"} func={onSettingsOpen}/>
        </div>
        {currentPage === MENU_PAGE && <Menu nextPage={PLACEMENT_PAGE}/>}
        {currentPage === PLACEMENT_PAGE && <Placement nextPage={BATTLE_PAGE}/>}
        {currentPage === PLACEMENT_PAGE && <SavedPlacementMenu/>}
        {currentPage === BATTLE_PAGE && <Battle/>}
      </div>
  )
}

export default Main