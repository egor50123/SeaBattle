const SET_ANIMATE_ROCKET = "SET_ANIMATE_ROCKET"
const SET_INIT_ROCKET_COORDINATES = "SET_INIT_ROCKET_COORDINATES"
const IS_ANIMATED_ON = "IS_ANIMATED_ON"
const CLEAR_ANIMATION = "CLEAR_ANIMATION"

const initialState = {
  rocket1: {
    top: null,
    left: null,
    rotate: null,
    scale: null,
    initTop: null,
    initLeft: null,
    isAnimation: false
  },
}

const appInitReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ANIMATE_ROCKET: {
      return {
        ...state,
        rocket1: {
          ...state.rocket1,
          top: action.settings.top === undefined ? state.rocket1.top :  action.settings.top,
          left: action.settings.left === undefined ? state.rocket1.left :  action.settings.left,
          rotate: action.settings.rotate === undefined ? state.rocket1.rotate :  action.settings.rotate,
          scale: action.settings.scale === undefined ? state.rocket1.scale :  action.settings.scale,
        }
      }
    }

    case SET_INIT_ROCKET_COORDINATES: {
      return {
        ...state,
        rocket1: {
          ...state.rocket1,
          initTop: action.top,
          initLeft: action.left
        }
      }
    }

    case IS_ANIMATED_ON: {
      return {
        ...state,
        rocket1: {
          ...state.rocket1,
          isAnimation: action.result
        }
      }
    }

    case CLEAR_ANIMATION: {
      return {
        ...state,
        rocket1: {
          ...state.rocket1,
          top: 0,
          left: 0,
          rotate: 0,
          scale: 0
        }
      }
    }
    default: return state
  }

}

export const setAnimateRocket = (settings) => ({type:SET_ANIMATE_ROCKET,settings})
export const setInitRocketCoordinates = (top,left) => ({type:SET_INIT_ROCKET_COORDINATES, top,left})
export const isAnimationOn = (result) => ({type: IS_ANIMATED_ON,result})
export const clearAnimation = () => ({type: CLEAR_ANIMATION})
export default appInitReducer