import re

with open("/Users/a1234/.verdent/verdent-projects/sanrio-chinese-learning/src/pages/UnitPage.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# buildPuzzleQuestions: modify to use similarKanji
text = re.sub(
    r"function buildPuzzleQuestions\(kanji: KanjiItem\[\], total: number\): Question\[\] \{.*?return out;\n\}",
    """function buildPuzzleQuestions(kanji: KanjiItem[], total: number): Question[] {
  const out: Question[] = [];
  if (!kanji.length) return out;
  const fillers = kanji.map((k) => k.ja);
  for (let i = 0; i < total; i++) {
    const t = kanji[i % kanji.length];
    
    // Attempt to match with similarKanji meaning if possible, else random
    // But similarKanji are hanzi strings. We just provide 4 options of ja meanings.
    let wrong = kanji.filter((k) => k.hanzi !== t.hanzi).map((k) => k.ja);
    wrong = wrong.slice(0, 3);
    while (wrong.length < 3) wrong.push(fillers[Math.floor(Math.random() * fillers.length)] || 'ダミー');
    
    out.push({ kind: 'puzzle', prompt: `「${t.hanzi}」の意味は？`, options: shuffle([t.ja, ...wrong]), answer: t.ja });
  }
  return out;
}""",
    text,
    flags=re.DOTALL
)

# buildFillQuestions: show conversation context
text = re.sub(
    r"function buildFillQuestions\(conversation: ConversationItem\[\], total: number\): Question\[\] \{.*?return out;\n\}",
    """function buildFillQuestions(conversation: ConversationItem[], total: number): Question[] {
  const out: Question[] = [];
  if (!conversation.length) return out;
  
  for (let i = 0; i < total; i++) {
    const line = conversation[i % conversation.length];
    
    const parts = line.zh.split(' ');
    if (parts.length < 2) {
      out.push({ kind: 'fill', prompt: line.ja, options: shuffle([line.zh, '你好', '谢谢', '对不起']), answer: line.zh });
      continue;
    }
    
    const hideIndex = Math.floor(Math.random() * parts.length);
    const hiddenWord = parts[hideIndex];
    const promptText = parts.map((p, idx) => idx === hideIndex ? '（___）' : p).join(' ');
    const displayPrompt = `${line.speaker ? line.speaker + ': ' : ''}${promptText}\\n(${line.ja})`;

    const allWords = conversation.flatMap(c => c.zh.split(' '));
    let wrong = allWords.filter(w => w !== hiddenWord);
    wrong = shuffle(Array.from(new Set(wrong))).slice(0, 3);
    while (wrong.length < 3) wrong.push('的');

    out.push({ kind: 'fill', prompt: displayPrompt, options: shuffle([hiddenWord, ...wrong]), answer: hiddenWord });
  }
  return out;
}""",
    text,
    flags=re.DOTALL
)

# Add speech bubbles before sections
text = text.replace('<h3 className="text-xl font-black text-pink-600 mb-4">拼音コーナー</h3>', 
'<div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 border-2 border-pink-200">{guideByKey(unit.guide)}</div><div className="bg-white px-4 py-2 rounded-2xl border-2 border-pink-200 font-bold text-sm relative after:absolute after:right-full after:top-1/2 after:-translate-y-1/2 after:border-8 after:border-transparent after:border-r-pink-200">一緒に発音してみよう！</div></div><h3 className="text-xl font-black text-pink-600 mb-4">拼音コーナー</h3>')

text = text.replace('<h3 className="text-xl font-black text-blue-600 mb-4">漢字コーナー</h3>', 
'<div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 border-2 border-blue-200">{guideByKey(unit.guide)}</div><div className="bg-white px-4 py-2 rounded-2xl border-2 border-blue-200 font-bold text-sm relative after:absolute after:right-full after:top-1/2 after:-translate-y-1/2 after:border-8 after:border-transparent after:border-r-blue-200">新しい漢字を覚えよう！</div></div><h3 className="text-xl font-black text-blue-600 mb-4">漢字コーナー</h3>')

text = text.replace('<h3 className="text-xl font-black text-yellow-700 mb-4">かいわコーナー</h3>', 
'<div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 border-2 border-yellow-200">{guideByKey(unit.guide)}</div><div className="bg-white px-4 py-2 rounded-2xl border-2 border-yellow-200 font-bold text-sm relative after:absolute after:right-full after:top-1/2 after:-translate-y-1/2 after:border-8 after:border-transparent after:border-r-yellow-200">実際に使ってみよう！</div></div><h3 className="text-xl font-black text-yellow-700 mb-4">かいわコーナー</h3>')

text = text.replace('<h2 className="text-2xl font-black text-purple-600 mb-6 flex items-center gap-3">', 
'<div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 border-2 border-purple-200">{guideByKey(unit.guide)}</div><div className="bg-white px-4 py-2 rounded-2xl border-2 border-purple-200 font-bold text-sm relative after:absolute after:right-full after:top-1/2 after:-translate-y-1/2 after:border-8 after:border-transparent after:border-r-purple-200">準備はいい？チャレンジタイム！</div></div><h2 className="text-2xl font-black text-purple-600 mb-6 flex items-center gap-3">')

# Enhance Result Screen Stats
text = text.replace('<p className="font-bold text-slate-600 mb-4">{resultPass ? \'クリア！すごい！\' : \'もう一回チャレンジ！\'}</p>',
'''<div className="text-2xl font-black mb-4">
  {score === totalQuestions ? <span className="text-pink-500">すごい！完璧！✨</span> : 
   score >= totalQuestions * 0.8 ? <span className="text-orange-500">よくできた！もうちょっとで満点！</span> :
   resultPass ? <span className="text-blue-500">クリア！よくがんばったね！</span> :
   <span className="text-slate-500">がんばった！復習してもう一回チャレンジ！</span>}
</div>
{unit.kanji.length > 0 && (
  <div className="my-6 p-4 bg-white rounded-2xl border-2 border-yellow-200">
    <p className="font-bold text-slate-500 text-sm mb-2">学んだ漢字のおさらい</p>
    <div className="flex flex-wrap justify-center gap-3">
      {unit.kanji.map(k => <span key={k.hanzi} className="text-3xl font-black text-slate-700">{k.hanzi}</span>)}
    </div>
  </div>
)}
''')

# Enhance pinyin UI to show hints and examples
text = re.sub(
    r'<div className="text-3xl font-black text-pink-600 mb-1">\{item\.value\}</div>\s*<div className="text-sm font-bold text-slate-500">\{item\.kana\}</div>',
    """<div className="text-3xl font-black text-pink-600 mb-1">{item.value}</div>
                <div className="text-sm font-bold text-slate-500 mb-2">{item.kana}</div>
                {item.hint && <div className="text-[10px] text-pink-500 bg-pink-50 rounded p-1 mb-1 leading-tight">{item.hint}</div>}
                {item.examples && item.examples.length > 0 && <div className="text-[11px] font-bold text-slate-600">{item.examples.join(' ')}</div>}""",
    text
)

# Enhance kanji UI to show radical and mnemonics
text = re.sub(
    r'<div className="text-4xl font-black text-blue-600 mb-2">\{item\.hanzi\}</div>\s*<div className="text-sm font-bold text-slate-500">\{item\.pinyin\}</div>\s*<div className="text-sm font-bold text-slate-700 mt-1">\{item\.ja\}</div>',
    """<div className="text-4xl font-black text-blue-600 mb-2 relative">
                  {item.hanzi}
                  {item.radical && <span className="absolute -top-2 -right-2 text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">{item.radical}</span>}
                </div>
                <div className="text-sm font-bold text-slate-500">{item.pinyin}</div>
                <div className="text-sm font-bold text-slate-700 mt-1 mb-2">{item.ja}</div>
                {item.mnemonicJa && <div className="text-[10px] text-left text-blue-500 bg-blue-50 rounded p-1.5 leading-tight">{item.mnemonicJa}</div>}""",
    text
)

# Enhance conversation UI to show speaker and notes
text = re.sub(
    r'<div className="text-lg font-black text-slate-700 mb-1">\{line\.zh\}</div>\s*<div className="text-xs font-bold text-slate-500">\{line\.ja\}</div>',
    """{line.speaker && <div className="text-[10px] font-black text-yellow-600 mb-1">{line.speaker}</div>}
                    <div className="text-lg font-black text-slate-700 mb-1">{line.zh}</div>
                    <div className="text-xs font-bold text-slate-500">{line.ja}</div>
                    {line.note && <div className="mt-2 text-[10px] text-yellow-700 bg-yellow-100 rounded px-2 py-1 leading-tight">{line.note}</div>}""",
    text
)


# Test unit cross unit questions
text = re.sub(
    r"const mixedQuestions = \[\];",
    """const mixedQuestions = [];
  if (unit?.isTest) {
    const allKanji = units.filter(u => u.id < unit.id).flatMap(u => u.kanji);
    const allConvos = units.filter(u => u.id < unit.id).flatMap(u => u.conversation);
    const p = buildPuzzleQuestions(allKanji, totalQuestions);
    const f = buildFillQuestions(allConvos, totalQuestions);
    const o = buildOrderQuestions(allConvos, totalQuestions);
    for (let i = 0; i < totalQuestions; i++) {
      if (i % 3 === 0) mixedQuestions.push(p[i % p.length]);
      else if (i % 3 === 1) mixedQuestions.push(f[i % f.length]);
      else mixedQuestions.push(o[i % o.length]);
    }
  }""",
    text
)

# test 15 question total for unit 15
text = text.replace("const totalQuestions = unit?.isTest ? 10 : 5;", "const totalQuestions = unit?.id === 15 ? 15 : (unit?.isTest ? 10 : 5);")

with open("/Users/a1234/.verdent/verdent-projects/sanrio-chinese-learning/src/pages/UnitPage.tsx", "w", encoding="utf-8") as f:
    f.write(text)

