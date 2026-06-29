# 한국외식업중앙회 경제 강의 웹 슬라이드 앱

**강의 제목:** 소상공인 지원 정책 및 AI를 이용한 경제교육 — AI와 경제 변화 속에서 살아남는 우리 가게

정적 HTML/CSS/JavaScript 기반의 1시간 강의용 웹 슬라이드 앱입니다. 강의자료 유출 방지를 위해 수강생 실습/지원사업 웹앱은 이 슬라이드 앱에 번들링하지 않고 별도 GitHub Pages 프로젝트로 분리합니다.

## 실행

```bash
npm install
npm run start
```

브라우저에서 `http://localhost:4173` 접속.

## 검수

```bash
npm run check
```

## 구성

- `index.html` — 발표 슬라이드 전용 앱
- `docs/SOT.md` — Source of Truth / 요구사항
- `docs/qa-report.md` — 검수 및 Gucci Harness 점검 보고서
- `docs/research-support-programs.json` — 지원사업 예시 조사 근거
- `docs/research-regional-support-programs.json` — 충남/시군 지역 지원사업 조사 근거
- `docs/research-easy-senior-supports.json` — 중장년·시니어 친화 쉬운 지원정책 조사 근거
- `.github/workflows/pages.yml` — GitHub Pages 배포

## 별도 실습/지원사업 웹앱

- 지원사업 실전 플레이북: `https://gottagitgethub.github.io/kfba-support-program-playbook/`
- 별도 저장소/프로젝트: `C:/c/CreatorOS/kfba-support-program-playbook`

## 발표 조작

- 다음: → 또는 Space
- 이전: ←
- 처음/끝: Home / End
- 전체화면: 화면 우측 상단 버튼
- 목차: 상단 `목차` 버튼

## 주의

지원사업 세부 자격요건과 접수기간은 매년 변동됩니다. 실제 신청 전 소상공인24, 소상공인시장진흥공단, 중소벤처기업부, 지자체 공고를 확인하세요.
