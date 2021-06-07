import '../resources/sass/main.scss';
import { Component } from 'react';
import Player from './Player';
//import ScoreBoard from './ScoreBoard';

const width = 840;
const height = 620;

class GameBoard extends Component {
    state = {
        numberOfPlayers: 4,
        round: 1,
        timeToRestart: 6,
    }

    startGame = () => {
        this.showInfo = false;
        this.movement = 5;
        clearInterval(this.restartInterval);
        this.setState({
            timeToRestart: 6,
        });
        this.firstLineCoordinates = {};
        this.secondLineCoordinates = {};
        this.thirdLineCoordinates = {};
        this.fourthLineCoordinates = {};
        this.firstStopCollision = false;
        this.secondStopCollision = false;
        this.thirdStopCollision = false;
        this.fourthStopCollision = false;
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
            this.startGame();
        }  
    }

    handlePlayerDirection = player => {
        if(player === "first") {
            if(this.firstPlayerDirection === "right") this.xMoveFirst += this.movement;
            else if(this.firstPlayerDirection === "left") this.xMoveFirst -= this.movement;
            else if(this.firstPlayerDirection === "down") this.yMoveFirst += this.movement;
            else if(this.firstPlayerDirection === "up") this.yMoveFirst -= this.movement;
            this.firstLineCoordinates.push({x: this.xMoveFirst, y: this.yMoveFirst});
            this.handleMovePlayer(this.ctx[0], this.xMoveFirst, this.yMoveFirst);
        }
        if(player === "second") {
            if(this.secondPlayerDirection === "right") this.xMoveSecond += this.movement;
            else if(this.secondPlayerDirection === "left") this.xMoveSecond -= this.movement;
            else if(this.secondPlayerDirection === "down") this.yMoveSecond += this.movement;
            else if(this.secondPlayerDirection === "up") this.yMoveSecond -= this.movement;
            this.secondLineCoordinates.push({x: this.xMoveSecond, y: this.yMoveSecond});
            this.handleMovePlayer(this.ctx[1], this.xMoveSecond, this.yMoveSecond);
        }
        if(player === "third") {
            if(this.thirdPlayerDirection === "right") this.xMoveThird += this.movement;
            else if(this.thirdPlayerDirection === "left") this.xMoveThird -= this.movement;
            else if(this.thirdPlayerDirection === "down") this.yMoveThird += this.movement;
            else if(this.thirdPlayerDirection === "up") this.yMoveThird -= this.movement;
            this.thirdLineCoordinates.push({x: this.xMoveThird, y: this.yMoveThird});
            this.handleMovePlayer(this.ctx[2], this.xMoveThird, this.yMoveThird);
        }
        if(player === "fourth") {
            console.log(this.xMoveFourth);
            if(this.fourthPlayerDirection === "right") this.xMoveFourth += this.movement;
            else if(this.fourthPlayerDirection === "left") this.xMoveFourth -= this.movement;
            else if(this.fourthPlayerDirection === "down") this.yMoveFourth += this.movement;
            else if(this.fourthPlayerDirection === "up") this.yMoveFourth -= this.movement;
            this.fourthLineCoordinates.push({x: this.xMoveFourth, y: this.yMoveFourth});
            this.handleMovePlayer(this.ctx[3], this.xMoveFourth, this.yMoveFourth);
        }
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
                   // console.log("First: " + this.firstPlayerPoints);
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
                   // console.log("Second: " + this.secondPlayerPoints);
                },10000);
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
                   // console.log("Third: " + this.thirdPlayerPoints);
                },10000);
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
                  //  console.log("Fourth: " + this.fourthPlayerPoints);
                },10000);
                this.fourthPlayerCanMove = true; 
                this.xMoveFourth = width - 40;
                this.yMoveFourth = height - 40;
                this.fourthLineCoordinates = [{   x: this.xMoveFourth, y: this.yMoveFourth  }];
                this.ctx[i].strokeStyle = "#acb80b";
                this.ctx[i].moveTo(this.xMoveFourth,this.yMoveFourth);
            }
        }
    }

    componentDidUpdate() {
    
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
     //   this.handleCollisionWithPlayers();
        this.handleCollisionWithOwn(player);
       // this.handleCollisionWithWalls(player);
    };

    handleCollisionHappened = player => {
        this.setState({
            numberOfPlayers: this.state.numberOfPlayers - 1,
        })
        console.log(this.state.numberOfPlayers);
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
        if(this.state.numberOfPlayers <= 1) {
            this.handleReset();
        }
    };

    handleCollisionWithPlayers = () => {
        // First Version - Correct first stack of searching array.
        for(let i = 0; i < this.firstLineCoordinates.length; i++){
            if(i >= this.secondLineCoordinates.length) break;
            else {
                if((this.firstLineCoordinates[this.firstLineCoordinates.length - 1].x === this.secondLineCoordinates[i].x) && (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].y === this.secondLineCoordinates[i].y)){
                    console.log("Player Collision 1-st player with 2-nd player"); 
                }
            }         
        }
        for(let i = 0; i < this.firstLineCoordinates.length; i++){
           if(i >= this.thirdLineCoordinates.length) break;
            else {
                if((this.firstLineCoordinates[this.firstLineCoordinates.length - 1].x === this.thirdLineCoordinates[i].x) && (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].y === this.thirdLineCoordinates[i].y)){
                    console.log("Player Collision 1-st player with 3-rd player");
                }
            }  
        }
        for(let i = 0; i < this.firstLineCoordinates.length; i++){
            if(i >= this.fourthLineCoordinates.length) break;
             else {
                 if((this.firstLineCoordinates[this.firstLineCoordinates.length - 1].x === this.fourthLineCoordinates[i].x) && (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].y === this.fourthLineCoordinates[i].y)){
                     console.log("Player Collision 1-st player with 4-th player");
                 }
             }  
         }
         // Second Version - better but doesn't work :(   

        // for(let i = 0; i < firstLineCoordinates.length; i++){
        //     if(i >= secondLineCoordinates.length) break;
        //     else if(i >= thirdLineCoordinates.length) break;
        //     else if(i >= fourthLineCoordinates.length) break;
        //     else {
        //         if((firstLineCoordinates[firstLineCoordinates.length - 1].xMoveFirst === secondLineCoordinates[i].xMoveSecond) && (firstLineCoordinates[firstLineCoordinates.length - 1].yMoveFirst === secondLineCoordinates[i].yMoveSecond)){
        //             console.log("Player Collision 1-st player with 2-nd player"); 
        //         }
        //         if((firstLineCoordinates[firstLineCoordinates.length - 1].xMoveFirst === thirdLineCoordinates[i].xMoveThird) && (firstLineCoordinates[firstLineCoordinates.length - 1].yMoveFirst === thirdLineCoordinates[i].yMoveThird)){
        //             console.log("Player Collision 1-st player with 3-rd player");
        //         }
        //         if((firstLineCoordinates[firstLineCoordinates.length - 1].xMoveFirst === fourthLineCoordinates[i].xMoveFourth) && (firstLineCoordinates[firstLineCoordinates.length - 1].yMoveFirst === fourthLineCoordinates[i].yMoveFourth)){
        //             console.log("Player Collision 1-st player with 4-th player");
        //         }
        //     }         
        // } 
    };

    handleCollisionWithOwn = player => {
        if(player === "first") {
            for(let i = 0; i < this.firstLineCoordinates.length; i++){
                if(i === 0) continue;
                else if((this.firstLineCoordinates[this.firstLineCoordinates.length - 1].x === this.firstLineCoordinates[i - 1].x) && (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].y === this.firstLineCoordinates[i - 1].y)){
                    this.handleCollisionHappened(player);
                }
            }
        }
        if(player === "second") {
            for(let i = 0; i < this.secondLineCoordinates.length; i++){
                if(i === 0) continue;
                else if((this.secondLineCoordinates[this.secondLineCoordinates.length - 1].x === this.secondLineCoordinates[i - 1].x) && (this.secondLineCoordinates[this.secondLineCoordinates.length - 1].y === this.secondLineCoordinates[i - 1].y)){
                    this.handleCollisionHappened(player);
                }
            }
        }
        if(player === "third"){
            for(let i = 0; i < this.thirdLineCoordinates.length; i++){
                if(i === 0) continue;
                else if((this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].x === this.thirdLineCoordinates[i - 1].x) && (this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].y === this.thirdLineCoordinates[i - 1].y)){
                    this.handleCollisionHappened(player);
                }
            }
        }
        if(player === "fourth"){
            for(let i = 0; i < this.fourthLineCoordinates.length; i++){
                if(i === 0) continue;
                else if((this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].x === this.fourthLineCoordinates[i - 1].x) && (this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].y === this.fourthLineCoordinates[i - 1].y)){
                    this.handleCollisionHappened(player);
                }
            } 
        }
    };

    handleCollisionWithWalls = player => {
        if(player === "first") {
            for(let i = 0; i < this.firstLineCoordinates.length; i++){
                if((this.firstLineCoordinates[this.firstLineCoordinates.length - 1].x >= width) || (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].y >= height) || (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].x <= 0) || (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].y <= 0) ){
                    this.handleCollisionHappened(player);
                }
            }
        }
        if(player === "second") {
            for(let i = 0; i < this.secondLineCoordinates.length; i++){
                if((this.secondLineCoordinates[this.secondLineCoordinates.length - 1].x >= width) || (this.secondLineCoordinates[this.secondLineCoordinates.length - 1].y >= height) || (this.secondLineCoordinates[this.secondLineCoordinates.length - 1].x <= 0) || (this.secondLineCoordinates[this.secondLineCoordinates.length - 1].y <= 0) ){
                    this.handleCollisionHappened(player);
                }
            }
        }
        if(player === "third") {
            for(let i = 0; i < this.thirdLineCoordinates.length; i++){
                if((this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].x >= width) || (this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].y >= height) || (this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].x <= 0) || (this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].y <= 0) ){
                    this.handleCollisionHappened(player);
                }
            }
        }
        if(player === "fourth") {
            for(let i = 0; i < this.fourthLineCoordinates.length; i++){
                if((this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].x >= width) || (this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].y >= height) || (this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].x <= 0) || (this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].y <= 0) ){
                    this.handleCollisionHappened(player);
                }
            }
        }
    };

    handleReset = () => {
        this.showInfo = true;
        this.restartInterval = setInterval(()=>{
            if(this.state.timeToRestart === 0) {
                this.startGame();
                this.setState({
                    round: this.state.round + 1,
                });
            }
            else {
                this.movement = 1;
                this.setState({
                    timeToRestart: this.state.timeToRestart - 1,
                });
            }
        },1000);
        if(!this.firstStopCollision)this.winner = 'red';
        if(!this.secondStopCollision)this.winner = 'green';
        if(!this.thirdStopCollision)this.winner = 'blue';
        if(!this.fourthStopCollision)this.winner = 'yellow';
    }
    render() {
        return (
        <div className="wrapper" onClick={this.handleKeyListener}>
            <div className="roundInfo">
                <div>
                    <span className={this.winner}>{this.showInfo ? `We have a winner on this round!` : ""}</span>
                    <span>{this.showInfo ? `Time to restart: ${this.state.timeToRestart}` : ``}</span>
                </div>
            </div>
            <Player name="redPlayer"/>
            <Player name="greenPlayer"/>
            <Player name="bluePlayer"/>
            <Player name="yellowPlayer"/>
        </div>
        );
    } 
}
export default GameBoard;