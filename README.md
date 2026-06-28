# 한국외식업중앙회 경제 강의 웹 슬라이드 앱

**강의 제목:** 소상공인 지원 정책 및 AI를 이용한 경제교육 — AI와 경제 변화 속에서 살아남는 우리 가게

정적 HTML/CSS/JavaScript 기반의 1시간 강의용 웹 슬라이드 앱입니다. 슬라이드 발표와 수강생 실습 웹앱을 한 화면에서 전환할 수 있습니다.

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

- `index.html` — 발표 슬라이드 + 실습 웹앱
- `docs/SOT.md` — Source of Truth / 요구사항
- `docs/qa-report.md` — 검수 및 30분 점검 보고서
- `.github/workflows/pages.yml` — GitHub Pages 배포

## 발표 조작

- 다음: → 또는 Space
- 이전: ←
- 처음/끝: Home / End
- 전체화면: 화면 우측 상단 버튼
- 실습: 상단 `실습 웹앱` 버튼

## 주의

지원사업 세부 자격요건과 접수기간은 매년 변동됩니다. 실제 신청 전 소상공인24, 소상공인시장진흥공단, 중소벤처기업부, 지자체 공고를 확인하세요.
