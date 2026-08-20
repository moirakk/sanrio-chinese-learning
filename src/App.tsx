
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UnitPage from './pages/UnitPage';
import MyRoomPage from './pages/MyRoomPage';
import TogetherPage from './pages/TogetherPage';
import ParentPage from './pages/ParentPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unit/:id" element={<UnitPage />} />
        <Route path="/myroom" element={<MyRoomPage />} />
        <Route path="/together" element={<TogetherPage />} />
        <Route path="/parent" element={<ParentPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
