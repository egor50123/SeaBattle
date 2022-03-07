import {useRandomSquare} from "./useRandomSquare";
import {useDestroyShipBot} from "./useDestroyShipBot";
import {makeDiagonals} from "../helpers/makeDiagonals";
import {getRandomSquareForShot} from "../helpers/getRandomSquareForShot";

export const useBotShooting = () => {
  const getRandomSquare = useRandomSquare()
  const destroyShipBot = useDestroyShipBot()
  const {mainDiagonals, otherDiagonals} = makeDiagonals()

  // массив диагоналей для поиска 4-палубных кораблей
  let mainDiagonalsCopy = mainDiagonals.slice(),
      otherDiagonalsCopy = otherDiagonals.slice()

  return (emptySquares, hitId = null, currentDamagedShipFunc) => {
    let hitIdCopy = hitId
    let square = null
    let isDestroyed = false
    let destroyedShip = []

    mainDiagonalsCopy = mainDiagonalsCopy.filter(item => emptySquares.includes(item))
    otherDiagonalsCopy = otherDiagonalsCopy.filter(item => emptySquares.includes(item))
    // Если нету поврежденных кораблей - выбираем случайную клетку из списка диагоналей
    if (hitIdCopy === null) {
      square = getRandomSquareForShot({mainDiagonalsCopy, otherDiagonalsCopy, emptySquares, getRandomSquare})
    } else {
      // Получаем корабль в который мы попали
      let damagedShip = currentDamagedShipFunc(hitIdCopy)
      //получаем следующую клетку для обстрела
      let {
        nextHit: newSquare,
        isDestroyed: newIsDestroyed,
        damagedShipInit: newDestroyedShip,
        totalDestroyedShipsCopy: destroyedShips
      } = destroyShipBot(hitIdCopy, emptySquares, damagedShip)
      square = newSquare
      isDestroyed = newIsDestroyed
      destroyedShip = newDestroyedShip
    }

    return [square, isDestroyed, destroyedShip]
  }
}