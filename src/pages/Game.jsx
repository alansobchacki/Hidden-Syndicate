import {
  MainContainer,
  GameContainer,
  GameImage,
} from "./Game.styles.js";
import { useState } from "react";

function Game() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleImageClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

    console.log(xPercent, yPercent);
  };

  const handleButtonClick = () => { 
    setGameStarted(true);
  }

  return (
    <MainContainer>
      {!gameStarted && (
        <>
          <button onClick={handleButtonClick}>Click me to start the game!</button>
        </>
      )}

      {gameStarted && (
        <GameContainer>
        <div>
          <p>header with directions</p>
        </div>

        <GameImage src="src/assets/egor-klyuchnyk-artwork.jpg" onClick={handleImageClick} alt="" />

        <div>
          <p>footer with credits</p>
        </div>
      </GameContainer>
      )}
    </MainContainer>
  )
}

export default Game;
