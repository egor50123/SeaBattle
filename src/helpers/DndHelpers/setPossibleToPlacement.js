export const setPossibleToPlacement = (options) => {
  const {notEmptySquares,potentialShip} = options
  let isPossibleToPlacement = true
  for (let i = 0; i < potentialShip.length; i++) {
    if (notEmptySquares.includes(potentialShip[i])) {
      isPossibleToPlacement = !notEmptySquares.includes(potentialShip[i])
      break;
    }
  }
  return isPossibleToPlacement
}