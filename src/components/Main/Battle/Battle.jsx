import {useSelector} from "react-redux";
import {getCurrentPage} from "../../../selectors/selectors";
import BattleField from "../BattleField/BattleField";
import "./Battle.scss"

const Battle =() => {
  const currentPage = useSelector( getCurrentPage )
  return (
      currentPage === "battleField" ?
      <div className={"battleField-container"}>
        <BattleField isBattleForPlacement={false} id={1}/>
        <BattleField isBattleForPlacement={false} id={2}/>
      </div> : null
  )
}

export default Battle