import fs from 'fs';
let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');
if (!content.includes('ふたりでチャレンジ')) {
  content = content.replace("</Layout>", "  <div className=\"mt-8 text-center\">\n        <Link to=\"/together\" className=\"inline-flex items-center gap-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-4 rounded-full font-black text-xl btn-3d shadow-lg hover:scale-105 transition-transform\">\n          ✨ ふたりでチャレンジ！ ✨\n        </Link>\n      </div>\n    </Layout>");
  fs.writeFileSync('src/pages/Home.tsx', content);
}
