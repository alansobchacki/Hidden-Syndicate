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
  font-family: 'Public-sans';
  color: white;
`;

export const GreetingsContainer = styled.div`
  height: 100vh;
  overflow: hidden;
`;

export const GreetingsMenu = styled.div`
  position: absolute;
  z-index: 10;
  width: 60vh;
  height: 75vh;
  top: 50%;
  left: 50%;
  background-color: #332f35;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 4px solid #665f6c;
  border-radius: 6px;
  opacity: 0.95;

  transform: translate(-50%, -50%);
`;

export const Title = styled.h1`
  text-align: center;
  color: #c5bbbb;
  font-family: Title-Font;
  font-size: 3.5rem;
`;

export const Description = styled.p`
  color: #e1cfcf;
  font-family: Description-Font;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  padding: 5px 5px 0 5px;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  width: 200px;
  height: 50px;
  font-family: 'Description-Font';
  font-weight: 700;
  font-size: 1.2rem;
  background-color: #332f35;
  color: #b3b3b3;
  border-radius: 6px;
  border: 3px solid #665f6c;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #665f6c;
    color: #332f35;
    border-color: #332f35;
  }
`;

export const TargetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
`;

export const TargetsSubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #332f35;
  border-bottom: 3px solid #665f6c; 
  color: white;
  font-family: 'Public Sans';
  opacity: 0.95;
  height: 50px;
  width: 100%;
  left: 0;
  transition: top 0.5s ease;
  position: absolute;

  top: ${({ isVisible }) => (isVisible ? "0px" : "-50px")};
`;

export const GameBackgroundImage = styled.img`
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
  border-radius: 6px;
  background-color: #332f35;
  border: 4px solid #665f6c;
  border-radius: 6px;
  opacity: 0.8;
  color: white;
  font-family: 'Public sans';
  
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const GameGuessFormSubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
  pointer-events: ${(props) => (props.guessed ? "none" : "auto")};
  opacity: ${(props) => (props.guessed ? 0.5 : 1)};
  cursor: ${(props) => (props.guessed ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.guessed ? "#f8f9fa" : "#f0f0f0")};
  }
`;

export const GameGuessCircle = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 4px solid #665f6c;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #332f35;
  border-top: 3px solid #665f6c; 
  color: white;
  font-family: 'Public sans';
  opacity: 0.95;
  height: 50px;
`;
