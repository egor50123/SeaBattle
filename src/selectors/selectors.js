
export const getShipField = state => state.battleField.shipField
export const getDeathField = state => state.battleField.deathField
export const getNotEmptySquares = state => state.battleField.notEmptySquares
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