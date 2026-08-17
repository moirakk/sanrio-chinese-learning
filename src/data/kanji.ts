import type { KanjiItem } from '../types';

type KanjiGroup = {
  key: string;
  titleJa: string;
  difficulty: 1 | 2 | 3;
  items: KanjiItem[];
};

export const kanjiGroups: KanjiGroup[] = [
  {
    key: 'numbers',
    titleJa: '数字',
    difficulty: 1,
    items: [
      { hanzi: '一', pinyin: 'yi1', ja: 'いち', strokes: 1, difficulty: 1 },
      { hanzi: '二', pinyin: 'er4', ja: 'に', strokes: 2, difficulty: 1 },
      { hanzi: '三', pinyin: 'san1', ja: 'さん', strokes: 3, difficulty: 1 },
      { hanzi: '四', pinyin: 'si4', ja: 'よん', strokes: 5, difficulty: 1 },
      { hanzi: '五', pinyin: 'wu3', ja: 'ご', strokes: 4, difficulty: 1 },
      { hanzi: '六', pinyin: 'liu4', ja: 'ろく', strokes: 4, difficulty: 1 },
      { hanzi: '七', pinyin: 'qi1', ja: 'なな', strokes: 2, difficulty: 1 },
      { hanzi: '八', pinyin: 'ba1', ja: 'はち', strokes: 2, difficulty: 1 },
      { hanzi: '九', pinyin: 'jiu3', ja: 'きゅう', strokes: 2, difficulty: 1 },
      { hanzi: '十', pinyin: 'shi2', ja: 'じゅう', strokes: 2, difficulty: 1 },
      { hanzi: '百', pinyin: 'bai3', ja: 'ひゃく', strokes: 6, difficulty: 1 },
    ],
  },
  {
    key: 'colors',
    titleJa: '色',
    difficulty: 1,
    items: [
      { hanzi: '红', pinyin: 'hong2', ja: 'あか', strokes: 6, difficulty: 1 },
      { hanzi: '黄', pinyin: 'huang2', ja: 'きいろ', strokes: 11, difficulty: 2 },
      { hanzi: '蓝', pinyin: 'lan2', ja: 'あお', strokes: 13, difficulty: 2 },
      { hanzi: '绿', pinyin: 'lu:4', ja: 'みどり', strokes: 11, difficulty: 2 },
      { hanzi: '白', pinyin: 'bai2', ja: 'しろ', strokes: 5, difficulty: 1 },
      { hanzi: '黑', pinyin: 'hei1', ja: 'くろ', strokes: 12, difficulty: 2 },
    ],
  },
  {
    key: 'animals',
    titleJa: '動物',
    difficulty: 1,
    items: [
      { hanzi: '猫', pinyin: 'mao1', ja: 'ねこ', strokes: 11, difficulty: 2 },
      { hanzi: '狗', pinyin: 'gou3', ja: 'いぬ', strokes: 8, difficulty: 1 },
      { hanzi: '鸟', pinyin: 'niao3', ja: 'とり', strokes: 5, difficulty: 1 },
      { hanzi: '鱼', pinyin: 'yu2', ja: 'さかな', strokes: 8, difficulty: 1 },
      { hanzi: '马', pinyin: 'ma3', ja: 'うま', strokes: 3, difficulty: 1 },
      { hanzi: '牛', pinyin: 'niu2', ja: 'うし', strokes: 4, difficulty: 1 },
      { hanzi: '羊', pinyin: 'yang2', ja: 'ひつじ', strokes: 6, difficulty: 1 },
    ],
  },
  {
    key: 'family',
    titleJa: '家族',
    difficulty: 1,
    items: [
      { hanzi: '爸', pinyin: 'ba4', ja: 'おとうさん', strokes: 8, difficulty: 1 },
      { hanzi: '妈', pinyin: 'ma1', ja: 'おかあさん', strokes: 6, difficulty: 1 },
      { hanzi: '哥', pinyin: 'ge1', ja: 'おにいさん', strokes: 10, difficulty: 2 },
      { hanzi: '姐', pinyin: 'jie3', ja: 'おねえさん', strokes: 8, difficulty: 1 },
      { hanzi: '弟', pinyin: 'di4', ja: 'おとうと', strokes: 7, difficulty: 1 },
      { hanzi: '妹', pinyin: 'mei4', ja: 'いもうと', strokes: 8, difficulty: 1 },
    ],
  },
  {
    key: 'body',
    titleJa: 'からだ',
    difficulty: 1,
    items: [
      { hanzi: '头', pinyin: 'tou2', ja: 'あたま', strokes: 5, difficulty: 1 },
      { hanzi: '手', pinyin: 'shou3', ja: 'て', strokes: 4, difficulty: 1 },
      { hanzi: '脚', pinyin: 'jiao3', ja: 'あし', strokes: 11, difficulty: 2 },
      { hanzi: '眼', pinyin: 'yan3', ja: 'め', strokes: 11, difficulty: 2 },
      { hanzi: '耳', pinyin: 'er3', ja: 'みみ', strokes: 6, difficulty: 1 },
      { hanzi: '口', pinyin: 'kou3', ja: 'くち', strokes: 3, difficulty: 1 },
      { hanzi: '鼻', pinyin: 'bi2', ja: 'はな', strokes: 14, difficulty: 3 },
    ],
  },
  {
    key: 'food',
    titleJa: '食べもの',
    difficulty: 1,
    items: [
      { hanzi: '饭', pinyin: 'fan4', ja: 'ごはん', strokes: 7, difficulty: 1 },
      { hanzi: '菜', pinyin: 'cai4', ja: 'おかず', strokes: 11, difficulty: 2 },
      { hanzi: '肉', pinyin: 'rou4', ja: 'にく', strokes: 6, difficulty: 1 },
      { hanzi: '蛋', pinyin: 'dan4', ja: 'たまご', strokes: 11, difficulty: 2 },
      { hanzi: '水', pinyin: 'shui3', ja: 'みず', strokes: 4, difficulty: 1 },
      { hanzi: '果', pinyin: 'guo3', ja: 'くだもの', strokes: 8, difficulty: 1 },
      { hanzi: '茶', pinyin: 'cha2', ja: 'おちゃ', strokes: 9, difficulty: 2 },
      { hanzi: '奶', pinyin: 'nai3', ja: 'ミルク', strokes: 5, difficulty: 1 },
    ],
  },
  {
    key: 'daily',
    titleJa: '日常',
    difficulty: 1,
    items: [
      { hanzi: '大', pinyin: 'da4', ja: 'おおきい', strokes: 3, difficulty: 1 },
      { hanzi: '小', pinyin: 'xiao3', ja: 'ちいさい', strokes: 3, difficulty: 1 },
      { hanzi: '多', pinyin: 'duo1', ja: 'おおい', strokes: 6, difficulty: 1 },
      { hanzi: '少', pinyin: 'shao3', ja: 'すくない', strokes: 4, difficulty: 1 },
      { hanzi: '好', pinyin: 'hao3', ja: 'よい', strokes: 6, difficulty: 1 },
      { hanzi: '坏', pinyin: 'huai4', ja: 'わるい', strokes: 7, difficulty: 1 },
    ],
  },
  {
    key: 'nature',
    titleJa: '自然',
    difficulty: 2,
    items: [
      { hanzi: '天', pinyin: 'tian1', ja: 'そら', strokes: 4, difficulty: 1 },
      { hanzi: '地', pinyin: 'di4', ja: 'だいち', strokes: 6, difficulty: 1 },
      { hanzi: '山', pinyin: 'shan1', ja: 'やま', strokes: 3, difficulty: 1 },
      { hanzi: '水', pinyin: 'shui3', ja: 'みず', strokes: 4, difficulty: 1 },
      { hanzi: '火', pinyin: 'huo3', ja: 'ひ', strokes: 4, difficulty: 1 },
      { hanzi: '风', pinyin: 'feng1', ja: 'かぜ', strokes: 4, difficulty: 1 },
      { hanzi: '雨', pinyin: 'yu3', ja: 'あめ', strokes: 8, difficulty: 2 },
      { hanzi: '雪', pinyin: 'xue3', ja: 'ゆき', strokes: 11, difficulty: 2 },
      { hanzi: '花', pinyin: 'hua1', ja: 'はな', strokes: 7, difficulty: 1 },
      { hanzi: '草', pinyin: 'cao3', ja: 'くさ', strokes: 9, difficulty: 2 },
      { hanzi: '树', pinyin: 'shu4', ja: 'き', strokes: 9, difficulty: 2 },
    ],
  },
  {
    key: 'actions',
    titleJa: '動作',
    difficulty: 2,
    items: [
      { hanzi: '吃', pinyin: 'chi1', ja: 'たべる', strokes: 6, difficulty: 1 },
      { hanzi: '喝', pinyin: 'he1', ja: 'のむ', strokes: 12, difficulty: 2 },
      { hanzi: '看', pinyin: 'kan4', ja: 'みる', strokes: 9, difficulty: 2 },
      { hanzi: '听', pinyin: 'ting1', ja: 'きく', strokes: 7, difficulty: 1 },
      { hanzi: '说', pinyin: 'shuo1', ja: 'はなす', strokes: 9, difficulty: 2 },
      { hanzi: '走', pinyin: 'zou3', ja: 'あるく', strokes: 7, difficulty: 1 },
      { hanzi: '跑', pinyin: 'pao3', ja: 'はしる', strokes: 12, difficulty: 2 },
      { hanzi: '写', pinyin: 'xie3', ja: 'かく', strokes: 5, difficulty: 1 },
      { hanzi: '读', pinyin: 'du2', ja: 'よむ', strokes: 10, difficulty: 2 },
    ],
  },
];

export const allKanji = kanjiGroups.flatMap((group) => group.items);