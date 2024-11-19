import {
  MainContainer,
  GreetingsContainer,
  GameContainer,
  GameImage,
  GameGuessClick,
  GameGuessForm,
  GameGuessFormSubContainer,
  GameGuessCircle
} from "./Game.styles.js";
import { useState, useRef } from "react";

function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [imageClicked, setImageClicked] = useState(false);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);

  const gameContainerRef = useRef(null);

  const handleImageClick = (event) => {
    setImageClicked(!imageClicked);
    getClickCoordinates(event);
  };

  const handleStartGameClick = () => { 
    setGameStarted(true);
  };

  const getClickCoordinates = (event) => {
    const rect = event.target.getBoundingClientRect();

    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;


    setClickX(x);
    setClickY(y);
  };

  return (
    <MainContainer>
      {!gameStarted && (
        <GreetingsContainer>
          <button onClick={handleStartGameClick}>Click me to start the game!</button>
        </GreetingsContainer>
      )}

      {gameStarted && (
        <GameContainer ref={gameContainerRef}>
          <div>
            <p>header with directions</p>
          </div>

          {imageClicked && (
            <>
              <GameGuessClick x={clickX} y={clickY} />
              <GameGuessForm x={clickX} y={clickY}>
                Which character have you found?
                <GameGuessFormSubContainer>
                  <GameGuessCircle />
                  Meme
                </GameGuessFormSubContainer>
                <GameGuessFormSubContainer>
                  <GameGuessCircle />
                  Meme 2
                </GameGuessFormSubContainer>
                <GameGuessFormSubContainer>
                  <GameGuessCircle />
                  Meme 3
                </GameGuessFormSubContainer>
              </GameGuessForm>
            </>
          )}

          <GameImage src="src/assets/egor-klyuchnyk-artwork.jpg" onClick={handleImageClick} alt="" />

          <div>
            <p>footer with credits</p>
          </div>
        </GameContainer>
      )}
    </MainContainer>
  );
}

export default Game;
