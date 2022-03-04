export const findPotentialPositions = ({emptySquares, hitId, damagedSquaresShipSort, difference, size, direction}) => {
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

    isInOneColumn = damagedSquaresShipSort[0] + 10 * (i + difference) <= 100 && damagedSquaresShipSort[0] + 10 * (i + difference) > 0
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