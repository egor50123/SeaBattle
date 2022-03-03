import {
  changePlayer,
  setDamagedShipsPlayer, setDestroyedShip,
  setGameOver,
  setHit,
  setMiss,
  setTotalDestroyedShipsPlayer
} from "../redux/battleFieldReducer";
import {useDispatch, useSelector} from "react-redux";
import {useDeathZone} from "./useDeathZone";
import {useGetDamagedShip} from "./useGetDamagedShip";
import {getDamagedShipsForPlayer, getTotalDamagedShipsByPlayer} from "../selectors/selectors";

export const usePlayerClick = ({secondShipField}) => {
  const dispatch = useDispatch()
  const createDeathZone = useDeathZone(),
        getCurrentDamagedShip = useGetDamagedShip(1),
        damagedShips = useSelector(getDamagedShipsForPlayer)

  let totalDestroyedShipsByPlayer = useSelector(getTotalDamagedShipsByPlayer)

  return ({targetSquare,currentPlayer}) => {
    let isHit = !!secondShipField.find(item => item.includes(targetSquare))
    if (isHit) {
      let damagedCurrentShip = getCurrentDamagedShip(targetSquare)
      let indexOfShip = secondShipField.indexOf(secondShipField.find(ship => ship.includes(targetSquare)))
      dispatch(setHit(targetSquare, 2))

      if (damagedCurrentShip.length === 1) {
        let deathZone = createDeathZone(damagedCurrentShip)
        dispatch(setMiss(deathZone,2))
        dispatch(setTotalDestroyedShipsPlayer())
        if(++totalDestroyedShipsByPlayer === 10) dispatch(setGameOver())
      } else {
        dispatch(setDamagedShipsPlayer(targetSquare))
        let damagedShip = damagedShips.find(obj => obj.id === indexOfShip)

        if (damagedShip && damagedCurrentShip.length === damagedShip.squares.length) {
          let deathZone = createDeathZone(damagedCurrentShip)
          dispatch(setDestroyedShip(damagedCurrentShip,1))
          dispatch(setMiss(deathZone,2))
          dispatch(setTotalDestroyedShipsPlayer())
          if(++totalDestroyedShipsByPlayer === 10) dispatch(setGameOver())
        }
      }



    } else {
      dispatch(setMiss([targetSquare], 2))
      dispatch(changePlayer())

      if (currentPlayer) {
        return true
      }
    }
  }
}