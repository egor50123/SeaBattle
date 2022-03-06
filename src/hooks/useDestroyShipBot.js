import {useDispatch} from "react-redux";
import {setDamageShip} from "../redux/battleFieldReducer";
import {getCurrentPositionForShot} from "../helpers/getCurrentPositionForShot";
import {getNextSquareForShot} from "../helpers/getNextSquareForShot";
import {findPotentialPositions} from "../helpers/findPotentialPositions";
import {useRef} from "react";

export const useDestroyShipBot = () => {
  const dispatch = useDispatch()
  //let damagedSquaresOfShip = []
  let damagedSquaresOfShipRef = useRef([])
  let totalDestroyedShips = 0
  let totalDestroyedShipsCopy = 0

  return (hitId, emptySquares, damagedShipInit) => {
    // если попадание является первым в выбранный корабль - заносим значение в массив
    if (damagedSquaresOfShipRef.current.length === 0) {
      //damagedSquaresOfShip.push(hitId)
      damagedSquaresOfShipRef.current.push(hitId)
    }
    let direction = null
    let damagedSquaresShipSort = damagedSquaresOfShipRef.current.sort((a, b) => a - b)
    // если в корабль совершенно 2 и более попаданий - определяем его напрвление (1-горизональное , 0 - вертикальное)
    if (damagedSquaresShipSort.length > 1) direction = Math.abs(damagedSquaresShipSort[1] - damagedSquaresShipSort[0]) === 1 ? 1 : 0

    let nextHit = null
    let isDestroyed = null
    const difference = damagedSquaresShipSort.length - 1
    const size = damagedShipInit.length;

    let options = {
      damagedSquaresShipSort,
      emptySquares,
      difference,
      size,
      hitId,
      direction
    }

    let {
      potentialPosition4H,
      potentialPosition3H,
      potentialPosition2H,
      potentialPosition4V,
      potentialPosition3V,
      potentialPosition2V,
      nexDirection
    } = findPotentialPositions(options)


    if (nexDirection === null) {
      nexDirection = Math.floor(Math.random() * 2)
    }

    const optionsForGetPosition = {
      potentialPosition4H,
      potentialPosition3H,
      potentialPosition2H,
      potentialPosition4V,
      potentialPosition3V,
      potentialPosition2V,
      nexDirection,
      size, damagedSquaresShipSort
    }
    // получаем потенциальную позицию корабля для обстрела
    let position = getCurrentPositionForShot(optionsForGetPosition)
    let indexOfPrevHit
    try {
      indexOfPrevHit = position.indexOf(0)
    } catch (err) {
      debugger
    }
    //let indexOfPrevHit = position.indexOf(0)

    // Выбираем следующую клетку для обстрела
    nextHit = getNextSquareForShot({indexOfPrevHit, nexDirection, damagedSquaresShipSort, difference, position})

    // если следующий выстрел уничтожает корабль - меняем isDestroyed на true
    let damagedSquaresOfShipNext = [...damagedSquaresOfShipRef.current, nextHit]
    isDestroyed = damagedShipInit.filter(item => damagedSquaresOfShipNext.includes(item)).length === damagedShipInit.length

    //если следующий выстрел будет успешным - заносим его в массив поврежденных клеток корабля
    if (damagedShipInit.includes(nextHit)) {
      damagedSquaresOfShipRef.current.push(nextHit)
    }
    // Если корабль уничтожен - обнуляем массив поврежденных кораблей, массивы неудачных выстрелов и фиксируем, что корбль был уничтожен
    if (isDestroyed) {
      damagedSquaresOfShipRef.current = []
      totalDestroyedShips++
    }
    if (totalDestroyedShips === 6) totalDestroyedShipsCopy = totalDestroyedShips

    dispatch(setDamageShip(damagedSquaresOfShipRef.current))
    return {nextHit, isDestroyed, damagedShipInit, totalDestroyedShipsCopy}
  }
}