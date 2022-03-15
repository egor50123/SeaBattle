export const getCurrentPositionForShot = (options) => {
  let {potentialPosition4H,
      potentialPosition3H,
      potentialPosition2H,
      potentialPosition4V,
      potentialPosition3V,
      potentialPosition2V,
      nexDirection,size,damagedSquaresShipSort} = options

  let positions = []
  switch (size - damagedSquaresShipSort.length) {
    case 3:
      positions = (nexDirection === 1) ?
          potentialPosition4H.filter(item => item !== false):
          potentialPosition4V.filter(item => item !== false);
      break;
    case 2:
      positions = (nexDirection === 1) ?
          potentialPosition3H.filter(item => item !== false) :
          potentialPosition3V.filter(item => item !== false);
      break;
    case 1:
      positions = (nexDirection === 1) ?
          potentialPosition2H.filter(item => item !== false) :
          potentialPosition2V.filter(item => item !== false);
      break;
    default:
      break;
  }
  let positionIndex = Math.floor(Math.random() * positions.length);
  return  positions[positionIndex]
}