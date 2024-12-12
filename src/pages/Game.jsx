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
  const [nameError, setNameError] = useState(false);
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
    setGameStarted(true);
  };

  const handleImageClick = (event) => {
    setImageClicked(!imageClicked);
    getClickCoordinates(event);
  };

  const handleGuessSubmit = async (name, x, y) => {
    try {
      const answer = await fetchGuess(name, x, y);
  
      if (answer.isCorrect) {
        setCorrectGuesses((prev) => prev + 1);
        setTargetsList((prevTargets) =>
          prevTargets.map((target) =>
            target.name === name ? { ...target, guessed: true } : target
          )
        );
      }

    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (playerName.length < 1 || playerName.length > 6) {
      setNameError(true);
      return;
    }

    try {
      savePlayerScore(playerName, score);
      alert("Your score has been submitted!");
      resetGame();
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    setPlayerName(e.target.value);
  };
  
  const getClickCoordinates = (event) => {
    const rect = event.target.getBoundingClientRect();

    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top - 50; // to account for the header

    const width = rect.width;
    const height = rect.height;

    setClickX(x);
    setClickY(y);

    // Convert the coordinates into percentages to be used on the API
    setClickXPercent((x / width) * 100);
    setClickYPercent((y / height) * 100);

    // uncomment this if you need help adding new targets to the game
    // alert(`Current X Coords: ${clickXPercent} - Current Y Coords: ${clickYPercent}`);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setCorrectGuesses(0);
    setPlayerName('');
    setScore(0);
    setNameError(false);
  }

  useEffect(() => {
    let interval;
    if (gameStarted && !gameEnded) {
      interval = setInterval(() => {
        setScore((prevScore) => prevScore + 1);
      }, 1000);
    }
  
    return () => clearInterval(interval);
  }, [gameStarted, gameEnded]);

  useEffect(() => {
    if (correctGuesses === 3) { 
      setGameEnded(true);
      setGameStarted(false);
    }
  }, [correctGuesses]);

  useEffect(() => {
    if (!gameEnded) fetchTargets();
  }, [gameEnded]);

  return (
    <MainContainer>
      <Header isVisible={gameStarted}>
        {targetsList.map((target, index) => (
          <GameGuessCircle key={index} src={target.image} />
        ))}
      </Header>

      {!gameStarted && !gameEnded &&(
        <GreetingsContainer>
          <GreetingsMenu>
            {!highScores ? (
              <>
                <GreetingsTitle>Video Gaem</GreetingsTitle>
                {targetsList.map((target, index) => (
                  <>
                    <GameGuessCircle key={index} src={target.image} />
                    <p>{target.name}</p>
                  </>
                ))}
                <GreetingsButton onClick={handleStartGameClick}>Start Game</GreetingsButton>
                <GreetingsButton onClick={handleViewHighscoresClick}>High Scores</GreetingsButton>
              </>
            ) : (
              <>
                <GreetingsTitle>Highest Scores:</GreetingsTitle>
                <ul>
                  {highScoresList.length > 0 ? (
                    highScoresList.map((score, index) => (
                      <li key={index}>{score.name}: {score.score}</li>
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
          <p>Congratulations! You beat the game in {score} seconds.</p>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              value={playerName}
              onChange={handleInputChange}
              placeholder="Enter your name (1 to 6 characters long)"
            />
            {nameError && (<p>Your name must be between 1 to 6 characters!</p>)}
            <button type="submit" disabled={!playerName.trim()}>
              Submit
            </button>
          </form>
        </>
      )}

      {gameStarted && !gameEnded &&(
        <GameContainer ref={gameContainerRef}>
          {imageClicked && (
            <>
              <GameGuessClick x={clickX} y={clickY} />
              <GameGuessForm x={clickX} y={clickY}>
                Which character have you found?
                {targetsList.map((target, index) => (
                  <GameGuessFormSubContainer
                    key={index}
                    guessed={target.guessed}
                    onClick={() =>
                      !target.guessed && handleGuessSubmit(target.name, clickXPercent, clickYPercent)
                    }
                  >
                    <GameGuessCircle src={target.image} />
                    {target.name}
                  </GameGuessFormSubContainer>
                ))}
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
