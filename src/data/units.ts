export type UnitGuide = 'kitty' | 'melody' | 'cinnamoroll' | 'pompompurin' | 'kuromi' | 'pochacco';
export type UnitGameType = 'memory' | 'tone' | 'puzzle' | 'hunt' | 'fill' | 'order';

export interface PinyinItem {
  value: string;
  kana: string;
  tipJa: string;
  difficulty: 1 | 2 | 3;
  letter: string;
  hint: string;
  examples: string;
}

export interface KanjiItem {
  hanzi: string;
  pinyin: string;
  ja: string;
  en: string;
  strokes: number;
  difficulty: 1 | 2 | 3;
  char: string;
  radical: string;
  mnemonicJa: string;
}

export interface ConversationItem {
  id: string;
  scene: string;
  zh: string;
  en: string;
  ja: string;
  difficulty: 1 | 2 | 3;
  keywords: string[];
  speaker?: string;
  note?: string;
}

export interface Unit {
  id: number;
  chapter: 1 | 2 | 3;
  titleJa: string;
  titleZh: string;
  guide: UnitGuide;
  pinyin: PinyinItem[];
  kanji: KanjiItem[];
  conversation: ConversationItem[];
  gameType: UnitGameType;
  isTest: boolean;
  stars: 1 | 2 | 3;
}

const p = (value: string, kana: string, tipJa: string, difficulty: 1 | 2 | 3, hint: string, examples: string): PinyinItem => ({ value, kana, tipJa, difficulty, letter: value, hint, examples });
const WORD_EN: Record<string, string> = {
  你: 'you',
  好: 'good',
  我: 'I / me',
  是: 'am / is / are',
  叫: 'be called',
  什: 'what',
  么: 'question ending',
  名: 'name',
  字: 'character',
  人: 'person',
  日: 'day / sun',
  本: 'origin / book',
  中: 'middle / China',
  国: 'country',
  一: 'one',
  二: 'two',
  三: 'three',
  四: 'four',
  五: 'five',
  六: 'six',
  七: 'seven',
  八: 'eight',
  九: 'nine',
  十: 'ten',
  爸: 'dad',
  妈: 'mom',
  哥: 'older brother',
  姐: 'older sister',
  弟: 'younger brother',
  妹: 'younger sister',
  红: 'red',
  黄: 'yellow',
  蓝: 'blue',
  绿: 'green',
  白: 'white',
  黑: 'black',
  猫: 'cat',
  狗: 'dog',
  鸟: 'bird',
  鱼: 'fish',
  马: 'horse',
  兔: 'rabbit',
  吃: 'eat',
  喝: 'drink',
  饭: 'rice / meal',
  菜: 'food / dish',
  水: 'water',
  茶: 'tea',
  肉: 'meat',
  蛋: 'egg',
  天: 'sky / weather',
  大: 'big',
  小: 'small',
  冷: 'cold',
  热: 'hot',
  雨: 'rain',
  雪: 'snow',
  买: 'buy',
  多: 'many',
  少: 'few / little',
  钱: 'money',
  贵: 'expensive',
  要: 'want / need',
  去: 'go',
  在: 'be at',
  哪: 'where / which',
  里: 'inside',
  左: 'left',
  右: 'right',
  前: 'front / before',
  老: 'old',
  师: 'teacher',
  书: 'book',
  写: 'write',
  读: 'read',
  学: 'study / learn',
  校: 'school',
};

const PHRASE_EN: Record<string, string> = {
  'u1-1': 'Hello!',
  'u1-2': 'Hello, Yuna!',
  'u1-3': 'Hello, May!',
  'u1-4': 'Hello, everyone!',
  'u2-1': 'Hello! What is your name?',
  'u2-2': 'Hello! My name is May.',
  'u2-3': 'Hello, May! My name is Yuna.',
  'u2-4': 'Nice to meet you!',
  'u3-1': 'Where are you from?',
  'u3-2': 'I am Japanese.',
  'u3-3': 'Is Yuna Chinese?',
  'u3-4': 'No, I am Japanese.',
  'u4-1': 'How old are you?',
  'u4-2': 'I am nine years old.',
  'u4-3': 'How old is Yuna?',
  'u4-4': 'I am twelve years old.',
  'u5-1': 'What is your name?',
  'u5-2': 'My name is Yuna.',
  'u5-3': 'Where are you from?',
  'u5-4': 'I am Japanese.',
  'u6-1': 'This is my mom.',
  'u6-2': 'Do you have an older brother?',
  'u6-3': 'Does Yuna have an older sister?',
  'u6-4': 'No, I do not.',
  'u7-1': 'What color do you like?',
  'u7-2': 'I like pink.',
  'u7-3': 'Does May like blue?',
  'u7-4': 'I like red.',
  'u8-1': 'What animal do you like?',
  'u8-2': 'I like cats.',
  'u8-3': 'Does Yuna like dogs?',
  'u8-4': 'I like cats too.',
  'u9-1': 'What do you want to eat?',
  'u9-2': 'I want to eat rice.',
  'u9-3': 'What does May want to drink?',
  'u9-4': 'I want to drink tea.',
  'u9-5': 'Delicious!',
  'u10-1': 'Do you have an older brother?',
  'u10-2': 'Yuna likes pink.',
  'u10-3': 'I like cats.',
  'u10-4': 'What does May want to eat?',
  'u11-1': 'How is the weather today?',
  'u11-2': 'It is very hot today.',
  'u11-3': 'Yuna, will it be cold tomorrow?',
  'u11-4': 'It will rain tomorrow.',
  'u12-1': 'How much is this?',
  'u12-2': 'Too expensive!',
  'u12-3': 'A little cheaper, please.',
  'u12-4': 'What does May want to buy?',
  'u13-1': 'Excuse me, where is the school?',
  'u13-2': 'Go left.',
  'u13-3': 'Where is Yuna going?',
  'u13-4': 'I am going to the shop.',
  'u14-1': 'Hello, teacher!',
  'u14-2': 'What is this?',
  'u14-3': 'I do not understand.',
  'u14-4': 'May, please read this.',
  'u15-1': 'What is your name?',
  'u15-2': 'My name is May.',
  'u15-3': 'How much is this?',
  'u15-4': 'Too expensive!',
  'u15-5': 'Excuse me, where is the school?',
};

const UNIT_TITLE_EN: Record<number, string> = {
  1: 'Hello!',
  2: 'My Name Is...',
  3: 'I Am Japanese',
  4: 'How Old Are You?',
  5: 'Chapter 1 Review',
  6: 'Family',
  7: 'Colors',
  8: 'Animals',
  9: 'Food',
  10: 'Chapter 2 Review',
  11: 'Weather',
  12: 'Shopping',
  13: 'Asking Directions',
  14: 'At School',
  15: 'Final Review',
};

const k = (hanzi: string, pinyin: string, ja: string, strokes: number, difficulty: 1 | 2 | 3, radical: string, mnemonicJa: string): KanjiItem => ({ hanzi, pinyin, ja, en: WORD_EN[hanzi] ?? ja, strokes, difficulty, char: hanzi, radical, mnemonicJa });
const c = (id: string, scene: string, zh: string, ja: string, difficulty: 1 | 2 | 3, note?: string): ConversationItem => ({ id, scene, zh, en: PHRASE_EN[id] ?? ja, ja, difficulty, keywords: [scene, zh, PHRASE_EN[id] ?? ja, ja], note });

export const units: Unit[] = [
  {
    id: 1, chapter: 1, titleJa: 'こんにちは！', titleZh: '你好！', guide: 'kitty',
    pinyin: [
      p('a', 'ア', '口を大きく開ける', 1, '「あ」より口を大きく開ける', '爸(bà)、妈(mā)'),
      p('o', 'オ', '丸い口のオ', 1, '「お」に似ているが唇をもっと丸くする', '我(wǒ)、播(bō)'),
      p('e', 'ウァ', 'のどからやさしく', 1, '口を半開きにして喉から「あ」と「お」の中間のような音を出す', '车(chē)、喝(hē)'),
      p('i', 'イ', '細く長いイ', 1, '唇を左右に引いて「い」と言う', '比(bǐ)、你(nǐ)'),
      p('u', 'ウ', '唇を丸める', 1, '唇を丸く突き出して「う」と言う', '不(bù)、出(chū)'),
      p('ü', 'ユ', '口を前に出してユ', 1, '「い」の口の形で「う」と言う', '女(nǚ)、绿(lǜ)')
    ],
    kanji: [
      k('你', 'ni3', 'あなた', 7, 1, '人', '人があなたの横にいる→「あなた」'),
      k('好', 'hao3', 'よい', 6, 1, '女', '「女」と「子」→お母さんが子供を抱く姿=「好き」'),
      k('我', 'wo3', 'わたし', 7, 1, '手', '手に武器を持つ形→「わたし」が守る'),
      k('是', 'shi4', 'です', 9, 1, '日', '太陽(日)がまっすぐ進む→「正しい/〜である」')
    ],
    conversation: [
      c('u1-1', 'あいさつ', '你好！', 'こんにちは！', 1),
      c('u1-2', 'あいさつ', '你好 Yuna！', 'こんにちはYuna！', 1),
      c('u1-3', 'あいさつ', '你好 May！', 'こんにちはMay！', 1),
      c('u1-4', 'あいさつ', '大家 好！', 'みんなこんにちは！', 1)
    ],
    gameType: 'memory', isTest: false, stars: 1
  },
  {
    id: 2, chapter: 1, titleJa: 'わたしは...', titleZh: '我叫...', guide: 'melody',
    pinyin: [
      p('b', 'ブ', '軽くはじくb', 1, '両唇を閉じてからパッと開く', '爸(bà)、不(bù)'),
      p('p', 'プ', '息を強く出すp', 1, '両唇を閉じてから息を強く吐き出す', '怕(pà)、排(pái)'),
      p('m', 'ム', '唇を閉じるm', 1, '両唇を閉じて鼻から息を出す', '妈(mā)、猫(māo)'),
      p('f', 'フ', '上歯と下唇f', 1, '上の歯を下唇に軽く当てて息を出す', '饭(fàn)、发(fā)')
    ],
    kanji: [
      k('叫', 'jiao4', '～と呼ぶ', 5, 1, '口', '口で大きな声を出す→「叫ぶ/呼ぶ」'),
      k('什', 'shen2', 'なに', 4, 1, '人', '人が10人集まる→「なに」かがある'),
      k('么', 'me', '語尾', 3, 1, '丿', '小さなもの→疑問詞の語尾'),
      k('名', 'ming2', '名前', 6, 1, '口', '夕暮れに口で呼ぶ→「名前」'),
      k('字', 'zi4', '字', 6, 1, '子', '家(宀)の中で子供(子)が育つ→「文字」が増える')
    ],
    conversation: [
      c('u2-1', '自己紹介', '你好！ 你 叫 什么 名字？', 'こんにちは！お名前は？', 1),
      c('u2-2', '自己紹介', '你好！ 我 叫 May。', 'こんにちは！Mayです。', 1, '「叫」は名前を言うとき使う'),
      c('u2-3', '自己紹介', '你好 May！ 我 叫 Yuna。', 'こんにちは！Yunaです。', 1),
      c('u2-4', '自己紹介', '认识 你 很 高兴！', 'お会いできてうれしいです！', 1, '初対面のあいさつ')
    ],
    gameType: 'memory', isTest: false, stars: 1
  },
  {
    id: 3, chapter: 1, titleJa: 'わたしは日本人です', titleZh: '我是日本人', guide: 'melody',
    pinyin: [
      p('d', 'ド', '舌先を上歯ぐきへ', 1, '舌先を上の歯茎につけて離す', '大(dà)、的(de)'),
      p('t', 'ト', '息を強く出すt', 1, 'dと同じ口で息を強く吐き出す', '他(tā)、天(tiān)'),
      p('n', 'ヌ', '鼻に抜くn', 1, '舌先を上の歯茎につけて鼻から音を出す', '你(nǐ)、女(nǚ)'),
      p('l', 'ル', '舌を軽く弾くl', 1, '舌先を上の歯茎につけてから弾く', '来(lái)、老(lǎo)')
    ],
    kanji: [
      k('人', 'ren2', '人', 2, 1, '人', '人が横から歩いている形'),
      k('日', 'ri4', '日', 4, 1, '日', '太陽の形'),
      k('本', 'ben3', '本', 5, 1, '木', '木の下のほう(根元)→「根本/本」'),
      k('中', 'zhong1', '中', 4, 1, '丨', '的の真ん中に矢が当たる→「中」'),
      k('国', 'guo2', '国', 8, 1, '囗', '囲い(囗)の中に玉(王)がある→「国」')
    ],
    conversation: [
      c('u3-1', '出身', '你 是 哪里 人？', 'どこの人ですか？', 1),
      c('u3-2', '出身', '我 是 日本人。', 'わたしは日本人です。', 1),
      c('u3-3', '出身', 'Yuna 是 中国人 吗？', 'Yunaは中国人ですか？', 1, '文末の「吗」で疑問文になる'),
      c('u3-4', '出身', '不， 我 是 日本人。', 'いいえ、わたしは日本人です。', 1)
    ],
    gameType: 'order', isTest: false, stars: 1
  },
  {
    id: 4, chapter: 1, titleJa: '何歳？', titleZh: '几岁？', guide: 'kitty',
    pinyin: [
      p('ˉ', '一声', '高く平ら', 1, '高い音のまま真っ直ぐ伸ばす', '妈(mā)'),
      p('ˊ', '二声', '上がる音', 1, '中くらいの高さから一気に引き上げる', '麻(má)'),
      p('ˇ', '三声', '下がって上がる', 2, '低く抑えてから少し上がる', '马(mǎ)'),
      p('ˋ', '四声', '強く下げる', 1, '高いところから一気に下げる', '骂(mà)')
    ],
    kanji: [
      k('一', 'yi1', '1', 1, 1, '一', '横線一本'),
      k('二', 'er4', '2', 2, 1, '二', '横線二本'),
      k('三', 'san1', '3', 3, 1, '一', '横線三本'),
      k('四', 'si4', '4', 5, 1, '囗', '息を4方に分ける形'),
      k('五', 'wu3', '5', 4, 1, '二', '天と地の間に交差する形'),
      k('六', 'liu4', '6', 4, 1, '八', 'テントの形'),
      k('七', 'qi1', '7', 2, 1, '一', '十字に切る形'),
      k('八', 'ba1', '8', 2, 1, '八', '二つに分かれる形'),
      k('九', 'jiu3', '9', 2, 1, '乙', '曲がりくねる形'),
      k('十', 'shi2', '10', 2, 1, '十', '縦と横の線が交わる形')
    ],
    conversation: [
      c('u4-1', '年齢', '你 几 岁？', '何歳ですか？', 1, '「几」は10以下の数を尋ねる時に使う'),
      c('u4-2', '年齢', '我 九 岁。', 'わたしは9歳です。', 1),
      c('u4-3', '年齢', 'Yuna 几 岁？', 'Yunaは何歳？', 1),
      c('u4-4', '年齢', '我 十二 岁。', 'わたしは12歳です。', 1)
    ],
    gameType: 'tone', isTest: false, stars: 1
  },
  {
    id: 5, chapter: 1, titleJa: '第一章テスト', titleZh: '第一章测试', guide: 'kitty',
    pinyin: [
      p('a', 'ア', '第一章復習', 1, '総復習', '爸(bà)'),
      p('b', 'ブ', '第一章復習', 1, '総復習', '不(bù)'),
      p('d', 'ド', '第一章復習', 1, '総復習', '大(dà)'),
      p('ˋ', '四声', '第一章復習', 1, '総復習', '是(shì)')
    ],
    kanji: [
      k('你', 'ni3', 'あなた', 7, 1, '人', '総復習'),
      k('名', 'ming2', '名前', 6, 1, '口', '総復習'),
      k('人', 'ren2', '人', 2, 1, '人', '総復習'),
      k('九', 'jiu3', '9', 2, 1, '乙', '総復習')
    ],
    conversation: [
      c('u5-1', 'テスト', '你 叫 什么 名字？', 'お名前は？', 1),
      c('u5-2', 'テスト', '我 叫 Yuna。', 'わたしはYunaです。', 1),
      c('u5-3', 'テスト', '你 是 哪里 人？', 'どこの人ですか？', 1),
      c('u5-4', 'テスト', '我 是 日本人。', 'わたしは日本人です。', 1)
    ],
    gameType: 'fill', isTest: true, stars: 1
  },
  {
    id: 6, chapter: 2, titleJa: 'かぞく', titleZh: '家人', guide: 'cinnamoroll',
    pinyin: [
      p('g', 'グ', '喉の奥でg', 2, '舌の付け根を喉の奥につけて離す', '哥(gē)、狗(gǒu)'),
      p('k', 'ク', '息強めk', 2, 'gと同じ口で息を強く吐き出す', '看(kàn)、渴(kě)'),
      p('h', 'ハ', '喉からh', 2, '喉の奥から摩擦させるように息を出す', '好(hǎo)、喝(hē)')
    ],
    kanji: [
      k('爸', 'ba4', 'お父さん', 8, 2, '父', '「父」＋音符「巴」'),
      k('妈', 'ma1', 'お母さん', 6, 2, '女', '「女」＋音符「马」'),
      k('哥', 'ge1', '兄', 10, 2, '口', '「可」が二つで歌を歌う(昔の長男の役割)'),
      k('姐', 'jie3', '姉', 8, 2, '女', '「女」＋音符「且」'),
      k('弟', 'di4', '弟', 7, 2, '弓', 'ひもを巻きつける形'),
      k('妹', 'mei4', '妹', 8, 2, '女', '「女」＋音符「未」(まだ成長していない)')
    ],
    conversation: [
      c('u6-1', '家族', '这 是 我 妈妈。', 'これはわたしのママです。', 2),
      c('u6-2', '家族', '你 有 哥哥 吗？', 'お兄さんはいますか？', 2),
      c('u6-3', '家族', 'Yuna 有 姐姐 吗？', 'Yunaはお姉さんいる？', 2, '「有」は持っている・いるという意味'),
      c('u6-4', '家族', '没有。', 'いません。', 2, '「有」の否定は必ず「没」')
    ],
    gameType: 'hunt', isTest: false, stars: 2
  },
  {
    id: 7, chapter: 2, titleJa: 'いろ', titleZh: '颜色', guide: 'pompompurin',
    pinyin: [
      p('j', 'ジ', '舌を前に', 2, '舌の面を上あごにつけて離す', '叫(jiào)、鸡(jī)'),
      p('q', 'チ', '息強めq', 2, 'jと同じ口で息を強く吐き出す', '七(qī)、钱(qián)'),
      p('x', 'シ', '息を擦るx', 2, '舌の面を上あごに近づけて隙間から息を出す', '小(xiǎo)、写(xiě)')
    ],
    kanji: [
      k('红', 'hong2', '赤', 6, 2, '纟', '「糸」＋音符「工」'),
      k('黄', 'huang2', '黄', 11, 2, '黄', '光り輝く玉の形'),
      k('蓝', 'lan2', '青', 13, 2, '艹', '「草」＋音符「监」'),
      k('绿', 'lv4', '緑', 11, 2, '纟', '「糸」＋音符「录」'),
      k('白', 'bai2', '白', 5, 2, '白', 'どんぐりの形、または太陽の光'),
      k('黑', 'hei1', '黒', 12, 2, '黑', 'すすで黒くなった窓の形')
    ],
    conversation: [
      c('u7-1', '色', '你 喜欢 什么 颜色？', 'どんな色が好き？', 2),
      c('u7-2', '色', '我 喜欢 粉色。', 'ピンクが好き。', 2),
      c('u7-3', '色', 'May 喜欢 蓝色 吗？', 'Mayは青色が好き？', 2),
      c('u7-4', '色', '我 喜欢 红色。', 'わたしは赤色が好き。', 2)
    ],
    gameType: 'memory', isTest: false, stars: 2
  },
  {
    id: 8, chapter: 2, titleJa: 'どうぶつ', titleZh: '动物', guide: 'cinnamoroll',
    pinyin: [
      p('zh', 'ヂ', '巻き舌zh', 2, '舌先を反らせて上あごにつけて離す', '这(zhè)、中(zhōng)'),
      p('ch', 'チ', '巻き舌ch', 2, 'zhと同じ口で息を強く吐き出す', '吃(chī)、茶(chá)'),
      p('sh', 'シ', '巻き舌sh', 2, '舌先を反らせて隙間から息を出す', '是(shì)、十(shí)'),
      p('r', 'ル', '巻き舌r', 2, 'shの口で声を出す', '人(rén)、日(rì)')
    ],
    kanji: [
      k('猫', 'mao1', 'ねこ', 11, 2, '犭', '「けものへん」＋音符「苗」'),
      k('狗', 'gou3', 'いぬ', 8, 2, '犭', '「けものへん」＋音符「句」'),
      k('鸟', 'niao3', 'とり', 5, 2, '鸟', '鳥の形'),
      k('鱼', 'yu2', 'さかな', 8, 2, '鱼', '魚の形'),
      k('马', 'ma3', 'うま', 3, 2, '马', '馬の形'),
      k('兔', 'tu4', 'うさぎ', 8, 2, '儿', 'うさぎの形(点は短いしっぽ)')
    ],
    conversation: [
      c('u8-1', '動物', '你 喜欢 什么 动物？', 'どんな動物が好き？', 2),
      c('u8-2', '動物', '我 喜欢 猫。', 'わたしは猫が好き。', 2),
      c('u8-3', '動物', 'Yuna 喜欢 狗 吗？', 'Yunaは犬が好き？', 2),
      c('u8-4', '動物', '我 也 喜欢 猫。', 'わたしも猫が好き。', 2, '「也」は「〜も」という意味')
    ],
    gameType: 'puzzle', isTest: false, stars: 2
  },
  {
    id: 9, chapter: 2, titleJa: 'たべもの', titleZh: '吃东西', guide: 'pompompurin',
    pinyin: [
      p('z', 'ズ', '平舌z', 2, '舌先を前歯の裏につけて離す', '在(zài)、早(zǎo)'),
      p('c', 'ツ', '息強めc', 2, 'zと同じ口で息を強く吐き出す', '菜(cài)、草(cǎo)'),
      p('s', 'ス', '平舌s', 2, '舌先を前歯の裏に近づけて隙間から息を出す', '四(sì)、三(sān)')
    ],
    kanji: [
      k('吃', 'chi1', '食べる', 6, 2, '口', '「口」＋音符「乞」'),
      k('喝', 'he1', '飲む', 12, 2, '口', '「口」＋音符「曷」'),
      k('饭', 'fan4', 'ごはん', 7, 2, '饣', '「食へん」＋音符「反」'),
      k('菜', 'cai4', '料理', 11, 2, '艹', '「草かんむり」＋音符「采」'),
      k('水', 'shui3', '水', 4, 2, '水', '流れる水の形'),
      k('茶', 'cha2', 'お茶', 9, 2, '艹', '「草かんむり」＋人＋木'),
      k('肉', 'rou4', '肉', 6, 2, '肉', '肉の筋の形'),
      k('蛋', 'dan4', '卵', 11, 2, '虫', '虫(動物)が産むもの')
    ],
    conversation: [
      c('u9-1', '食事', '你 想 吃 什么？', '何を食べたい？', 2, '「想」は「〜したい」という願望'),
      c('u9-2', '食事', '我 想 吃 饭。', 'ごはんを食べたい。', 2),
      c('u9-3', '食事', 'May 想 喝 什么？', 'Mayは何を飲みたい？', 2),
      c('u9-4', '食事', '我 想 喝 茶。', 'お茶を飲みたい。', 2),
      c('u9-5', '食事', '好 吃！', 'おいしい！', 2)
    ],
    gameType: 'fill', isTest: false, stars: 2
  },
  {
    id: 10, chapter: 2, titleJa: '第二章テスト', titleZh: '第二章测试', guide: 'cinnamoroll',
    pinyin: [
      p('g', 'グ', '第二章復習', 2, '総復習', '哥(gē)'),
      p('j', 'ジ', '第二章復習', 2, '総復習', '叫(jiào)'),
      p('zh', 'ヂ', '第二章復習', 2, '総復習', '这(zhè)'),
      p('s', 'ス', '第二章復習', 2, '総復習', '四(sì)')
    ],
    kanji: [
      k('妈', 'ma1', 'お母さん', 6, 2, '女', '総復習'),
      k('蓝', 'lan2', '青', 13, 2, '艹', '総復習'),
      k('猫', 'mao1', 'ねこ', 11, 2, '犭', '総復習'),
      k('吃', 'chi1', '食べる', 6, 2, '口', '総復習')
    ],
    conversation: [
      c('u10-1', 'テスト', '你 有 哥哥 吗？', 'お兄さんはいますか？', 2),
      c('u10-2', 'テスト', 'Yuna 喜欢 粉色。', 'Yunaはピンクが好き。', 2),
      c('u10-3', 'テスト', '我 喜欢 猫。', 'わたしは猫が好き。', 2),
      c('u10-4', 'テスト', 'May 想 吃 什么？', 'Mayは何を食べたい？', 2)
    ],
    gameType: 'order', isTest: true, stars: 2
  },
  {
    id: 11, chapter: 3, titleJa: 'てんき', titleZh: '天气', guide: 'kuromi',
    pinyin: [
      p('ai', 'アイ', '複合母音', 2, 'aからiへ滑らかに', '爱(ài)、买(mǎi)'),
      p('ei', 'エイ', '複合母音', 2, 'eからiへ滑らかに', '妹(mèi)、黑(hēi)'),
      p('ao', 'アオ', '複合母音', 2, 'aからoへ滑らかに', '老(lǎo)、好(hǎo)'),
      p('ou', 'オウ', '複合母音', 2, 'oからuへ滑らかに', '狗(gǒu)、肉(ròu)')
    ],
    kanji: [
      k('天', 'tian1', '空', 4, 2, '大', '人の頭の上の大空'),
      k('大', 'da4', '大きい', 3, 2, '大', '人が手を広げた形→「大きい」'),
      k('小', 'xiao3', '小さい', 3, 2, '小', '砂つぶが分かれる形→「小さい」'),
      k('冷', 'leng3', '寒い', 7, 2, '冫', '「にすい(氷)」＋音符「令」'),
      k('热', 're4', '暑い', 10, 2, '灬', '「れっか(火)」＋音符「执」'),
      k('雨', 'yu3', '雨', 8, 2, '雨', '雲から水滴が落ちる形'),
      k('雪', 'xue3', '雪', 11, 2, '雨', '「雨かんむり」＋ヨ(ほうき)→掃ける雨')
    ],
    conversation: [
      c('u11-1', '天気', '今天 天气 怎么样？', '今日の天気はどう？', 2),
      c('u11-2', '天気', '今天 很 热。', '今日はとても暑い。', 2, '形容詞の前の「很」は習慣的につける'),
      c('u11-3', '天気', 'Yuna， 明天 冷 吗？', 'Yuna、明日は寒い？', 2),
      c('u11-4', '天気', '明天 有 雨。', '明日は雨だよ。', 2)
    ],
    gameType: 'memory', isTest: false, stars: 2
  },
  {
    id: 12, chapter: 3, titleJa: 'おかいもの', titleZh: '买东西', guide: 'pochacco',
    pinyin: [
      p('an', 'アン', '複合母音', 3, 'aの後に舌先を歯茎につけてn', '饭(fàn)、看(kàn)'),
      p('en', 'エン', '複合母音', 3, 'eの後に舌先を歯茎につけてn', '本(běn)、人(rén)'),
      p('in', 'イン', '複合母音', 3, 'iの後に舌先を歯茎につけてn', '您(nín)、心(xīn)'),
      p('un', 'ウン', '複合母音', 3, 'uの後に舌先を歯茎につけてn', '春(chūn)、村(cūn)')
    ],
    kanji: [
      k('买', 'mai3', '買う', 6, 3, '乛', '網でお金(貝)を集める形'),
      k('多', 'duo1', '多い', 6, 3, '夕', '肉(夕)が重なる→「多い」'),
      k('少', 'shao3', '少ない', 4, 3, '小', '小からさらに減る→「少ない」'),
      k('钱', 'qian2', 'お金', 10, 3, '钅', '「かねへん」＋音符「戋」'),
      k('贵', 'gui4', '高い', 9, 3, '贝', '「貝(お金)」＋両手→「貴重/高い」'),
      k('要', 'yao4', 'ほしい', 9, 3, '西', '両手を腰に当てる女性→「求める/要る」')
    ],
    conversation: [
      c('u12-1', '買い物', '这个 多少 钱？', 'これはいくら？', 3),
      c('u12-2', '買い物', '太 贵 了！', '高すぎる！', 3, '「太〜了」で「〜すぎる」'),
      c('u12-3', '買い物', '便宜 一点。', 'もう少し安く。', 3),
      c('u12-4', '買い物', 'May 要 买 什么？', 'Mayは何を買うの？', 3)
    ],
    gameType: 'fill', isTest: false, stars: 3
  },
  {
    id: 13, chapter: 3, titleJa: 'みちをきく', titleZh: '问路', guide: 'kuromi',
    pinyin: [
      p('ang', 'アン', '複合母音', 3, 'aの後に口を開けたまま鼻に抜くng', '帮(bāng)、胖(pàng)'),
      p('eng', 'ウン', '複合母音', 3, 'eの後に口を開けたまま鼻に抜くng', '冷(lěng)、等(děng)'),
      p('ing', 'イン', '複合母音', 3, 'iの後に口を開けたまま鼻に抜くng', '听(tīng)、名(míng)'),
      p('ong', 'オン', '複合母音', 3, 'oの後に口を開けたまま鼻に抜くng', '红(hóng)、懂(dǒng)')
    ],
    kanji: [
      k('去', 'qu4', '行く', 5, 3, '厶', '人が土穴から出て行く'),
      k('在', 'zai4', 'ある', 6, 3, '土', '土の上に木がある→「存在する」'),
      k('哪', 'na3', 'どこ', 9, 3, '口', '「口」＋「那(それ)」で疑問'),
      k('里', 'li3', '中', 7, 3, '里', '田と土→村の「中」'),
      k('左', 'zuo3', '左', 5, 3, '工', '左手で工具(工)を持つ'),
      k('右', 'you4', '右', 5, 3, '口', '右手で食べ物を口(口)に運ぶ'),
      k('前', 'qian2', '前', 9, 3, '刀', '舟を進める形')
    ],
    conversation: [
      c('u13-1', '道案内', '请问， 学校 在 哪里？', 'すみません、学校はどこ？', 3, '「在」は場所を示す'),
      c('u13-2', '道案内', '往 左 走。', '左へ進んで。', 3),
      c('u13-3', '道案内', 'Yuna 去 哪里？', 'Yunaはどこへ行くの？', 3),
      c('u13-4', '道案内', '我 去 商店。', 'お店に行きます。', 3)
    ],
    gameType: 'order', isTest: false, stars: 3
  },
  {
    id: 14, chapter: 3, titleJa: 'がっこう', titleZh: '在学校', guide: 'pochacco',
    pinyin: [
      p('zhi', 'ヂー', '整体認読', 3, 'zhのまま伸ばす', '只(zhī)、知(zhī)'),
      p('chi', 'チー', '整体認読', 3, 'chのまま伸ばす', '吃(chī)、迟(chí)'),
      p('shi', 'シー', '整体認読', 3, 'shのまま伸ばす', '是(shì)、十(shí)'),
      p('ri', 'リー', '整体認読', 3, 'rのまま伸ばす', '日(rì)、人(rén)'),
      p('zi', 'ズー', '整体認読', 3, 'zのまま伸ばす', '字(zì)、子(zi)'),
      p('ci', 'ツー', '整体認読', 3, 'cのまま伸ばす', '次(cì)、词(cí)'),
      p('si', 'スー', '整体認読', 3, 'sのまま伸ばす', '四(sì)、死(sǐ)')
    ],
    kanji: [
      k('老', 'lao3', '年上', 6, 3, '老', '髪の長い老人が杖をつく形'),
      k('师', 'shi1', '先生', 6, 3, '巾', '軍隊→転じて専門家「師」'),
      k('书', 'shu1', '本', 4, 3, '乙', '筆で文字を書く形→「書物」'),
      k('写', 'xie3', '書く', 5, 3, '冖', '家(冖)の中に物を移す→「写す/書く」'),
      k('读', 'du2', '読む', 10, 3, '讠', '「ごんべん」＋音符「卖」'),
      k('学', 'xue2', '学ぶ', 8, 3, '子', '子供(子)が屋根の下で交わる(学ぶ)'),
      k('校', 'xiao4', '学校', 10, 3, '木', '「木へん」＋音符「交」')
    ],
    conversation: [
      c('u14-1', '学校', '老师 好！', '先生こんにちは！', 3),
      c('u14-2', '学校', '这 是 什么？', 'これは何？', 3),
      c('u14-3', '学校', '我 不 懂。', 'わかりません。', 3, '「不」は動詞を否定する'),
      c('u14-4', '学校', 'May， 你 读 一下。', 'May、ちょっと読んでみて。', 3)
    ],
    gameType: 'memory', isTest: false, stars: 3
  },
  {
    id: 15, chapter: 3, titleJa: '期末テスト', titleZh: '期末测试', guide: 'kuromi',
    pinyin: [
      p('a', 'ア', '総復習', 3, '総復習', '爸(bà)'),
      p('zh', 'ヂ', '総復習', 3, '総復習', '这(zhè)'),
      p('ang', 'アン', '総復習', 3, '総復習', '帮(bāng)'),
      p('shi', 'シー', '総復習', 3, '総復習', '是(shì)')
    ],
    kanji: [
      k('你', 'ni3', 'あなた', 7, 3, '人', '総復習'),
      k('妈', 'ma1', 'お母さん', 6, 3, '女', '総復習'),
      k('猫', 'mao1', 'ねこ', 11, 3, '犭', '総復習'),
      k('钱', 'qian2', 'お金', 10, 3, '钅', '総復習'),
      k('学', 'xue2', '学ぶ', 8, 3, '子', '総復習')
    ],
    conversation: [
      c('u15-1', 'Boss', '你 叫 什么 名字？', 'お名前は？', 3),
      c('u15-2', 'Boss', '我 叫 May。', 'わたしはMayです。', 3),
      c('u15-3', 'Boss', '这个 多少 钱？', 'これはいくら？', 3),
      c('u15-4', 'Boss', '太 贵 了！', '高すぎる！', 3),
      c('u15-5', 'Boss', '请问， 学校 在 哪里？', '学校はどこ？', 3)
    ],
    gameType: 'fill', isTest: true, stars: 3
  },
];

export function getUnit(id: number): Unit | undefined {
  return units.find((u) => u.id === id);
}

export function getUnitTitleEn(id: number): string {
  return UNIT_TITLE_EN[id] ?? 'English';
}
