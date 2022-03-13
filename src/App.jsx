import {Provider} from "react-redux";
import store from "./redux/redux";
import "./App.scss"
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Settings from "./components/Common/Settings/Settings";
import GameOverModal from "./components/Common/GameOverModal/GameOverModal";

const App = () => {
  return (
    <Provider store={store}>
      <div className={"app"}>
        <Header />
        <Main/>
        <Settings/>
        <GameOverModal/>
      </div>
    </Provider>
  );
}

export default App;

