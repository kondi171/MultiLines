import '../resources/sass/main.scss';
import { Component } from 'react'; 

class Lobby extends Component {
    state = {
        localPlayers: 1, 
    }
    
    handleStartLocal = () => {

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
        if(input.value === 1) {
            removeStyles();
            redPlayer.classList.add('redPlayerActive');
        }
        if(input.value === 2) {
            removeStyles();
            redPlayer.classList.add('redPlayerActive');
            greenPlayer.classList.add('greenPlayerActive');
        }
        if(input.value === 3) {
            removeStyles();
            redPlayer.classList.add('redPlayerActive');
            greenPlayer.classList.add('greenPlayerActive');
            bluePlayer.classList.add('bluePlayerActive');
        }
        if(input.value === 4) {
            removeStyles();
            redPlayer.classList.add('redPlayerActive');
            greenPlayer.classList.add('greenPlayerActive');
            bluePlayer.classList.add('bluePlayerActive');
            yellowPlayer.classList.add('yellowPlayerActive');
        }

        this.setState({
            localPlayers: input.value,
        });

        
    }

    render(){
      return (
          <>
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
                        <input id='localInput' value={this.state.localPlayers} type="number" min="1" max="4" onChange={this.handleLocalLobby}/>
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
            <footer className="radioFooter">
                <figure>
                    <figcaption>Listen to the T-Rex:</figcaption>
                    <audio controls src="../resources/sounds/main.mp3">
                        Your browser does not support the<code>audio</code> element.
                    </audio>
                </figure>
            </footer>
          </>
      );
        
    };
}

export default Lobby;