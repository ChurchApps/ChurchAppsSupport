// Fast MDX validity check for all docs + translations.
// Usage (from repo root):  node scripts/check-mdx.mjs
// Catches parse-level breaks (stray tags, bad JSX) in seconds instead of
// finding them one locale at a time in 6-minute CI builds. Note: render-time
// errors (e.g. bare {token} treated as an undefined JSX variable) compile
// fine and only surface in `yarn build` — this script also greps for those
// heuristically.
import { compile } from '@mdx-js/mdx';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const ROOTS = ['docs', 'i18n'];
const files = [];
function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if (p.endsWith('.md') || p.endsWith('.mdx')) files.push(p);
  }
}
ROOTS.forEach(r => { try { walk(r); } catch {} });
console.error(`checking ${files.length} files...`);

let bad = 0;
for (const f of files) {
  let src = readFileSync(f, 'utf8');
  src = src.replace(/^---\n[\s\S]*?\n---\n/, ''); // strip frontmatter

  // 1) hard parse errors
  try {
    await compile(src, { format: 'mdx' });
  } catch (e) {
    bad++;
    console.log(`PARSE FAIL ${f} :: ${String(e.message || e).slice(0, 100)}`);
    continue;
  }

  // 2) heuristics for render-time bombs
  // translator wrapper tags that sometimes leak through
  if (/^<\/?content>\s*$/m.test(src)) {
    bad++;
    console.log(`WRAPPER TAG ${f} :: stray <content>/<\\/content> line`);
  }
  // bare {token} outside inline code — compiles, then throws ReferenceError at SSG
  const noCode = src.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  // any script — translators sometimes translate the token itself ({分类})
  const m = noCode.match(/\{[^\s{}`#][^\s{}`]{0,39}\}/);
  if (m) {
    bad++;
    console.log(`BARE BRACE ${f} :: ${m[0]} outside code — wrap in backticks`);
  }
  // bold-wrapped URL glued to following text — breaks the URL parser at build
  // time (esp. CJK: **http://x**에서). Use backticks for URLs instead of bold.
  const u = noCode.match(/\*\*https?:\/\/[^\s*]+\*\*(?=\S)/);
  if (u) {
    bad++;
    console.log(`BOLD URL ${f} :: ${u[0].slice(0, 60)} — use backticks, not bold`);
  }
}
console.error(`done. ${bad} problem(s).`);
process.exit(bad ? 1 : 0);
