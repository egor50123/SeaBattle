import {useDispatch} from "react-redux";
import {setDamageShip} from "../redux/battleFieldReducer";

export const useDestroyShipBot = () => {
  const dispatch = useDispatch()
  let damagedSquaresOfShip = []
  function findPotentialPlacement() {

  }
  return (hitId,emptySquares,damagedShipInit,damageShipSquares) => {
    if (damageShipSquares.length !== 0) {
      damagedSquaresOfShip = damageShipSquares.slice()
    } else {
      damagedSquaresOfShip.push(hitId)
    }
    debugger
    let nextHit = null
    let isDestroyed = null
    if (!damagedSquaresOfShip.find(ship => ship.length === 4)) {
      let size = 4;

      const initPosition = [[1,1,0,1], [1,0,1,1], [0,1,1,1], [1,1,1,0]]
      let potentialPositionV = [[1,1,0,1], [1,0,1,1], [0,1,1,1], [1,1,1,0]] // [ [1,1,hit,1], [1,hit,1,1], [hit,1,1,1], [1,1,1,hit]]

      let potentialPositionH = [[1,1,0,1], [1,0,1,1], [0,1,1,1], [1,1,1,0]] // [ [1,1,hit,1], [1,hit,1,1], [hit,1,1,1], [1,1,1,hit]]
      let potentialPosition3H = [[1,0,1], [1,1,0], [0,1,1]]
      let potentialPosition2H = [[1,0],[0,1]]

      let isTopEmpty = true,
          isBottomEmpty = true,
          isRightEmpty = true,
          isLeftEmpty = true




      let initRow = Math.ceil(hitId/10)
      let damagedSquaresShipSort =  damagedSquaresOfShip.sort((a,b) => a-b)
      const difference = damagedSquaresShipSort.length - 1
      if (damagedSquaresOfShip.length === 1) {
        for (let i = 1; i < size; i++) {
          let currentRow = null
          let isNextSquareNotEmpty = !emptySquares.includes(damagedSquaresShipSort[0] + i)
          currentRow = Math.ceil((hitId + i) / 10)
          if (isRightEmpty && (initRow !== currentRow || isNextSquareNotEmpty)) {
            switch (i) {
              case 1: {
                potentialPositionH[0] = false;
                potentialPositionH[1] = false;
                potentialPositionH[2] = false;
                isRightEmpty = false
                break;
              }
              case 2: {
                potentialPositionH[1] = false;
                potentialPositionH[2] = false;
                isRightEmpty = false
                break;
              }
              case 3: {
                potentialPositionH[2] = false;
                isRightEmpty = false
                break;
              }
              default:
                break;
            }
          }
          currentRow = Math.ceil((hitId - i) / 10)
          isNextSquareNotEmpty = !emptySquares.includes(damagedSquaresShipSort[0] - i)
          if (isLeftEmpty && (initRow !== currentRow || isNextSquareNotEmpty)) {
            switch (i) {
              case 1: {
                potentialPositionH[0] = false;
                potentialPositionH[1] = false;
                potentialPositionH[3] = false;
                isLeftEmpty = false
                break;
              }
              case 2: {
                potentialPositionH[0] = false;
                potentialPositionH[3] = false;
                isLeftEmpty = false
                break;
              }
              case 3: {
                potentialPositionH[3] = false;
                isLeftEmpty = false
                break;
              }
              default:
                break;
            }
          }

        }
      }
      if (damagedSquaresOfShip.length > 1) {
        for (let i = 1; i <= size - damagedSquaresOfShip.length;i++) {
          let currentRow = null
          let isNextSquareNotEmpty = !emptySquares.includes(damagedSquaresShipSort[0] + i + difference)
          currentRow = Math.ceil((damagedSquaresShipSort[0]+i+difference)/10)
          if (isRightEmpty && (initRow !== currentRow || isNextSquareNotEmpty)) {
            // Перебираем потенциальные клетки расположения корабля, если соседняя клетка уже не подходит - следующие за  ней не обрабатываем
            switch (i) {
              case 1: {
                // В зависмости от того, сколько клеток корабля уже поврежедено, выбираем следующие потенциальные клетки из соответствующих массивов (potentialPosition3H,
                // potentialPosition2H
                switch (damagedSquaresOfShip.length) {
                  case 2: {
                    potentialPosition3H[0] = false
                    potentialPosition3H[2] = false
                    isRightEmpty = false
                    break
                  }
                  case 3: {
                    potentialPosition2H[1] = false
                    isRightEmpty = false
                    break
                  }
                  default: break;
                }
                break;
              }
              case 2: {
                potentialPosition3H[2] = false
                isRightEmpty = false
                break
              }
              default: break
            }
          }

          currentRow = Math.ceil((damagedSquaresShipSort[0]-i)/10)
          isNextSquareNotEmpty = !emptySquares.includes(damagedSquaresShipSort[0] - i)
          if (isLeftEmpty && (initRow !== currentRow || isNextSquareNotEmpty)) {
            switch (i) {
              case 1: {
                switch (damagedSquaresOfShip.length) {
                  case 2: {
                    potentialPosition3H[0] = false
                    isLeftEmpty[1] = false
                    isRightEmpty = false
                    break
                  }
                  case 3: {
                    potentialPosition2H[0] = false
                    isLeftEmpty = false
                    break
                  }
                  default: break;
                }
                break;

              }
              case 2: {
                potentialPosition3H[1] = false
                isLeftEmpty = false
                break
              }
              default: break
            }
          }
        }
      }
      if (damagedSquaresOfShip.length === damagedShipInit.length) {
        damagedSquaresOfShip = []
        isDestroyed = true
      }

      //let direction = Math.floor(Math.random() * 2);
      let direction = 1
      if (direction === 1) {
        let positions = []
        switch (damagedSquaresOfShip.length) {
          case 1: positions = potentialPositionH.filter(item => item !== false); break;
          case 2: positions = potentialPosition3H.filter(item => item !== false); break;
          case 3: positions = potentialPosition2H.filter(item => item !== false); break;
          default:break;
        }
        let positionIndex = Math.floor(Math.random() * positions.length);
        let position = positions[positionIndex]
        let indexOfPrevHit = position.indexOf(0)

        if (indexOfPrevHit !== 0 && indexOfPrevHit !== position.length - 1) {
          //nextHit = Math.floor(Math.random() * 2) === 1 ? hitId + 1 : hitId - 1
          if (damagedSquaresOfShip.length === 1 ) {
            nextHit = hitId + 1
          } else {
            nextHit = damagedSquaresShipSort[0] + 1 + difference
          }

        } else if (indexOfPrevHit === 0) {
          if (damagedSquaresOfShip.length === 1 ) {
            nextHit = hitId + 1
          } else {
            nextHit = damagedSquaresShipSort[0] + 1 + difference
          }
        } else if ( indexOfPrevHit === position.length - 1) {
          if (damagedSquaresOfShip.length === 1 ) {
            nextHit = hitId - 1
          } else {
            nextHit = damagedSquaresShipSort[0] - 1
          }
        }
      }
      //берем динамические границы из useShip
      //и прроверки свободны ли вверх и низ
      console.log("here");
    }
    dispatch(setDamageShip(damagedSquaresOfShip))
    return [nextHit,isDestroyed]
  }
}