const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const IS_SAVED_PLACEMENT_OPEN = "IS_SAVED_PLACEMENT_OPEN"
const SET_COUNT_OF_SAVED_SHIPS = "SET_COUNT_OF_SAVED_SHIPS"
const SET_SETTINGS_OPEN = "SET_SETTINGS_OPEN"
const SET_ANIMATION = "SET_ANIMATION"

const initialState = {
  test:1,
  currentPage: "menu",
  isPlacementOpen: false,
  countOfSavedShips: 0,
  isSettingsOpen: false,
  isAnimationOn: true,
}

const appInitReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.page
      }
    }
    case IS_SAVED_PLACEMENT_OPEN: {
      return {
        ...state,
        isPlacementOpen: action.result !== undefined ? action.result : !state.isPlacementOpen
      }
    }
    case SET_COUNT_OF_SAVED_SHIPS: {
      return {
        ...state,
        countOfSavedShips: state.countOfSavedShips + action.count
      }
    }
    case SET_SETTINGS_OPEN: {
      return {
        ...state,
        isSettingsOpen: action.result
      }
    }

    case SET_ANIMATION: {
      return {
        ...state,
        isAnimationOn: !state.isAnimationOn
      }
    }
    default: return state
  }

}

export const setCurrentPage = (page) => ({type:SET_CURRENT_PAGE,page})
export const isSavedPlacementOpen = (result) => ({type: IS_SAVED_PLACEMENT_OPEN,result})
export const setCountOfSavedShips = (count = 1) => ({type: SET_COUNT_OF_SAVED_SHIPS, count})
export const setSettingsOpen = (result) => ({type:SET_SETTINGS_OPEN, result})
export const setIsAnimationOn = () => ({type:SET_ANIMATION})


export default appInitReducer