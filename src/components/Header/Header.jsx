import "./Header.scss"
import {useDispatch} from "react-redux";
import {isSavedPlacementOpen} from "../../redux/appInitReducer";
import bookmark from "../../assets/img/bookmark.svg"

const Header = () => {
  const dispatch = useDispatch()
  function onClick () {
    dispatch(isSavedPlacementOpen())
  }
  return (
      <div className={"header"}>
        <div className={"header__btn-wrapper"} onClick={onClick}>
          <img src={bookmark} alt=""/>
        </div>
      </div>
  )
}

export default Header