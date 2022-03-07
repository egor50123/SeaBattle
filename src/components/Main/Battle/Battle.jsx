import BattleField from "../BattleField/BattleField";
import "./Battle.scss"
import {useBotShooting} from "../../../hooks/useBotShooting";
import {useStaticShipsPlacement} from "../../../hooks/useStaticShipsPlacement";
import BattleStats from "./BattleStats/BattleStats";
import Triangle from "../../Common/Triangle/Triangle";

const Battle =() => {
  const setShipPlacement = useStaticShipsPlacement()
  const botShoot = useBotShooting()

  //console.log('Battle')
  return (
      <div className={"battle"}>
        <div className={"battle__stats"}>
          <BattleStats/>
        </div>

        <div className={"battle__fields"}>
          <BattleField isBattleForPlacement={false} id={1} setShipPlacement={setShipPlacement}/>
          <Triangle/>
          <BattleField isBattleForPlacement={false} id={2} botShoot={botShoot} setShipPlacement={setShipPlacement}/>
        </div>

      </div>
  )
}

export default Battle