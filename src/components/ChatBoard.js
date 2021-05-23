import '../resources/sass/main.scss';

const ChatBoard = () => {
    return (
      <section className="chat">  
        <h2>Chat</h2>
        <form>
          <input type="text" />
          <button>Send</button>
        </form>
      </section>
    );
  }

  export default ChatBoard;