// One-time, mechanical HTML-to-JSX/asset conversion. Never executes source scripts.
// Usage: node scripts/import-reference.mjs /absolute/path/to/ClothScanner_website.html
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { parse } from '@babel/parser';

const input = process.argv[2];
if (!input) throw new Error('Supply the reference HTML path.');
const root = path.resolve(import.meta.dirname, '..');
const assets = path.join(root, 'public/design-reference');
fs.mkdirSync(assets, { recursive: true });
const seen = new Map();
let source = fs.readFileSync(input, 'utf8').replace(/\r\n/g, '\n');
source = source.replace(/data:([\w/+.-]+);base64,([A-Za-z0-9+/=]+)/g, (_, mime, encoded) => {
  const bytes = Buffer.from(encoded, 'base64');
  const id = crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 12);
  const extension = { 'font/woff2': 'woff2', 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/svg+xml': 'svg' }[mime];
  if (!extension) throw new Error(`Unexpected asset type: ${mime}`);
  const name = `${id}.${extension}`;
  if (!seen.has(name)) fs.writeFileSync(path.join(assets, name), bytes);
  seen.set(name, bytes.length);
  return `/design-reference/${name}`;
});
const css = [...source.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n');
let body = source.match(/<body>([\s\S]*?)<\/body>/)[1];
body = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<!--[\s\S]*?-->/g, '');
if (/\son\w+=|javascript:/i.test(body)) throw new Error('Unexpected executable HTML attribute.');
body = body.replace(/<img class="hero-machine"[^>]*\/>/, '<AssemblyScroll />');
const worksStart = body.indexOf('    <div class="works-stage">');
const specsStart = body.indexOf('    <div class="specs"');
if (worksStart < 0 || specsStart < worksStart) throw new Error('Reference animation slot missing.');
body = body.slice(0, worksStart) + '    <SortingScroll />\n\n' + body.slice(specsStart);
// Keep the product name already finalized for this app, also used by the linked reference.
body = body.replaceAll('ClothScannerAI', 'Cloth Scanner');
// The linked reference updates the old raster wordmark to the finalized name.
body = body.replace(/<a class="brand" href="#top"><img[^>]*\/><\/a>/,
  '<a class="brand" href="#top"><img src="/design-reference/logo-icon.png" alt="" /><span class="brand-word">Cloth Scanner</span></a>')
  .replace(/<img class="footer-logo"[^>]*\/>/,
    '<span class="footer-logo brand"><img src="/design-reference/logo-icon.png" alt="" /><span class="brand-word">Cloth Scanner</span></span>');
body = body.replace('<section class="model">', '<section class="model" id="model">')
  .replace('<section class="buy">', '<section class="buy" id="buy">')
  .replace('<div class="footer-brand">', '<div class="footer-brand" id="creator">')
  .replace('<a href="#">The Cell</a>', '<a href="#top">The Cell</a>')
  .replace('<a href="#">The Machine</a>', '<a href="#works">The Machine</a>')
  .replace('<a href="#">The Model</a>', '<a href="#model">The Model</a>');
body = body.replace(/>([^<>]*)</g, (_, text) => `>${text.replaceAll("'", '&apos;')}<`);
const voidTags = new Set(['img', 'br', 'hr', 'input', 'meta', 'link']);
const camel = value => value.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
body = body.replace(/<([a-zA-Z][\w:-]*)(\s[^<>]*?)?\s*\/?>/g, (tag, name, attributes = '') => {
  const attrs = [];
  for (const match of attributes.matchAll(/([^\s=\/]+)(?:="([^"]*)")?/g)) {
    let [, key, value] = match;
    if (key === 'class') key = 'className';
    else if (key === 'tabindex') key = 'tabIndex';
    else if (key === 'for') key = 'htmlFor';
    else if (!key.startsWith('aria-') && !key.startsWith('data-')) key = camel(key);
    if (key === 'style') {
      const style = Object.fromEntries(value.split(';').filter(v => v.trim()).map(v => {
        const colon = v.indexOf(':'); return [camel(v.slice(0, colon).trim()), v.slice(colon + 1).trim()];
      }));
      attrs.push(`style={${JSON.stringify(style)}}`);
    } else attrs.push(value === undefined ? key : `${key}="${value}"`);
  }
  if (name === 'img' && !attrs.some(a => a.startsWith('className="footer') || a.startsWith('className="aal'))) {
    attrs.push('decoding="async"');
    if (!attrs.some(a => a.includes('alt="Cloth Scanner"'))) attrs.push('loading="lazy"');
  }
  return `<${name}${attrs.length ? ' ' + attrs.join(' ') : ''}${voidTags.has(name) || /\/>$/.test(tag) ? ' /' : ''}>`;
});
const jsx = `/* Generated from the supplied HTML; layout, copy, SVGs and asset pixels are preserved. */\n/* eslint-disable @next/next/no-img-element */\nimport { AssemblyScroll, SortingScroll } from './reference-animations';\nimport ReferenceInteractions from './reference-interactions';\n\nexport default function ReferenceContent() {\n  return <main className="reference-site">\n${body}\n<ReferenceInteractions />\n</main>;\n}\n`;
parse(jsx, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
fs.writeFileSync(path.join(root, 'app/reference-content.tsx'), jsx);
fs.writeFileSync(path.join(root, 'app/reference.css'), css);
console.log(`Converted ${seen.size} unique embedded assets (${[...seen.values()].reduce((a,b)=>a+b,0)} bytes), CSS and native React markup.`);
console.log('No scripts from the HTML were executed or copied.');
