import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

enum Player {
  RED,
  GREEN,
  BLUE,
  YELLOW
};

const LocalMode = () => {

  const [players, setPlayers] = useState<{
    redPlayer: Player | null,
    greenPlayer: Player | null,
    bluePlayer: Player | null,
    yellowPlayer: Player | null
  }>({
    redPlayer: null,
    greenPlayer: null,
    bluePlayer: null,
    yellowPlayer: null
  });

  const [timeStamp, setTimeStamp] = useState<number>(5);
  const [startGame, setStartGame] = useState<boolean>(false);
  const navigate = useNavigate();
  const playersRef = useRef<HTMLOListElement>(null!);
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      const randomPlayer = Math.floor(Math.random() * 4);
      const element = playersRef.current.children[randomPlayer];
      if (randomPlayer === Player.RED) {
        element.classList.add('redPlayerActive');
        setPlayers({
          ...players,
          redPlayer: Player.RED
        });
      }
      else if (randomPlayer === Player.GREEN) {
        element.classList.add('greenPlayerActive');
        setPlayers({
          ...players,
          greenPlayer: Player.GREEN
        });
      }
      else if (randomPlayer === Player.BLUE) {
        element.classList.add('bluePlayerActive');
        setPlayers({
          ...players,
          bluePlayer: Player.BLUE
        });
      }
      else if (randomPlayer === Player.YELLOW) {
        element.classList.add('yellowPlayerActive');
        setPlayers({
          ...players,
          yellowPlayer: Player.YELLOW
        });
      }
    }
  }, [init]);

  useEffect(() => {
    let changeTimeout: NodeJS.Timeout | null = null;
    if (startGame) {
      changeTimeout = setTimeout(() => {
        setTimeStamp(timeStamp - 1);
      }, 1000);
      if (timeStamp === 0) {
        clearTimeout(changeTimeout);
        navigate('/local', { state: { players } });
      }
    } else if (!startGame) {
      setTimeStamp(5);
      if (changeTimeout) clearTimeout(changeTimeout);
    }
  }, [startGame, timeStamp]);

  const handleSelectPlayer = (player: Player) => {
    if (player === Player.RED) {
      const element = playersRef.current.children[0];
      element.classList.toggle('redPlayerActive');
      if (element.classList.contains('redPlayerActive')) setPlayers({
        ...players,
        redPlayer: Player.RED
      });
      else setPlayers({
        ...players,
        redPlayer: null
      });
    } else if (player === Player.GREEN) {
      const element = playersRef.current.children[1];
      element.classList.toggle('greenPlayerActive');
      if (element.classList.contains('greenPlayerActive')) setPlayers({
        ...players,
        greenPlayer: Player.GREEN
      });
      else setPlayers({
        ...players,
        greenPlayer: null
      });
    } else if (player === Player.BLUE) {
      const element = playersRef.current.children[2];
      element.classList.toggle('bluePlayerActive');
      if (element.classList.contains('bluePlayerActive')) setPlayers({
        ...players,
        bluePlayer: Player.BLUE
      });
      else setPlayers({
        ...players,
        bluePlayer: null
      });
    } else if (player === Player.YELLOW) {
      const element = playersRef.current.children[3];
      element.classList.toggle('yellowPlayerActive');
      if (element.classList.contains('yellowPlayerActive')) setPlayers({
        ...players,
        yellowPlayer: Player.YELLOW
      });
      else setPlayers({
        ...players,
        yellowPlayer: null
      });
    }
  }

  return (
    <section className="local">
      <h2>Local Game</h2>
      <br /><br />
      <div>Select Players:</div>
      <ol ref={playersRef} className="lobbyLocalPlayerList" id="playersList">
        <li onClick={() => handleSelectPlayer(Player.RED)}>Red Player</li>
        <li onClick={() => handleSelectPlayer(Player.GREEN)}>Green Player</li>
        <li onClick={() => handleSelectPlayer(Player.BLUE)}>Blue Player</li>
        <li onClick={() => handleSelectPlayer(Player.YELLOW)}>Yellow Player</li>
      </ol>
      <button className='start-button' onClick={() => setStartGame(!startGame)}>
        {!startGame ? "Let's Play Local! " : `Game starts in ${timeStamp}...`}
      </button>
    </section>
  );
}

export default LocalMode;
