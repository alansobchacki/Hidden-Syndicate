import {
  MainContainer,
  GreetingsContainer,
  GreetingsMenu,
  GreetingsTitle,
  GreetingsButton,
  Header,
  GameContainer,
  GameImage,
  GameGuessClick,
  GameGuessForm,
  GameGuessFormSubContainer,
  GameGuessCircle,
  Footer
} from "./Game.styles.js";
import { useState, useEffect, useRef } from "react";

function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [highScores, setHighScores] = useState(false);
  const [imageClicked, setImageClicked] = useState(false);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);
  const [timer, setTimer] = useState(0);

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

  const handleViewHighscoresClick = () => {
    setHighScores(!highScores);
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
            {!highScores ? (
              <>
                <GreetingsTitle>Video Gaem</GreetingsTitle>
                <GreetingsButton onClick={handleStartGameClick}>Start Game</GreetingsButton>
                <GreetingsButton onClick={handleViewHighscoresClick}>High Scores</GreetingsButton>
              </>
            ) : (
              <>
                <GreetingsTitle>Highest Scores:</GreetingsTitle>
                <GreetingsButton onClick={handleViewHighscoresClick}>Return</GreetingsButton>
              </>
            )}
          </GreetingsMenu>
          <GameImage src="src/assets/egor-klyuchnyk-artwork.jpg" isBlurred={gameStarted}/>
        </GreetingsContainer>
      )}

      {gameStarted && (
        <GameContainer ref={gameContainerRef}>
          <Header>
            <GameGuessCircle />
            <GameGuessCircle />
            <GameGuessCircle />
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

          <Footer><p>footer with credits</p></Footer>
        </GameContainer>
      )}
    </MainContainer>
  );
}

export default Game;
