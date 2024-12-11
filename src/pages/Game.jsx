import {
  MainContainer,
  GreetingsContainer,
  GreetingsMenu,
  GreetingsTitle,
  GreetingsButton,
  Header,
  GameContainer,
  GameBackgroundImage,
  GameGuessClick,
  GameGuessForm,
  GameGuessFormSubContainer,
  GameGuessCircle,
  Footer
} from "./Game.styles.js";
import { useState, useEffect, useRef } from "react";

function Game() {
  const [highScores, setHighScores] = useState(false);
  const [highScoresList, setHighScoresList] = useState([]);
  const [targetsList, setTargetsList] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [imageClicked, setImageClicked] = useState(false);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);
  const [clickXPercent, setClickXPercent] = useState(0);
  const [clickYPercent, setClickYPercent] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const gameContainerRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchScores = async () => {
    try {
      const response = await fetch(`${apiUrl}/game/scores`, {
        method: "GET"
      });
  
      const data = await response.json();
      if (response.ok) setHighScoresList(data);

    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const fetchTargets = async () => {
    try {
      const response = await fetch(`${apiUrl}/game`, {
        method: "GET"
      });
  
      const data = await response.json();
      if (response.ok) setTargetsList(data);

    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const fetchGuess = async (name, x, y) => {
    try {
      const response = await fetch(`${apiUrl}/game/guess`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, x, y }),
      });

      const data = await response.json();
      if (response.ok) return data;

    } catch (error) {
      console.log("Error: " + error.message);
    }
  }

  const savePlayerScore = async (name, score) => {
    try {
      const response = await fetch(`${apiUrl}/game/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, score }),
      });

      const data = await response.json();
      if (response.ok) return data;

    } catch (error) {
      console.log("Error: " + error.message);
    }
  }

  const handleViewHighscoresClick = () => {
    setHighScores(!highScores);
    if (!highScores) fetchScores();
  };

  const handleStartGameClick = () => { 
    fetchTargets();
    setGameStarted(true);
  };

  const handleImageClick = (event) => {
    setImageClicked(!imageClicked);
    getClickCoordinates(event);
  };

  const handleFormSubmit = async (name, x, y) => {
    try {
      const answer = await fetchGuess(name, x, y);

      if (answer.isCorrect) setCorrectGuesses(correctGuesses + 1);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  }

  const getClickCoordinates = (event) => {
    const rect = event.target.getBoundingClientRect();

    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top - 50; // to account for the header

    const width = rect.width;
    const height = rect.height;

    setClickX(x);
    setClickY(y);

    // Convert the coordinates to percentages -- to be used on the API
    setClickXPercent((x / width) * 100);
    setClickYPercent((y / height) * 100);
  };

  useEffect(() => {
    let interval;
    if (gameStarted) {
      interval = setInterval(() => {
        setScore((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    if (correctGuesses === 3) { 
      setGameEnded(true);
      setGameStarted(false);
    }
  }, [correctGuesses]);

  return (
    <MainContainer>
      <Header isVisible={gameStarted}>
        {targetsList.length > 0 && <GameGuessCircle src={targetsList[0].image} />}
        {targetsList.length > 0 && <GameGuessCircle src={targetsList[1].image} />}
        {targetsList.length > 0 && <GameGuessCircle src={targetsList[2].image} />}
        <div>Correct Guesses: {correctGuesses}</div>
        <div>Your Score: {score} (the lower the better)</div>
      </Header>

      {!gameStarted && !gameEnded &&(
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
          <GameBackgroundImage src="/assets/egor-klyuchnyk-artwork.jpg" isBlurred={gameStarted}/>
        </GreetingsContainer>
      )}

      {gameEnded && (
        <>
          game ended go home
        </>
      )}

      {gameStarted && !gameEnded &&(
        <GameContainer ref={gameContainerRef}>
          {imageClicked && (
            <>
              <GameGuessClick x={clickX} y={clickY} />
              <GameGuessForm x={clickX} y={clickY}>
                Which character have you found?
                <GameGuessFormSubContainer
                  onClick={() => handleFormSubmit(targetsList[0].name, clickXPercent, clickYPercent)}
                >
                  {targetsList.length > 0 && <GameGuessCircle src={targetsList[0].image} />}
                  {targetsList.length > 0 && <>{targetsList[0].name}</>}
                </GameGuessFormSubContainer>

                <GameGuessFormSubContainer
                  onClick={() => handleFormSubmit(targetsList[1].name, clickXPercent, clickYPercent)}
                >
                  {targetsList.length > 0 && <GameGuessCircle src={targetsList[1].image} />}
                  {targetsList.length > 0 && <>{targetsList[1].name}</>}
                </GameGuessFormSubContainer>

                <GameGuessFormSubContainer
                  onClick={() => handleFormSubmit(targetsList[2].name, clickXPercent, clickYPercent)}
                >
                  {targetsList.length > 0 && <GameGuessCircle src={targetsList[2].image} />}
                  {targetsList.length > 0 && <>{targetsList[2].name}</>}
                </GameGuessFormSubContainer>
              </GameGuessForm>
            </>
          )}

          <GameBackgroundImage 
            src="/assets/egor-klyuchnyk-artwork.jpg" 
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
