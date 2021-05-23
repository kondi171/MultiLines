import '../resources/sass/main.scss';
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
};

export default ScoreBoard;