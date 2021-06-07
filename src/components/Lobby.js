import '../resources/sass/main.scss';
import { Component } from 'react'; 

class Lobby extends Component {
    state = {
        localPlayers: 1, 
    }
    handleStartLocal = () => {

    }

    handleStartMulti = () => {

    }

    handleLocalLobby = () => {

        // this.input = document.getElementById('localInput');
        // this.ol = document.getElementById('orderedList');
        // this.li1 = document.getElementsByClassName('li1');
        // this.li2 = document.getElementsByClassName('li2');
        // this.li3 = document.getElementsByClassName('li3');
        // this.li4 = document.getElementsByClassName('li4');

        // this.li1.textContent = "First Player";
        // if(this.input.value == 1) {
        //     this.li1.textContent = 'First Player';
        //     this.li2.textContent = '';
        //     this.li3.textContent = '';
        //     this.li4.textContent = '';
        // }
        // if(this.input.value == 2) {
        //     console.log(2);
        //     this.li1.textContent = 'First Player';
        //     this.li2.textContent = 'Second Player';
        //     this.li3.textContent = '';
        //     this.li4.textContent = '';
        // }
        // if(this.input.value == 3) {
        //     console.log(3);
        //     this.li1.textContent = 'First Player';
        //     this.li2.textContent = 'Second Player';
        //     this.li3.textContent = 'ThirdPlayer';
        //     this.li4.textContent = '';
        // }
        // if(this.input.value == 4) {
        //     console.log(4);
        //     this.li1.textContent = 'First Player';
        //     this.li2.textContent = 'Second Player';
        //     this.li3.textContent = 'ThirdPlayer';
        //     this.li4.textContent = 'SecondPlayer';
        // }

        this.setState({
            localPlayers: this.input.value,
        });
    }

    render(){
      return (
          <>
            <div className="lobbyWrapper">
                <section className="multiGame">
                    <h2>MultiPlayer</h2>
                    <div>We waiting for players!</div>
                    <button onClick={this.handleStartMulti}>
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
                        <input id='localInput' type="number" min="1" max="4" onChange={this.handleLocalLobby}/>
                        <button onClick={this.handleStartLocal}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Let's Play Local!
                        </button>
                    </form>
                    <ol id="orderedList">
                        <li className="li1"></li>
                        <li className="li2"></li>
                        <li className="li3"></li>
                        <li className="li4"></li>
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