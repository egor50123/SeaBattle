const TEST = "1";
const FIELD_DATA = "FIELD_DATA";
const FIELD_DEATH_ZONE = "FIELD_DEATH_ZONE";
const FIELD_SHIPS_ZONE ="FIELD_SHIPS_ZONE";
const FIELD_EMPTY_ZONE = "FIELD_EMPTY_ZONE";
const CLEAR_FIELD = "CLEAR_FIELD"

const initialState = {
  //emptySquares: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],
  a:1,
  ships: {
    quadruple: 1,
    triple: 2,
    double: 3,
    single: 4,
  },
  shipField: [],
  deathField: [],
}

const battleFieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case '1':
      return {
        ...state,
        a:action.test,
      }
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
        deathField: [...action.field]
      }
    case FIELD_SHIPS_ZONE:
      return {
        ...state,
        shipField: [...state.shipField,...action.field]
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
      }

    default: return state
  }
}

//action для клеточек с корабликами
export const changeFieldData = (id,status) => ({type: FIELD_DATA, id, status, })
export const testAction = (test) => ({type: TEST, test })
export const setDeathSquares = (field) => ({type: FIELD_DEATH_ZONE, field})
export const setShipSquares = (field) => ({type:FIELD_SHIPS_ZONE, field})
export const setEmptySquares = (death,ships) => ({type:FIELD_EMPTY_ZONE, death, ships})
export const clearField = () => ({type: CLEAR_FIELD })

export default battleFieldReducer