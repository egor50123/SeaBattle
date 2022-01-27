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
import {
  getDNDCurrentPart,
  getDeathField,
  getDNDSuccessShip,
  getDNDUnsuccessfulShip,
  getNotEmptySquares, getDNDPrevSquare,
  getShipField, getDNDShipSize, getDNDDirection
} from "../../../selectors/selectors";

const Square = (props) => {
  const {id} = {...props},
     ref = useRef(id),
     dispatch = useDispatch(),
     createDeathZone = useDeathZone(true)

  const shipField = useSelector(getShipField),
     deathField = useSelector(getDeathField),
     notEmptySquares = useSelector(getNotEmptySquares)

  const DNDSuccessShip = useSelector( getDNDSuccessShip),
     DNDUnsuccessfulShip = useSelector( getDNDUnsuccessfulShip),
     currentPart = useSelector( getDNDCurrentPart),
     shipSize = useSelector( getDNDShipSize),
     prevSquare = useSelector( getDNDPrevSquare),
      direction = useSelector( getDNDDirection)

  const ships = useSelector( state => state.battleField.ships)

  let shipClass,deathClass,successShipClass,unsuccessfulShipClass

  // const ships =  [{id:1,size:4,},
  //   {id:2,size:3,},
  //   {id:3,size:3,},
  //   {id:4,size:2,},
  //   {id:5,size:2,},
  //   {id:6,size:2,},
  //   {id:7,size:1,},
  //   {id:8,size:1,},
  //   {id:9,size:1,},
  //   {id:10,size:1,}]



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
          // если координаты не изменились - выходим из функции
          if (ships[i].x === x && ships[i].y === y) return
          dispatch(setStartShipDataCoordinates(x,y,ships[i].id))
          return;
        }
      }
  },[shipField])

//   if (shipField.length > 0) {
//   for (let i = 0; i < shipField.length; i++) {
//     if (shipField[i][0] === +ref.current.id) {
//       let x = ref.current.getBoundingClientRect().left;
//       let y = ref.current.getBoundingClientRect().top;
//       dispatch(setStartShipDataCoordinates(x, y, ships[i].id))
//       break;
//     }
//   }
// }




  function dragOverHandler(e,currentPart,shipSize,prevSquare,prevSuccessShip,prevUnsuccessfulShip,direction) {
    e.preventDefault();
    let currentSquare = +e.target.id
    function createPotentialShip(currentPart,shipSize,currentSquare,direction) {
      let ship = []
      for ( let i = 1; i<currentPart;i++) {
        if (direction === 1) ship.push(currentSquare-i)
        if (direction === 0) ship.push(currentSquare-i*10)
      }
      for ( let i = 0; i<=shipSize-currentPart;i++) {
        if (direction === 1) ship.push(currentSquare+i)
        if (direction === 0) ship.push(currentSquare+i*10)
      }
      return ship
    }

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

      // Проверяем вмещается ли полностью перетаскиваемый корабль на поле (горизонтальный и вертикальный соответсвенно)
      if ( direction === 1 && (rightBorder.find(item => item.includes(currentSquare)) || leftBorder.find(item => item.includes(currentSquare)))) {
          isShipAboveTheField = !!rightBorder.find( item => item[0] === currentSquare) || !!leftBorder.find( item => item[item.length-1] === currentSquare)
      } else if ( direction === 0  && (currentSquare + (shipSize-currentPart)*10 > 100 || currentSquare - (currentPart-1)*10 <= 0)) {
        isShipAboveTheField = false
      }

      if (isShipAboveTheField) {
        potentialShip = createPotentialShip(currentPart,shipSize,currentSquare,direction)
        // Проверяем можно ли дропнуть потенциальный корабль на поле
        for( let i = 0; i<potentialShip.length;i++) {
          if ( notEmptySquares.includes(potentialShip[i]) ) {
            isPossibleToPlacement = !notEmptySquares.includes(potentialShip[i])
            break;
          }
        }
      }

    //square + 4-3


      if (isShipAboveTheField) {
        dispatch(setDndPrevSquare(currentSquare))
        dispatch(setDndPotentialShip(potentialShip,isPossibleToPlacement))

      } else if (prevSuccessShip || prevUnsuccessfulShip){
        dispatch(deleteDndPrevPotentialShip())
      }
    }

  }

  function dropHandler(e,successShip,direction) {
    if (successShip) {
      let x = e.target.getBoundingClientRect().left
      let y  = e.target.getBoundingClientRect().top
      let shipDeathZone = createDeathZone(successShip,direction)
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
            onDragOver={(e) => dragOverHandler(e,currentPart,shipSize,prevSquare,DNDSuccessShip,DNDUnsuccessfulShip,direction)}
            onDrop={(e)=> dropHandler(e,DNDSuccessShip,direction)}>{id}</span>
  )
}

export default Square