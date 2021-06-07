import '../resources/sass/main.scss';
const Player = (props) => {
  //const firstPlayerStartPoint = {x: 20, y: 20};
    return (
      <canvas className={props.name}></canvas>
    );
};

export default Player;