const Help = () => {

  const handleShowHelp = () => {
    const modal = document.querySelector<HTMLDivElement>('.modal');
    const helpBtn = document.querySelector<HTMLElement>('.fa-question');
    helpBtn!.style.visibility = "hidden";
    modal!.style.transform = 'scale(1)';
    modal!.style.opacity = '1';
  }

  const handleCloseHelp = () => {
    const modal = document.querySelector<HTMLDivElement>('.modal');
    const helpBtn = document.querySelector<HTMLElement>('.fa-question');
    helpBtn!.style.visibility = "visible";
    modal!.classList.remove('activeModal');
    modal!.style.transform = 'scale(0)';
    modal!.style.opacity = '0';
  }

  return (
    <section className="help">
      <i className="fa fa-question" aria-hidden="true" title="How to play?" onClick={handleShowHelp}></i>
      <div className="modal">
        <h2>How to play?</h2>
        <p>Game is played in 5 rounds.</p>
        <p>Survive as long as you can, the longer you are on the board, the more points you get.</p>
        <p>Dodge walls, own trails and other players.</p>
        <p>Smash your enemies, blocking their way.</p>
        <p>The player with the most points wins.</p>
        <p>Winner take everything!</p>
        <h3>Controls</h3>
        <ol>
          <li>RedPlayer &lt; W, S ,A ,D &gt;</li>
          <li>GreenPlayer &lt; &#8679; ,&#8681; ,&#8678; , &#8680; &gt;</li>
          <li>BluePlayer &lt; I, K, J, L &gt;</li>
          <li>YellowPlayer &lt; NUM8, NUM5, NUM4, NUM6 &gt;</li>
        </ol>
        <i className="fa fa-times close" aria-hidden="true" onClick={handleCloseHelp}></i>
      </div>
    </section>

  );
}

export default Help;
