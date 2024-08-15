import { Pages } from "./pages/Pages";

import { WeatherProvider } from "./context/weather";
import { WindowProvider } from "./context/window";
import { ModalProvider } from "./context/modal";

import "./App.css";
import "./styles/global.scss";

function App() {


  return (
    <div className="App">
      <WindowProvider>
        <ModalProvider>
          <WeatherProvider>
            <Pages />
          </WeatherProvider>
        </ModalProvider>
      </WindowProvider>
    </div>
  );
}

export default App;
