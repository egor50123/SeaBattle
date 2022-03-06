const SET_IS_BOT_MOVE = "SET_IS_BOT_MOVE"

const initialState = {
    isBotMove: false
}

const battleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_BOT_MOVE: {
      return {
        ...state,
        isBotMove: action.result,
      }
    }
    default: return state
  }

}

export const setIsBotMove = (result) => ({type:SET_IS_BOT_MOVE,result})

export default battleReducer