import '../resources/sass/main.scss';
const Player = (props) => {
    return (
      <canvas className={props.name}></canvas>
    );
};
export default Player;