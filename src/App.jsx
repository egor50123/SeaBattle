import {Provider} from "react-redux";
import store from "./redux/redux";
import "./App.scss"
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

const App = () => {
  // window.addEventListener("click", (e) => {
  //   console.log(e.pageY)
  // })
  return (
    <Provider store={store}>
      <div className={"app"}>
        <Header />
        <Main/>
      </div>
    </Provider>
  );
}

export default App;

