import {useRandomSquare} from "./useRandomSquare";
import {useDestroyShipBot} from "./useDestroyShipBot";
import {useSelector} from "react-redux";
import {getDamagedShipsSquares} from "../selectors/selectors";

export const useBotShooting = () => {
  const getRandomSquare = useRandomSquare()
  const destroyShipBot = useDestroyShipBot()
  //const damageShipSquare = useSelector(getDamagedShipsSquares)
  // получаем обстелянные клетки корабля
  // массив диагоналей для поиска 4-палубных кораблей
  const mainDiagonals = []
  const otherDiagonals = []
  for (let i = 0; i < 10;i++) {
      if (i < 2) {
        otherDiagonals.push(11-9*i);
        otherDiagonals.push(99-9*i);
      }
      if (i < 4){
        mainDiagonals.push(31 - 9 * i);
        mainDiagonals.push(97 - 9 * i)
      }
      if (i < 6) {
        otherDiagonals.push(51 - 9 * i)
        otherDiagonals.push(95 - 9 * i)
      }
      if (i<8) {
        mainDiagonals.push(71 - 9 * i)
        mainDiagonals.push(93 - 9 * i)
      }
      if (i<10) {
        otherDiagonals.push(91 - 9 * i)
      }
  }
  let mainDiagonalsCopy = mainDiagonals.slice()
  let otherDiagonalsCopy = otherDiagonals.slice()
  const test = useSelector(getDamagedShipsSquares)
  //let damagedSquaresOfShip = []

  return (emptySquares,hitId=null,currentDamagedShipFunc,damageShipSquares) => {
    let hitIdCopy = hitId
    if (damageShipSquares.length !== 0) hitIdCopy = damageShipSquares[0]
    let square = null
    let isDestroyed = false
    //damagedSquaresOfShip.push(hitId)
    if (hitIdCopy === null) {
      if (mainDiagonalsCopy.length > 0) {
        square = getRandomSquare(mainDiagonalsCopy)
        // console.log(mainDiagonalsCopy);
        mainDiagonalsCopy.splice(mainDiagonalsCopy.indexOf(square), 1)
      } else {
        square = getRandomSquare(otherDiagonalsCopy)
        otherDiagonalsCopy.splice(otherDiagonalsCopy.indexOf(square), 1)
      }
    } else {
      debugger
      // Получаем корабль в который мы попали
      let damagedShip = currentDamagedShipFunc(hitIdCopy)
      //получаем следующую клетку для обстрела

      let [newSquare,newIsDestroyed] = destroyShipBot(hitIdCopy,emptySquares,damagedShip,damageShipSquares)
      square = newSquare
      isDestroyed = newIsDestroyed
    }
    return [square,isDestroyed]
  }
}