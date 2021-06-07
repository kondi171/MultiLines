import '../resources/sass/main.scss';
import { Component } from 'react'; 

class ScoreBoard extends Component {
    constructor(props){
      super(props);
      this.state = {
        first: null,
        second: null,
        third: null,
        fourth: null,
      }
    }
    render(){
      return (
        <>
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
          <h2>round 2</h2>
        </section>
        </>
      );
    }
};

export default ScoreBoard;