import BattleField from "../BattleField/BattleField";
import "./Battle.scss"
import {useBotShooting} from "../../../hooks/Battle/useBotShooting";
import {useStaticShipsPlacement} from "../../../hooks/Battle/useStaticShipsPlacement";
import BattleStats from "./BattleStats/BattleStats";
import Triangle from "../../Common/Triangle/Triangle";
import React from "react";

const Battle =() => {
  const setShipPlacement = useStaticShipsPlacement()
  const botShoot = useBotShooting()

  return (
      <div className={"battle"}>
        <div className={"battle__stats"}>
          <BattleStats/>
        </div>

        <div className={"battle__fields"}>
          <div className={"battle__name"}><span>Сражение</span></div>
          <BattleField isBattleForPlacement={false} id={1} setShipPlacement={setShipPlacement}/>
          <Triangle/>
          <BattleField isBattleForPlacement={false} id={2} botShoot={botShoot} setShipPlacement={setShipPlacement}/>
        </div>

      </div>
  )
}

export default Battle