import {Provider} from "react-redux";
import store from "./redux/redux";
import "./App.scss"
import Container from "./components/Container/Container";
import {createRef} from "react";

const App = () => {
  window.onclick = (e) => {
    console.log("mouse - x" + e.pageX)
    console.log("mouse - y" + e.pageY)
  }
  //const ref = createRef()
  return (
    <Provider store={store}>
      <div className={"App"}>
        <Container />
      </div>
    </Provider>
  );
}

export default App;

