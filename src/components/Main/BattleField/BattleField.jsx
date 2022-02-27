import "./BattleField.scss"
import {useMemo} from "react";
import {useGetDamagedShip} from "../../../hooks/useGetDamagedShip";
import "../Placement/placement.scss"
import {useMakeField} from "../../../hooks/useMakeField";
import Rocket from "../../Common/Rocket/Rocket";

const BattleField = (props) => {
  const {isBattleForPlacement, id:fieldId, setShipPlacement,botShoot} = {...props}

  const currentDamagedShip = useGetDamagedShip(fieldId),
        makeField = useMakeField(isBattleForPlacement)

  let relativeClass = isBattleForPlacement ? null : "field__wrapper--relative";

  const memoField = useMemo( () => makeField({fieldId, botShoot, currentDamagedShip}),[fieldId])

  return (
    <div className={'field placement__box'}>
      <div className={`field__wrapper ${relativeClass}`}>
        {memoField}
        {setShipPlacement !== undefined && setShipPlacement()}
        {!isBattleForPlacement && <Rocket/>}
      </div>
    </div>
  )
}

export default BattleField