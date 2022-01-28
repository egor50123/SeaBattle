const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"

const initialState = {
  test:1,
  currentPage: "menu"
}

const appInitReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.page
      }
    }
    default: return state
  }

}

export const setCurrentPage = (page) => ({type:SET_CURRENT_PAGE,page})

export default appInitReducer