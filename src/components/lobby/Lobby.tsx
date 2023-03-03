import LocalMode from "./LocalMode";
import OnlineMode from "./OnlineMode";
import Help from "./Help";
import Tips from "./Tips";

const Lobby = () => {

  return (
    <main className="lobby">
      <header>
        <h1>MultiLines</h1>
        <Help />
      </header>
      <section className="game-modes">
        <OnlineMode />
        <LocalMode />
      </section>
      <Tips />
    </main>
  );
}

export default Lobby;
