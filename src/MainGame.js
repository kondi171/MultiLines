import './resources/sass/main.scss';

const MainGame = () => {
  return (
    <>
      <h1 className="mainHeader">MultiLines</h1>
      <div className="board">
        <aside>
          <section className="scores">
            <h2>Scores</h2>
            <ol>
              <li>
                <span>player</span>
                <span>255</span>
              </li>
              <li>
                <span>player</span>
                <span>255</span>
              </li>
              <li>
                <span>player</span>
                <span>255</span>
              </li>
              <li>
                <span>player</span>
                <span>255</span>
              </li>
              
            </ol>
          </section>
          <section className="chat">
            <h2>Chat</h2>
            <form>
              <input type="text" />
              <button>Send</button>
            </form>
          </section>
        </aside>
        <canvas className="mainGame">
          
        </canvas>
        </div>
      </>
  );
}

export default MainGame;
