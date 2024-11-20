import {
  MainContainer,
  GreetingsContainer,
  GreetingsMenu,
  GreetingsButton,
  Header,
  GameContainer,
  GameImage,
  GameGuessClick,
  GameGuessForm,
  GameGuessFormSubContainer,
  GameGuessCircle
} from "./Game.styles.js";
import { useState, useEffect, useRef } from "react";

function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [imageClicked, setImageClicked] = useState(false);
  const [timer, setTimer] = useState(0);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);

  const gameContainerRef = useRef(null);

  useEffect(() => {
    let interval;
    if (gameStarted) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameStarted]);

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
          <GreetingsMenu>
            
            <GreetingsButton onClick={handleStartGameClick}>Start Game</GreetingsButton>
            <GreetingsButton onClick={handleStartGameClick}>High Scores</GreetingsButton>
          </GreetingsMenu>
          <GameImage src="src/assets/egor-klyuchnyk-artwork.jpg" isBlurred={gameStarted}/>
        </GreetingsContainer>
      )}

      {gameStarted && (
        <GameContainer ref={gameContainerRef}>
          <Header>
            You must find these three characters:
            <GameGuessCircle />
            <GameGuessCircle />
            <GameGuessCircle />
            The faster you do, the higher you score!
            <div>
              {timer}
            </div>
          </Header>

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

          <GameImage 
            src="src/assets/egor-klyuchnyk-artwork.jpg" 
            isBlurred={gameStarted} 
            onClick={handleImageClick} 
            alt="" 
          />

          <div>
            <p>footer with credits</p>
          </div>
        </GameContainer>
      )}
    </MainContainer>
  );
}

export default Game;
