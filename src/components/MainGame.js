import '../resources/sass/main.scss';
import ScoreBoard  from './ScoreBoard';
import ChatBoard  from './ChatBoard';
import GameBoard  from './GameBoard';
const MainGame = () => {
  return (
    <>
      <h1 className="mainHeader">MultiLines</h1>
      <div className="board">
        <aside>
          <ScoreBoard />
          <ChatBoard />
        </aside>
        <GameBoard />
      </div>
    </>
  );
}

export default MainGame;
