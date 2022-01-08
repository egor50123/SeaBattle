import {useDispatch, useSelector} from "react-redux";
import {
  dndDropCoordinates,
  setDeathSquares,
  setDndPotentialShip, setDndStatus,
  setShipSquares
} from "../../../redux/battleFieldReducer";
import {useDeathZone} from "../../../hooks/useDeathZone";

const Square = (props) => {
  const {id} = {...props}

  const dispatch = useDispatch()
  const createDeathZone = useDeathZone(true)

  const shipField = useSelector(state => state.battleField.shipField)
  const deathField = useSelector(state => state.battleField.deathField)
  const notEmptySquares = useSelector(state => state.battleField.notEmptySquares)

  const dndSettings = useSelector( state => state.battleField.dndSettings)
  const DNDSuccessShip = dndSettings.successShip
  const DNDUnsuccessfulShip = dndSettings.unsuccessfulShip
  const currentPart = dndSettings.currentPart
  const shipSize = dndSettings.shipSize

  let shipClass,deathClass,successShipClass,unsuccessfulShipClass

  if(shipField.length > 0) {
    shipClass = shipField.find( ship => ship.find( num => num === id)) ? "square--ship" : ''
    deathClass = deathField.find( square =>  square=== id) ? "square--death" : ''
  }
  if (DNDSuccessShip) successShipClass = DNDSuccessShip.includes(id) ? "square--dndSuccess" : '';
  if (DNDUnsuccessfulShip) unsuccessfulShipClass = DNDUnsuccessfulShip.includes(id) ? "square--dndUnsuccessful" : '';

  //const DOH = useDragOver(e,dndSettings.currentPart,dndSettings.shipSize,currentSquare)

  function dragOverHandler(e,currentPart,shipSize) {
    e.preventDefault();
    function createPotentialShip(currentPart,shipSize,currentSquare) {
      let ship = []
      for ( let i = 1; i<currentPart;i++) {
        ship.push(currentSquare-i)
      }
      for ( let i = 0; i<=shipSize-currentPart;i++) {
        ship.push(currentSquare+i)
      }
      return ship
    }
    let currentSquare = +e.target.id
    let potentialShip = createPotentialShip(currentPart,shipSize,currentSquare)
    let isPossibleToPlacement = true;

    for( let i = 0; i<potentialShip.length;i++) {
      if ( notEmptySquares.includes(potentialShip[i]) ) {
        isPossibleToPlacement = !notEmptySquares.includes(potentialShip[i])
        break;
      }
    }
    dispatch(setDndPotentialShip(potentialShip,isPossibleToPlacement))
  }

  function dropHandler(e,successShip,shipSize) {
    if (successShip) {
      let x = e.target.getBoundingClientRect().left
      let y  = e.target.getBoundingClientRect().top
      let ship = [successShip]
      let shipDeathZone = createDeathZone(ship[0],1)
      dispatch(setShipSquares(ship))
      dispatch(setDeathSquares(shipDeathZone))
      dispatch(dndDropCoordinates(x,y))
      dispatch(setDndStatus())

    }
  }

  //console.log("RENDER")
  return (
      <span className={`square ${deathClass} ${shipClass} ${successShipClass} ${unsuccessfulShipClass}`} id={id} key={id}
            onDragOver={(e) => dragOverHandler(e,currentPart,shipSize)}
            onDrop={(e)=> dropHandler(e,DNDSuccessShip,shipSize)}>{id}</span>
  )
}

export default Square