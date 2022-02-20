import BattleField from "../BattleField/BattleField";
import "./Battle.scss"
import {useBotShooting} from "../../../hooks/useBotShooting";

const Battle =() => {
  const botShoot = useBotShooting()

  return (
      <div className={"battleField-container"}>
        <BattleField isBattleForPlacement={false} id={1}/>
        <BattleField isBattleForPlacement={false} id={2} botShoot={botShoot}/>
      </div>
  )
}

export default Battle