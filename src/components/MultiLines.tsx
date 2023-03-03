import { Routes, Route } from 'react-router-dom';
import Lobby from "./lobby/Lobby";
import LocalGame from './local/LocalGame';

const MultiLines = () => {
  return (
    <main>
      <Routes>
        <Route path='*' element={<Lobby />} />
        <Route path='/local' element={<LocalGame />} />
      </Routes>
    </main>
  );
}

export default MultiLines;
