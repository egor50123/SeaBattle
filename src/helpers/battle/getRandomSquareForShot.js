export const getRandomSquareForShot = ({otherDiagonalsCopy,mainDiagonalsCopy,emptySquares,getRandomSquare}) => {
  let square
  if (mainDiagonalsCopy.length > 0) {
    square = getRandomSquare(mainDiagonalsCopy)
    mainDiagonalsCopy.splice(mainDiagonalsCopy.indexOf(square), 1)
  } else if(otherDiagonalsCopy.length > 0){
    square = getRandomSquare(otherDiagonalsCopy)
    otherDiagonalsCopy.splice(otherDiagonalsCopy.indexOf(square), 1)
  } else {
    square = getRandomSquare(emptySquares)
  }
  return square
}