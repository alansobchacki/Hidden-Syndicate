import Game from "./pages/Game.jsx";
import Greetings from "./pages/Greetings.jsx";
import GlobalStyles from "./App.styles.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
          <Routes>
            <Route path="/" element={<Greetings />} />
            <Route path="/game" element={<Game />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
