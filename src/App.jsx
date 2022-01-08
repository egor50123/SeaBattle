import {Provider} from "react-redux";
import store from "./redux/redux";
import BattleField from "./components/BattleField/BattleField";
import "./App.scss"
import ShipsField from "./components/ShipsField/ShipsField";

const App = () => {
  window.onclick = (e) => {
    console.log("mouse - x" + e.pageX)
    console.log("mouse - y" + e.pageY)
  }
  return (
    <Provider store={store}>
      <div className={"App"}>
        <div className={"container"}>
          <ShipsField/>
          <BattleField/>
        </div>
        {/*<Main />*/}
      </div>
    </Provider>
  );
}

export default App;

