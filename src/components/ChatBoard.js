import '../resources/sass/main.scss';
import { Component } from 'react';

class ChatBoard extends Component {
  state = {
    local: true,
  }

  render() {
    return (
      <section className="chat">  
        <h2>Chat</h2>
        <div className="disableLocalChat">Chat is disabled in local game!</div>
        <form>
          <input disabled={this.state.local ? `disabled` : ``} type="text" />
          <button disabled={this.state.local ? `disabled` : ``}>Send</button>
        </form>
      </section>
    );
  }
}
  
export default ChatBoard;