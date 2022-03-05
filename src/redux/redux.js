import {combineReducers, createStore} from "redux";
import appInitReducer from "./appInitReducer";
import battleFieldReducer from "./battleFieldReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import animationReducer from "./animationReducer";
import battleReducer from "./battleReducer";


let reducers = combineReducers(
    {
      appInit: appInitReducer,
      battleField: battleFieldReducer,
      animation:animationReducer,
      battle: battleReducer,
    }
)

let store  = createStore(reducers, composeWithDevTools());

window.store = store;

export default store