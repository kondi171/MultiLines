import '../resources/sass/main.scss';

const ScoreBoard = (props) => {
  return (
    <>
      <section className="scores">
        <h2>Scores</h2>
        <ol>
          <li>
            <span>Red Player</span>
            <span>{props.firstPoints}</span>
          </li>
          <li>
            <span>Blue Player</span>
            <span>{props.secondPoints}</span>
          </li>
          <li>
            <span>Green Player</span>
            <span>{props.thirdPoints}</span>
          </li>
          <li>
            <span>Yellow Player</span>
            <span>{props.fourthPoints}</span>
          </li>

        </ol>
        <h2>Round {props.round}</h2>
      </section>
    </>
  );
}
export default ScoreBoard;