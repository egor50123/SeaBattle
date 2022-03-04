import {setMapDamagedShip} from "../helpers/setMapDamagedShip";

const FIELD_DATA = "FIELD_DATA";
const FIELD_DEATH_ZONE = "FIELD_DEATH_ZONE";
const FIELD_SHIPS_ZONE = "FIELD_SHIPS_ZONE";
const FIELD_EMPTY_ZONE = "FIELD_EMPTY_ZONE";
const CLEAR_FIELD = "CLEAR_FIELD";
const DND_SETTINGS = "DND_SETTINGS";
const DND_SETTINGS_POTENTIAL_SHIP = 'DND_SETTINGS_POTENTIAL_SHIP';
const CLEAR_DND = "CLEAR_DND";
const DND_STATUS = "DND_STATUS";
const DND_DROP_COORDINATES = "DND_DROP_COORDINATES";
const DELETE_SHIP = "DELETE_SHIP";
const DELETE_DEATH_ZONE = "DELETE_DEATH_ZONE";
const SAVE_PREV_SHIP_PLACEMENT = "SAVE_PREV_SHIP_PLACEMENT";
const DND_PREV_SQUARE = "DND_PREV_SQUARE";
const START_SHIP_DATA_COORDINATES = "START_SHIP_DATA_COORDINATES";
const CONTAINER_COORDINATES = "CONTAINER_COORDINATES";
const UPDATE_SHIP_DATA = "UPDATE_SHIP_DATA";
const UPDATE_SHIP_SQUARES = "UPDATE_SHIP_SQUARES"
const IS_RANDOM = "IS_RANDOM";
const DELETE_DND_PREV_POTENTIAL_SHIP = "DELETE_DND_PREV_POTENTIAL_SHIP";
const CLEAR_SHIPS_DATA = "CLEAR_SHIPS_DATA";

const SET_HIT = "SET_HIT";
const SET_MISS = "SET_MISS";
const CHANGE_PLAYER = "CHANGE_PLAYER";
const SET_DAMAGED_SHIP_SQUARES = "SET_DAMAGED_SHIP_SQUARES";
const SET_DAMAGED_SHIPS_PLAYER = "SET_DAMAGED_SHIPS_PLAYER"
const SET_GAME_OVER = "SET_GAME_OVER"
const SET_TOTAL_DESTROYED_SHIPS = "SET_TOTAL_DESTROYED_SHIPS"

const SET_DESTROYED_SHIP = "SET_DESTROYED_SHIP"

const allSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]

const initialState = {
  squares: allSquares,
  ships: [{id: 1, size: 4,},
    {id: 2, size: 3,},
    {id: 3, size: 3,},
    {id: 4, size: 2,},
    {id: 5, size: 2,},
    {id: 6, size: 2,},
    {id: 7, size: 1,},
    {id: 8, size: 1,},
    {id: 9, size: 1,},
    {id: 10, size: 1,}],

  iSRandom: false,

  containerCoordinates: {
    x: null,
    y: null
  },
  stats: {
    1: 4,
    2: 3,
    3: 2,
    4: 1,
  },
  gameOver: false,
  firstPlayer: {
    shipField: [],
    deathField: [],
    notEmptySquares: [],

    enemyHitedSquares: [],
    enemyMissedSquares: [],
    notEnemyEmptySquares: [],
    enemyDestroyedShipsSquares: [],
    destroyedShipsId:[],
    damagedShips: [],
    totalDestroyedShips: 0
  },
  secondPlayer: {
    shipField: [],
    deathField: [],
    notEmptySquares: [],
    destroyedShipsId:[],
    enemyHitedSquares: [],
    enemyMissedSquares: [],
    notEnemyEmptySquares: []
  },
  //true - ход первого игрока, false - второго
  currentPlayer: true,
  damagedShipsSquares: [],

  dndSettings: {
    currentPart: null,
    shipSize: null,
    prevShipPlacement: null,
    prevSquare: null,
    currentShip: null,
    successShip: null,
    unsuccessfulShip: null,
    status: null,
    x: null,
    y: null,
    direction: null
  },
}

const battleFieldReducer = (state = initialState, action) => {
  switch (action.type) {
      //??????????????
    case FIELD_DATA:
      return {
        ...state,
        field: {
          ...state.field,
          [action.id]: action.status
        }
      }
    case FIELD_DEATH_ZONE:
      let deathArray = []
      for (let i = 0; i < action.field.length; i++) {
        deathArray = [...deathArray, ...action.field[i]]
      }
      switch (+action.fieldId) {
        case 1: {
          return {
            ...state,
            firstPlayer: {
              ...state.firstPlayer,
              deathField: [...state.firstPlayer.deathField, ...action.field],
              notEmptySquares: [...state.firstPlayer.notEmptySquares, ...deathArray]
            }
          }
        }
        case 2: {
          return {
            ...state,
            secondPlayer: {
              ...state.secondPlayer,
              deathField: [...state.secondPlayer.deathField, ...action.field],
              notEmptySquares: [...state.secondPlayer.notEmptySquares, ...deathArray]
            }
          }
        }
        default:
          return {...state}
      }
    case FIELD_SHIPS_ZONE:
      let shipArray = [];
      for (let i = 0; i < action.field.length; i++) {
        shipArray = [...shipArray, ...action.field[i]]
      }
      switch (+action.fieldId) {
        case 1: {
          return {
            ...state,
            firstPlayer: {
              ...state.firstPlayer,
              shipField: [...state.firstPlayer.shipField, ...action.field],
              notEmptySquares: [...state.firstPlayer.notEmptySquares, ...shipArray]
            }
          }
        }
        case 2: {
          return {
            ...state,
            secondPlayer: {
              ...state.secondPlayer,
              shipField: [...state.secondPlayer.shipField, ...action.field],
              notEmptySquares: [...state.secondPlayer.notEmptySquares, ...shipArray]
            }
          }
        }
        default:
          return {...state}
      }
    case FIELD_EMPTY_ZONE:
      let notEmpty = [...action.death]
      for (let i = 0; i < action.ships.length; i++) {
        let ship = action.ships[i];
        for (let j = 0; j < ship.length; j++) {
          notEmpty.push(ship[j])
        }
      }
      return {
        ...state,
        emptySquares: state.emptySquares.filter(item => !notEmpty.includes(item))
      }
    case CLEAR_FIELD :
      switch (+action.fieldId) {
        case 1 :
          return {
            ...state,
            firstPlayer: {
              shipField: [],
              deathField: [],
              notEmptySquares: [],
              enemyDestroyedShipsSquares: [],
              enemyHitedSquares: [],
              destroyedShipsId:[],
              enemyMissedSquares: [],
              notEnemyEmptySquares: [],
              damagedShips: [],
              totalDestroyedShips: 0,
              destroyedShips: [],
            }
          }
        case 2 :
          return {
            ...state,
            secondPlayer: {
              shipField: [],
              deathField: [],
              notEmptySquares: [],
              enemyHitedSquares: [],
              destroyedShipsId:[],
              enemyMissedSquares: [],
              enemyDestroyedShipsSquares: [],
              notEnemyEmptySquares: []
            },
            damagedShipsSquares: []
          }
        default:
          return {...state}
      }
    case DND_SETTINGS:
      return {
        ...state,
        dndSettings: {
          ...state.dndSettings,
          currentPart: action.currentPart,
          shipSize: action.shipSize,
          currentShip: action.currentShip,
          direction: action.direction
        }
      }
    case DND_SETTINGS_POTENTIAL_SHIP:
      return {
        ...state,
        dndSettings: {
          ...state.dndSettings,
          successShip: action.isPossible ? action.ship : null,
          unsuccessfulShip: !action.isPossible ? action.ship : null
        }
      }
    case DELETE_DND_PREV_POTENTIAL_SHIP: {
      return {
        ...state,
        dndSettings: {
          ...state.dndSettings,
          successShip: null,
          unsuccessfulShip: null,
        }
      }
    }
    case CLEAR_DND:
      return {
        ...state,
        dndSettings: {
          currentPart: null,
          shipSize: null,
          prevShipPlacement: null,
          prevSquare: null,
          currentShip: null,
          successShip: null,
          unsuccessfulShip: null,
          status: null,
          x: null,
          y: null,
          direction: null,
        }
      }
    case DND_STATUS:
      let newShips = state.ships.slice()
      for (let i = 0; i < newShips.length; i++) {
        if (+newShips[i].id === +state.dndSettings.currentShip) {
          newShips[i].shipSquares = action.ship
        }
      }
      return {
        ...state,
        ships: newShips,
        dndSettings: {
          ...state.dndSettings,
          status: true,
        }
      }
    case DND_DROP_COORDINATES:
      return {
        ...state,
        dndSettings: {
          ...state.dndSettings,
          x: action.x,
          y: action.y,
        }
      }
    case SAVE_PREV_SHIP_PLACEMENT: {
      return {
        ...state,
        dndSettings: {
          ...state.dndSettings,
          prevShipPlacement: action.ship
        }
      }
    }
    case DELETE_SHIP: {
      let updateShips = state.firstPlayer.shipField.filter(item => !item.includes(action.ship[0]))
      let newNotEmptySquares = state.firstPlayer.notEmptySquares.filter(item => !action.ship.includes(item))
      return {
        ...state,
        firstPlayer: {
          ...state.firstPlayer,
          shipField: updateShips,
          notEmptySquares: newNotEmptySquares,
        }

      }
    }
    case DELETE_DEATH_ZONE: {
      const updateDZ = (x, y) => {
        let arr = []
        let mainArr = y.slice()
        for (let i = 0; i < y.length; i++) {
          if (x.length !== y[i].length) continue
          mainArr[i].sort((a, b) => a - b)
          arr = x.filter((item, index) => mainArr[i][index] === item)
          if (arr.length === x.length) {
            mainArr.splice(i, 1);
            break
          }
        }
        return mainArr;
      }
      let deathZone = state.firstPlayer.deathField.slice(),
          shipDeathZone = action.field.sort((a, b) => a - b),
          newDeathZone = [],
          newNotEmptySquares = []

      newDeathZone = updateDZ(shipDeathZone, deathZone)
      newNotEmptySquares = newNotEmptySquares.concat(...newDeathZone, ...state.firstPlayer.shipField)

      return {
        ...state,
        firstPlayer: {
          ...state.firstPlayer,
          deathField: newDeathZone,
          notEmptySquares: newNotEmptySquares,
        }
      }
    }
    case DND_PREV_SQUARE: {
      return {
        ...state,
        dndSettings: {
          ...state.dndSettings,
          prevSquare: action.prevSquare
        }
      }
    }
      //????
    case UPDATE_SHIP_SQUARES: {
      let newShips = state.ships.slice()
      for (let i = 0; i < state.ships.length; i++) {
        if (+state.ships[i].id === +action.shipId) {
          state.ships[i].shipSquares = action.newSquares
        }
      }

      return {
        ...state,
        ships: newShips
      }
    }
    case START_SHIP_DATA_COORDINATES: {
      return {
        ...state,
        ships: [...state.ships.map((ship, index) => {
          if (+ship.id === +action.shipId) {
            ship.x = action.x
            ship.y = action.y
          }
          return ship
        })],
      }
    }
    case CONTAINER_COORDINATES: {
      return {
        ...state,
        containerCoordinates: {
          x: action.x,
          y: action.y
        }
      }
    }
      //???????????
    case IS_RANDOM: {
      return {
        ...state,
        isRandom: !state.isRandom,
      }
    }
    case CLEAR_SHIPS_DATA: {
      return {
        ...state,
        ships: [{id: 1, size: 4,},
          {id: 2, size: 3,},
          {id: 3, size: 3,},
          {id: 4, size: 2,},
          {id: 5, size: 2,},
          {id: 6, size: 2,},
          {id: 7, size: 1,},
          {id: 8, size: 1,},
          {id: 9, size: 1,},
          {id: 10, size: 1,}],

        iSRandom: false,

        containerCoordinates: {
          x: null,
          y: null
        },
        gameOver: false,
        firstPlayer: {
          shipField: [],
          deathField: [],
          notEmptySquares: [],
          enemyDestroyedShipsSquares:[],
          enemyHitedSquares: [],
          destroyedShipsId:[],
          enemyMissedSquares: [],
          notEnemyEmptySquares: [],
          damagedShips: [],
          totalDestroyedShips: 0,
          destroyedShips: [],
        },
        secondPlayer: {
          shipField: [],
          deathField: [],
          notEmptySquares: [],
          enemyDestroyedShipsSquares:[],
          destroyedShipsId:[],
          enemyHitedSquares: [],
          enemyMissedSquares: [],
          notEnemyEmptySquares: []
        },
        //true - ход первого игрока, false - второго
        currentPlayer: true,
        damagedShipsSquares: [],

      }
    }

      //Для сражения
    case SET_HIT: {
      // Стрельба ведется !В! поле игрока с соответсвющим номером ( напрмер 2) , поэтому в обЪект для другого игрока (1) записываются клетки куда велась стрельба,
      // отмечая при этом клетки "мимо","попадание" и в которые уже стреляли
      // В какое поле стреляют?
      switch (+action.fieldId) {
        case 2: {

          return {
            ...state,
            firstPlayer: {
              ...state.firstPlayer,
              enemyHitedSquares: [...state.firstPlayer.enemyHitedSquares, action.id],
              notEnemyEmptySquares: [...state.firstPlayer.notEnemyEmptySquares, action.id]
            }
          }
        }
        case 1:
          return {
            ...state,
            secondPlayer: {
              ...state.secondPlayer,
              enemyHitedSquares: [...state.secondPlayer.enemyHitedSquares, action.id],
              notEnemyEmptySquares: [...state.secondPlayer.notEnemyEmptySquares, action.id]
            }
          }
        default:
          return {...state}
      }

    }
    case SET_MISS: {
      // Стрельба ведется !В! поле игрока с соответсвющим номером ( напрмер 2) , поэтому в обЪект для другого игрока (1) записываются клетки куда велась стрельба,
      // отмечая при этом клетки "мимо","попадание" и в которые уже стреляли

      // В какое поле стреляют?
      switch (+action.fieldId) {
        case 2:
          return {
            ...state,
            firstPlayer: {
              ...state.firstPlayer,
              enemyMissedSquares: [...state.firstPlayer.enemyMissedSquares, ...action.squares],
              notEnemyEmptySquares: [...state.firstPlayer.notEnemyEmptySquares, ...action.squares]
            }
          }
        case 1: {
          let newEnemyMissedSquares = new Set([...state.secondPlayer.enemyMissedSquares, ...action.squares])
          return {
            ...state,
            secondPlayer: {
              ...state.secondPlayer,
              enemyMissedSquares: [...newEnemyMissedSquares],
              notEnemyEmptySquares: [...state.secondPlayer.notEnemyEmptySquares, ...action.squares]
            }
          }
        }
        default:
          return {...state}
      }
    }
    case CHANGE_PLAYER: {
      return {
        ...state,
        currentPlayer: !state.currentPlayer
      }
    }
    case SET_DAMAGED_SHIP_SQUARES: {
      return {
        ...state,
        damagedShipsSquares: [...action.squares]
      }
    }
    case SET_DAMAGED_SHIPS_PLAYER: {
      let shipField = state.secondPlayer.shipField,
       damagedShip = shipField.find(ship => ship.includes(action.id)),
       indexOfShip = shipField.indexOf(damagedShip),
       damagedShipsSquares = state.firstPlayer.damagedShips.find(obj => obj.id === indexOfShip),
       newDamagedShipsSquares = null

      if (damagedShipsSquares) {
        damagedShipsSquares.squares = [...damagedShipsSquares.squares,action.id]
      } else {
        newDamagedShipsSquares = {id: indexOfShip, squares: [action.id]}
      }
      return {
        ...state,
        firstPlayer: {
          ...state.firstPlayer,
          damagedShips: damagedShipsSquares ?  state.firstPlayer.damagedShips : [...state.firstPlayer.damagedShips,newDamagedShipsSquares]
        }
      }
    }
    case SET_GAME_OVER: {
      return {
        ...state,
        gameOver: true
      }
    }
    case UPDATE_SHIP_DATA: {
      //???????
      let sortShips = state.firstPlayer.shipField.sort((a, b) => a - b)
      return {
        ...state,
        ships: state.ships.map((item, index) => {
          item.shipSquares = sortShips[index]
          return item
        }),
      }
    }
    case SET_TOTAL_DESTROYED_SHIPS: {
      let total = state.firstPlayer.totalDestroyedShips
      return {
        ...state,
        firstPlayer: {
          ...state.firstPlayer,
          totalDestroyedShips: ++total
        }
      }
    }
    case SET_DESTROYED_SHIP: {
      let newArr = [],
          newShipsId = []
      switch (+action.fieldId) {
        case 1: {
          let enemyDestroyedShipsSquares = state.firstPlayer.enemyDestroyedShipsSquares,
              shipsId = state.firstPlayer.destroyedShipsId


          newArr = enemyDestroyedShipsSquares.length > 0 ? [...enemyDestroyedShipsSquares,...action.ship] : [...action.ship]
          newShipsId = shipsId.length > 0 ? [...shipsId,action.shipId] : [action.shipId];
          return {
            ...state,
            firstPlayer: {
              ...state.firstPlayer,
              enemyDestroyedShipsSquares: newArr,
              destroyedShipsId: newShipsId
            }
          }
        }
        case 2: {
          let enemyDestroyedShipsSquares = state.secondPlayer.enemyDestroyedShipsSquares,
          shipsId = state.secondPlayer.destroyedShipsId

          newArr = enemyDestroyedShipsSquares.length > 0 ? [...enemyDestroyedShipsSquares,...action.ship] : [...action.ship]
          newShipsId = shipsId.length > 0 ? [...shipsId,action.shipId] : [action.shipId];
          return {
            ...state,
            secondPlayer: {
              ...state.secondPlayer,
              enemyDestroyedShipsSquares: newArr,
              destroyedShipsId: newShipsId
            }
          }
        }
        default: return {...state}
      }
    }
    default:
      return state
  }
}

//action для клеточек с корабликами
export const changeFieldData = (id, status) => ({type: FIELD_DATA, id, status,})
export const setDeathSquares = (field, fieldId = 1) => ({type: FIELD_DEATH_ZONE, field, fieldId})
export const setShipSquares = (field, fieldId = 1) => ({type: FIELD_SHIPS_ZONE, field, fieldId})
export const clearField = (fieldId) => ({type: CLEAR_FIELD, fieldId})

export const savePrevShipPlacement = (ship) => ({type: SAVE_PREV_SHIP_PLACEMENT, ship})
export const deleteShipFromField = (ship, fieldId = 1) => ({type: DELETE_SHIP, ship, fieldId})
export const deleteDeathZone = (field) => ({type: DELETE_DEATH_ZONE, field})

export const setStartShipDataCoordinates = (x, y, shipId) => ({type: START_SHIP_DATA_COORDINATES, x, y, shipId})

export const setDndSettings = (currentPart, shipSize, currentShip, direction) => ({
  type: DND_SETTINGS,
  currentPart,
  shipSize,
  currentShip,
  direction
})
export const setDndPotentialShip = (ship, isPossible) => ({type: DND_SETTINGS_POTENTIAL_SHIP, ship, isPossible})
export const deleteDndPrevPotentialShip = () => ({type: DELETE_DND_PREV_POTENTIAL_SHIP})
export const clearDndSettings = () => ({type: CLEAR_DND})
export const setDndStatus = (ship) => ({type: DND_STATUS, ship})
export const dndDropCoordinates = (x, y) => ({type: DND_DROP_COORDINATES, x, y})
export const setDndPrevSquare = (prevSquare) => ({type: DND_PREV_SQUARE, prevSquare})

export const updateShipData = () => ({type: UPDATE_SHIP_DATA})
export const updateShipSquares = (shipId, newSquares) => ({type: UPDATE_SHIP_SQUARES, shipId, newSquares})
export const iSRandom = () => ({type: IS_RANDOM})
export const clearShipsData = () => ({type: CLEAR_SHIPS_DATA})

export const setContainerCoordinates = (x, y) => ({type: CONTAINER_COORDINATES, x, y})

//для сражения
export const setHit = (id, fieldId) => ({type: SET_HIT, id, fieldId})
export const setMiss = (squares, fieldId) => ({type: SET_MISS, squares, fieldId})
export const changePlayer = () => ({type: CHANGE_PLAYER,})
export const setDamageShip = (squares) => ({type: SET_DAMAGED_SHIP_SQUARES, squares})
export const setDamagedShipsPlayer = (id) => ({type: SET_DAMAGED_SHIPS_PLAYER, id})
export const setGameOver = () => ({type: SET_GAME_OVER})
export const setTotalDestroyedShipsPlayer = () => ({type: SET_TOTAL_DESTROYED_SHIPS})
export const setDestroyedShip = (ship,fieldId,shipId) => ({type: SET_DESTROYED_SHIP, ship,fieldId,shipId})

export default battleFieldReducer