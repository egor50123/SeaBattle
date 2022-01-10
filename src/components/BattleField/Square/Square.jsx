import {useDispatch, useSelector} from "react-redux";
import {
  dndDropCoordinates,
  setDeathSquares,
  setDndPotentialShip, setDndPrevSquare, setDndStatus,
  setShipSquares, setStartShipData, setStartShipDataCoordinates
} from "../../../redux/battleFieldReducer";
import {useDeathZone} from "../../../hooks/useDeathZone";
import {useEffect, useRef} from "react";

const Square = (props) => {
  const {id} = {...props}
  const ref = useRef(id)
  const dispatch = useDispatch()
  const createDeathZone = useDeathZone(true)

  const shipField = useSelector(state => state.battleField.shipField)
  const deathField = useSelector(state => state.battleField.deathField)
  const notEmptySquares = useSelector(state => state.battleField.notEmptySquares)
  const startSquareOfShip = useSelector(state => state.battleField.startSquareOfShip)

  const DNDSuccessShip = useSelector( state => state.battleField.dndSettings.successShip)
  const DNDUnsuccessfulShip = useSelector( state => state.battleField.dndSettings.unsuccessfulShip)
  const currentPart = useSelector( state => state.battleField.dndSettings.currentPart)
  const shipSize = useSelector( state => state.battleField.dndSettings.shipSize)
  const prevSquare = useSelector( state => state.battleField.dndSettings.prevSquare)

  let shipClass,deathClass,successShipClass,unsuccessfulShipClass



  if(shipField.length > 0) {
    shipClass = shipField.find( ship => ship.find( num => num === id)) ? "square--ship" : ''
    deathClass = deathField.find( square =>  square=== id) ? "square--death" : ''
  }
  if (DNDSuccessShip) successShipClass = DNDSuccessShip.includes(id) ? "square--dndSuccess" : '';
  if (DNDUnsuccessfulShip) unsuccessfulShipClass = DNDUnsuccessfulShip.includes(id) ? "square--dndUnsuccessful" : '';


  if (startSquareOfShip.length === 10) {
    for (let i = 0; i<10; i++) {
      if (startSquareOfShip[i].squareID === +ref.current.id) {
        let x = ref.current.getBoundingClientRect().left;
        let y = ref.current.getBoundingClientRect().top;
        dispatch(setStartShipDataCoordinates(x,y,startSquareOfShip[i].shipId))
      }
    }
  }

  function dragOverHandler(e,currentPart,shipSize,prevSquare) {
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
    if ( currentSquare !== prevSquare) {
      dispatch(setDndPrevSquare(currentSquare))
      dispatch(setDndPotentialShip(potentialShip,isPossibleToPlacement))
    }

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
      dispatch(setDndStatus(successShip))

    }
  }

  //console.log("RENDER Square")
  return (
      <span ref={ref} className={`square ${deathClass} ${shipClass} ${successShipClass} ${unsuccessfulShipClass}`} id={id} key={id}
            onDragOver={(e) => dragOverHandler(e,currentPart,shipSize,prevSquare)}
            onDrop={(e)=> dropHandler(e,DNDSuccessShip,shipSize)}>{id}</span>
  )
}

export default Square