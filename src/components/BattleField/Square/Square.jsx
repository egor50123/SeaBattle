import {useDispatch, useSelector} from "react-redux";
import {
  dndDropCoordinates,
  setDeathSquares,
  setDndPotentialShip, setDndPrevSquare, setDndStatus,
  setShipSquares, setStartShipDataCoordinates
} from "../../../redux/battleFieldReducer";
import {useDeathZone} from "../../../hooks/useDeathZone";
import {useEffect, useRef} from "react";

const Square = (props) => {
  const {id} = {...props},
     ref = useRef(id),
     dispatch = useDispatch(),
     createDeathZone = useDeathZone(true)

  const shipField = useSelector(state => state.battleField.shipField),
     deathField = useSelector(state => state.battleField.deathField),
     notEmptySquares = useSelector(state => state.battleField.notEmptySquares)

  const DNDSuccessShip = useSelector( state => state.battleField.dndSettings.successShip),
     DNDUnsuccessfulShip = useSelector( state => state.battleField.dndSettings.unsuccessfulShip),
     currentPart = useSelector( state => state.battleField.dndSettings.currentPart),
     shipSize = useSelector( state => state.battleField.dndSettings.shipSize),
     prevSquare = useSelector( state => state.battleField.dndSettings.prevSquare)

  const ships = useSelector( state => state.battleField.ships)

  let shipClass,deathClass,successShipClass,unsuccessfulShipClass



  if(shipField.length > 0) {
    shipClass = shipField.find( ship => ship.includes(id)) ? "square--ship" : ''
    deathClass = deathField.find( deathZone =>  deathZone.includes(id)) ? "square--death" : ''
  }
  if (DNDSuccessShip) successShipClass = DNDSuccessShip.includes(id) ? "square--dndSuccess" : '';
  if (DNDUnsuccessfulShip) unsuccessfulShipClass = DNDUnsuccessfulShip.includes(id) ? "square--dndUnsuccessful" : '';


  useEffect(() => {
      for (let i = 0; i<10; i++) {
        if (ships[i].shipSquares && ships[i].shipSquares[0] === +ref.current.id) {
          let x = ref.current.getBoundingClientRect().left;
          let y = ref.current.getBoundingClientRect().top;
          dispatch(setStartShipDataCoordinates(x,y,ships[i].id))
          break;
        }
      }
  },[shipField])


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
    // function isShipAboveTheField (currentPart,shipSize,currentSquare) {
    //   const rightBorderDefault = [
    //     [8,9,10],
    //     [18,19,20],
    //     [28,29,30],
    //     [38,39,40],
    //     [48,49,50],
    //     [58,59,60],
    //     [68,69,70],
    //     [78,79,80],
    //     [88,89,90],
    //     [98,99,100],
    //   ]
    //   const leftBorderDefault = [
    //     [1,2,3],
    //     [11,12,13],
    //     [21,22,23],
    //     [31,32,33],
    //     [41,42,43],
    //     [51,52,53],
    //     [61,62,63],
    //     [71,72,73],
    //     [81,82,83],
    //     [91,92,93],
    //   ]
    //   let rightBorder = rightBorderDefault.map(item => item.slice(-(shipSize-currentPart)))
    //   let leftBorder = leftBorderDefault.map(item => item.slice(0,(shipSize-currentPart)))
    //
    //   if (rightBorder.find(item => item.includes(currentSquare)) && rightBorder.find(item => item[item.length-1].includes(currentSquare))) {
    //     return true
    //   } else if (leftBorder.find(item => item.includes(currentSquare)) && leftBorder.find(item => item[0].includes(currentSquare))) {}
    // }

    let currentSquare = +e.target.id

    if ( currentSquare !== prevSquare) {
      let potentialShip = createPotentialShip(currentPart,shipSize,currentSquare)
      let isPossibleToPlacement = true;

      for( let i = 0; i<potentialShip.length;i++) {
        if ( notEmptySquares.includes(potentialShip[i]) ) {
          isPossibleToPlacement = !notEmptySquares.includes(potentialShip[i])
          break;
        }
      }
      dispatch(setDndPrevSquare(currentSquare))
      dispatch(setDndPotentialShip(potentialShip,isPossibleToPlacement))
    }

  }

  function dropHandler(e,successShip) {
    if (successShip) {
      let x = e.target.getBoundingClientRect().left
      let y  = e.target.getBoundingClientRect().top
      let shipDeathZone = createDeathZone(successShip,1)
      dispatch(setShipSquares([successShip]))
      dispatch(setDeathSquares([shipDeathZone]))
      dispatch(dndDropCoordinates(x,y))
      dispatch(setDndStatus(successShip))

    }
  }

  //console.log("RENDER Square")
  return (
      <span ref={ref} className={`square ${deathClass} ${shipClass} ${successShipClass} ${unsuccessfulShipClass}`} id={id}
            onDragOver={(e) => dragOverHandler(e,currentPart,shipSize,prevSquare)}
            onDrop={(e)=> dropHandler(e,DNDSuccessShip)}>{id}</span>
  )
}

export default Square