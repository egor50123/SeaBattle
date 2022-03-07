const SET_IS_BOT_MOVE = "SET_IS_BOT_MOVE"
const DISABLE_FIELD = "DISABLE_FIELD"

const initialState = {
    isBotMove: false,
    isFieldDisabled: false,
}

const battleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_BOT_MOVE: {
      return {
        ...state,
        isBotMove: action.result,
      }
    }
    case DISABLE_FIELD: {
      return {
        ...state,
        isFieldDisabled: action.result
      }
    }
    default: return state
  }

}

export const setIsBotMove = (result) => ({type:SET_IS_BOT_MOVE,result})
export const disableField = (result) => ({type: DISABLE_FIELD,result})

export default battleReducer