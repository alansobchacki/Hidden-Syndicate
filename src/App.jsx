import Game from "./pages/Game.jsx";
import GlobalStyles from "./App.styles.js";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/game" replace />} />
            <Route path="/game" element={<Game />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
