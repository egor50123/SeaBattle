export const getNextSquareForShot = ({indexOfPrevHit,nexDirection,position,damagedSquaresShipSort,difference}) => {
  let nextHit = null
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

  return nextHit
}