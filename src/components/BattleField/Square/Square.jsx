import {useDispatch, useSelector} from "react-redux";
import {
  deleteDndPrevPotentialShip,
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
    // Если номер квадррата соответсвует первой клетке корабля , то диспатчим координаты квадата для последующего размещения кораблей
      for (let i = 0; i<10; i++) {
        if (ships[i].shipSquares && ships[i].shipSquares[0] === +ref.current.id) {
          let x = ref.current.getBoundingClientRect().left;
          let y = ref.current.getBoundingClientRect().top;
          dispatch(setStartShipDataCoordinates(x,y,ships[i].id))
          break;
        }
      }
  },[shipField])


  function dragOverHandler(e,currentPart,shipSize,prevSquare,prevSuccessShip,prevUnsuccessfulShip) {
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

    // если корабль был передвинут на другую клетку то выполняем блок
    if ( currentSquare !== prevSquare) {
      let isPossibleToPlacement = true;
      let isShipAboveTheField = true
      let potentialShip

      const rightBorder = [
        [7,8,9,10],
        [17,18,19,20],
        [27,28,29,30],
        [37,38,39,40],
        [47,48,49,50],
        [57,58,59,60],
        [67,68,69,70],
        [77,78,79,80],
        [87,88,89,90],
        [97,98,99,100],
      ].map(item => item.slice(-(shipSize-currentPart+1)))
      const leftBorder = [
        [1,2,3,4],
        [11,12,13,14],
        [21,22,23,24],
        [31,32,33,34],
        [41,42,43,44],
        [51,52,53,54],
        [61,62,63,64],
        [71,72,73,74],
        [81,82,83,84],
        [91,92,93,94],
      ].map(item => item.slice(0,currentPart))

      // Проверяем вмещается ли полностью перетаскиваемый корабль на поле
      if ( rightBorder.find(item => item.includes(currentSquare)) || leftBorder.find(item => item.includes(currentSquare))) {
          isShipAboveTheField = !!rightBorder.find( item => item[0] === currentSquare) || !!leftBorder.find( item => item[item.length-1] === currentSquare)
      }

      if (isShipAboveTheField) {
        potentialShip = createPotentialShip(currentPart,shipSize,currentSquare)
        // Проверяем можно ли дропнуть потенциальный корабль на поле
        for( let i = 0; i<potentialShip.length;i++) {
          if ( notEmptySquares.includes(potentialShip[i]) ) {
            isPossibleToPlacement = !notEmptySquares.includes(potentialShip[i])
            break;
          }
        }
      }


      if (isShipAboveTheField) {
        dispatch(setDndPrevSquare(currentSquare))
        dispatch(setDndPotentialShip(potentialShip,isPossibleToPlacement))

      } else if (prevSuccessShip || prevUnsuccessfulShip){
        dispatch(deleteDndPrevPotentialShip())
      }
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
      //!!!!!!!!!
      dispatch(setDndStatus(successShip))

    }
  }

  function dragLeaveHandler() {
    dispatch(deleteDndPrevPotentialShip())
  }

  //console.log("RENDER Square")
  return (
      <span ref={ref} className={`square ${deathClass} ${shipClass} ${successShipClass} ${unsuccessfulShipClass}`} id={id}
            onDragLeave={dragLeaveHandler}
            onDragOver={(e) => dragOverHandler(e,currentPart,shipSize,prevSquare,DNDSuccessShip,DNDUnsuccessfulShip)}
            onDrop={(e)=> dropHandler(e,DNDSuccessShip)}>{id}</span>
  )
}

export default Square