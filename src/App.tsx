
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UnitPage from './pages/UnitPage';
import MyRoomPage from './pages/MyRoomPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unit/:id" element={<UnitPage />} />
        <Route path="/myroom" element={<MyRoomPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
