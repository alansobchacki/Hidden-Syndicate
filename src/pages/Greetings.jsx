import { useNavigate } from 'react-router-dom';

function Greetings() {
  // const [userGuessing, setUserGuessing] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/game'); // This will navigate to the /game route
  };

  return (
    <>
      hiiiiiiiii
      <button onClick={handleClick}>Click me to play</button>
    </>
  )
}

export default Greetings;
