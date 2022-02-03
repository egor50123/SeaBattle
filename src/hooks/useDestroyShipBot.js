export const useDestroyShipBot = () => {
  function findPotentialPlacement() {

  }
  return (hitId,emptySquares,killedShips,damagedShip) => {
    let nextHit = null
    if (!killedShips.find(ship => ship.length === 4)) {
      let size = 4;
      const rightBorderDefault = [
        [8,9,10],
        [18,19,20],
        [28,29,30],
        [38,39,40],
        [48,49,50],
        [58,59,60],
        [68,69,70],
        [78,79,80],
        [88,89,90],
        [98,99,100],
      ]
      const leftBorderDefault = [
        [1,2,3],
        [11,12,13],
        [21,22,23],
        [31,32,33],
        [41,42,43],
        [51,52,53],
        [61,62,63],
        [71,72,73],
        [81,82,83],
        [91,92,93],
      ]
      let rightBorder = rightBorderDefault.map(item => item.slice(-(size-1)))
      let leftBorder = leftBorderDefault.map(item => item.slice(0,(size-1)))

      const initPosition = [[1,1,0,1], [1,0,1,1], [0,1,1,1], [1,1,1,0]]
      let potentialPositionV = [[1,1,0,1], [1,0,1,1], [0,1,1,1], [1,1,1,0]] // [ [1,1,hit,1], [1,hit,1,1], [hit,1,1,1], [1,1,1,hit]]
      let potentialPositionH = [[1,1,0,1], [1,0,1,1], [0,1,1,1], [1,1,1,0]] // [ [1,1,hit,1], [1,hit,1,1], [hit,1,1,1], [1,1,1,hit]]

      let isTopEmpty,isBottomEmpty,isRightEmpty,isLeftEmpty = true
      for (let i=1; i<size; i++) {
        if (isTopEmpty && !emptySquares.includes(hitId - 10 * i)) {
          switch (i) {
            case 1: {
              potentialPositionV[0] = false;
              potentialPositionV[1] = false;
              potentialPositionV[3] = false;
              isTopEmpty = false
              break;
            }
            case 2: {
              potentialPositionV[0] = false;
              potentialPositionV[3] = false;
              isTopEmpty = false
              break;
            }
            case 3: {
              potentialPositionV[3] = false;
              isTopEmpty = false
              break;
            }
            default: break;
          }
        }
        if(isBottomEmpty && !emptySquares.includes(hitId + 10 * i)) {
          switch (i) {
            case 1: {
              potentialPositionV[0] = false;
              potentialPositionV[1] = false;
              potentialPositionV[2] = false;
              isBottomEmpty = false
              break;
            }
            case 2: {
              potentialPositionV[1] = false;
              potentialPositionV[2] = false;
              isBottomEmpty = false
              break;
            }
            case 3: {
              potentialPositionV[2] = false;
              isBottomEmpty = false
              break;
            }
            default: break;
          }
        }
        if(isRightEmpty && !emptySquares.includes(hitId + i)) {
          switch (i) {
            case 1: {
              potentialPositionH[0] = false;
              potentialPositionH[1] = false;
              potentialPositionH[3] = false;
              isRightEmpty = false
              break;
            }
            case 2: {
              potentialPositionH[0] = false;
              potentialPositionH[3] = false;
              isRightEmpty = false
              break;
            }
            case 3: {
              potentialPositionH[3] = false;
              isRightEmpty = false
              break;
            }
            default: break;
          }
        }
        if(isLeftEmpty && !emptySquares.includes(hitId - i)) {
          switch (i) {
            case 1: {
              potentialPositionH[0] = false;
              potentialPositionH[1] = false;
              potentialPositionH[2] = false;
              isLeftEmpty = false
              break;
            }
            case 2: {
              potentialPositionH[1] = false;
              potentialPositionH[2] = false;
              isLeftEmpty = false
              break;
            }
            case 3: {
              potentialPositionH[2] = false;
              isLeftEmpty = false
              break;
            }
            default: break;
          }
        }
      }

      let direction = Math.floor(Math.random() * 2);
      if (direction === 1) {
        const positions = potentialPositionH.filter(item => item !== false)
        let positionIndex = Math.floor(Math.random() * positions.length);
        let position = positions[positionIndex]

        if (position.indexOf(0) !== 0 || position.indexOf(0) !== position.length - 1) {
          nextHit = Math.floor(Math.random() * 2) === 1 ? position[position.indexOf(0) + 1] : position[position.indexOf(0) - 1]
        } else if (position.indexOf(0) === 0) {
          nextHit = position[position.indexOf(0) + 1]
        } else if ( position.indexOf(0) === position.length - 1) {
          nextHit = position[position.indexOf(0) - 1]
        }
      }
      //берем динамические границы из useShip
      //и прроверки свободны ли вверх и низ
      console.log("here");
    }
    return nextHit
  }
}