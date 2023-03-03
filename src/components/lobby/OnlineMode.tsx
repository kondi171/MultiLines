import { useState } from "react";
const OnlineMode = () => {
  const [playersNumber, setPlayersNumber] = useState(4);

  const handleChangePlayersNumbers = () => {
    console.log('hello');
  }
  const handleStartOnlineMode = () => {
    console.log('start multi');
  }

  return (
    <section className="online">
      <h2>Online Game</h2>
      <div>Invite for game: <span>https://multilines/4xy2c</span></div>
      <div>Waiting for players...</div>
      <ol className="lobbyLocalPlayerList" id="playersList">
        <li className="redPlayerActive">RedPlayer</li>
        <li>GreenPlayer</li>
        <li>BluePlayer</li>
        <li>YellowPlayer</li>
      </ol>
      <button className='start-button' onClick={handleStartOnlineMode}>
        Let's Play Online!
      </button>
    </section>
  );
}

export default OnlineMode;
