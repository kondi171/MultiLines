import '../resources/sass/main.scss';
import { Component } from 'react';
import Player from './Player';
//import ScoreBoard from './ScoreBoard';

const width = 840;
const height = 620;
const movement = 5;

class GameBoard extends Component {
    state = {
        timeInterval: 0,
        numberOfPlayers: 4,
        firstPlayerPoints: 0,
        secondPlayerPoints: 0,
        thirdPlayerPoints: 0,
        fourthPlayerPoints: 0,
        firstPlayerDirection: "right",
        secondPlayerDirection: "down",
        thirdPlayerDirection: "up",
        fourthPlayerDirection: "left",
        round: 1,
    }
    startGame = () => {
        this.firstLineCoordinates = {};
        this.secondLineCoordinates = {};
        this.thirdLineCoordinates = {};
        this.fourthLineCoordinates = {};
        for(let i = 0; i < this.canvas.length; i++){
            this.canvas[i].width = width;
            this.canvas[i].height = height;
            this.ctx[i] = this.canvas[i].getContext('2d');
            this.ctx[i].clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    componentDidMount() {
        this.canvas = [
            document.querySelector('.redPlayer'),
            document.querySelector('.greenPlayer'),
            document.querySelector('.bluePlayer'),
            document.querySelector('.yellowPlayer')
        ];
        this.ctx = [];
        this.startGame();
        this.numberOfPlayers = this.state.numberOfPlayers;
        this.handleInitializePlayers(this.state.numberOfPlayers);
    }

    handlePlayerDirection = player => {
        if(player === "first") {
            if(this.state.firstPlayerDirection === "right") this.xMoveFirst += movement;
            else if(this.state.firstPlayerDirection === "left") this.xMoveFirst -= movement;
            else if(this.state.firstPlayerDirection === "down") this.yMoveFirst += movement;
            else if(this.state.firstPlayerDirection === "up") this.yMoveFirst -= movement;
            this.firstLineCoordinates.push({x: this.xMoveFirst, y: this.yMoveFirst});
            this.handleMovePlayer(this.ctx[0], this.xMoveFirst, this.yMoveFirst);
        }
        if(player === "second") {
            if(this.state.secondPlayerDirection === "right") this.xMoveSecond += movement;
            else if(this.state.secondPlayerDirection === "left") this.xMoveSecond -= movement;
            else if(this.state.secondPlayerDirection === "down") this.yMoveSecond += movement;
            else if(this.state.secondPlayerDirection === "up") this.yMoveSecond -= movement;
            this.secondLineCoordinates.push({x: this.xMoveSecond, y: this.yMoveSecond});
            this.handleMovePlayer(this.ctx[1], this.xMoveSecond, this.yMoveSecond);
        }
        if(player === "third") {
            if(this.state.thirdPlayerDirection === "right") this.xMoveThird += movement;
            else if(this.state.thirdPlayerDirection === "left") this.xMoveThird -= movement;
            else if(this.state.thirdPlayerDirection === "down") this.yMoveThird += movement;
            else if(this.state.thirdPlayerDirection === "up") this.yMoveThird -= movement;
            this.thirdLineCoordinates.push({x: this.xMoveThird, y: this.yMoveThird});
            this.handleMovePlayer(this.ctx[2], this.xMoveThird, this.yMoveThird);
        }
        if(player === "fourth") {
            if(this.state.fourthPlayerDirection === "right") this.xMoveFourth += movement;
            else if(this.state.fourthPlayerDirection === "left") this.xMoveFourth -= movement;
            else if(this.state.fourthPlayerDirection === "down") this.yMoveFourth += movement;
            else if(this.state.fourthPlayerDirection === "up") this.yMoveFourth -= movement;
            this.fourthLineCoordinates.push({x: this.xMoveFourth, y: this.yMoveFourth});
            this.handleMovePlayer(this.ctx[3], this.xMoveFourth, this.yMoveFourth);
        }
    }

    handleInitializePlayers(numberOfPlayers) {
        for(let i = 0; i < numberOfPlayers; i++){
            this.ctx[i].beginPath();
            this.ctx[i].lineCap = 'rounded';
            if(i === 0) {
                this.firstPlayerMoveInterval = setInterval(()=>{
                    this.handlePlayerDirection("first");
                },50);
                this.firstPlayerPointsInterval = setInterval(()=>{
                    this.setState({
                        firstPlayerPoints: this.state.firstPlayerPoints + 10
                    });
                  //  console.log("First: " + this.state.firstPlayerPoints);
                },1000);
                this.firstPlayerCanMove = true; 
                this.xMoveFirst = 40;
                this.yMoveFirst = 40;
                this.firstLineCoordinates = [{   x: this.xMoveFirst, y: this.yMoveFirst  }];
                this.ctx[i].strokeStyle = "red";
                this.ctx[i].moveTo(this.xMoveFirst,this.yMoveFirst);
            } else if (i === 1) {
                this.secondPlayerMoveInterval = setInterval(()=>{
                    this.handlePlayerDirection("second");
                },50);
                this.secondPlayerPointsInterval = setInterval(()=>{
                    this.setState({
                        secondPlayerPoints: this.state.secondPlayerPoints + 10
                    });
                   // console.log("Second: " + this.state.secondPlayerPoints);
                },10000);
                this.secondPlayerCanMove = true; 
                this.xMoveSecond = width - 40;
                this.yMoveSecond = 40;
                this.secondLineCoordinates = [{   x: this.xMoveSecond, y: this.yMoveSecond  }];
                this.ctx[i].strokeStyle = "green";
                this.ctx[i].moveTo(this.xMoveSecond,this.yMoveSecond);
            } else if (i === 2) {
                this.thirdPlayerMoveInterval = setInterval(()=>{
                    this.handlePlayerDirection("third");
                },50);
                this.thirdPlayerPointsInterval = setInterval(()=>{
                    this.setState({
                        thirdPlayerPoints: this.state.thirdPlayerPoints + 10
                    });
                   // console.log("Third: " + this.state.thirdPlayerPoints);
                },10000);
                this.thirdPlayerCanMove = true; 
                this.xMoveThird = 40;
                this.yMoveThird = height - 40;
                this.thirdLineCoordinates = [{   x: this.xMoveThird, y: this.yMoveThird  }];
                this.ctx[2].strokeStyle = "blue";
                this.ctx[2].moveTo(this.xMoveThird,this.yMoveThird);
            } else {
                this.fourthPlayerMoveInterval = setInterval(()=>{
                    this.handlePlayerDirection("fourth");
                },50);
                this.fourthPlayerPointsInterval = setInterval(()=>{
                    this.setState({
                        fourthPlayerPoints: this.state.fourthPlayerPoints + 10
                    });
                  //  console.log("Fourth: " + this.state.fourthPlayerPoints);
                },10000);
                this.fourthPlayerCanMove = true; 
                this.xMoveFourth = width - 40;
                this.yMoveFourth = height - 40;
                this.fourthLineCoordinates = [{   x: this.xMoveFourth, y: this.yMoveFourth  }];
                this.ctx[i].strokeStyle = "yellow";
                this.ctx[i].moveTo(this.xMoveFourth,this.yMoveFourth);
            }
            
        }
    }

    componentDidUpdate() {
    
    }

    handleKeyListener = () => {
        document.addEventListener('keydown', (e) => {
            if(this.firstPlayerCanMove){
                if(e.code === "KeyA"){
                    this.setState({
                        firstPlayerDirection: 'left',
                    });
                } if(e.code === "KeyD"){
                    this.setState({
                        firstPlayerDirection: 'right',
                    });
                } if(e.code === "KeyW"){
                    this.setState({
                        firstPlayerDirection: 'up',
                    });
                } if(e.code === "KeyS"){
                    this.setState({
                        firstPlayerDirection: 'down',
                    });
                }
            }
            if(this.secondPlayerCanMove){
                if(e.code === "ArrowLeft"){
                    this.setState({
                        secondPlayerDirection: 'left',
                    });
                } if(e.code === "ArrowRight"){
                    this.setState({
                        secondPlayerDirection: 'right',
                    });
                } if(e.code === "ArrowUp"){
                    this.setState({
                        secondPlayerDirection: 'up',
                    });
                } if(e.code === "ArrowDown"){
                    this.setState({
                        secondPlayerDirection: 'down',
                    });
                }
            }
            if(this.thirdPlayerCanMove){
                if(e.code === "KeyJ"){
                    this.setState({
                        thirdPlayerDirection: 'left',
                    });
                } if(e.code === "KeyL"){
                    this.setState({
                        thirdPlayerDirection: 'right',
                    });
                } if(e.code === "KeyI"){
                    this.setState({
                        thirdPlayerDirection: 'up',
                    });
                } if(e.code === "KeyK"){
                    this.setState({
                        thirdPlayerDirection: 'down',
                    });
                }
            }
            if(this.fourthPlayerCanMove){
                if(e.code === "Numpad4"){
                    this.setState({
                        fourthPlayerDirection: 'left',
                    });
                } if(e.code === "Numpad6"){
                    this.setState({
                        fourthPlayerDirection: 'right',
                    });
                } if(e.code === "Numpad8"){
                    this.setState({
                        fourthPlayerDirection: 'up',
                    });
                } if(e.code === "Numpad5"){
                    this.setState({
                        fourthPlayerDirection: 'down',
                    });
                }
            }
        });
    }
    
    handleMovePlayer = (player,x,y) => {
        player.lineTo(x,y);
        player.stroke();
        this.handleDetectCollision();    
    };

    handleDetectCollision = () => {
     //   this.handleCollisionWithPlayers();
        this.handleCollisionWithOwn();
        this.handleCollisionWithWalls();
    };
    checkReset = () => {
        if(!this.firstPlayerCanMove) this.numberOfPlayers--;
        if(!this.secondPlayerCanMove) this.numberOfPlayers--;
        if(!this.thirdPlayerCanMove) this.numberOfPlayers--;
        if(!this.fourthPlayerCanMove) this.numberOfPlayers--;
        console.log(this.numberOfPlayers);
        if(this.numberOfPlayers <= 1) {
            this.handleReset();
        }
    }
    handleCollisionHappened = player => {
        if(player === "first") {
            clearInterval(this.firstPlayerMoveInterval);
            clearInterval(this.firstPlayerPointsInterval);
            this.firstPlayerCanMove = false;
        }
        else if (player === "second"){
            clearInterval(this.secondPlayerMoveInterval);
            clearInterval(this.secondPlayerPointsInterval);
            this.secondPlayerCanMove = false;
        }
        else if (player === "third"){
            clearInterval(this.thirdPlayerMoveInterval);
            clearInterval(this.thirdPlayerPointsInterval);
            this.thirdPlayerCanMove = false;
        }
        else if (player === "fourth"){
            clearInterval(this.fourthPlayerMoveInterval);
            clearInterval(this.fourthPlayerPointsInterval);
            this.fourthPlayerCanMove = false;
        }
        this.checkReset();
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

    handleCollisionWithOwn = () => {
        for(let i = 0; i < this.firstLineCoordinates.length; i++){
            if(i === 0) continue;
            else if((this.firstLineCoordinates[this.firstLineCoordinates.length - 1].x === this.firstLineCoordinates[i - 1].x) && (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].y === this.firstLineCoordinates[i - 1].y)){
                this.handleCollisionHappened("first");
            }
        }
        for(let i = 0; i < this.secondLineCoordinates.length; i++){
            if(i === 0) continue;
            else if((this.secondLineCoordinates[this.secondLineCoordinates.length - 1].x === this.secondLineCoordinates[i - 1].x) && (this.secondLineCoordinates[this.secondLineCoordinates.length - 1].y === this.secondLineCoordinates[i - 1].y)){
                this.handleCollisionHappened("second");
            }
        }
        for(let i = 0; i < this.thirdLineCoordinates.length; i++){
            if(i === 0) continue;
            else if((this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].x === this.thirdLineCoordinates[i - 1].x) && (this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].y === this.thirdLineCoordinates[i - 1].y)){
                this.handleCollisionHappened("third");
            }
        }
        for(let i = 0; i < this.fourthLineCoordinates.length; i++){
            if(i === 0) continue;
            else if((this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].x === this.fourthLineCoordinates[i - 1].x) && (this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].y === this.fourthLineCoordinates[i - 1].y)){
                this.handleCollisionHappened("fourth");
            }
        } 
    };

    handleCollisionWithWalls = () => {
        for(let i = 0; i < this.firstLineCoordinates.length; i++){
            if((this.firstLineCoordinates[this.firstLineCoordinates.length - 1].x >= width) || (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].y >= height) || (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].x <= 0) || (this.firstLineCoordinates[this.firstLineCoordinates.length - 1].y <= 0) ){
                this.handleCollisionHappened("first");
            }
        }
        for(let i = 0; i < this.secondLineCoordinates.length; i++){
            if((this.secondLineCoordinates[this.secondLineCoordinates.length - 1].x >= width) || (this.secondLineCoordinates[this.secondLineCoordinates.length - 1].y >= height) || (this.secondLineCoordinates[this.secondLineCoordinates.length - 1].x <= 0) || (this.secondLineCoordinates[this.secondLineCoordinates.length - 1].y <= 0) ){
                this.handleCollisionHappened("second");
            }
        }
        for(let i = 0; i < this.thirdLineCoordinates.length; i++){
            if((this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].x >= width) || (this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].y >= height) || (this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].x <= 0) || (this.thirdLineCoordinates[this.thirdLineCoordinates.length - 1].y <= 0) ){
                this.handleCollisionHappened("third");
            }
        }
        for(let i = 0; i < this.fourthLineCoordinates.length; i++){
            if((this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].x >= width) || (this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].y >= height) || (this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].x <= 0) || (this.fourthLineCoordinates[this.fourthLineCoordinates.length - 1].y <= 0) ){
                this.handleCollisionHappened("fourth");
            }
        }
    };

    handleReset = () => {
        this.restartInterval = setInterval(()=>{
            this.timeStamp++;
        },1000);
        
       // console.log(this.state.round);
        this.setState({
            round: this.state.round + 1,
        })
    }
    render() {
        return (
        <div class="wrapper" onClick={this.handleKeyListener}>
            <div className="roundInfo">
                <div>{this.restartInterval ? `We have a winner on this round!` + this.timeStamp : ``}</div>
            </div>
            <Player name = "redPlayer"/>
            <Player name = "greenPlayer"/>
            <Player name = "bluePlayer"/>
            <Player name = "yellowPlayer"/>
        </div>
        );
    } 
}
export default GameBoard;