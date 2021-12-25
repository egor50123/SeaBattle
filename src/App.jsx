import './App.css';
import {Provider} from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div>
        <div>
          <button>Один игрок</button>
          <button>Два игрока</button>
        </div>
      </div>
    </Provider>
  );
}

export default App;
