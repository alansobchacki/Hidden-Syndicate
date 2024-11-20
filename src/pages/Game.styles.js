import styled, { keyframes } from "styled-components";

const pulseAnimation = keyframes`
  0%, 100% {
    transform: translateX(-50%) translateY(+50%) scale(1);
  }
  50% {
    transform: translateX(-50%) translateY(+50%) scale(1.2);
`;

export const MainContainer = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  overflow-x: hidden; 
  font-family: 'Public-sans';
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  opacity: 0.8;
`;

export const GreetingsContainer = styled.div`
  height: 100vh;
  overflow: hidden;
`;

export const GreetingsMenu = styled.div`
  position: absolute;
  z-index: 10;
  width: 50vh;
  height: 50vh;
  top: 50%;
  left: 50%;
  border-radius: 6px;
  background-color: #332f35;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: 4px solid #665f6c;
  border-radius: 6px;

  transform: translate(-50%, -50%);
`;

export const GreetingsButton = styled.button`
  width: 200px;
  height: 50px;
  font-family: 'Public Sans';
  font-weight: 700;
  font-size: 1.2rem;
  background-color: #332f35;
  color: #665f6c;
  border-radius: 6px;
  border: 3px solid #665f6c;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #665f6c;
    color: #332f35;
    border-color: #332f35;
    transform: scale(1.05);
  }
`;

export const GameContainer = styled.div`
`;

export const GameImage = styled.img`
  width: 100%;
  filter: ${({ isBlurred }) => (isBlurred ? "none" : "blur(5px)")};
`;

export const GameGuessClick = styled.div`
  z-index: 2;
  position: absolute;
  width: 40px;
  height: 40px;
  border: solid 2px white;
  border-radius: 50%;

  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;

  animation: ${pulseAnimation} 1.5s ease-in-out infinite;
`;

export const GameGuessForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 3;
  position: fixed;
  gap: 10px;
  text-align: center;
  width: 150px;
  height: 200px;
  border: solid 2px white;
  border-radius: 4px;
  background-color: white;
  opacity: 0.8;
  
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const GameGuessFormSubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
`;

export const GameGuessCircle = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid black;
`;
