import '../resources/sass/main.scss';
import { Component } from 'react';
import Player from './Player';

const width = 840;
const height = 620;
let xMoveFirst = 40;
let yMoveFirst = 40;
let xMoveSecond = width - 40;
let yMoveSecond = 40;
let xMoveThird = 40;
let yMoveThird = height - 40;
let xMoveFourth = width - 40;
let yMoveFourth = height - 40;
let firstLineCoordinates = [{   xMoveFirst: xMoveFirst, yMoveFirst: yMoveFirst  }];
let secondLineCoordinates = [{   xMoveSecond: xMoveSecond, yMoveSecond: yMoveSecond  }];
let thirdLineCoordinates = [{   xMoveThird: xMoveThird, yMoveThird: yMoveThird  }];
let fourthLineCoordinates = [{   xMoveFourth: xMoveFourth, yMoveFourth: yMoveFourth  }];
let ctx = [];
const movement = 5;

class GameBoard extends Component {
    state = {
        timeInterval: 0,
    }

    componentDidMount() {
        const canvas = [
            document.querySelector('.redPlayer'),
            document.querySelector('.greenPlayer'),
            document.querySelector('.bluePlayer'),
            document.querySelector('.yellowPlayer')
        ];

        for(let i = 0; i < canvas.length; i++){
            canvas[i].width = width;
            canvas[i].height = height;
            ctx[i] = canvas[i].getContext('2d');
        }
        
        ctx[0].beginPath();
        ctx[0].lineCap = 'rounded';
        ctx[0].strokeStyle = "red";
        ctx[0].beginPath();
        ctx[0].moveTo(xMoveFirst,yMoveFirst);
        
        ctx[1].beginPath();
        ctx[1].lineCap = 'rounded';
        ctx[1].strokeStyle = "green";
        ctx[1].beginPath();
        ctx[1].moveTo(xMoveSecond,yMoveSecond);
        
        ctx[2].beginPath();
        ctx[2].lineCap = 'rounded';
        ctx[2].strokeStyle = "blue";
        ctx[2].beginPath();
        ctx[2].moveTo(xMoveThird,yMoveThird);
        
        ctx[3].beginPath();
        ctx[3].lineCap = 'rounded';
        ctx[3].strokeStyle = "yellow";
        ctx[3].beginPath();
        ctx[3].moveTo(xMoveFourth,yMoveFourth);
    }

    //   componentDidUpdate() {
    
    //   }

    handleKeyListener = () => {
        document.addEventListener('keydown', (e) => {
            if(e.code === "KeyA"){
                xMoveFirst -= movement;
                firstLineCoordinates.push({xMoveFirst, yMoveFirst});
                this.handleMovePlayer(ctx[0], xMoveFirst, yMoveFirst);
            } if(e.code === "KeyD"){
                xMoveFirst += movement;
                firstLineCoordinates.push({xMoveFirst, yMoveFirst});
                this.handleMovePlayer(ctx[0], xMoveFirst, yMoveFirst);
            } if(e.code === "KeyW"){
                yMoveFirst -= movement;
                firstLineCoordinates.push({xMoveFirst, yMoveFirst});
                this.handleMovePlayer(ctx[0], xMoveFirst, yMoveFirst);
            } if(e.code === "KeyS"){
                yMoveFirst += movement;
                firstLineCoordinates.push({xMoveFirst, yMoveFirst});
                this.handleMovePlayer(ctx[0], xMoveFirst, yMoveFirst);
            }
            
            if(e.code === "ArrowLeft"){
                xMoveSecond -= movement;
                secondLineCoordinates.push({xMoveSecond, yMoveSecond});
                this.handleMovePlayer(ctx[1], xMoveSecond, yMoveSecond);
            } if(e.code === "ArrowRight"){
                xMoveSecond += movement;
                secondLineCoordinates.push({xMoveSecond, yMoveSecond});
                this.handleMovePlayer(ctx[1], xMoveSecond, yMoveSecond);
            } if(e.code === "ArrowUp"){
                yMoveSecond -= movement;
                secondLineCoordinates.push({xMoveSecond, yMoveSecond});
                this.handleMovePlayer(ctx[1], xMoveSecond, yMoveSecond);
            } if(e.code === "ArrowDown"){
                yMoveSecond += movement;
                secondLineCoordinates.push({xMoveSecond, yMoveSecond});
                this.handleMovePlayer(ctx[1], xMoveSecond, yMoveSecond);
            }
            
            if(e.code === "KeyJ"){
                xMoveThird -= movement;
                thirdLineCoordinates.push({xMoveThird, yMoveThird});
                this.handleMovePlayer(ctx[2], xMoveThird, yMoveThird);
            } if(e.code === "KeyL"){
                xMoveThird += movement;
                thirdLineCoordinates.push({xMoveThird, yMoveThird});
                this.handleMovePlayer(ctx[2], xMoveThird, yMoveThird);
            } if(e.code === "KeyI"){
                yMoveThird -= movement;
                thirdLineCoordinates.push({xMoveThird, yMoveThird});
                this.handleMovePlayer(ctx[2], xMoveThird, yMoveThird);
            } if(e.code === "KeyK"){
                yMoveThird += movement;
                thirdLineCoordinates.push({xMoveThird, yMoveThird});
                this.handleMovePlayer(ctx[2], xMoveThird, yMoveThird);
            }
            
            if(e.code === "Numpad4"){
                xMoveFourth -= movement;
                fourthLineCoordinates.push({xMoveFourth, yMoveFourth});
                this.handleMovePlayer(ctx[3], xMoveFourth, yMoveFourth);
            } if(e.code === "Numpad6"){
                xMoveFourth += movement;
                fourthLineCoordinates.push({xMoveFourth, yMoveFourth});
                this.handleMovePlayer(ctx[3], xMoveFourth, yMoveFourth);
            } if(e.code === "Numpad8"){
                yMoveFourth -= movement;
                fourthLineCoordinates.push({xMoveFourth, yMoveFourth});
                this.handleMovePlayer(ctx[3], xMoveFourth, yMoveFourth);
            } if(e.code === "Numpad5"){
                yMoveFourth += movement;
                fourthLineCoordinates.push({xMoveFourth, yMoveFourth});
                this.handleMovePlayer(ctx[3], xMoveFourth, yMoveFourth);
            }
        });
    }
    
    handleMovePlayer = (player,x,y) => {
        player.lineTo(x,y);
        player.stroke();
        this.handleDetectCollision();    
    };

    handleDetectCollision = () => {
        this.handleCollisionWithPlayers();
        this.handleCollisionWithOwn();
        this.handleCollisionWithWalls();
    };

    handleCollisionWithPlayers = () => {
        for(let i = 0; i < firstLineCoordinates.length; i++){
            if(i >= secondLineCoordinates.length) break;
            else {
                if((firstLineCoordinates[firstLineCoordinates.length - 1].xMoveFirst === secondLineCoordinates[i].xMoveSecond) && (firstLineCoordinates[firstLineCoordinates.length - 1].yMoveFirst === secondLineCoordinates[i].yMoveSecond)){
                    console.log("Player Collision 1-st player with 2-nd player"); 
                }
            }         
        }
        for(let i = 0; i < firstLineCoordinates.length; i++){
           if(i >= thirdLineCoordinates.length) break;
            else {
                if((firstLineCoordinates[firstLineCoordinates.length - 1].xMoveFirst === thirdLineCoordinates[i].xMoveThird) && (firstLineCoordinates[firstLineCoordinates.length - 1].yMoveFirst === thirdLineCoordinates[i].yMoveThird)){
                    console.log("Player Collision 1-st player with 3-rd player");
                }
            }  
        }
        for(let i = 0; i < firstLineCoordinates.length; i++){
            if(i >= fourthLineCoordinates.length) break;
             else {
                 if((firstLineCoordinates[firstLineCoordinates.length - 1].xMoveFirst === fourthLineCoordinates[i].xMoveFourth) && (firstLineCoordinates[firstLineCoordinates.length - 1].yMoveFirst === fourthLineCoordinates[i].yMoveFourth)){
                     console.log("Player Collision 1-st player with 4-th player");
                 }
             }  
         }
    };

    handleCollisionWithOwn = () => {
        // First Version - Correct first stack of searching array.
        for(let i = 0; i < firstLineCoordinates.length; i++){
            if(i === 0) continue;
            else if((firstLineCoordinates[firstLineCoordinates.length - 1].xMoveFirst === firstLineCoordinates[i - 1].xMoveFirst) && (firstLineCoordinates[firstLineCoordinates.length - 1].yMoveFirst === firstLineCoordinates[i - 1].yMoveFirst)){
                console.log("Own Collision 1-st player");
            }
        }
        for(let i = 0; i < secondLineCoordinates.length; i++){
            if(i === 0) continue;
            else if((secondLineCoordinates[secondLineCoordinates.length - 1].xMoveSecond === secondLineCoordinates[i - 1].xMoveSecond) && (secondLineCoordinates[secondLineCoordinates.length - 1].yMoveSecond === secondLineCoordinates[i - 1].yMoveSecond)){
                console.log("Own Collision 2-nd player");
            }
        }
        for(let i = 0; i < thirdLineCoordinates.length; i++){
            if(i === 0) continue;
            else if((thirdLineCoordinates[thirdLineCoordinates.length - 1].xMoveThird === thirdLineCoordinates[i - 1].xMoveThird) && (thirdLineCoordinates[thirdLineCoordinates.length - 1].yMoveThird === thirdLineCoordinates[i - 1].yMoveThird)){
                console.log("Own Collision 3-rd player");
            }
        }
        for(let i = 0; i < fourthLineCoordinates.length; i++){
            if(i === 0) continue;
            else if((fourthLineCoordinates[fourthLineCoordinates.length - 1].xMoveFourth === fourthLineCoordinates[i - 1].xMoveFourth) && (fourthLineCoordinates[fourthLineCoordinates.length - 1].yMoveFourth === fourthLineCoordinates[i - 1].yMoveFourth)){
                console.log("Own Collision 4-th player");
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

    handleCollisionWithWalls = () => {
        for(let i = 0; i < firstLineCoordinates.length; i++){
            if((firstLineCoordinates[firstLineCoordinates.length - 1].xMoveFirst >= width) || (firstLineCoordinates[firstLineCoordinates.length - 1].yMoveFirst >= height) || (firstLineCoordinates[firstLineCoordinates.length - 1].xMoveFirst <= 0) || (firstLineCoordinates[firstLineCoordinates.length - 1].yMoveFirst <= 0) ){
                console.log("Wall Collision 1-st player");
            }
        }
        for(let i = 0; i < secondLineCoordinates.length; i++){
            if((secondLineCoordinates[secondLineCoordinates.length - 1].xMoveSecond >= width) || (secondLineCoordinates[secondLineCoordinates.length - 1].yMoveSecond >= height) || (secondLineCoordinates[secondLineCoordinates.length - 1].xMoveSecond <= 0) || (secondLineCoordinates[secondLineCoordinates.length - 1].yMoveSecond <= 0) ){
                console.log("Wall Collision 2-nd player");
            }
        }
        for(let i = 0; i < thirdLineCoordinates.length; i++){
            if((thirdLineCoordinates[thirdLineCoordinates.length - 1].xMoveThird >= width) || (thirdLineCoordinates[thirdLineCoordinates.length - 1].yMoveThird >= height) || (thirdLineCoordinates[thirdLineCoordinates.length - 1].xMoveThird <= 0) || (thirdLineCoordinates[thirdLineCoordinates.length - 1].yMoveThird <= 0) ){
                console.log("Wall Collision 3-rd player");
            }
        }
        for(let i = 0; i < fourthLineCoordinates.length; i++){
            if((fourthLineCoordinates[fourthLineCoordinates.length - 1].xMoveFourth >= width) || (fourthLineCoordinates[fourthLineCoordinates.length - 1].yMoveFourth >= height) || (fourthLineCoordinates[fourthLineCoordinates.length - 1].xMoveFourth <= 0) || (fourthLineCoordinates[fourthLineCoordinates.length - 1].yMoveFourth <= 0) ){
                console.log("Wall Collision 4-th player");
            }
        }
    };

    render() {
        return (
        <div class="wrapper" onClick={this.handleKeyListener}>
            <Player name = "redPlayer"/>
            <Player name = "greenPlayer"/>
            <Player name = "bluePlayer"/>
            <Player name = "yellowPlayer"/>
        </div>
        );
    } 
}
export default GameBoard;