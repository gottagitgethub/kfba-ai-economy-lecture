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
if (slideCount < 40) failures.push(`slide count ${slideCount} < 40`);
const lectureTokens = ['충남경제교육센터 유정재 강사','GPT 또는 Gemini','실제 공고문','2025년 소상공인 스마트상점 기술보급사업'];
for (const token of lectureTokens) if (!html.includes(token)) failures.push(`missing lecture token: ${token}`);
if (html.includes('id="practice"') || html.includes('실습 웹앱</button>')) failures.push('embedded practice app still present in lecture deck');
const supportTokens = ['강한 소상공인 성장지원','로컬크리에이터','스마트상점','온라인 판로지원','희망리턴패키지','클린제조환경'];
for (const token of supportTokens) if (!html.includes(token)) failures.push(`missing support program: ${token}`);
const navTokens = ['ArrowRight','ArrowLeft','localStorage','requestFullscreen'];
for (const token of navTokens) if (!html.includes(token)) failures.push(`missing navigation feature: ${token}`);
const bad = html.match(/TODO|lorem ipsum|undefined/g);
if (bad) failures.push(`placeholder/bad token found: ${bad.join(', ')}`);
if (failures.length) {
  console.error('CHECK FAILED');
  for (const f of failures) console.error('- '+f);
  process.exit(1);
}
console.log(`CHECK OK — ${slideCount} slides, lecture deck separated from practice app, SOT present.`);
