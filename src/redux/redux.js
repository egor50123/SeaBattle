import {combineReducers, createStore} from "redux";
import appInitReducer from "./appInitReducer";
import battleFieldReducer from "./battleFieldReducer";
import {composeWithDevTools} from "redux-devtools-extension";


let reducers = combineReducers(
    {
      appInit: appInitReducer,
      battleField: battleFieldReducer,
    }
)

let store  = createStore(reducers, composeWithDevTools());

window.store = store;

export default store