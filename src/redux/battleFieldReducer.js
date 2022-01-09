const TEST = "1";
const FIELD_DATA = "FIELD_DATA";
const FIELD_DEATH_ZONE = "FIELD_DEATH_ZONE";
const FIELD_SHIPS_ZONE ="FIELD_SHIPS_ZONE";
const FIELD_EMPTY_ZONE = "FIELD_EMPTY_ZONE";
const CLEAR_FIELD = "CLEAR_FIELD";
const DND_SETTINGS = "DND_SETTINGS";
const DND_SETTINGS_POTENTIAL_SHIP = 'DND_SETTINGS_POTENTIAL_SHIP';
const CLEAR_DND = "CLEAR_DND";
const DND_STATUS = "DND_STATUS";
const DND_DROP_COORDINATES = "DND_DROP_COORDINATES"


const initialState = {
  squares: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],
  a:1,
  ships: [{id:1,key:1,size:4,},
    {id:2,key:2,size:3,},
    {id:3,key:3,size:3,},
    {id:4,key:4,size:2,},
    {id:5,key:5,size:2,},
    {id:6,key:6,size:2,},
    {id:7,key:7,size:1,},
    {id:8,key:8,size:1,},
    {id:9,key:9,size:1,},
    {id:10,key:10,size:1,}],

  shipField: [],
  deathField: [],
  notEmptySquares: [],

  dndSettings: {
    currentPart:null,
    shipSize: null,
    currentShip:null,
    successShip: null,
    unsuccessfulShip: null,
    status:null,
    x:null,
    y:null,
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
      return {
        ...state,
        deathField: [...state.deathField,...action.field],
        notEmptySquares: [...state.notEmptySquares,...action.field]
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
          currentShip: action.currentShip
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
    case CLEAR_DND:
      return {
        ...state,
        dndSettings: {
          currentPart:null,
          shipSize: null,
          successShip: null,
          unsuccessfulShip: null,
        }
      }

    case DND_STATUS:
      let newShips = state.ships.slice()
      for (let i = 0; i< newShips.length; i++) {
        //console.log(newShips[i].id)
        console.log(state.dndSettings.currentShip)
        if (+newShips[i].id === +state.dndSettings.currentShip) {
          newShips[i].ship = action.ship
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
    default: return state
  }
}

//action для клеточек с корабликами
export const changeFieldData = (id,status) => ({type: FIELD_DATA, id, status, })
export const setDeathSquares = (field) => ({type: FIELD_DEATH_ZONE, field})
export const setShipSquares = (field) => ({type:FIELD_SHIPS_ZONE, field})
export const clearField = () => ({type: CLEAR_FIELD })
export const setDndSettings = (currentPart,shipSize,currentShip) => ({type:DND_SETTINGS,currentPart,shipSize,currentShip})
export const setDndPotentialShip = (ship,isPossible) => ({type: DND_SETTINGS_POTENTIAL_SHIP,ship,isPossible})
export const clearDndSettings = () => ({type: CLEAR_DND})
export const setDndStatus = (ship) => ({type: DND_STATUS,ship})
export const dndDropCoordinates = (x,y) => ({type:DND_DROP_COORDINATES,x,y})

export default battleFieldReducer