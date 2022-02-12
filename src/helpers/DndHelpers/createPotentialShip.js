export const createPotentialShip = (options) => {
  const {currentPart, shipSize, currentSquare, direction} = {...options}

  let ship = []
  for (let i = 1; i < currentPart; i++) {
    if (direction === 1) ship.push(currentSquare - i)
    if (direction === 0) ship.push(currentSquare - i * 10)
  }
  for (let i = 0; i <= shipSize - currentPart; i++) {
    if (direction === 1) ship.push(currentSquare + i)
    if (direction === 0) ship.push(currentSquare + i * 10)
  }
  return ship
}