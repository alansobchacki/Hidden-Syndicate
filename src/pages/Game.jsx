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
  const apiUrl = import.meta.env.VITE_API_URL;
  const [gameStarted, setGameStarted] = useState(false);
  const [highScores, setHighScores] = useState(false);
  const [highScoresList, setHighScoresList] = useState([]);
  const [imageClicked, setImageClicked] = useState(false);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);
  const [timer, setTimer] = useState(0);
  const gameContainerRef = useRef(null);

  const fetchScores = async () => {
    try {
      const response = await fetch(`${apiUrl}/game/scores`, {
        method: "GET"
      });
  
      const data = await response.json();
  
      if (response.ok) setHighScoresList(data);

    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  
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
    if (!highScores) fetchScores();
  };

  const getClickCoordinates = (event) => {
    const rect = event.target.getBoundingClientRect();

    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top - 50; // to account for the header

    // Convert the coordinates to percentages -- to be used later on the API
    const width = rect.width;
    const height = rect.height;
  
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    alert(`x coordinates in % = ${xPercent}, y coordinates in % = ${yPercent}`);
    //

    setClickX(x);
    setClickY(y);
  };

  return (
    <MainContainer>
      <Header isVisible={gameStarted}>
        <GameGuessCircle />
        <GameGuessCircle />
        <GameGuessCircle />
        <div>
          {timer}
        </div>
      </Header>

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
                <ul>
                  {highScoresList.length > 0 ? (
                    highScoresList.map((score, index) => (
                      <li key={index}>
                        {score.name}: {score.score}
                      </li>
                    ))
                  ) : (
                    <li>No high scores available</li>
                  )}
                </ul>
                <GreetingsButton onClick={handleViewHighscoresClick}>Return</GreetingsButton>
              </>
            )}
          </GreetingsMenu>
          <GameImage src="src/assets/egor-klyuchnyk-artwork.jpg" isBlurred={gameStarted}/>
        </GreetingsContainer>
      )}

      {gameStarted && (
        <GameContainer ref={gameContainerRef}>
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
