import '../resources/sass/main.scss';
import ScoreBoard  from './ScoreBoard';
import ChatBoard  from './ChatBoard';
import GameBoard  from './GameBoard';
import Lobby from './Lobby';
import { Component } from 'react';

class MainGame extends Component {
  state = {
    gameState: true,
    numberOfPlayers: 0,
  }

  render(){
    return (
      <>
        <h1 className="mainHeader">MultiLines</h1>
        <section className={this.state.gameState ? 'inActive':''}>
          <Lobby />
        </section>
        <section className={this.state.gameState ? '':'inActive'}>
          <div className="board">
            <aside>
              <ScoreBoard />
              <ChatBoard />
            </aside>
            <GameBoard start={this.state.gameState}/>
          </div>
        </section>
        <i className="fa fa-question help" aria-hidden="true" title="Help"></i>
      </>
    );
  }
}

export default MainGame;
