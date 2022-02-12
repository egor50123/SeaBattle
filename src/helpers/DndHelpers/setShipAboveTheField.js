export const setShipAboveTheField = (options) => {
  const {currentSquare,currentPart,shipSize,direction} = {...options}

  let currentSquareRow = Math.ceil(currentSquare / 10),
      firstSquareRow = Math.ceil((currentSquare - currentPart + 1) / 10),
      lastSquareRow = Math.ceil((currentSquare + shipSize - currentPart) / 10)

  let isShipAboveTheField = true
  // Если последняя или первая клетка корабля не совпадает currentSquare - не показываем потенциальное положение корабля
  let isInOneRow = (currentSquareRow === firstSquareRow) && (currentSquareRow === lastSquareRow)
  let isInOneColumn = currentSquare + (shipSize - currentPart) * 10 <= 100 && currentSquare - (currentPart - 1) * 10 > 0

  if ((direction === 1 && !isInOneRow) || (direction === 0 && !isInOneColumn)) isShipAboveTheField = false

  return isShipAboveTheField
}