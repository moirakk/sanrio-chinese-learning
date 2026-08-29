import { readFile, writeFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const root = process.cwd();
const unitsPath = path.join(root, 'src/data/units.ts');
const source = await readFile(unitsPath, 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;

const tempPath = path.join(tmpdir(), `sanrio-units-${Date.now()}-${Math.random().toString(16).slice(2)}.mjs`);
await writeFile(tempPath, compiled);

try {
  const { units, getUnitTitleEn } = await import(`${pathToFileURL(tempPath).href}?v=${Date.now()}`);
  const issues = [];

  if (!Array.isArray(units) || units.length < 15) {
    issues.push(`Expected at least 15 units, found ${Array.isArray(units) ? units.length : 'none'}.`);
  }

  for (const unit of units) {
    const label = `Unit ${unit?.id ?? '?'}`;
    if (!unit?.titleJa || !unit?.titleZh || !getUnitTitleEn(unit.id)) {
      issues.push(`${label}: missing Japanese, Chinese, or English title.`);
    }
    if (!Array.isArray(unit.pinyin) || unit.pinyin.length === 0) {
      issues.push(`${label}: missing pinyin practice.`);
    }
    if (!Array.isArray(unit.kanji) || unit.kanji.length === 0) {
      issues.push(`${label}: missing word practice.`);
    }
    if (!Array.isArray(unit.conversation) || unit.conversation.length === 0) {
      issues.push(`${label}: missing conversation practice.`);
    }

    unit.pinyin?.forEach((item, index) => {
      if (!item.value || !item.kana || !item.hint || !item.examples) {
        issues.push(`${label} pinyin ${index + 1}: missing Japanese-led pronunciation content.`);
      }
    });

    unit.kanji?.forEach((item, index) => {
      if (!item.hanzi || !item.pinyin || !item.ja || !item.en) {
        issues.push(`${label} word ${index + 1}: missing Chinese, pinyin, Japanese, or English.`);
      }
    });

    unit.conversation?.forEach((line, index) => {
      if (!line.zh || !line.en || !line.ja) {
        issues.push(`${label} conversation ${index + 1}: missing Chinese, English, or Japanese.`);
      }
      if (!line.keywords?.includes(line.en)) {
        issues.push(`${label} conversation ${index + 1}: English phrase is missing from searchable keywords.`);
      }
    });
  }

  if (issues.length > 0) {
    console.error(issues.join('\n'));
    process.exitCode = 1;
  } else {
    console.log(`Content check passed: ${units.length} units include Japanese guidance, Chinese, and English.`);
  }
} finally {
  await unlink(tempPath).catch(() => {});
}
