import {useDispatch} from "react-redux";
import {setDamageShip} from "../redux/battleFieldReducer";

export const useDestroyShipBot = () => {
  const dispatch = useDispatch()
  const BORDER_VERTICAL = [20,30,40,50,60,70,80,90,81,71,61,51,41,31,21,11]
  const BORDER_HORIZONTE = [2,3,4,5,6,7,8,99,98,97,96,95,94,93,92]
  const BORDER_ANGLES = [1,10,100,91]
  let damagedSquaresOfShip = []
  let horizonteMissedHit = []
  let verticalMissedHit = []
  let totalDestroyedShips = 0
  let totalDestroyedShipsCopy = 0


  function findPotentialPlacement({emptySquares, hitId, damagedSquaresShipSort, difference, size, direction}) {
    let potentialPosition4H = [[1, 1, 0, 1], [1, 0, 1, 1], [0, 1, 1, 1], [1, 1, 1, 0]], // [ [1,1,hit,1], [1,hit,1,1], [hit,1,1,1], [1,1,1,hit]]
        potentialPosition3H = [[1, 0, 1], [1, 1, 0], [0, 1, 1]],
        potentialPosition2H = [[1, 0], [0, 1]]

    let potentialPosition4V = [[1, 1, 0, 1], [1, 0, 1, 1], [0, 1, 1, 1], [1, 1, 1, 0]], // [ [1,1,hit,1], [1,hit,1,1], [hit,1,1,1], [1,1,1,hit]]
        potentialPosition3V = [[1, 0, 1], [1, 1, 0], [0, 1, 1]],
        potentialPosition2V = [[1, 0], [0, 1]]


    let isTopEmpty = true,
        isBottomEmpty = true,
        isRightEmpty = true,
        isLeftEmpty = true

    let initRow = Math.ceil(hitId / 10)
    let currentRow = null
    let isNextSquareNotEmpty = null
    let isInOneColumn = null
    let isDirectionHorizonteOrNull = direction === null || direction === 1
    let isDirectionVerticalOrNull = direction === null || direction === 0
    let nexDirection = direction !== null ? direction : null

    for (let i = 1; i <= size - damagedSquaresShipSort.length; i++) {
      currentRow = Math.ceil((damagedSquaresShipSort[0] + i + difference) / 10)
      isNextSquareNotEmpty = !emptySquares.includes(damagedSquaresShipSort[0] + i + difference)
      if (isDirectionHorizonteOrNull && isRightEmpty && (initRow !== currentRow || isNextSquareNotEmpty)) {
        // Перебираем потенциальные клетки расположения корабля, если соседняя клетка уже не подходит - следующие за  ней не обрабатываем
        switch (i) {
          case 1: {
            // В зависмости от того, сколько клеток корабля уже поврежедено, выбираем следующие потенциальные клетки из соответствующих массивов (potentialPosition3H,
            // potentialPosition2H
            switch (size - damagedSquaresShipSort.length) {
              case 3: {
                potentialPosition4H[0] = false;
                potentialPosition4H[1] = false;
                potentialPosition4H[2] = false;
                isRightEmpty = false
                if (nexDirection === null && potentialPosition4H.filter(item => item !== false).length === 0) nexDirection = 0
                break;
              }
              case 2: {
                potentialPosition3H[0] = false
                potentialPosition3H[2] = false
                isRightEmpty = false
                if (nexDirection === null && potentialPosition3H.filter(item => item !== false).length === 0) nexDirection = 0
                break
              }
              case 1: {
                potentialPosition2H[1] = false
                isRightEmpty = false
                if (nexDirection === null && potentialPosition2H.filter(item => item !== false).length === 0) nexDirection = 0
                break
              }
              default:
                break;
            }

            break;
          }
          case 2: {
            switch (size - damagedSquaresShipSort.length) {
                //!!!
              case 3: {
                potentialPosition4H[1] = false;
                potentialPosition4H[2] = false;
                isRightEmpty = false
                if (nexDirection === null && potentialPosition4H.filter(item => item !== false).length === 0) nexDirection = 0
                break;
              }
              case 2: {
                potentialPosition3H[2] = false
                isRightEmpty = false
                if (nexDirection === null && potentialPosition4H.filter(item => item !== false).length === 0) nexDirection = 0
                break;
              }
              default:
                break
            }
            break;
          }
          case 3: {
            potentialPosition4H[2] = false;
            isRightEmpty = false
            if (nexDirection === null && potentialPosition4H.filter(item => item !== false).length === 0) nexDirection = 0
            break;
          }
          default:
            break
        }
      }

      currentRow = Math.ceil((damagedSquaresShipSort[0] - i) / 10)
      isNextSquareNotEmpty = !emptySquares.includes(damagedSquaresShipSort[0] - i)
      if (isDirectionHorizonteOrNull && isLeftEmpty && (initRow !== currentRow || isNextSquareNotEmpty)) {
        switch (i) {
          case 1: {
            switch (size - damagedSquaresShipSort.length) {
              case 3: {
                potentialPosition4H[0] = false;
                potentialPosition4H[1] = false;
                potentialPosition4H[3] = false;
                isLeftEmpty = false
                if (nexDirection === null && potentialPosition4H.filter(item => item !== false).length === 0) nexDirection = 0
                break;
              }
              case 2: {
                potentialPosition3H[0] = false
                potentialPosition3H[1] = false
                isRightEmpty = false
                if (nexDirection === null && potentialPosition3H.filter(item => item !== false).length === 0) nexDirection = 0
                break
              }
              case 1: {
                potentialPosition2H[0] = false
                isLeftEmpty = false
                if (nexDirection === null && potentialPosition2H.filter(item => item !== false).length === 0) nexDirection = 0
                break
              }
              default:
                break;
            }
            break;
          }
          case 2: {
            switch (size - damagedSquaresShipSort.length) {
              case 3: {
                potentialPosition4H[0] = false;
                potentialPosition4H[3] = false;
                isLeftEmpty = false
                if (nexDirection === null && potentialPosition4H.filter(item => item !== false).length === 0) nexDirection = 0
                break;
              }
              case 2: {
                potentialPosition3H[1] = false
                isLeftEmpty = false
                if (nexDirection === null && potentialPosition3H.filter(item => item !== false).length === 0) nexDirection = 0
                break
              }
              default:
                break;
            }
            break
          }
          case 3: {
            potentialPosition4H[3] = false;
            isLeftEmpty = false
            if (nexDirection === null && potentialPosition4H.filter(item => item !== false).length === 0) nexDirection = 0
            break;
          }
          default:
            break
        }
      }

      isInOneColumn = damagedSquaresShipSort[0] + 10 * (i + difference) < 100 && damagedSquaresShipSort[0] + 10 * (i + difference) > 0
      isNextSquareNotEmpty = !emptySquares.includes(damagedSquaresShipSort[0] + 10 * (i + difference))
      if (isDirectionVerticalOrNull && isBottomEmpty && (!isInOneColumn || isNextSquareNotEmpty)) {
        switch (i) {
          case 1: {
            // В зависмости от того, сколько клеток корабля уже поврежедено, выбираем следующие потенциальные клетки из соответствующих массивов (potentialPosition3H,
            // potentialPosition2H
            switch (size - damagedSquaresShipSort.length) {
              case 3: {
                potentialPosition4V[0] = false;
                potentialPosition4V[1] = false;
                potentialPosition4V[2] = false;
                isBottomEmpty = false
                if (nexDirection === null && potentialPosition4V.filter(item => item !== false).length === 0) nexDirection = 1
                break;
              }
              case 2: {
                potentialPosition3V[0] = false
                potentialPosition3V[2] = false
                isBottomEmpty = false
                if (nexDirection === null && potentialPosition3V.filter(item => item !== false).length === 0) nexDirection = 1
                break
              }
              case 1: {
                potentialPosition2V[1] = false
                isBottomEmpty = false
                if (nexDirection === null && potentialPosition2V.filter(item => item !== false).length === 0) nexDirection = 1
                break
              }
              default:
                break;
            }
            break;
          }
          case 2: {
            switch (size - damagedSquaresShipSort.length) {
              case 3: {
                potentialPosition4V[1] = false;
                potentialPosition4V[2] = false;
                isBottomEmpty = false
                if (nexDirection === null && potentialPosition4V.filter(item => item !== false).length === 0) nexDirection = 1
                break;
              }
              case 2: {
                potentialPosition3V[2] = false
                isBottomEmpty = false
                if (nexDirection === null && potentialPosition3V.filter(item => item !== false).length === 0) nexDirection = 1
                break
              }
              default:
                break
            }
            break;
          }
          case 3: {
            potentialPosition4V[2] = false;
            isBottomEmpty = false
            if (nexDirection === null && potentialPosition4V.filter(item => item !== false).length === 0) nexDirection = 1
            break;
          }
          default:
            break
        }
      }

      isInOneColumn = damagedSquaresShipSort[0] - 10 * i <= 100 && damagedSquaresShipSort[0] - 10 * i > 0
      isNextSquareNotEmpty = !emptySquares.includes(damagedSquaresShipSort[0] - 10 * i)
      if (isDirectionVerticalOrNull && isTopEmpty && (!isInOneColumn || isNextSquareNotEmpty)) {
        switch (i) {
          case 1: {
            switch (size - damagedSquaresShipSort.length) {
              case 3: {
                potentialPosition4V[0] = false;
                potentialPosition4V[1] = false;
                potentialPosition4V[3] = false;
                isTopEmpty = false
                if (nexDirection === null && potentialPosition4V.filter(item => item !== false).length === 0) nexDirection = 1
                break;
              }
              case 2: {
                potentialPosition3V[0] = false
                potentialPosition3V[1] = false
                isTopEmpty = false
                if (nexDirection === null && potentialPosition3V.filter(item => item !== false).length === 0) nexDirection = 1
                break
              }
              case 1: {
                potentialPosition2V[0] = false
                isTopEmpty = false
                if (nexDirection === null && potentialPosition2V.filter(item => item !== false).length === 0) nexDirection = 1
                break
              }
              default:
                break;
            }
            break;
          }
          case 2: {
            switch (size - damagedSquaresShipSort.length) {
              case 3: {
                potentialPosition4V[0] = false;
                potentialPosition4V[3] = false;
                isTopEmpty = false
                if (nexDirection === null && potentialPosition4V.filter(item => item !== false).length === 0) nexDirection = 1
                break;
              }
              case 2: {
                potentialPosition3V[1] = false
                isTopEmpty = false
                if (nexDirection === null && potentialPosition3V.filter(item => item !== false).length === 0) nexDirection = 1
                break
              }
              default:
                break;
            }
            break
          }
          case 3: {
            potentialPosition4V[3] = false;
            isTopEmpty = false
            if (nexDirection === null && potentialPosition4V.filter(item => item !== false).length === 0) nexDirection = 1
            break;
          }
          default:
            break
        }
      }
    }

    return {
      potentialPosition4H,
      potentialPosition3H,
      potentialPosition2H,
      potentialPosition4V,
      potentialPosition3V,
      potentialPosition2V,
      nexDirection,
    }
  }


  return (hitId, emptySquares, damagedShipInit) => {
    // если попадание является первым в выбранный корабль - заносим значение в массив
    if (damagedSquaresOfShip.length === 0) damagedSquaresOfShip.push(hitId)

    let direction = null
    let damagedSquaresShipSort = damagedSquaresOfShip.sort((a, b) => a - b)
    // если в корабль совершенно 2 и более попаданий - определяем его напрвление (1-горизональное , 0 - вертикальное)
    if (damagedSquaresShipSort.length > 1) direction = Math.abs(damagedSquaresShipSort[1] - damagedSquaresShipSort[0]) === 1 ? 1 : 0

    let nextHit = null
    let isDestroyed = null
    const difference = damagedSquaresShipSort.length - 1
    let size = damagedShipInit.length;

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
    } = findPotentialPlacement(options)

    // если по бокам от hitId уже производился неуспешный выстрел или hitId находится на границе поля и соседний выстрел был неуспешным - исключаеем выбор случайного направления для следующего выстрела

    if (nexDirection === null) {
      nexDirection = Math.floor(Math.random() * 2)
    }

    let positions = []
    let positionsH = []
    let positionsV = []
    switch (size - damagedSquaresOfShip.length) {
      case 3: {
        positionsH = potentialPosition4H.filter(item => item !== false)
        positionsV = potentialPosition4V.filter(item => item !== false)
        positions = (nexDirection === 1 && positionsH.length > 0) ?
            positionsH :
            positionsV;
        break;
      }
      case 2:
        positionsH = potentialPosition3H.filter(item => item !== false)
        positionsV = potentialPosition3V.filter(item => item !== false)
        positions = (nexDirection === 1 && positionsH.length > 0) ?
            positionsH :
            positionsV;
        break;
      case 1:
        positionsH = potentialPosition2H.filter(item => item !== false)
        positionsV = potentialPosition2V.filter(item => item !== false)
        positions = (nexDirection === 1 && positionsH.length > 0) ?
            positionsH :
            positionsV;
        break;
      default:
        break;
    }
    let positionIndex = Math.floor(Math.random() * positions.length);
    let position = positions[positionIndex]
    debugger
    let indexOfPrevHit = position.indexOf(0)

    //выбираем следующую клетку для обстрела в соответствии с доступной потенциальныой позиции
    if (indexOfPrevHit !== 0 && indexOfPrevHit !== position.length - 1) {
      if (nexDirection === 1) {
        nextHit = Math.floor(Math.random() * 2) === 1 ? damagedSquaresShipSort[0] + 1 + difference : damagedSquaresShipSort[0] - 1
      } else {
        nextHit = Math.floor(Math.random() * 2) === 1 ? damagedSquaresShipSort[0] + 10 * (1 + difference) : damagedSquaresShipSort[0] - 10
      }
    } else if (indexOfPrevHit === 0) {
      nextHit = nexDirection === 1 ? damagedSquaresShipSort[0] + 1 + difference : damagedSquaresShipSort[0] + 10 * (1 + difference)
    } else if (indexOfPrevHit === position.length - 1) {
      nextHit = nexDirection === 1 ? damagedSquaresShipSort[0] - 1 : damagedSquaresShipSort[0] - 10
    }
    //берем динамические границы из useShip
    //и прроверки свободны ли вверх и низ
    let damagedSquaresOfShipNext = [...damagedSquaresOfShip, nextHit]
    isDestroyed = damagedShipInit.filter(item => damagedSquaresOfShipNext.includes(item)).length === damagedShipInit.length

    //если следующий выстрел будет успешным - заносим его в массив поврежденных клеток корабля
    if (damagedShipInit.includes(nextHit)) {
      damagedSquaresOfShip.push(nextHit)
    }
    // если следующий выстрел будет неудачным - фиксируем выстрел в соотствующий с напрвлением  массив
    if (!damagedShipInit.includes(nextHit)) {
      Math.abs((hitId - nextHit)) === 1 ? horizonteMissedHit.push(nextHit) : verticalMissedHit.push(nextHit)
    }

    // Если корабль уничтожен - обнуляем массив поврежденных кораблей, массивы неудачных выстрелов и фиксируем, что корбль был уничтожен
    if (isDestroyed) {
      damagedSquaresOfShip = []
      horizonteMissedHit = []
      verticalMissedHit = []
      totalDestroyedShips++
    }


    if (totalDestroyedShips === 6) totalDestroyedShipsCopy = totalDestroyedShips

    dispatch(setDamageShip(damagedSquaresOfShip))
    return [nextHit, isDestroyed, damagedShipInit, totalDestroyedShipsCopy]
  }
}