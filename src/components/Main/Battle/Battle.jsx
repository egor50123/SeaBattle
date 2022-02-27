import BattleField from "../BattleField/BattleField";
import "./Battle.scss"
import {useBotShooting} from "../../../hooks/useBotShooting";
import {useSelector} from "react-redux";
import {getFirstShipsField} from "../../../selectors/selectors";
import {useCallback} from "react";
import {useStaticShipsPlacement} from "../../../hooks/useStaticShipsPlacement";

const Battle =() => {
  const shipField = useSelector(getFirstShipsField)

  const setShipPlacement = useStaticShipsPlacement()
  const botShoot = useBotShooting()

  const setShipPlacementMemo = useCallback(() => setShipPlacement(shipField),[shipField])
  console.log('Battle')
  return (
      <div className={"battleField-container"}>

        <BattleField isBattleForPlacement={false} id={1} setShipPlacement={setShipPlacementMemo}/>
        <BattleField isBattleForPlacement={false} id={2} botShoot={botShoot}/>
      </div>
  )
}

export default Battle