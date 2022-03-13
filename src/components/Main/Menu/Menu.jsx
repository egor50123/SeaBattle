import "./Menu.scss"
import Button from "../../Common/Button/Button";
import {setCurrentPage} from "../../../redux/appInitReducer";
import {useCallback} from "react";
import {useDispatch} from "react-redux";

const Menu = (props) => {
  const nextPage = props.nextPage
  const dispatch = useDispatch()

  const toPlacement = useCallback((nextPage) => {
    dispatch(setCurrentPage(nextPage))
  },[])

  const showMessage = useCallback( () => {
    alert("Скоро будет")
  },[])

  return (
      <div className={"menu"}>
        <div className={"menu__text"}>
          <p>Морской бой</p>
        </div>
        <div className={"menu__list"}>
          <div className={"menu__wrapper"}>
            <Button  params={nextPage} text={"Один Игрок"} func={toPlacement}/>
            <Button  type={"disable"} text={"Два игрока"} func={showMessage}/>
          </div>
        </div>
      </div>
  )
}

export default Menu