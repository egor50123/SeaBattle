//!!!!!!!!!!!!!!!!!!!!
export const getShipField = state => state.battleField.firstPlayer.shipField
export const getDeathField = state => state.battleField.firstPlayer.deathField
export const getNotEmptySquares = state => state.battleField.firstPlayer.notEmptySquares
export const getInitEmptySquares = state => state.battleField.squares

// Селеторы для DND
export const getIsPossibleToPlacement= state => !!state.battleField.dndSettings.successShip

export const getDndData = state => state.battleField.dndSettings



export const getShipsData = state => state.battleField.ships
export const getCurrentPage = (state) => state.appInit.currentPage
export const getSettingsOpen = state => state.appInit.isSettingsOpen
export const getIsSavedPlacementOpen = state => state.appInit.isPlacementOpen
export const getCountOfSavedShips = state => state.appInit.countOfSavedShips
export const getIsAnimationActive = state => state.appInit.isAnimationOn

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
export const getIsWin = state => state.battleField.isWin

export const getDamagedShipsForPlayer = state => state.battleField.firstPlayer.damagedShips

export const getDestroyedShipsIdFirst = state => state.battleField.firstPlayer.destroyedShipsId
export const getDestroyedShipsIdSecond = state => state.battleField.secondPlayer.destroyedShipsId
export const getDestroyedSquaresFirst = state => state.battleField.firstPlayer.enemyDestroyedShipsSquares
export const getDestroyedSquaresSecond = state => state.battleField.secondPlayer.enemyDestroyedShipsSquares
export const getDestroyedShipsStats = state => state.battleField.stats
export const getIsBotMove = state => state.battle.isBotMove
export const getIsFieldDisable = state => state.battle.isFieldDisabled

export const getTotalDestroyedShipsBot = state => state.battleField.secondPlayer.totalDestroyedShips

export const getStatusInitCoordinates = state => state.battleField.placementCoordinates.status

// анимации

export const getFirstRocketCoordinates = state => state.animation.rocket1
export const getRocketInitCoordinatesTop = state => state.animation.rocket1.initTop
export const getRocketInitCoordinatesLeft = state => state.animation.rocket1.initLeft
export const getIsAnimationOn = state => state.animation.rocket1.isAnimation

export const getSecondRocketCoordinates = state => state.animation.rocket2

export const getShipData1 = state => state.battleField.ships[0]
export const getShipData2 = state => state.battleField.ships[1]
export const getShipData3 = state => state.battleField.ships[2]
export const getShipData4 = state => state.battleField.ships[3]
export const getShipData5 = state => state.battleField.ships[4]
export const getShipData6 = state => state.battleField.ships[5]
export const getShipData7 = state => state.battleField.ships[6]
export const getShipData8 = state => state.battleField.ships[7]
export const getShipData9 = state => state.battleField.ships[8]
export const getShipData10 = state => state.battleField.ships[9]

export const getShipCoor1 = state => state.battleField.ships[0].x


