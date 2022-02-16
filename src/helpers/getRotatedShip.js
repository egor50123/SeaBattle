export const getRotatedShip = ({notEmptySquares,shipSquares,direction,allSquares,createStrictShip}) => {
  let notEmptySquaresCopy = notEmptySquares.slice()
  notEmptySquaresCopy.splice(notEmptySquaresCopy.indexOf(shipSquares[0]),1)
  if (direction ===1) notEmptySquaresCopy.splice(notEmptySquaresCopy.indexOf(shipSquares[0] + 10),1)
  if (direction ===0) notEmptySquaresCopy.splice(notEmptySquaresCopy.indexOf(shipSquares[0] + 1),1)
  const emptySquares = allSquares.filter(item => !notEmptySquaresCopy.includes(item))

  let reverseDirection = direction === 1 ? 0 : 1

  return createStrictShip(shipSquares[0], shipSquares.length, reverseDirection, emptySquares)
}