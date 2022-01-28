const FIELD_DATA = "FIELD_DATA";
const FIELD_DEATH_ZONE = "FIELD_DEATH_ZONE";
const FIELD_SHIPS_ZONE ="FIELD_SHIPS_ZONE";
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
const START_SHIP_DATA = "START_SHIP_DATA";
const START_SHIP_DATA_COORDINATES = "START_SHIP_DATA_COORDINATES";
const CONTAINER_COORDINATES = "CONTAINER_COORDINATES";
const UPDATE_SHIP_DATA = "UPDATE_SHIP_DATA";
const UPDATE_SHIP_SQUARES = "UPDATE_SHIP_SQUARES"
const IS_RANDOM = "IS_RANDOM";
const DELETE_DND_PREV_POTENTIAL_SHIP = "DELETE_DND_PREV_POTENTIAL_SHIP"
const CLEAR_SHIPS_DATA = "CLEAR_SHIPS_DATA"


const initialState = {
  squares: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],
  ships: [{id:1,size:4,},
    {id:2,size:3,},
    {id:3,size:3,},
    {id:4,size:2,},
    {id:5,size:2,},
    {id:6,size:2,},
    {id:7,size:1,},
    {id:8,size:1,},
    {id:9,size:1,},
    {id:10,size:1,}],

  iSRandom: false,

  containerCoordinates: {
    x:null,
    y:null
  },

  shipField: [],
  deathField: [],
  notEmptySquares: [],

  dndSettings: {
    currentPart:null,
    shipSize: null,
    prevShipPlacement:null,
    prevSquare: null,
    currentShip:null,
    successShip: null,
    unsuccessfulShip: null,
    status:null,
    x:null,
    y:null,
    direction: null
  }
}

const battleFieldReducer = (state = initialState, action) => {
  switch (action.type) {
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
        deathArray = [...deathArray,...action.field[i]]
      }
      return {
        ...state,
        deathField: [...state.deathField,...action.field],
        notEmptySquares: [...state.notEmptySquares,...deathArray]
      }
    case FIELD_SHIPS_ZONE:
      let shipArray = [];
      for (let i = 0; i < action.field.length; i++) {
        shipArray = [...shipArray,...action.field[i]]
      }
      return {
        ...state,
        shipField: [...state.shipField,...action.field],
        notEmptySquares: [...state.notEmptySquares,...shipArray]
      }
    case FIELD_EMPTY_ZONE:
      let notEmpty = [...action.death]
      for (let i = 0; i<action.ships.length; i++) {
        let ship = action.ships[i];
        for (let j = 0; j <ship.length;j++ ) {
          notEmpty.push(ship[j])
        }
      }
      return {
        ...state,
        emptySquares: state.emptySquares.filter(item => !notEmpty.includes(item))
      }
    case CLEAR_FIELD :
      return {
        ...state,
        shipField: [],
        deathField: [],
        notEmptySquares: []
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
          currentPart:null,
          shipSize: null,
          prevShipPlacement:null,
          prevSquare: null,
          currentShip:null,
          successShip: null,
          unsuccessfulShip: null,
          status:null,
          x:null,
          y:null,
          direction: null,
        }
      }
    case DND_STATUS:
      let newShips = state.ships.slice()
      for (let i = 0; i< newShips.length; i++) {
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
      return  {
        ...state,
        dndSettings: {
          ...state.dndSettings,
          x:action.x,
          y:action.y,
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
      let updateShips = state.shipField.filter(item => !item.includes(action.ship[0]))
      let newNotEmptySquares = state.notEmptySquares.filter(item => !action.ship.includes(item))
      return {
        ...state,
        shipField: updateShips,
        notEmptySquares: newNotEmptySquares,
      }
    }
    case DELETE_DEATH_ZONE: {
      const updateDZ = (x,y) => {
        let newx = []
        let newy =y.slice()
        for (let i=0; i<y.length;i++) {
          if (x.length !== y[i].length) continue
          try {
            newy[i].sort((a,b) => a-b)
            newx = x.filter((item,index) => newy[i][index] === item)
            if (newx.length === x.length) {
              newy.splice(i,1);
              break
            }
          } catch (err) {
            debugger
          }

        }
        return newy;
      }
      let deathZone = state.deathField.slice(),
         shipDeathZone = action.field.sort((a,b) => a-b),
         newDeathZone = [],
         newNotEmptySquares = []

      newDeathZone = updateDZ(shipDeathZone,deathZone)
      newNotEmptySquares = newNotEmptySquares.concat(...newDeathZone,...state.shipField)

      return {
        ...state,
        deathField: newDeathZone,
        notEmptySquares: newNotEmptySquares,
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
    case UPDATE_SHIP_DATA: {
      //???????
    let sortShips = state.shipField.sort((a,b) => a-b)
    return {
      ...state,
      ships: [...state.ships.map( (item,index) => {
        item.shipSquares = sortShips[index]
        return item
      })],
    }
  }
    case UPDATE_SHIP_SQUARES: {
      let newShips = state.ships.slice()
      for(let i = 0; i<state.ships.length; i++) {
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
        ships: [...state.ships.map( (ship,index) => {
          if ( +ship.id === +action.shipId) {
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
          x:action.x,
          y:action.y
        }
      }
    }
    case IS_RANDOM: {
      return {
        ...state,
        isRandom: !state.isRandom,
      }
    }
    case CLEAR_SHIPS_DATA: {
      return {
        ...state,
        ships: [{id:1,size:4,},
          {id:2,size:3,},
          {id:3,size:3,},
          {id:4,size:2,},
          {id:5,size:2,},
          {id:6,size:2,},
          {id:7,size:1,},
          {id:8,size:1,},
          {id:9,size:1,},
          {id:10,size:1,}],
        shipField: [],
        deathField: [],
        notEmptySquares: [],
      }
    }
    default: return state
  }
}

//action для клеточек с корабликами
export const changeFieldData = (id,status) => ({type: FIELD_DATA, id, status, })
export const setDeathSquares = (field) => ({type: FIELD_DEATH_ZONE, field})
export const setShipSquares = (field) => ({type:FIELD_SHIPS_ZONE, field})
export const clearField = () => ({type: CLEAR_FIELD })

export const savePrevShipPlacement = (ship) => ({type:SAVE_PREV_SHIP_PLACEMENT, ship})
export const deleteShipFromField = (ship) => ({type: DELETE_SHIP, ship})
export const deleteDeathZone = (field) => ({type: DELETE_DEATH_ZONE, field})

export const setStartShipDataCoordinates = (x,y,shipId) => ({type: START_SHIP_DATA_COORDINATES,x,y,shipId})

export const setDndSettings = (currentPart,shipSize,currentShip,direction) => ({type:DND_SETTINGS,currentPart,shipSize,currentShip,direction})
export const setDndPotentialShip = (ship,isPossible) => ({type: DND_SETTINGS_POTENTIAL_SHIP,ship,isPossible})
export const deleteDndPrevPotentialShip = () => ({type: DELETE_DND_PREV_POTENTIAL_SHIP})
export const clearDndSettings = () => ({type: CLEAR_DND})
export const setDndStatus = (ship) => ({type: DND_STATUS,ship})
export const dndDropCoordinates = (x,y) => ({type:DND_DROP_COORDINATES,x,y})
export const setDndPrevSquare = (prevSquare) => ({type:DND_PREV_SQUARE,prevSquare})

export const updateShipData = () => ({type:UPDATE_SHIP_DATA})
export const updateShipSquares = (shipId,newSquares) => ({type:UPDATE_SHIP_SQUARES,shipId,newSquares})
export const iSRandom = () => ({type: IS_RANDOM})
export const clearShipsData = () => ({type:CLEAR_SHIPS_DATA})

export const setContainerCoordinates = (x,y) => ({type:CONTAINER_COORDINATES,x,y})

export default battleFieldReducer