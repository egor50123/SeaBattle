import "./BattleField.scss"
import {useEffect, useMemo, useRef} from "react";
import {useGetDamagedShip} from "../../../hooks/useGetDamagedShip";
import "../Placement/placement.scss"
import {useMakeField} from "../../../hooks/useMakeField";
import Rocket from "../../Common/Rocket/Rocket";
import {useDispatch, useSelector} from "react-redux";
import {setPlacementFieldCoordinates} from "../../../redux/battleFieldReducer";
import {getStatusInitCoordinates} from "../../../selectors/selectors";

const BattleField = (props) => {
  const {isBattleForPlacement, id:fieldId, setShipPlacement,botShoot} = {...props}
  const currentDamagedShip = useGetDamagedShip(fieldId),
        makeField = useMakeField({isBattleForPlacement})
  const ref = useRef(null)
  const dispatch = useDispatch()
  const initCoorStatus = useSelector(getStatusInitCoordinates)



  let relativeClass = isBattleForPlacement ? null : "field__wrapper--relative";

  const memoField = useMemo( () => makeField({fieldId, botShoot, currentDamagedShip}),[fieldId])

  useEffect( () => {
    if (!isBattleForPlacement || initCoorStatus) return
    let coordinates = ref.current.getBoundingClientRect()
    dispatch(setPlacementFieldCoordinates(coordinates))
  },[])
  //console.log("battleField")
  return (
      <div ref={ref} className={'field placement__box'}>
        <div className={`field__wrapper ${relativeClass}`}>
          {memoField}
          {setShipPlacement !== undefined && setShipPlacement(fieldId)}
          {!isBattleForPlacement && <Rocket fieldId={fieldId}/>}
        </div>
      </div>
  )
}


export default BattleField