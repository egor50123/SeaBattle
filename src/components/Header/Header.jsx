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
      </div>
  )
}

export default Header