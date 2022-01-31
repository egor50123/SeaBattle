//!!!!!!!!!!!!!!!!!!!!
export const getShipField = state => state.battleField.firstPlayer.shipField
export const getDeathField = state => state.battleField.firstPlayer.deathField
export const getNotEmptySquares = state => state.battleField.firstPlayer.notEmptySquares
export const getInitEmptySquares = state => state.battleField.squares

// Селеторы для DND
export const getDNDSuccessShip = state => state.battleField.dndSettings.successShip
export const getDNDUnsuccessfulShip = state => state.battleField.dndSettings.unsuccessfulShip
export const getDNDCurrentPart = state => state.battleField.dndSettings.currentPart
export const getDNDShipSize = state => state.battleField.dndSettings.shipSize
export const getDNDPrevSquare= state => state.battleField.dndSettings.prevSquare
export const getDNDx= state => state.battleField.dndSettings.x
export const getDNDy= state => state.battleField.dndSettings.y
export const getDNDStatus= state => state.battleField.dndSettings.status
export const getDNDPrevShipPlacement= state => state.battleField.dndSettings.prevShipPlacement
export const getIsPossibleToPlacement= state => !!state.battleField.dndSettings.successShip
export const getDNDDirection = state => state.battleField.dndSettings.direction

export const getContainerX= state => state.battleField.containerCoordinates.x
export const getContainerY= state => state.battleField.containerCoordinates.y

export const ship = (state,id) => state => state.battleField.ships[id-1]
export const getCurrentPage = (state) => state.appInit.currentPage

export const getFirstShipsField = (state) => state.battleField.firstPlayer.shipField
export const getFirstDeathField = (state) => state.battleField.firstPlayer.deathField
export const getFirstNotEmptySquares = state => state.battleField.firstPlayer.notEmptySquares

export const getSecondShipsField = (state) => state.battleField.secondPlayer.shipField
export const getSecondDeathField = (state) => state.battleField.secondPlayer.deathField
export const getSecondNotEmptySquares = state => state.battleField.secondPlayer.notEmptySquares

export const getFirstFieldMissedSquares = state => state.battleField.firstPlayer.enemyMissedSquares
export const getSecondFieldMissedSquares = state => state.battleField.secondPlayer.enemyMissedSquares
export const getFirstFieldDamagedSquares = state => state.battleField.firstPlayer.enemyHitedSquares
export const getSecondFieldDamagedSquares = state => state.battleField.secondPlayer.enemyHitedSquares
export const getFirstFieldNotEmptySquares = state => state.battleField.firstPlayer.notEnemyEmptySquares
export const getSecondFieldNotEmptySquares = state => state.battleField.secondPlayer.notEnemyEmptySquares
export const getCurrentPlayer = state => state.battleField.currentPlayer


// ship = useSelector( state => state.battleField.ships[id-1]),
    // xShips = ship.x,
    // yShips = ship.y,

// if (shipField.length > 0) {
//   for (let i = 0; i < shipField.length; i++) {
//     if (shipField[i][0] === +ref.current.id) {
//       let x = ref.current.getBoundingClientRect().left;
//       let y = ref.current.getBoundingClientRect().top;
//       dispatch(setStartShipDataCoordinates(x, y, id))
//       break;
//     }
//   }
// }