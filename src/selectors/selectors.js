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
export const getDNDCurrentShip = state => state.battleField.dndSettings.currentShip

export const getDndData = state => state.battleField.dndSettings

export const getContainerX= state => state.battleField.containerCoordinates.x
export const getContainerY= state => state.battleField.containerCoordinates.y

export const getShipsData = (state) => state => state.battleField.ships
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

export const getDamagedShipsSquares = state => state.battleField.damagedShipsSquares
export const getTotalDamagedShipsByPlayer = state => state.battleField.firstPlayer.totalDestroyedShips
export const getIsGameOver = state => state.battleField.gameOver

export const getDamagedShipsForPlayer = state => state.battleField.firstPlayer.damagedShips

export const getDestroyedShipsIdFirst = state => state.battleField.firstPlayer.destroyedShipsId
export const getDestroyedShipsIdSecond = state => state.battleField.secondPlayer.destroyedShipsId
export const getDestroyedSquaresFirst = state => state.battleField.firstPlayer.enemyDestroyedShipsSquares
export const getDestroyedSquaresSecond = state => state.battleField.secondPlayer.enemyDestroyedShipsSquares
export const getDestroyedShipsStats = state => state.battleField.stats
export const getIsBotMove = state => state.battle.isBotMove
export const getIsFieldDisable = state => state.battle.isFieldDisabled

export const getTotalDestroyedShipsBot = state => state.battleField.secondPlayer.totalDestroyedShips

// анимации

export const getFirstRocketCoordinates = state => state.animation.rocket1
export const getRocketInitCoordinatesTop = state => state.animation.rocket1.initTop
export const getRocketInitCoordinatesLeft = state => state.animation.rocket1.initLeft
export const getIsAnimationOn = state => state.animation.rocket1.isAnimation

export const getSecondRocketCoordinates = state => state.animation.rocket2

