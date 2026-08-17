
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PinyinPage from './pages/PinyinPage';
import KanjiPage from './pages/KanjiPage';
import ConversationPage from './pages/ConversationPage';
import ChallengePage from './pages/ChallengePage';
import MyRoomPage from './pages/MyRoomPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pinyin" element={<PinyinPage />} />
        <Route path="/kanji" element={<KanjiPage />} />
        <Route path="/conversation" element={<ConversationPage />} />
        <Route path="/challenge" element={<ChallengePage />} />
        <Route path="/myroom" element={<MyRoomPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
