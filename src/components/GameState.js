import '../resources/sass/main.scss';
import ScoreBoard  from './ScoreBoard';
import ChatBoard  from './ChatBoard';
import { Component } from 'react';
import Player from './Player';

const width = 840;
const height = 620;

class GameBoard extends Component {
  state = {
    numberOfPlayers: this.props.numberOfPlayers,
    round: 0,
    timeToRestart: 6,
    end: false,
  }

  handleResetPointsInterval = () => {
      clearInterval(this.firstPlayerPointsInterval);
      clearInterval(this.secondPlayerPointsInterval);
      clearInterval(this.thirdPlayerPointsInterval);
      clearInterval(this.fourthPlayerPointsInterval);
  }

  handleResetMoveInterval = () => {
      clearInterval(this.firstPlayerMoveInterval);
      clearInterval(this.secondPlayerMoveInterval);
      clearInterval(this.thirdPlayerMoveInterval);
      clearInterval(this.fourthPlayerMoveInterval);
  }

  handleStartGame = () => {
      this.setState({
          round: this.state.round + 1,
      });
      this.showInfo = false;
      this.movement = 5;
      clearInterval(this.restartInterval);
      this.setState({
          timeToRestart: 5,
      });
      this.firstLineCoordinates = [{   x: 40, y: 40  }];
      this.secondLineCoordinates = [{   x: width - 40, y: 40  }];
      this.thirdLineCoordinates = [{   x: 40, y: height - 40  }];
      this.fourthLineCoordinates = [{   x: width - 40, y: height - 40  }];
      this.firstStopCollision = false;
      this.secondStopCollision = false;
      this.thirdStopCollision = false;
      this.fourthStopCollision = false;
      this.firstPlayerCollisionFocus = 0;
      this.secondPlayerCollisionFocus = 0;
      this.thirdPlayerCollisionFocus = 0;
      this.fourthPlayerCollisionFocus = 0;
      this.handleResetMoveInterval();
      for(let i = 0; i < this.canvas.length; i++){
          this.canvas[i].width = width;
          this.canvas[i].height = height;
          this.ctx[i] = this.canvas[i].getContext('2d');
          this.ctx[i].clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
      this.setState({
          numberOfPlayers: this.numberOfPlayers,
      });
      this.handleInitializePlayers(this.state.numberOfPlayers);
  }
  componentDidMount() {
    this.playersInGame = this.state.numberOfPlayers;
    if(this.props.start){
      this.canvas = [
        document.querySelector('.redPlayer'),
        document.querySelector('.greenPlayer'),
        document.querySelector('.bluePlayer'),
        document.querySelector('.yellowPlayer')
      ];
      this.ctx = [];
      this.numberOfPlayers = this.state.numberOfPlayers;
      this.firstPlayerPoints = 0;
      this.secondPlayerPoints = 0;
      this.thirdPlayerPoints = 0;
      this.fourthPlayerPoints = 0;
      this.handleStartGame();
      if(!this.state.start) clearInterval(this.gameInterval);
    }  
  }

  handlePlayerDirection = player => {
      if(player === "first") {
          if(this.firstPlayerDirection === "right") this.xMoveFirst += this.movement;
          else if(this.firstPlayerDirection === "left") this.xMoveFirst -= this.movement;
          else if(this.firstPlayerDirection === "down") this.yMoveFirst += this.movement;
          else if(this.firstPlayerDirection === "up") this.yMoveFirst -= this.movement;
          if(this.firstPlayerCanMove) {
              this.firstLineCoordinates.push({x: this.xMoveFirst, y: this.yMoveFirst});
              this.handleMovePlayer(this.ctx[0], this.xMoveFirst, this.yMoveFirst);
          }
      }
      if(player === "second") {
          if(this.secondPlayerDirection === "right") this.xMoveSecond += this.movement;
          else if(this.secondPlayerDirection === "left") this.xMoveSecond -= this.movement;
          else if(this.secondPlayerDirection === "down") this.yMoveSecond += this.movement;
          else if(this.secondPlayerDirection === "up") this.yMoveSecond -= this.movement;   
          if(this.secondPlayerCanMove) {
              this.secondLineCoordinates.push({x: this.xMoveSecond, y: this.yMoveSecond});
              this.handleMovePlayer(this.ctx[1], this.xMoveSecond, this.yMoveSecond);
          }
      }
      if(player === "third") {
          if(this.thirdPlayerDirection === "right") this.xMoveThird += this.movement;
          else if(this.thirdPlayerDirection === "left") this.xMoveThird -= this.movement;
          else if(this.thirdPlayerDirection === "down") this.yMoveThird += this.movement;
          else if(this.thirdPlayerDirection === "up") this.yMoveThird -= this.movement;
          if(this.thirdPlayerCanMove) {
              this.thirdLineCoordinates.push({x: this.xMoveThird, y: this.yMoveThird});
              this.handleMovePlayer(this.ctx[2], this.xMoveThird, this.yMoveThird);
          }
      }
      if(player === "fourth") {
          if(this.fourthPlayerDirection === "right") this.xMoveFourth += this.movement;
          else if(this.fourthPlayerDirection === "left") this.xMoveFourth -= this.movement;
          else if(this.fourthPlayerDirection === "down") this.yMoveFourth += this.movement;
          else if(this.fourthPlayerDirection === "up") this.yMoveFourth -= this.movement;
          if(this.fourthPlayerCanMove) {
              this.fourthLineCoordinates.push({x: this.xMoveFourth, y: this.yMoveFourth});
              this.handleMovePlayer(this.ctx[3], this.xMoveFourth, this.yMoveFourth);
          }
      }
  }
  componentWillUnmount() {
      clearInterval(this.firstPlayerPoints);
      clearInterval(this.secondPlayerPoints);
      clearInterval(this.thirdPlayerPoints);
      clearInterval(this.fourthPlayerPoints);
  }
  handleInitializePlayers(numberOfPlayers) {
      for(let i = 0; i < numberOfPlayers; i++){
          this.ctx[i].beginPath();
          this.ctx[i].lineCap = 'rounded';
          if(i === 0) {
              this.firstPlayerDirection = "right";
              this.firstPlayerMoveInterval = setInterval(()=>{
                  this.handlePlayerDirection("first");
              },50);
              this.firstPlayerPointsInterval = setInterval(()=>{
                  this.firstPlayerPoints += 10;
              },1000);
              this.firstPlayerCanMove = true; 
              this.xMoveFirst = 40;
              this.yMoveFirst = 40;
              this.firstLineCoordinates = [{   x: this.xMoveFirst, y: this.yMoveFirst  }];
              this.ctx[i].strokeStyle = "#b81800";
              this.ctx[i].moveTo(this.xMoveFirst,this.yMoveFirst);
          } else if (i === 1) {
              this.secondPlayerDirection = "down";
              this.secondPlayerMoveInterval = setInterval(()=>{
                  this.handlePlayerDirection("second");
              },50);
              this.secondPlayerPointsInterval = setInterval(()=>{
                  this.secondPlayerPoints += 10;
              },1000);
              this.secondPlayerCanMove = true; 
              this.xMoveSecond = width - 40;
              this.yMoveSecond = 40;
              this.secondLineCoordinates = [{   x: this.xMoveSecond, y: this.yMoveSecond  }];
              this.ctx[i].strokeStyle = "#05a317";
              this.ctx[i].moveTo(this.xMoveSecond,this.yMoveSecond);
          } else if (i === 2) {
              this.thirdPlayerDirection = "up";
              this.thirdPlayerMoveInterval = setInterval(()=>{
                  this.handlePlayerDirection("third");
              },50);
              this.thirdPlayerPointsInterval = setInterval(()=>{
                  this.thirdPlayerPoints += 10;
              },1000);
              this.thirdPlayerCanMove = true; 
              this.xMoveThird = 40;
              this.yMoveThird = height - 40;
              this.thirdLineCoordinates = [{   x: this.xMoveThird, y: this.yMoveThird  }];
              this.ctx[2].strokeStyle = "#0b53b8";
              this.ctx[2].moveTo(this.xMoveThird,this.yMoveThird);
          } else {
              this.fourthPlayerDirection = "left";
              this.fourthPlayerMoveInterval = setInterval(()=>{
                  this.handlePlayerDirection("fourth");
              },50);
              this.fourthPlayerPointsInterval = setInterval(()=>{
                  this.fourthPlayerPoints += 10;
              },1000);
              this.fourthPlayerCanMove = true; 
              this.xMoveFourth = width - 40;
              this.yMoveFourth = height - 40;
              this.fourthLineCoordinates = [{   x: this.xMoveFourth, y: this.yMoveFourth  }];
              this.ctx[i].strokeStyle = "#acb80b";
              this.ctx[i].moveTo(this.xMoveFourth,this.yMoveFourth);
          }
      }
  }

  handleKeyListener = () => {
      document.addEventListener('keydown', (e) => {
          if(this.firstPlayerCanMove){
              if(e.code === "KeyA" && this.firstPlayerDirection !== "right"){
                  this.firstPlayerDirection = 'left';
              } if(e.code === "KeyD" && this.firstPlayerDirection !== "left"){
                  this.firstPlayerDirection = 'right';
              } if(e.code === "KeyW" && this.firstPlayerDirection !== "down"){
                  this.firstPlayerDirection = 'up';
              } if(e.code === "KeyS" && this.firstPlayerDirection !== "up"){
                  this.firstPlayerDirection = 'down';
              }
          }
          if(this.secondPlayerCanMove){
              if(e.code === "ArrowLeft" && this.secondPlayerDirection !== "right"){
                  this.secondPlayerDirection = 'left';
              } if(e.code === "ArrowRight" && this.secondPlayerDirection !== "left"){
                  this.secondPlayerDirection = 'right';
              } if(e.code === "ArrowUp" && this.secondPlayerDirection !== "down"){
                  this.secondPlayerDirection = 'up';
              } if(e.code === "ArrowDown" && this.secondPlayerDirection !== "up"){
                  this.secondPlayerDirection = 'down';
              }
          }
          if(this.thirdPlayerCanMove){
              if(e.code === "KeyJ" && this.thirdPlayerDirection !== "right"){
                  this.thirdPlayerDirection = 'left';
              } if(e.code === "KeyL" && this.thirdPlayerDirection !== "left"){
                  this.thirdPlayerDirection = 'right';
              } if(e.code === "KeyI" && this.thirdPlayerDirection !== "down"){
                  this.thirdPlayerDirection = 'up';
              } if(e.code === "KeyK" && this.thirdPlayerDirection !== "up"){
                  this.thirdPlayerDirection = 'down';
              }
          }
          if(this.fourthPlayerCanMove){
              if(e.code === "Numpad4" && this.fourthPlayerDirection !== "right"){
                  this.fourthPlayerDirection = 'left';
              } if(e.code === "Numpad6" && this.fourthPlayerDirection !== "left"){
                  this.fourthPlayerDirection = 'right';
              } if(e.code === "Numpad8" && this.fourthPlayerDirection !== "down"){
                  this.fourthPlayerDirection = 'up';
              } if(e.code === "Numpad5" && this.fourthPlayerDirection !== "up"){
                  this.fourthPlayerDirection = 'down';
              }
          }
      });
  }
  
  handleMovePlayer = (player,x,y) => {
      player.lineTo(x,y);
      player.stroke();
      if(!this.firstStopCollision) this.handleDetectCollision("first");  
      if(!this.secondStopCollision) this.handleDetectCollision("second");    
      if(!this.thirdStopCollision) this.handleDetectCollision("third");    
      if(!this.fourthStopCollision) this.handleDetectCollision("fourth");        
  };

  handleDetectCollision = player => {
      this.handleCollisionWithPlayers(player);
      this.handleCollisionWithOwn(player);
      this.handleCollisionWithWalls(player);
  };ss

  handleWallsCollisionException = player => {
    if(this.firstPlayerCollisionFocus === 1 || this.secondPlayerCollisionFocus === 1 || this.thirdPlayerCollisionFocus === 1 || this.fourthPlayerCollisionFocus === 1){
      this.setState({
          numberOfPlayers: this.state.numberOfPlayers - 1
      });
      if(this.state.numberOfPlayers === 1) {
        this.handleReset();
      }
    }
    this.handleCollisionHappened(player);
    console.log("WallCollision: " + this.state.numberOfPlayers);
  }

  handleOtherCollisionException = player => {
    this.setState({
      numberOfPlayers: this.state.numberOfPlayers - 1
    });
    this.handleCollisionHappened(player);
    if(this.state.numberOfPlayers === 1) {
      this.handleReset();
    }
  }

  handleCollisionHappened = player => {
      if(this.playersInGame === 1) {
          window.location.reload();
      }
      if(player === "first") {
          clearInterval(this.firstPlayerMoveInterval);
          clearInterval(this.firstPlayerPointsInterval);
          this.firstPlayerCanMove = false;
          this.firstStopCollision = true;
      }
      else if (player === "second"){
          clearInterval(this.secondPlayerMoveInterval);
          clearInterval(this.secondPlayerPointsInterval);
          this.secondPlayerCanMove = false;
          this.secondStopCollision = true;
      }
      else if (player === "third"){
          clearInterval(this.thirdPlayerMoveInterval);
          clearInterval(this.thirdPlayerPointsInterval);
          this.thirdPlayerCanMove = false;
          this.thirdStopCollision = true;
      }
      else if (player === "fourth"){
          clearInterval(this.fourthPlayerMoveInterval);
          clearInterval(this.fourthPlayerPointsInterval);
          this.fourthPlayerCanMove = false;
          this.fourthStopCollision = true;
      }
  };

  handleCollisionWithPlayers = player => {
      // First Version - Correct first stack of searching array.
      if(player === "first") {
          for(let i = 0; i < this.firstLineCoordinates.length; i++){
              if(i >= this.secondLineCoordinates.length) break;
              else {
                  if((this.firstLineCoordinates[this.firstLineCoordinates.length - 1].x === this.secondLineCoordinates[i].x) && (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].y === this.secondLineCoordinates[i].y)){
                      this.handleOtherCollisionException(player);
                  }
              }         
          } 
          for(let i = 0; i < this.firstLineCoordinates.length; i++){
          if(i >= this.thirdLineCoordinates.length) break;
              else {
                  if((this.firstLineCoordinates[this.firstLineCoordinates.length - 1].x === this.thirdLineCoordinates[i].x) && (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].y === this.thirdLineCoordinates[i].y)){
                    this.handleOtherCollisionException(player);
                  }
              }  
          }
          for(let i = 0; i < this.firstLineCoordinates.length; i++){
              if(i >= this.fourthLineCoordinates.length) break;
              else {
                  if((this.firstLineCoordinates[this.firstLineCoordinates.length - 1].x === this.fourthLineCoordinates[i].x) && (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].y === this.fourthLineCoordinates[i].y)){
                    this.handleOtherCollisionException(player);
                  }
              }  
          }
      }
      if(player === "second") {
          for(let i = 0; i < this.secondLineCoordinates.length; i++){
              if(i >= this.firstLineCoordinates.length) break;
              else {
                  if((this.secondLineCoordinates[this.secondLineCoordinates.length - 1].x === this.firstLineCoordinates[i].x) && (this.secondLineCoordinates[this.secondLineCoordinates.length - 1].y === this.firstLineCoordinates[i].y)){
                    this.handleOtherCollisionException(player);
                  }
              }         
          } 
          for(let i = 0; i < this.secondLineCoordinates.length; i++){
          if(i >= this.thirdLineCoordinates.length) break;
              else {
                  if((this.secondLineCoordinates[this.secondLineCoordinates.length - 1].x === this.thirdLineCoordinates[i].x) && (this.secondLineCoordinates[this.secondLineCoordinates.length - 1].y === this.thirdLineCoordinates[i].y)){
                    this.handleOtherCollisionException(player);
                  }
              }  
          }
          for(let i = 0; i < this.secondLineCoordinates.length; i++){
              if(i >= this.fourthLineCoordinates.length) break;
              else {
                  if((this.secondLineCoordinates[this.secondLineCoordinates.length - 1].x === this.fourthLineCoordinates[i].x) && (this.secondLineCoordinates[this.secondLineCoordinates.length - 1].y === this.fourthLineCoordinates[i].y)){
                    this.handleOtherCollisionException(player);
                  }
              }  
          }
      }
      if(player === "third") {
          for(let i = 0; i < this.thirdLineCoordinates.length; i++){
              if(i >= this.firstLineCoordinates.length) break;
              else {
                  if((this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].x === this.firstLineCoordinates[i].x) && (this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].y === this.firstLineCoordinates[i].y)){
                    this.handleOtherCollisionException(player);
                  }
              }         
          } 
          for(let i = 0; i < this.thirdLineCoordinates.length; i++){
          if(i >= this.secondLineCoordinates.length) break;
              else {
                  if((this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].x === this.secondLineCoordinates[i].x) && (this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].y === this.secondLineCoordinates[i].y)){
                    this.handleOtherCollisionException(player);
                  }
              }  
          }
          for(let i = 0; i < this.thirdLineCoordinates.length; i++){
              if(i >= this.fourthLineCoordinates.length) break;
              else {
                  if((this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].x === this.fourthLineCoordinates[i].x) && (this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].y === this.fourthLineCoordinates[i].y)){
                    this.handleOtherCollisionException(player);
                  }
              }  
          }   
      }
      if(player === "fourth") {
          for(let i = 0; i < this.fourthLineCoordinates.length; i++){
              if(i >= this.secondLineCoordinates.length) break;
              else {
                  if((this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].x === this.secondLineCoordinates[i].x) && (this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].y === this.secondLineCoordinates[i].y)){
                    this.handleOtherCollisionException(player);
                  }
              }         
          } 
          for(let i = 0; i < this.fourthLineCoordinates.length; i++){
          if(i >= this.thirdLineCoordinates.length) break;
              else {
                  if((this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].x === this.thirdLineCoordinates[i].x) && (this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].y === this.thirdLineCoordinates[i].y)){
                    this.handleOtherCollisionException(player);
                  }
              }  
          }
          for(let i = 0; i < this.fourthLineCoordinates.length; i++){
              if(i >= this.firstLineCoordinates.length) break;
              else {
                  if((this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].x === this.firstLineCoordinates[i].x) && (this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].y === this.firstLineCoordinates[i].y)){
                    this.handleOtherCollisionException(player);
                  }
              }  
          }
      }
  };

  handleCollisionWithOwn = player => {
      if(player === "first") {
          for(let i = 0; i < this.firstLineCoordinates.length; i++){
              if(i === 0) continue;
              else if((this.firstLineCoordinates[this.firstLineCoordinates.length - 1].x === this.firstLineCoordinates[i - 1].x) && (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].y === this.firstLineCoordinates[i - 1].y)){
                this.handleOtherCollisionException(player);
              }
          }
      }
      if(player === "second") {
          for(let i = 0; i < this.secondLineCoordinates.length; i++){
              if(i === 0) continue;
              else if((this.secondLineCoordinates[this.secondLineCoordinates.length - 1].x === this.secondLineCoordinates[i - 1].x) && (this.secondLineCoordinates[this.secondLineCoordinates.length - 1].y === this.secondLineCoordinates[i - 1].y)){
                this.handleOtherCollisionException(player);
              }
          }
      }
      if(player === "third"){
          for(let i = 0; i < this.thirdLineCoordinates.length; i++){
              if(i === 0) continue;
              else if((this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].x === this.thirdLineCoordinates[i - 1].x) && (this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].y === this.thirdLineCoordinates[i - 1].y)){
                this.handleOtherCollisionException(player);
              }
          }
      }
      if(player === "fourth"){
          for(let i = 0; i < this.fourthLineCoordinates.length; i++){
              if(i === 0) continue;
              else if((this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].x === this.fourthLineCoordinates[i - 1].x) && (this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].y === this.fourthLineCoordinates[i - 1].y)){
                this.handleOtherCollisionException(player);
              }
          } 
      }
  };

  handleCollisionWithWalls = player => {
      if(player === "first") {
          for(let i = 0; i < this.firstLineCoordinates.length; i++){
              if((this.firstLineCoordinates[this.firstLineCoordinates.length - 1].x >= width) || (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].y >= height) || (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].x <= 0) || (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].y <= 0) ){
                  this.handleWallsCollisionException(player);
                  this.firstPlayerCollisionFocus++;
              }
          }
      }
      if(player === "second") {
          for(let i = 0; i < this.secondLineCoordinates.length; i++){
              if((this.secondLineCoordinates[this.secondLineCoordinates.length - 1].x >= width) || (this.secondLineCoordinates[this.secondLineCoordinates.length - 1].y >= height) || (this.secondLineCoordinates[this.secondLineCoordinates.length - 1].x <= 0) || (this.secondLineCoordinates[this.secondLineCoordinates.length - 1].y <= 0) ){
                  this.handleWallsCollisionException(player);
                  this.secondPlayerCollisionFocus++;
              }
          }
      }
      if(player === "third") {
          for(let i = 0; i < this.thirdLineCoordinates.length; i++){
              if((this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].x >= width) || (this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].y >= height) || (this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].x <= 0) || (this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].y <= 0) ){
                  this.handleWallsCollisionException(player);
                  this.thirdPlayerCollisionFocus++;
              }
          }
      }
      if(player === "fourth") {
          for(let i = 0; i < this.fourthLineCoordinates.length; i++){
              if((this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].x >= width) || (this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].y >= height) || (this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].x <= 0) || (this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].y <= 0) ){
                  this.handleWallsCollisionException(player);
                  this.fourthPlayerCollisionFocus++;
              }
          }
      }
  };

  handleReset = () => {
      this.showInfo = true;
      this.restartInterval = setInterval(() => {
          if(this.state.timeToRestart === 0) {
              if(this.state.round < 5) {
                  this.handleStartGame();
              }
              else {
                this.showInfo = false;
                this.setState({
                  end: true,
                });      
                  this.handleResetMoveInterval();
                  setInterval(() => {
                    window.location.reload();
                  },3000);
                
              }
          }
          else {
              this.movement = 1;
              this.setState({
                  timeToRestart: this.state.timeToRestart - 1,
              });
          }
      },1000);
      
      if(this.playersInGame == 2){
          if(!this.firstStopCollision) this.winner = 'Red';
          if(!this.secondStopCollision) this.winner = 'Green';
      }
      else if(this.playersInGame == 3) {
          if(!this.firstStopCollision) this.winner = 'Red';
          if(!this.secondStopCollision) this.winner = 'Green';
          if(!this.thirdStopCollision) this.winner = 'Blue'
      } 
      else if(this.playersInGame == 4){    
          if(!this.secondStopCollision) this.winner = 'Green'
          if(!this.thirdStopCollision) this.winner = 'Blue';
          if(!this.fourthStopCollision) this.winner = 'Yellow';
          if(!this.firstStopCollision) this.winner = 'Red';
      }
      if(this.winner === 'Red') this.firstPlayerPoints += 50;
      if(this.winner === 'Green') this.secondPlayerPoints += 50;
      if(this.winner === 'Blue') this.thirdPlayerPoints += 50;
      if(this.winner === 'Yellow') this.fourthPlayerPoints += 50;
      this.handleResetPointsInterval();
  }
  render() {
      return (
          <> 
              <aside>
                  <ScoreBoard numberOfPlayers={this.playersInGame} round={this.state.round} firstPoints={this.firstPlayerPoints} secondPoints={this.secondPlayerPoints} thirdPoints={this.thirdPlayerPoints} fourthPoints={this.fourthPlayerPoints}/>
                  <ChatBoard />
              </aside>
              <div className="wrapper" onClick={this.handleKeyListener}>
                  <div className="roundInfo">
                      <div>
                          <span className={this.winner}>{this.showInfo ? `We have a winner on this round!` : ""}</span>
                          <span>{this.showInfo ? `Time to restart: ${this.state.timeToRestart}` : ``}</span>
                      </div>
                      <div>
                          <span>{this.state.end ? `We have a Winner! Congratulations!` : ""}</span>
                          <span className={this.winner}>{this.state.end ? `The winner is ${this.winner} player!` : ""}</span>
                      </div>
                  </div>
                  <Player name="redPlayer"/>
                  <Player name="greenPlayer"/>
                  <Player name="bluePlayer"/>
                  <Player name="yellowPlayer"/>
              </div>
          </>
      );
  } 
}
export default GameBoard;