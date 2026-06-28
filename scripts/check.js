const fs = require('fs');
const html = fs.readFileSync('index.html','utf8');
const sot = fs.readFileSync('docs/SOT.md','utf8');
const required = [
  'AI 에이전트', '소상공인24', '외식업', '제품화', '온라인 판매', '리뷰', '시장조사', 'GitHub Pages'
];
let failures = [];
for (const token of required) {
  if (!html.includes(token) && !sot.includes(token)) failures.push(`missing token: ${token}`);
}
const slideCount = (html.match(/<section class="slide/g) || []).length;
if (slideCount < 30) failures.push(`slide count ${slideCount} < 30`);
const tabs = ['policyTab','agentTab','reviewTab','researchTab','planTab'];
for (const id of tabs) if (!html.includes(id)) failures.push(`missing tab: ${id}`);
const navTokens = ['ArrowRight','ArrowLeft','localStorage','requestFullscreen'];
for (const token of navTokens) if (!html.includes(token)) failures.push(`missing navigation feature: ${token}`);
const bad = html.match(/TODO|lorem ipsum|undefined/g);
if (bad) failures.push(`placeholder/bad token found: ${bad.join(', ')}`);
if (failures.length) {
  console.error('CHECK FAILED');
  for (const f of failures) console.error('- '+f);
  process.exit(1);
}
console.log(`CHECK OK — ${slideCount} slides, ${tabs.length} practice tabs, SOT present.`);
