import Square from "./Square/Square";
import Row from "./Row/Row";
import "./BattleField.scss"
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {clearField, setDeathSquares, setEmptySquares, setShipSquares} from "../../redux/battleFieldReducer";

const BattleField = () => {
  const dispatch = useDispatch()
  //const emptySquares = useSelector(state => state.battleField.emptySquares)

  const makeField = () => {
    const rowsTotal = 10;
    const columnsTotal = 10;

    let field = [];
    let currentId = 1;
    for ( let i = 1; i <=rowsTotal;  i++) {
      let row = [];
      for (let j = 1; j <= columnsTotal; j++) {
        row.push(<Square id={currentId}/>)
        currentId++;
      }
      field.push(<Row row={row}/>)
    }
    return field
  }

  const doRandomPlacement = () => {
    console.clear()
    dispatch(clearField());

    let emptySquares =  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]
    let notEmptySquares = []

    let shipsSquares = [];
    let deathZone = [];
    function getRandomSquare(array) {
      return array[Math.floor(Math.random() * array.length)];
    }

    function makeShip(squareId,size,direction,emptySquares) {
      console.log("square - " + squareId + ' ___direction - ' + direction)
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
          } else if(size === 3 && emptySquares.includes(squareId - 10) && emptySquares.includes(squareId + 10) && (squareId - 10)>0 && (squareId + 10)<=100){
            return  [squareId-10,squareId,squareId+10]
          } else {
            console.log('here V')
            return makeShip(getRandomSquare(emptySquares),size,direction,emptySquares)
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
          } else if(size === 3 && checkNeighbor){
            return  [squareId-1,squareId,squareId+1]
          } else {
            console.log('here H')
            return makeShip(getRandomSquare(emptySquares),size,direction,emptySquares)
          }
        }
      }
      return shipsId
    } // вынести в хук
    function makeDeathZone(ship,direction) {

      function filterDefaultBorderValues (border,side) {
        return border.filter(item => !side.includes(item) && item<=100 && item > 0)
      }

      let lastMinV = [ship[ship.length-1]-11,ship[ship.length-1]-10,ship[ship.length-1]-9],
          lastMaxV = [ship[ship.length-1]+11,ship[ship.length-1]+10,ship[ship.length-1]+9],
          startMaxV = [ship[0]+9,ship[0]+10,ship[0]+11],
          startMinV = [ship[0]-9,ship[0]-10,ship[0]-11],

          lastMinH = [ship[ship.length-1]-1,ship[ship.length-1]-11,ship[ship.length-1]+9],
          lastMaxH = [ship[ship.length-1]+1,ship[ship.length-1]+11,ship[ship.length-1]-9],
          startMaxH = [ship[0]+1,ship[0]+11,ship[0]-9],
          startMinH = [ship[0]-1,ship[0]-11,ship[0]+9];

      let borderVerticalR = [],
          borderVerticalL = [],
          deathZone = [];

      const lastMoreThenFirst = ship[ship.length-1] > ship[0]

      for (let i = 1; i<=10; i++) {
        borderVerticalR.push(10*i)
        borderVerticalL.push(1+(10*(i-1)))
      }

      if( direction === 0 && borderVerticalR.includes(ship[0])) {
        if (lastMoreThenFirst) {
          lastMaxV = filterDefaultBorderValues(lastMaxV,borderVerticalL)
          startMinV = filterDefaultBorderValues(startMinV,borderVerticalL)
        } else {
          lastMinV = filterDefaultBorderValues(lastMinV,borderVerticalL)
          startMaxV = filterDefaultBorderValues(startMaxV,borderVerticalL)
        }

      } else if (direction === 0 && borderVerticalL.includes(ship[0])) {
        if (lastMoreThenFirst) {
          lastMaxV = filterDefaultBorderValues(lastMaxV,borderVerticalR)
          startMinV = filterDefaultBorderValues(startMinV,borderVerticalR)
        } else {
          lastMinV = filterDefaultBorderValues(lastMinV,borderVerticalR)
          startMaxV = filterDefaultBorderValues(startMaxV,borderVerticalR)
        }
      }

      if( direction === 1 && borderVerticalR.includes(ship[ship.length-1])) {
        lastMaxH = [];
      } else if ( direction === 1 && borderVerticalL.includes(ship[0]) ) {
        startMinH = [];
      } else if ( direction === 1 && borderVerticalR.includes(ship[0]) ) {
        startMaxH = [];
      } else if (direction === 1 && borderVerticalL.includes(ship[ship.length-1])) {
        lastMinH = [];
      }
      // создание мертвой зоны вертикального корабля
      if ( direction === 0 ) {
        for(let i = 0; i < ship.length; i++) {
          if ( !borderVerticalR.includes(ship[i]) ) {
            deathZone.push(ship[i] + 1)
          }
          if( !borderVerticalL.includes(ship[i])) {
            deathZone.push(ship[i] - 1)
          }
        }

        lastMoreThenFirst ?
            deathZone.push(...lastMaxV,...startMinV) :
            deathZone.push(...lastMinV,...startMaxV)

      }
      //создание мертвой зоны горизонтального корабля
      else if ( direction === 1 ) {
        for(let i = 0; i < ship.length; i++) {
          ship[i] + 10 <= 100 && deathZone.push(ship[i] + 10)
          ship[i] - 10 > 0 && deathZone.push(ship[i] - 10)
        }

        lastMoreThenFirst ?
            deathZone.push(...lastMaxH,...startMinH):
            deathZone.push(...lastMinH,...startMaxH)
      }
      return deathZone
    } // тоже в хук


    for(let i=1; i<=10; i++) {
      let size
      let deathZoneForShip
      let someSquare = getRandomSquare(emptySquares)
      let direction = Math.floor(Math.random() * 2);
      //let direction = 1
      switch (i) {
        case 1:
          someSquare= 100
          size = 4;
          break;
        case 2:case 3:
          size = 3;
          break;
        case 4: case 5: case 6:
          size = 2;
          break;
        case 7: case 8: case 9: case 10:
          size = 1;
          break;
        default: break;
      }

      //  0-вертикаль 1-горизонталь
      shipsSquares.push(makeShip(someSquare,size,direction,emptySquares))
      deathZoneForShip = makeDeathZone(shipsSquares[i-1],direction)
      deathZone = [...deathZone,...deathZoneForShip]

      notEmptySquares = [...notEmptySquares, ...deathZone,...shipsSquares[i-1]]
      emptySquares = emptySquares.filter( num => !notEmptySquares.includes(num))
    }

    dispatch(setShipSquares(shipsSquares))
    dispatch(setDeathSquares(deathZone))
    //dispatch(setEmptySquares(deathZone,shipsSquares))
  }

  useEffect( () => {
    doRandomPlacement()
  },[])
  // doRandomPlacement([1,2,3,4,5,6,7,8,9,22,34,66,44,89,37])

  return (
      <div className={'field'}>
        <div>
          {makeField()}
        </div>
        <div>
          <button onClick={() => doRandomPlacement()}>Рандом</button>
        </div>
      </div>
  )
}

export default BattleField