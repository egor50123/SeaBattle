import {Provider, useDispatch} from "react-redux";
import store from "./redux/redux";
import "./App.scss"
import Container from "./components/Container/Container";
import {deleteDndPrevPotentialShip} from "./redux/battleFieldReducer";

const App = () => {
  return (
    <Provider store={store}>
      <div className={"App"}>
        <Container />
      </div>
    </Provider>
  );
}

export default App;

