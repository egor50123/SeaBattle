import {Provider} from "react-redux";
import store from "./redux/redux";
import BattleField from "./components/BattleField/BattleField";
import "./App.scss"

const App = () => {
  return (
    <Provider store={store}>
      <div className={"App"}>
        {/*<Main />*/}
        <BattleField/>
      </div>
    </Provider>
  );
}

export default App;

