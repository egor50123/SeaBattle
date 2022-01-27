import {useRandomSquare} from "./useRandomSquare";

export const useShip = (strictMode = false) => {
  const getRandomSquare = useRandomSquare()
  return function createShip (squareId,size,direction,emptySquares = []) {
      if (size === 1) return [squareId];
      let shipsId = [];
      let step = 0;

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

    let isTopEmpty = true
      let isBottomEmpty = true
      let isRightEmpty = true
      let isLeftEmpty = true
      // проверяяем есть ли сверху занятые клетки
      for(let j=1; j<size;j++) {
        if (!emptySquares.includes(squareId - 10 * j)) isTopEmpty = false
        if (!emptySquares.includes(squareId + 10 * j)) isBottomEmpty = false
        if (!emptySquares.includes(squareId + j)) isRightEmpty = false
        if (!emptySquares.includes(squareId - j)) isLeftEmpty = false
      }

    for (let i = 1; i<=size;i++) {
        shipsId.push(squareId+step)
        //если по вертикали - делаем корабль от начального id вверх, если места мало - вниз
        if(direction === 0) {
          if ( squareId >= 1 + 10 * (size - 1) && isTopEmpty ) {
            step -= 10
          } else if( squareId <= 100 - 10 * (size - 1) && isBottomEmpty) {
            step += 10
          } else if(!strictMode && size === 3 && emptySquares.includes(squareId - 10) && emptySquares.includes(squareId + 10) && (squareId - 10)>0 && (squareId + 10)<=100){
            return  [squareId-10,squareId,squareId+10]
          } else if (!strictMode){
            return createShip(getRandomSquare(emptySquares),size,direction,emptySquares)
          } else {
            return null
          }
        }
        // если по горизонтали - делаем коробль от начального id вправо, если места мало - влево
        else {
          let checkNeighbor = emptySquares.includes(squareId - 1) && emptySquares.includes(squareId + 1) &&
                !!!leftBorder.find(row => row[0] === squareId) && !!!rightBorder.find(row => row[row.length-1] === squareId)

          if ( !!!rightBorder.find(row => row.includes(squareId)) && isRightEmpty ) {
            step++
          } else if( !!!leftBorder.find(row => row.includes(squareId)) && isLeftEmpty) {
            step--
          } else if(!strictMode && size === 3 && checkNeighbor){
            return  [squareId-1,squareId,squareId+1]
          } else if(!strictMode){
            return createShip(getRandomSquare(emptySquares),size,direction,emptySquares)
          } else{
            return null
          }
        }
      }
      return shipsId
    }
}

