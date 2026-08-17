import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');
if (!content.includes('TogetherPage')) {
  content = content.replace("import MyRoomPage from './pages/MyRoomPage';", "import MyRoomPage from './pages/MyRoomPage';\nimport TogetherPage from './pages/TogetherPage';");
  content = content.replace('<Route path="/myroom" element={<MyRoomPage />} />', '<Route path="/myroom" element={<MyRoomPage />} />\n        <Route path="/together" element={<TogetherPage />} />');
  fs.writeFileSync('src/App.tsx', content);
}
