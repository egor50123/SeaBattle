import {useSelector} from "react-redux";
import {getCurrentPage} from "../../../selectors/selectors";
import BattleField from "../BattleField/BattleField";
import "./Battle.scss"
import {useBotShooting} from "../../../hooks/useBotShooting";

const Battle =() => {
  const currentPage = useSelector( getCurrentPage )
  const botShoot = useBotShooting()
  return (
      currentPage === "battleField" ?
      <div className={"battleField-container"}>
        <BattleField isBattleForPlacement={false} id={1}/>
        <BattleField isBattleForPlacement={false} id={2} botShoot={botShoot}/>
      </div> : null
  )
}

export default Battle