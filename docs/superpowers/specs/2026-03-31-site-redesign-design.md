# Sungblab 사이트 풀 리디자인 스펙

> 개인 포트폴리오 → 스타트업 파운더 브랜드 사이트로 전환

## 1. 디자인 시스템

### 컬러 팔레트

| 용도 | Light Mode | Dark Mode |
|------|-----------|-----------|
| Primary | `#c4704b` (테라코타) | `#c4704b` |
| Primary Hover | `#d4906e` | `#d4906e` |
| Background | `#faf7f5` | `#111111` |
| Card/Surface | `#ffffff` | `#1a1a1a` |
| Border | `#e5ddd7` | `#2a2a2a` |
| Text Primary | `#1a1a1a` | `#f5ece6` |
| Text Secondary | `#666666` | `#888888` |
| Subtle BG (태그 등) | `#f5ece6` | `#2a1f1a` |

Tailwind config에 `terracotta`, `warm` 커스텀 컬러로 등록.

### 폰트

```
헤딩: Space Grotesk (700, Google Fonts variable)
본문: Inter (400/500/600, Google Fonts variable)
한글 fallback: Pretendard Variable
코드: JetBrains Mono
```

`_document.tsx`에서 Google Fonts 로드. `tailwind.config.ts`에서 fontFamily 재설정.

### 아이콘

`lucide-react` 단일 라이브러리로 통일. `react-icons`, `@heroicons/react` 제거.

## 2. 새 라이브러리

### 추가

| 패키지 | 용도 | 비고 |
|--------|------|------|
| `lenis` | 스무스 스크롤 | 전역 적용 (_app.tsx) |
| `gsap` | 스크롤 트리거 애니메이션 | ScrollTrigger 플러그인 |
| `motion` | 컴포넌트 애니메이션 | framer-motion 후속. `framer-motion` 제거 후 `motion` 설치. import 경로 `motion/react`로 변경 |

### 제거

| 패키지 | 이유 |
|--------|------|
| `styled-components` + `@types/styled-components` | Tailwind 통일 |
| `react-tilt` | GSAP/Motion 대체 |
| `react-icons` | lucide-react 통일 |
| `@heroicons/react` | lucide-react 통일 |
| `typewriter-effect` | Motion 직접 구현 |
| `react-query` | 미사용 |
| `framer-motion` | motion으로 대체 |
| `@react-spring/web` | Motion 통일 |
| `react-intersection-observer` | GSAP ScrollTrigger 대체 |

## 3. 로고

### 메인 로고 (Logo 컴포넌트)
- **아이콘**: 라운드 사각형(rx=11) `#c4704b` 배경 + 흰색 "S" (Inter 800)
- **워드마크**: "sungblab" Inter 600, letter-spacing -0.5
- 도트 없음
- 다크모드: 워드마크 색상 `#f5ece6`, 아이콘 동일
- 사이즈 sm/md/lg 유지

### 파비콘 (LogoIcon)
- S 아이콘 단독 (라운드 사각형 + S)
- 배경: `#c4704b`, 텍스트: `#ffffff`

## 4. 페이지 구조

### 홈페이지 섹션 순서

```
1. Hero
2. UnivMind 소개 (신규)
3. Projects
4. Blog Preview
5. Contact + Footer
```

Skills 섹션 제거 (About 페이지로 이동).

### 4.1 Hero 섹션

- **메인 카피**: "AI와 함께 만듭니다"
- **서브 카피**: "중3 때 ChatGPT를 만나고, 18살부터 Claude와 바이브코딩. 지금은 AI 서비스를 직접 만들고 운영합니다."
- **CTA**: "UnivMind 보기" (Primary 버튼) + "블로그 읽기" (Secondary 버튼)
- **배경**: 미니멀 mesh gradient (테라코타 톤, 은은하게)
- **애니메이션**: GSAP로 텍스트 라인별 stagger 리빌 (위→아래)
- **스크롤 인디케이터**: 하단 화살표 (현재와 유사, Motion으로)
- "Open to Work" 배지 제거

### 4.2 UnivMind 소개 섹션 (신규)

- 대표 프로젝트 별도 부각
- 좌: 텍스트 (서비스명, 한 줄 설명, 핵심 기능 3개 bullet)
- 우: 스크린샷 또는 브라우저 목업 이미지
- CTA: "서비스 바로가기" 버튼 → univmind.me
- GSAP ScrollTrigger: 스크롤 시 좌우에서 슬라이드 인

### 4.3 Projects 섹션

- 2~3열 카드 그리드
- 각 카드: 썸네일 + 제목 + 한 줄 설명 + 태그
- Motion hover: 카드 리프트(y: -4) + 섀도우 강화
- "전체 보기" 링크 → /projects
- GSAP ScrollTrigger stagger 등장

### 4.4 Blog Preview 섹션

- 최신 3개 포스트 카드
- 카드: 제목 + 날짜 + 발췌 (이미지 선택적)
- Motion stagger 등장
- "전체 보기" → /blog

### 4.5 Contact + Footer

- CTA 영역: "함께 만들어 보고 싶다면" + 이메일 링크
- 소셜: GitHub, LinkedIn (Lucide 아이콘)
- Footer: 로고 + 네비게이션 링크 + © 2024 sungblab

## 5. 서브 페이지

### /blog (목록)
- 카드 그리드 유지, 새 컬러/폰트 적용
- 카테고리 필터는 현재 없으면 추가 안 함

### /blog/[slug] (상세)
- MDX 렌더링 유지 (next-mdx-remote, gray-matter)
- prose 스타일 Tailwind typography 플러그인 재설정 (테라코타 링크색)
- TOC + generateId 로직 유지
- Giscus 댓글 유지 (테마 색상만 변경)

### /projects
- 검색/필터 + 프로젝트 그리드 유지
- 새 카드 스타일 적용

### /about
- 프로필 카드 + 소개 텍스트
- 타임라인 추가: 2022 ChatGPT → 바이브코딩 시작 → sungblab AI → UnivMind → 현재
- GitHub 스탯 유지
- Skills를 여기로 이동 (심플한 태그/뱃지 형태)
- Giscus 방명록 유지

### /guestbook
- 기존 유지, 스타일만 변경

### /demo
- 기존 유지, 스타일만 변경

## 6. 네비게이션 (Header)

- 고정 헤더 (스크롤 시 backdrop-blur)
- 좌: 로고 (S 아이콘 + sungblab)
- 우: Home, Projects, Blog, About (Inter 500)
- 우측 끝: 테마 토글 + 언어 토글
- 모바일: 햄버거 → 풀스크린 또는 드로어 메뉴
- 현재 페이지 인디케이터: 텍스트 하단 2px 테라코타 언더라인 (pill 제거)

## 7. 글로벌 스타일 & 애니메이션

### Lenis 스무스 스크롤
- `_app.tsx`에서 전역 Lenis 인스턴스 초기화
- GSAP ScrollTrigger와 연동

### 스크롤 애니메이션 패턴
- **텍스트 리빌**: opacity 0→1 + y: 30→0, stagger 0.1s
- **카드 등장**: opacity 0→1 + y: 40→0, stagger 0.15s
- **이미지 등장**: clipPath 또는 opacity + scale
- 모든 스크롤 애니메이션은 GSAP ScrollTrigger 사용 (start: "top 80%")

### 페이지 전환
- Motion으로 opacity fade (현재와 유사, 0.3s)

### 호버 효과
- 버튼: y: -2 + shadow 강화
- 카드: y: -4 + shadow-lg
- 링크: 테라코타 색상 전환

## 8. 유지하는 것들

- Pages Router 구조
- TinaCMS 연동
- MDX 블로그 시스템 (gray-matter + next-mdx-remote)
- ThemeProvider / LanguageProvider / ToastProvider 구조
- Giscus 댓글/방명록
- generateId 유틸
- translations.ts 구조 (카피 내용만 업데이트)
- SEO 컴포넌트
- KaTeX 수학식 렌더링
- vercel.json 캐시 설정
- next-sitemap

## 9. Tailwind Config 변경

```ts
theme: {
  extend: {
    colors: {
      terracotta: {
        DEFAULT: '#c4704b',
        light: '#d4906e',
        pale: '#e8c4b0',
        bg: '#f5ece6',
        dark: '#2a1f1a',
      },
      warm: {
        50: '#faf7f5',
        100: '#f5ece6',
        200: '#e5ddd7',
        800: '#1a1a1a',
        900: '#111111',
      },
    },
    fontFamily: {
      heading: ['Space Grotesk', 'Pretendard Variable', 'sans-serif'],
      sans: ['Inter', 'Pretendard Variable', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
  },
}
plugins: [require('@tailwindcss/typography')]
```

## 10. 파일 변경 범위

### 새로 작성
- `components/sections/HeroSection.tsx` (재작성)
- `components/sections/UnivMindSection.tsx` (신규)
- `components/sections/ProjectsSection.tsx` (재작성)
- `components/sections/BlogPreviewSection.tsx` (재작성)
- `components/sections/ContactSection.tsx` (재작성)
- `components/layout/Header.tsx` (재작성)
- `components/layout/Footer.tsx` (재작성)
- `components/ui/Logo.tsx` (재작성)
- `components/ui/AnimatedSection.tsx` (GSAP 기반으로 재작성)
- `utils/lenis.ts` (신규 - Lenis 초기화)
- `utils/gsap.ts` (신규 - GSAP/ScrollTrigger 등록)

### 수정
- `pages/index.tsx` — 새 섹션 구성
- `pages/_app.tsx` — Lenis 초기화, Google Fonts
- `pages/_document.tsx` — Google Fonts preconnect
- `pages/about.tsx` — 타임라인 추가, 스타일 변경
- `pages/projects.tsx` — 새 카드 스타일
- `pages/blog/index.tsx` — 새 카드 스타일
- `pages/blog/[slug].tsx` — prose 스타일 변경
- `pages/guestbook.tsx` — 스타일 변경
- `styles/globals.css` — 컬러, 스크롤바, 베이스 스타일
- `tailwind.config.ts` — 새 컬러/폰트/플러그인
- `package.json` — 패키지 추가/제거
- `components/MDXComponents.tsx` — 새 스타일 적용

### 삭제
- `components/ui/Button.tsx` (styled-components, 인라인 Tailwind로 대체)
- `components/ui/Card.tsx` (styled-components, 인라인 Tailwind로 대체)
- `components/ui/SocialButton.tsx` (재작성하거나 인라인)
- `components/features/SkillsSection.tsx` (About으로 이동)
