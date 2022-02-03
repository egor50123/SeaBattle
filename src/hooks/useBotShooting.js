import {useRandomSquare} from "./useRandomSquare";
import {useSelector} from "react-redux";
import {getKilledShipsByBot} from "../selectors/selectors";
import {useDestroyShipBot} from "./useDestroyShipBot";

export const useBotShooting = () => {
  const getRandomSquare = useRandomSquare()
  const destroyShipBot = useDestroyShipBot()
  const killedShips = useSelector(getKilledShipsByBot)
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

  return (emptySquares,hitId=null,isShipKilled) => {
    let square = null
    if (hitId === null) {
      if (mainDiagonalsCopy.length > 0) {
        square = getRandomSquare(mainDiagonalsCopy)
        console.log(square)
        // console.log(mainDiagonalsCopy);
        mainDiagonalsCopy.splice(mainDiagonalsCopy.indexOf(square), 1)
      } else {
        square = getRandomSquare(otherDiagonalsCopy)
        otherDiagonalsCopy.splice(otherDiagonalsCopy.indexOf(square), 1)
      }
    } else {
      // Проверка на уничтожение всего корабля
      let damagedShip = isShipKilled(hitId)
      square = destroyShipBot(hitId,emptySquares,killedShips,damagedShip)
      console.log(damagedShip);
    }
    return square
  }
}