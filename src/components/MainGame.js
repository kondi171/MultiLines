import '../resources/sass/main.scss';
import GameBoard  from './GameState';
import Tips from './Tips';
import { Component } from 'react';

class MainGame extends Component {
  state = {
    gameState: false,
    numberOfPlayers: 1,
  }

  componentWillUnmount(){
    clearInterval(this.tipsInterval);
  }

  handleStartLocal = (e) => {
    e.preventDefault();
    this.setState({
      gameState: true
    });
  }
  componentDidMount() {

  }

  componentDidUpdate() {
    
  }
 
  handleTips = () => {
    
  }
  handleLocalLobby = () => {
    const removeStyles = () => {
        redPlayer.classList.remove('redPlayerActive');
        greenPlayer.classList.remove('greenPlayerActive');
        bluePlayer.classList.remove('bluePlayerActive');
        yellowPlayer.classList.remove('yellowPlayerActive');
    }
    const input = document.getElementById('localInput');
    const redPlayer = document.querySelector('li:nth-of-type(1)');
    const greenPlayer = document.querySelector('li:nth-of-type(2)');
    const bluePlayer = document.querySelector('li:nth-of-type(3)');
    const yellowPlayer = document.querySelector('li:nth-of-type(4)');
    if(input.value == 1) {
        removeStyles();
        redPlayer.classList.add('redPlayerActive');
    }
    if(input.value == 2) {
        removeStyles();
        redPlayer.classList.add('redPlayerActive');
        greenPlayer.classList.add('greenPlayerActive');
    }
    if(input.value == 3) {
        removeStyles();
        redPlayer.classList.add('redPlayerActive');
        greenPlayer.classList.add('greenPlayerActive');
        bluePlayer.classList.add('bluePlayerActive');
    }
    if(input.value == 4) {
        removeStyles();
        redPlayer.classList.add('redPlayerActive');
        greenPlayer.classList.add('greenPlayerActive');
        bluePlayer.classList.add('bluePlayerActive');
        yellowPlayer.classList.add('yellowPlayerActive');
    }

    this.setState({
        numberOfPlayers: input.value,
    });
  }

  handleShowHelp = () => {
    const modal = document.querySelector('.modal');
    const helpBtn = document.querySelector('.help');
    helpBtn.style.visibility = "hidden";
    modal.classList.add('activeModal');
  }

  handleCloseHelp = () => {
    const modal = document.querySelector('.modal');
    const helpBtn = document.querySelector('.help');
    helpBtn.style.visibility = "visible";
    modal.classList.remove('activeModal');
  }

  render(){
    return (
      <section>
        <h1 className="mainHeader">MultiLines</h1>
        <section className={this.state.gameState ? 'inActive':''}>
        <div className="lobbyWrapper">
                <section className="multiGame">
                    <h2>MultiPlayer</h2>
                    <div>We waiting for players!</div>
                    <div className="disabled">In Development...</div>
                    <div className="disabled">Available Soon!</div>
                    <button disabled onClick={this.handleStartMulti}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Let's Play Multi!
                    </button>
                </section>
                <section className="localGame">
                    <h2>Local Game</h2>
                    <div>How many players?</div>
                    <form>
                        <input id='localInput' value={this.state.numberOfPlayers} type="number" min="1" max="4" onChange={this.handleLocalLobby}/>
                        <button onClick={this.handleStartLocal}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Let's Play Local!
                        </button>
                    </form>
                    <ol className="lobbyLocalPlayerList" id="playersList">
                        <li className="redPlayerActive">RedPlayer</li>
                        <li>GreenPlayer</li>
                        <li>BluePlayer</li>
                        <li>YellowPlayer</li>
                    </ol>
                </section>
            </div>
        </section>
        <section className={this.state.gameState ? '':'inActive'}>
          <div className="board">
            {this.state.gameState ? <GameBoard start={this.state.gameState} numberOfPlayers={this.state.numberOfPlayers}/> : ''}
          </div>
        </section>
        <i className="fa fa-question help" aria-hidden="true" title="How to play?" onClick={this.handleShowHelp}></i>
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
        <footer className="footer">
          <Tips />
        </footer>
      </section>
    );
  }
}

export default MainGame;
