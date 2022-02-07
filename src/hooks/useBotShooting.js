import {useRandomSquare} from "./useRandomSquare";
import {useDestroyShipBot} from "./useDestroyShipBot";

export const useBotShooting = () => {
  const getRandomSquare = useRandomSquare()
  const destroyShipBot = useDestroyShipBot()
  let totalDestroyedSingleShips = 0
  let totalDestroyedOtherShips = 0
  let isGameOver = false
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

  return (emptySquares,hitId=null,currentDamagedShipFunc) => {
    let hitIdCopy = hitId
    let square = null
    let isDestroyed = false
    let destroyedShip = []

    mainDiagonalsCopy = mainDiagonalsCopy.filter(item => emptySquares.includes(item))
    otherDiagonalsCopy = otherDiagonalsCopy.filter(item => emptySquares.includes(item))
    if (hitIdCopy === null) {
      if (mainDiagonalsCopy.length > 0) {
        square = getRandomSquare(mainDiagonalsCopy)
        mainDiagonalsCopy.splice(mainDiagonalsCopy.indexOf(square), 1)
      } else if(otherDiagonalsCopy.length > 0){
        square = getRandomSquare(otherDiagonalsCopy)
        otherDiagonalsCopy.splice(otherDiagonalsCopy.indexOf(square), 1)
      } else {
        square = getRandomSquare(emptySquares)
      }
    } else {
      // Получаем корабль в который мы попали
      let damagedShip = currentDamagedShipFunc(hitIdCopy)
      //получаем следующую клетку для обстрела
      if (damagedShip.length === 1) {
        square = hitId
        isDestroyed = true
        destroyedShip = damagedShip
        totalDestroyedSingleShips++
      } else {
        let [newSquare,newIsDestroyed,newDestroyedShip,destroyedShips] = destroyShipBot(hitIdCopy,emptySquares,damagedShip)
        square = newSquare
        isDestroyed = newIsDestroyed
        destroyedShip = newDestroyedShip
        totalDestroyedOtherShips = destroyedShips
      }

    }
    if ( (totalDestroyedOtherShips + totalDestroyedSingleShips) === 10) isGameOver = true
    return [square,isDestroyed,destroyedShip,isGameOver]
  }
}