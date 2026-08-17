import type { ConversationItem, KanjiItem, PinyinItem } from '../types';

export type UnitGuide = 'kitty' | 'melody' | 'cinnamoroll' | 'pompompurin' | 'kuromi' | 'pochacco';
export type UnitGameType = 'memory' | 'tone' | 'puzzle' | 'hunt' | 'fill' | 'order';

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

const p = (value: string, kana: string, tipJa: string, difficulty: 1 | 2 | 3): PinyinItem => ({ value, kana, tipJa, difficulty });
const k = (hanzi: string, pinyin: string, ja: string, strokes: number, difficulty: 1 | 2 | 3): KanjiItem => ({ hanzi, pinyin, ja, strokes, difficulty });
const c = (id: string, scene: string, zh: string, ja: string, difficulty: 1 | 2 | 3): ConversationItem => ({ id, scene, zh, ja, difficulty, keywords: [scene, zh, ja] });

export const units: Unit[] = [
  {
    id: 1, chapter: 1, titleJa: 'こんにちは！', titleZh: '你好！', guide: 'kitty',
    pinyin: [p('a', 'ア', '口を大きく開ける', 1), p('o', 'オ', '丸い口のオ', 1), p('e', 'ウァ', 'のどからやさしく', 1), p('i', 'イ', '細く長いイ', 1), p('u', 'ウ', '唇を丸める', 1), p('ü', 'ユ', '口を前に出してユ', 1)],
    kanji: [k('你', 'ni3', 'あなた', 7, 1), k('好', 'hao3', 'よい', 6, 1), k('我', 'wo3', 'わたし', 7, 1), k('是', 'shi4', 'です', 9, 1)],
    conversation: [c('u1-1', 'あいさつ', '你好！', 'こんにちは！', 1), c('u1-2', 'あいさつ', '你好！', 'こんにちは！', 1)],
    gameType: 'memory', isTest: false, stars: 1
  },
  {
    id: 2, chapter: 1, titleJa: 'わたしは...', titleZh: '我叫...', guide: 'melody',
    pinyin: [p('b', 'ブ', '軽くはじくb', 1), p('p', 'プ', '息を強く出すp', 1), p('m', 'ム', '唇を閉じるm', 1), p('f', 'フ', '上歯と下唇f', 1)],
    kanji: [k('叫', 'jiao4', '～と呼ぶ', 5, 1), k('什', 'shen2', 'なに', 4, 1), k('么', 'me', '語尾', 3, 1), k('名', 'ming2', '名前', 6, 1), k('字', 'zi4', '字', 6, 1)],
    conversation: [c('u2-1', '自己紹介', '你 叫 什么 名字？', 'お名前は？', 1), c('u2-2', '自己紹介', '我 叫 美香。', 'わたしは美香です。', 1)],
    gameType: 'memory', isTest: false, stars: 1
  },
  {
    id: 3, chapter: 1, titleJa: 'わたしは日本人です', titleZh: '我是日本人', guide: 'melody',
    pinyin: [p('d', 'ド', '舌先を上歯ぐきへ', 1), p('t', 'ト', '息を強く出すt', 1), p('n', 'ヌ', '鼻に抜くn', 1), p('l', 'ル', '舌を軽く弾くl', 1)],
    kanji: [k('人', 'ren2', '人', 2, 1), k('日', 'ri4', '日', 4, 1), k('本', 'ben3', '本', 5, 1), k('中', 'zhong1', '中', 4, 1), k('国', 'guo2', '国', 8, 1)],
    conversation: [c('u3-1', '出身', '你 是 哪里 人？', 'どこの人ですか？', 1), c('u3-2', '出身', '我 是 日本人。', 'わたしは日本人です。', 1)],
    gameType: 'order', isTest: false, stars: 1
  },
  {
    id: 4, chapter: 1, titleJa: '何歳？', titleZh: '几岁？', guide: 'kitty',
    pinyin: [p('ˉ', '一声', '高く平ら', 1), p('ˊ', '二声', '上がる音', 1), p('ˇ', '三声', '下がって上がる', 2), p('ˋ', '四声', '強く下げる', 1)],
    kanji: [k('一', 'yi1', '1', 1, 1), k('二', 'er4', '2', 2, 1), k('三', 'san1', '3', 3, 1), k('四', 'si4', '4', 5, 1), k('五', 'wu3', '5', 4, 1), k('六', 'liu4', '6', 4, 1), k('七', 'qi1', '7', 2, 1), k('八', 'ba1', '8', 2, 1), k('九', 'jiu3', '9', 2, 1), k('十', 'shi2', '10', 2, 1)],
    conversation: [c('u4-1', '年齢', '你 几 岁？', '何歳ですか？', 1), c('u4-2', '年齢', '我 九 岁。', 'わたしは9歳です。', 1), c('u4-3', '年齢', '我 十二 岁。', 'わたしは12歳です。', 1)],
    gameType: 'tone', isTest: false, stars: 1
  },
  {
    id: 5, chapter: 1, titleJa: '第一章テスト', titleZh: '第一章测试', guide: 'kitty',
    pinyin: [p('a', 'ア', '第一章復習', 1), p('b', 'ブ', '第一章復習', 1), p('d', 'ド', '第一章復習', 1), p('ˋ', '四声', '第一章復習', 1)],
    kanji: [k('你', 'ni3', 'あなた', 7, 1), k('名', 'ming2', '名前', 6, 1), k('人', 'ren2', '人', 2, 1), k('九', 'jiu3', '9', 2, 1)],
    conversation: [c('u5-1', 'テスト', '你 叫 什么 名字？', 'お名前は？', 1), c('u5-2', 'テスト', '我 是 日本人。', 'わたしは日本人です。', 1)],
    gameType: 'fill', isTest: true, stars: 1
  },
  {
    id: 6, chapter: 2, titleJa: 'かぞく', titleZh: '家人', guide: 'cinnamoroll',
    pinyin: [p('g', 'グ', '喉の奥でg', 2), p('k', 'ク', '息強めk', 2), p('h', 'ハ', '喉からh', 2)],
    kanji: [k('爸', 'ba4', 'お父さん', 8, 2), k('妈', 'ma1', 'お母さん', 6, 2), k('哥', 'ge1', '兄', 10, 2), k('姐', 'jie3', '姉', 8, 2), k('弟', 'di4', '弟', 7, 2), k('妹', 'mei4', '妹', 8, 2)],
    conversation: [c('u6-1', '家族', '这 是 我 妈妈。', 'これはわたしのママです。', 2), c('u6-2', '家族', '你 有 哥哥 吗？', 'お兄さんはいますか？', 2)],
    gameType: 'hunt', isTest: false, stars: 2
  },
  {
    id: 7, chapter: 2, titleJa: 'いろ', titleZh: '颜色', guide: 'pompompurin',
    pinyin: [p('j', 'ジ', '舌を前に', 2), p('q', 'チ', '息強めq', 2), p('x', 'シ', '息を擦るx', 2)],
    kanji: [k('红', 'hong2', '赤', 6, 2), k('黄', 'huang2', '黄', 11, 2), k('蓝', 'lan2', '青', 13, 2), k('绿', 'lv4', '緑', 11, 2), k('白', 'bai2', '白', 5, 2), k('黑', 'hei1', '黒', 12, 2)],
    conversation: [c('u7-1', '色', '你 喜欢 什么 颜色？', 'どんな色が好き？', 2), c('u7-2', '色', '我 喜欢 粉色。', 'ピンクが好き。', 2)],
    gameType: 'memory', isTest: false, stars: 2
  },
  {
    id: 8, chapter: 2, titleJa: 'どうぶつ', titleZh: '动物', guide: 'cinnamoroll',
    pinyin: [p('zh', 'ヂ', '巻き舌zh', 2), p('ch', 'チ', '巻き舌ch', 2), p('sh', 'シ', '巻き舌sh', 2), p('r', 'ル', '巻き舌r', 2)],
    kanji: [k('猫', 'mao1', 'ねこ', 11, 2), k('狗', 'gou3', 'いぬ', 8, 2), k('鸟', 'niao3', 'とり', 5, 2), k('鱼', 'yu2', 'さかな', 8, 2), k('马', 'ma3', 'うま', 3, 2), k('兔', 'tu4', 'うさぎ', 8, 2)],
    conversation: [c('u8-1', '動物', '你 喜欢 什么 动物？', 'どんな動物が好き？', 2), c('u8-2', '動物', '我 喜欢 猫。', 'わたしは猫が好き。', 2)],
    gameType: 'puzzle', isTest: false, stars: 2
  },
  {
    id: 9, chapter: 2, titleJa: 'たべもの', titleZh: '吃东西', guide: 'pompompurin',
    pinyin: [p('z', 'ズ', '平舌z', 2), p('c', 'ツ', '息強めc', 2), p('s', 'ス', '平舌s', 2)],
    kanji: [k('吃', 'chi1', '食べる', 6, 2), k('喝', 'he1', '飲む', 12, 2), k('饭', 'fan4', 'ごはん', 7, 2), k('菜', 'cai4', '料理', 11, 2), k('水', 'shui3', '水', 4, 2), k('茶', 'cha2', 'お茶', 9, 2), k('肉', 'rou4', '肉', 6, 2), k('蛋', 'dan4', '卵', 11, 2)],
    conversation: [c('u9-1', '食事', '你 想 吃 什么？', '何を食べたい？', 2), c('u9-2', '食事', '我 想 吃 饭。', 'ごはんを食べたい。', 2), c('u9-3', '食事', '好 吃！', 'おいしい！', 2)],
    gameType: 'fill', isTest: false, stars: 2
  },
  {
    id: 10, chapter: 2, titleJa: '第二章テスト', titleZh: '第二章测试', guide: 'cinnamoroll',
    pinyin: [p('g', 'グ', '第二章復習', 2), p('j', 'ジ', '第二章復習', 2), p('zh', 'ヂ', '第二章復習', 2), p('s', 'ス', '第二章復習', 2)],
    kanji: [k('妈', 'ma1', 'お母さん', 6, 2), k('蓝', 'lan2', '青', 13, 2), k('猫', 'mao1', 'ねこ', 11, 2), k('吃', 'chi1', '食べる', 6, 2)],
    conversation: [c('u10-1', 'テスト', '你 有 哥哥 吗？', 'お兄さんはいますか？', 2), c('u10-2', 'テスト', '我 喜欢 粉色。', 'ピンクが好き。', 2)],
    gameType: 'order', isTest: true, stars: 2
  },
  {
    id: 11, chapter: 3, titleJa: 'てんき', titleZh: '天气', guide: 'kuromi',
    pinyin: [p('ai', 'アイ', '複合母音', 2), p('ei', 'エイ', '複合母音', 2), p('ao', 'アオ', '複合母音', 2), p('ou', 'オウ', '複合母音', 2)],
    kanji: [k('天', 'tian1', '空', 4, 2), k('大', 'da4', '大きい', 3, 2), k('小', 'xiao3', '小さい', 3, 2), k('冷', 'leng3', '寒い', 7, 2), k('热', 're4', '暑い', 10, 2), k('雨', 'yu3', '雨', 8, 2), k('雪', 'xue3', '雪', 11, 2)],
    conversation: [c('u11-1', '天気', '今天 天气 怎么样？', '今日の天気はどう？', 2), c('u11-2', '天気', '今天 很 热。', '今日はとても暑い。', 2)],
    gameType: 'memory', isTest: false, stars: 2
  },
  {
    id: 12, chapter: 3, titleJa: 'おかいもの', titleZh: '买东西', guide: 'pochacco',
    pinyin: [p('an', 'アン', '複合母音', 3), p('en', 'エン', '複合母音', 3), p('in', 'イン', '複合母音', 3), p('un', 'ウン', '複合母音', 3)],
    kanji: [k('买', 'mai3', '買う', 6, 3), k('多', 'duo1', '多い', 6, 3), k('少', 'shao3', '少ない', 4, 3), k('钱', 'qian2', 'お金', 10, 3), k('贵', 'gui4', '高い', 9, 3), k('要', 'yao4', 'ほしい', 9, 3)],
    conversation: [c('u12-1', '買い物', '这个 多少 钱？', 'これはいくら？', 3), c('u12-2', '買い物', '太 贵 了！', '高すぎる！', 3), c('u12-3', '買い物', '便宜 一点。', 'もう少し安く。', 3)],
    gameType: 'fill', isTest: false, stars: 3
  },
  {
    id: 13, chapter: 3, titleJa: 'みちをきく', titleZh: '问路', guide: 'kuromi',
    pinyin: [p('ang', 'アン', '複合母音', 3), p('eng', 'ウン', '複合母音', 3), p('ing', 'イン', '複合母音', 3), p('ong', 'オン', '複合母音', 3)],
    kanji: [k('去', 'qu4', '行く', 5, 3), k('在', 'zai4', 'ある', 6, 3), k('哪', 'na3', 'どこ', 9, 3), k('里', 'li3', '中', 7, 3), k('左', 'zuo3', '左', 5, 3), k('右', 'you4', '右', 5, 3), k('前', 'qian2', '前', 9, 3)],
    conversation: [c('u13-1', '道案内', '请问，学校 在 哪里？', 'すみません、学校はどこ？', 3), c('u13-2', '道案内', '往 左 走。', '左へ進んで。', 3)],
    gameType: 'order', isTest: false, stars: 3
  },
  {
    id: 14, chapter: 3, titleJa: 'がっこう', titleZh: '在学校', guide: 'pochacco',
    pinyin: [p('zhi', 'ヂー', '整体認読', 3), p('chi', 'チー', '整体認読', 3), p('shi', 'シー', '整体認読', 3), p('ri', 'リー', '整体認読', 3), p('zi', 'ズー', '整体認読', 3), p('ci', 'ツー', '整体認読', 3), p('si', 'スー', '整体認読', 3)],
    kanji: [k('老', 'lao3', '年上', 6, 3), k('师', 'shi1', '先生', 6, 3), k('书', 'shu1', '本', 4, 3), k('写', 'xie3', '書く', 5, 3), k('读', 'du2', '読む', 10, 3), k('学', 'xue2', '学ぶ', 8, 3), k('校', 'xiao4', '学校', 10, 3)],
    conversation: [c('u14-1', '学校', '老师 好！', '先生こんにちは！', 3), c('u14-2', '学校', '这 是 什么？', 'これは何？', 3), c('u14-3', '学校', '我 不 懂。', 'わかりません。', 3)],
    gameType: 'memory', isTest: false, stars: 3
  },
  {
    id: 15, chapter: 3, titleJa: '期末テスト', titleZh: '期末测试', guide: 'kuromi',
    pinyin: [p('a', 'ア', '総復習', 3), p('zh', 'ヂ', '総復習', 3), p('ang', 'アン', '総復習', 3), p('shi', 'シー', '総復習', 3)],
    kanji: [k('你', 'ni3', 'あなた', 7, 3), k('妈', 'ma1', 'お母さん', 6, 3), k('猫', 'mao1', 'ねこ', 11, 3), k('钱', 'qian2', 'お金', 10, 3), k('学', 'xue2', '学ぶ', 8, 3)],
    conversation: [c('u15-1', 'Boss', '你 叫 什么 名字？', 'お名前は？', 3), c('u15-2', 'Boss', '这个 多少 钱？', 'これはいくら？', 3), c('u15-3', 'Boss', '请问，学校 在 哪里？', '学校はどこ？', 3)],
    gameType: 'fill', isTest: true, stars: 3
  },
];

export function getUnit(id: number): Unit | undefined {
  return units.find((u) => u.id === id);
}