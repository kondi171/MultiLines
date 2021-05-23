import './resources/sass/main.scss';
import { Component } from 'react';

class ScoreBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      best: null,
    }
  }

  render(){
    return (
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
    );
  }
}

const ChatBoard = () => {
  return (
    <section className="chat">  
      <h2>Chat</h2>
      <form>
        <input type="text" />
        <button>Send</button>
      </form>
    </section>
  );
}
let xMove = 140;
let yMove = 80;
let angle = 0;
let x1 = 0;
class GameBoard extends Component {
  state = {
    timeInterval: 0,

  }
  
  componentDidMount() {
    const lineHeigth = 2;

    const canvas = document.querySelector('.mainGame');
    if(canvas.getContext) {
      this.ctx = canvas.getContext('2d');
      this.ctx.strokeStyle = '#b81800';
      this.ctx.lineCap = "round";
      this.ctx.lineWidth = lineHeigth;
      window.setInterval(()=>{
        this.setState({
          timeInterval: this.state.timeInterval + 0.2,
        })
      },33);
    } else { canvas.innerHTML = "Canvas failed!"; }
  }

  componentDidUpdate() {
    let x =  xMove //+ this.state.timeInterval / 5;
    let y =  yMove //+ this.state.timeInterval / 5;
    
    let tempX = x;
    let tempY = y;
    let rx = x + 10;
    let ry = y + 10;
    x = rx + (tempX - rx) * Math.cos(angle) - (tempY - ry) * Math.sin(angle);
    y = ry + (tempX - rx) * Math.sin(angle) + (tempY - ry) * Math.cos(angle);

    //console.log(this.state.timeInterval);
    console.log("X: " + (x * y));
    console.log("X1: " + (x1));
    //console.log(Math.sin(x));
   // console.log("Y: " + y);
    this.ctx.beginPath();
    //xMove += 0.2;
     //   yMove += 0.2;
    this.ctx.lineTo(x ,y );
    this.ctx.stroke();
    this.ctx.closePath();
  }

  handleKeyListener = () => {
    document.addEventListener('keydown', (e) => {
      if(e.code === "KeyA") { angle += 0.2}
      else if (e.code === "KeyD") { angle -= 0.2; x1++}
      else if (e.code === "KeyW") { 
        
      }
    });
  }

  render() {
    return (
      <canvas className="mainGame" onClick={this.handleKeyListener}></canvas>
     );
   } 
 }

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
