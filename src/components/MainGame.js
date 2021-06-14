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

  handleShowHelp = () => {
    const modal = document.querySelector('.modal');
    const helpBtn = document.querySelector('.help');
    const homeBtn = document.querySelector('.home');
    helpBtn.style.visibility = "hidden";
    homeBtn.style.visibility = "hidden";
    modal.classList.add('activeModal');
  }

  handleCloseHelp = () => {
    const modal = document.querySelector('.modal');
    const helpBtn = document.querySelector('.help');
    const homeBtn = document.querySelector('.home');
    helpBtn.style.visibility = "visible";
    homeBtn.style.visibility = "visible";
    modal.classList.remove('activeModal');
  }

  handleBackToLobby = () => {
    // this.setState({
    //   gameState: false
    // })
  }

  render(){
    return (
      <section>
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
        <i className="fa fa-question help" aria-hidden="true" title="How to play?" onClick={this.handleShowHelp}></i>
        <i className="fa fa-home home" aria-hidden="true" title="Back to Lobby" onClick={this.handleBackToLobby}></i>
        <section className="modal">
          <h1>How to play?</h1>
          <div>Game is played in 5 rounds.</div>
          <div>Survive as long as you can, the longer you are on the board, the more points you get.</div>
          <div>Dodge walls, own trails and other players.</div>
          <div>Smash your enemies, blocking their way.</div>
          <div>The player with the most points wins.</div>
          <div>Winner take everything!</div>
          <h1>Controls</h1>
          <ol>
            <li>RedPlayer &lt; W,S,A,D &gt;</li>
            <li>GreenPlayer &lt; &#8679;,&#8681;,&#8678;,&#8680;&gt;</li>
            <li>BluePlayer &lt; I,K,J,L &gt;</li>
            <li>YellowPlayer &lt; NUM8,NUM5,NUM4,NUM6 &gt;</li>
          </ol>
          <i className="fa fa-times close" aria-hidden="true" onClick={this.handleCloseHelp}></i>
        </section>
      </section>
    );
  }
}

export default MainGame;
