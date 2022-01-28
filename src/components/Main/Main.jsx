import Menu from "./Menu/Menu";
import Container from "./Container/Container";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPage} from "../../selectors/selectors";
import {setCurrentPage} from "../../redux/appInitReducer";
import "../Common/RoundButton.scss"
import {clearShipsData} from "../../redux/battleFieldReducer";
import Battle from "./Battle/Battle";

const Main = () => {
  const dispatch = useDispatch()
  const currentPage = useSelector(getCurrentPage)
  function onclickHandler() {
    switch (currentPage) {
      case "placement": {
        dispatch(clearShipsData())
        dispatch(setCurrentPage("menu"));

        break
      }
      case "battleField": {
        dispatch(clearShipsData())
        dispatch(setCurrentPage("placement"));
        break
      }
      default: break
    }

  }

  return (
      <div className={"main-container"}>
        <div className={"main-container_btn-wrapper"}>
          <button className={"btn-round"} onClick={onclickHandler}>Назад</button>
        </div>
        <Menu/>
        <Container/>
        <Battle />
      </div>
  )
}

export default Main