import "./Menu.scss"
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPage} from "../../../selectors/selectors";
import {setCurrentPage} from "../../../redux/appInitReducer";


const Menu = () => {
  const dispatch = useDispatch()
  const currentPage = useSelector( getCurrentPage)
  function onClickHandler(e) {
    dispatch(setCurrentPage("placement"))
  }

  return (
      currentPage === "menu" ?
      <div className={"menu"}>
        <button className={"button-menu"} onClick={onClickHandler}>Один игрок</button>
        <button className={"button-menu"} disabled>Два игрока</button>
      </div> : null
  )
}

export default Menu