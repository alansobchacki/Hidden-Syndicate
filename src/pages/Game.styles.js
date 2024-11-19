import styled, { keyframes } from "styled-components";

const pulseAnimation = keyframes`
  0%, 100% {
    transform: translateX(-50%) scale(1);
  }
  50% {
    transform: translateX(-50%) scale(1.2);
`;

export const MainContainer = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  overflow-x: hidden; 
`;

export const GreetingsContainer = styled.div`
`;

export const GameContainer = styled.div`
`;

export const GameImage = styled.img`
  width: 100%;
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
