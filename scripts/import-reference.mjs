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
body = body.replace('<nav class="nav-links">', '<nav class="nav-links" aria-label="Main navigation">')
  .replace('</nav>\n    <a href="#contact" class="btn btn-teal nav-cta">', '</nav>\n    <MobileMenu />\n    <a href="#contact" class="btn btn-teal nav-cta">');
const worksStart = body.indexOf('    <div class="works-stage">');
const specsStart = body.indexOf('    <div class="specs"');
if (worksStart < 0 || specsStart < worksStart) throw new Error('Reference animation slot missing.');
body = body.slice(0, worksStart) + '    <SortingScroll />\n\n' + body.slice(specsStart);
// Keep the product name already finalized for this app, also used by the linked reference.
body = body.replaceAll('ClothScannerAI', 'Cloth Scanner');
body = body.replace('our<br>Cloth Scanner.', 'our<br> Cloth Scanner.');
body = body
  .replace(/\s*<div class="hero-accuracy">[\s\S]*?<\/div>\s*(?=<\/div>\s*<div class="container hero-stats">)/, '')
  .replace('/design-reference/2033d0bfb6f1.jpg', '/design-reference/manual-panel-checking.jpg')
  .replace('Garment finishing quality inspection', 'Workers manually checking and tagging stacks of cut garment panels')
  .replace('Rising Payroll Overhead', 'Every Panel, Checked by Hand')
  .replace('Every new cutting table needs more inspection capacity. That means more headcount tied up in checking panels.', 'Operators inspect, handle, and mark cut panels one stack at a time. Quality depends on sustained attention across a repetitive shift.')
  .replace('/design-reference/a0d4f34315d1.jpg', '/design-reference/manual-ok-goods.jpg')
  .replace('Garment production line', 'Manually approved garment panels waiting at an OK Goods sorting station')
  .replace('The Cost Compounds', 'Sorting Relies on Manual Decisions')
  .replace('A cheap defect at cutting gets expensive downstream. Rework, delays, and shipment risk all start with what was missed early.', 'Accepted panels are separated and labelled by people. One inconsistent decision can send a defective panel farther into production.')
  .replace('/design-reference/91aa5af13339.jpg', '/design-reference/garment-production-floor.jpg')
  .replace('Manual fabric inspection', 'Large ready-made garment production floor with many sewing lines and operators')
  .replace('Shift Fatigue is Real', 'The Burden Grows with Every Line')
  .replace('Manual inspection gets harder to sustain across a full shift. Missed defects move down the line&mdash;and become harder to fix.', 'At factory scale, thousands of panels move between teams every hour. More output demands more inspection capacity and coordination.');
// The linked reference updates the old raster wordmark to the finalized name.
body = body.replace(/<a class="brand" href="#top"><img[^>]*\/><\/a>/,
  '<a class="brand brand-aai" href="#top"><img src="/design-reference/aai-logo-final.svg" alt="Advanced AI Lab" /><span class="brand-divider" aria-hidden="true"></span><span class="brand-word">Cloth Scanner</span></a>')
  .replace(/<img class="footer-logo"[^>]*\/>/,
    '<span class="footer-logo brand"><img src="/design-reference/logo-icon.png" alt="" /><span class="brand-word">Cloth Scanner</span></span>');
body = body.replace('<section class="model">', '<section class="model" id="model">')
  .replace('<section class="buy">', '<section class="buy" id="buy">')
  .replace('<div class="footer-brand">', '<div class="footer-brand" id="creator">')
  .replace(/\s*<a href="#creator">Creator<\/a>/, '')
  .replace(/\s*<a href="#blog">Blog<\/a>/, '')
  .replace(/<div class="container hero-stats">[\s\S]*?(?=<\/section>)/, `<div class="container hero-impact" role="group" aria-label="Cloth Scanner performance highlights">
    <div class="impact-grid">
      <article class="impact-card"><p class="impact-value">4x Fewer</p><p class="impact-caption">Rejections at the buyer's AQL check.</p></article>
      <article class="impact-card"><p class="impact-value">&lt;2<small>s</small></p><p class="impact-caption">Grades each panel before the next one arrives.</p></article>
      <article class="impact-card"><p class="impact-value">4 <span class="impact-arrow" aria-label="to">→</span> 1</p><p class="impact-caption">Inspectors per two tables, once the cell is running.</p></article>
    </div>
  </div>
`)
  .replace('This is a product of Advanced AI Lab, the AI business of ACI PLC.', 'This is a product of Advanced AI Lab Limited.')
  .replace('&copy; 2026 ADVANCED AI LAB LIMITED &middot; ACI PLC', '&copy; 2026 ADVANCED AI LAB LIMITED')
  .replace(/<img class="aal-logo"[^>]*\/>/, '<img class="aal-logo" src="/design-reference/aai-logo-final.svg" alt="Advanced AI Lab Limited" />')
  .replace('<a href="#">AAI Website</a>', `<a href="#">AAI Website</a>
          <div class="footer-privacy"><p class="fcol-head">Privacy</p><a class="footer-privacy-link" href="/privacy">Privacy Statement <span aria-hidden="true">↗</span></a></div>`)
  .replace('<footer id="contact" class="footer">', '<ContactForm />\n\n<footer class="footer">')
  .replace('<a href="mailto:clothscanner@advanceailab.com">clothscanner@advanceailab.com</a>', '<a href="mailto:clothscanner@advanced-ai-lab.com">clothscanner@advanced-ai-lab.com</a>')
  .replace(/\s*<a href="tel:\+8801234567890">\(\+880\) 1234-567890<\/a>/, '');
body = body
  .replace(/(<p class="hero-sub">[\s\S]*?<\/p>)/, `$1
    <div class="hero-partner"><p>Co-built with the industry pioneer</p><span class="hero-partner-logo"><img src="/images/urmi-group-logo.png" alt="Urmi Group logo" width="120" height="51" /></span></div>`)
  .replace(/(<p class="fcol-head">Product<\/p>)[\s\S]*?(?=<\/div>)/, `$1
          <a href="#works">Machine in 3D</a>
          <a href="#model">The Model</a>
          <a href="#buy">How To Buy It</a>
        `)
  .replace('<p class="fcol-head">Contact</p>', '<p class="fcol-head">Contact</p>\n          <a href="tel:+8801314996600">+880 1314-996600</a>');
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
const jsx = `/* Generated from the supplied HTML; layout, copy, SVGs and asset pixels are preserved. */\n/* eslint-disable @next/next/no-img-element */\nimport { AssemblyScroll, SortingScroll } from './reference-animations';\nimport ReferenceInteractions from './reference-interactions';\nimport ContactForm from './contact-form';\nimport MobileMenu from './mobile-menu';\n\nexport default function ReferenceContent() {\n  return <main className="reference-site">\n${body}\n<ReferenceInteractions />\n</main>;\n}\n`;
parse(jsx, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
fs.writeFileSync(path.join(root, 'app/reference-content.tsx'), jsx);
fs.writeFileSync(path.join(root, 'app/reference.css'), css);
console.log(`Converted ${seen.size} unique embedded assets (${[...seen.values()].reduce((a,b)=>a+b,0)} bytes), CSS and native React markup.`);
console.log('No scripts from the HTML were executed or copied.');
