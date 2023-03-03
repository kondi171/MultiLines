import { useState, useEffect } from 'react';
const Tips = () => {
  const tips = [
    `Stay close to own line, thanks to this, you keep more space to use later.`,
    `The longer you are on the board, the more points you get.`,
    `Block other players escape routes.`,
    `You can stay away of other players, that is good strategy too.`,
    `If you want, you can play alone, and train your skills.`,
    `Survive all five rounds to permamently win.`,
    `Awesome game, don't you?`,
    `Just enjoy the game :)`,
    `Cut out as much space as possible on the board to endure the power for longer.`,
    `If you play alone you have only one round to play, but don't worry you can play again :)`,
  ];

  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const tipsInterval = setInterval(() => {
      setTipIndex(Math.floor(Math.random() * tips.length));
    }, 5000);

    return () => {
      clearInterval(tipsInterval);
    }
  }, [tips.length]);

  return (
    <footer>
      <span className='tips'>{tips[tipIndex]}</span>
    </footer>
  );
}

export default Tips;
