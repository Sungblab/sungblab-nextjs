# Sungblab 사이트 풀 리디자인 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 개인 포트폴리오 사이트를 테라코타 컬러 + 미니멀 내추럴 톤의 스타트업 파운더 브랜드 사이트로 풀 리디자인

**Architecture:** Pages Router 유지. 모든 섹션 컴포넌트를 재작성하되 데이터 레이어(MDX, GitHub API, Giscus)는 그대로 사용. styled-components 제거 → Tailwind 통일. framer-motion → motion 마이그레이션. GSAP ScrollTrigger + Lenis 스무스 스크롤 추가.

**Tech Stack:** Next.js 14, motion, GSAP + ScrollTrigger, Lenis, Tailwind CSS, lucide-react, Space Grotesk + Inter fonts

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `utils/gsap.ts` | GSAP + ScrollTrigger 플러그인 등록 |
| `utils/lenis.ts` | Lenis 인스턴스 생성 + GSAP 연동 훅 |
| `components/sections/UnivMindSection.tsx` | 홈페이지 UnivMind 소개 섹션 |

### Rewrite Files (delete old, write new)
| File | Responsibility |
|------|---------------|
| `components/ui/Logo.tsx` | S 라운드스퀘어 + sungblab 워드마크 |
| `components/sections/HeroSection.tsx` | 히어로 (GSAP 텍스트 리빌) |
| `components/sections/BlogPreviewSection.tsx` | 블로그 프리뷰 카드 3개 |
| `components/sections/ContactSection.tsx` | CTA + 소셜 링크 |
| `components/layout/Header.tsx` | 네비게이션 (테라코타 언더라인) |
| `components/layout/Footer.tsx` | 푸터 (미니멀) |
| `components/layout/Layout.tsx` | 레이아웃 래퍼 (새 컬러) |

### Modify Files
| File | What Changes |
|------|-------------|
| `tailwind.config.ts` | 컬러, 폰트, 플러그인 추가 |
| `styles/globals.css` | 베이스 스타일, 스크롤바, 배경색 |
| `pages/_document.tsx` | 폰트 로드 변경 (Space Grotesk + Inter) |
| `pages/_app.tsx` | Lenis 초기화 |
| `pages/index.tsx` | 새 섹션 구성 (Hero→UnivMind→Projects→Blog→Contact) |
| `pages/about.tsx` | 타임라인 추가, 스킬 뱃지, 새 스타일 |
| `pages/projects.tsx` | 새 카드 스타일 |
| `pages/blog/index.tsx` | 새 카드/필터 스타일 |
| `pages/blog/[slug].tsx` | prose 스타일, 테라코타 링크 |
| `pages/guestbook.tsx` | 스타일 변경 |
| `components/Components.tsx` | 배럴 export 정리 |
| `utils/translations.ts` | 새 카피 (hero, contact 등) |

### Delete Files
| File | Reason |
|------|--------|
| `components/ui/Button.tsx` | styled-components → Tailwind 인라인 |
| `components/ui/Card.tsx` | styled-components → Tailwind 인라인 |
| `components/ui/SocialButton.tsx` | 인라인 재작성 |
| `components/sections/SkillsSection.tsx` | About 페이지로 이동 |
| `components/sections/FeaturedProjectsSection.tsx` | ProjectsSection으로 대체 |

---

## Task 1: 패키지 설치 및 제거

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 새 패키지 설치**

```bash
cd /c/Users/Sungbin/Documents/GitHub/sungblab-nextjs
npm install motion gsap lenis
```

- [ ] **Step 2: 불필요한 패키지 제거**

```bash
npm uninstall framer-motion styled-components @types/styled-components react-tilt react-icons @heroicons/react typewriter-effect react-query @react-spring/web react-intersection-observer
```

- [ ] **Step 3: 설치 확인**

```bash
npm ls motion gsap lenis lucide-react
```

Expected: 4개 패키지 모두 설치됨 확인

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: swap libraries — add motion/gsap/lenis, remove styled-components/react-tilt/react-icons/etc"
```

---

## Task 2: Tailwind Config + 글로벌 스타일 + 폰트

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `styles/globals.css`
- Modify: `pages/_document.tsx`

- [ ] **Step 1: tailwind.config.ts 재작성**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: "#c4704b",
          light: "#d4906e",
          pale: "#e8c4b0",
          bg: "#f5ece6",
          dark: "#2a1f1a",
        },
        warm: {
          50: "#faf7f5",
          100: "#f5ece6",
          200: "#e5ddd7",
          800: "#1a1a1a",
          900: "#111111",
        },
      },
      fontFamily: {
        heading: [
          "Space Grotesk",
          "Pretendard Variable",
          "Pretendard",
          "sans-serif",
        ],
        sans: ["Inter", "Pretendard Variable", "Pretendard", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
```

- [ ] **Step 2: styles/globals.css 재작성**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: "Inter", "Pretendard Variable", "Pretendard", sans-serif;
    scroll-behavior: smooth;
  }

  body {
    @apply bg-warm-50 text-warm-800;
  }

  .dark body {
    @apply bg-warm-900 text-warm-100;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Space Grotesk", "Pretendard Variable", sans-serif;
    @apply font-bold;
  }
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #e5ddd7;
  border-radius: 999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #d4906e;
}

.dark ::-webkit-scrollbar-thumb {
  background: #2a2a2a;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #444;
}

/* Prose overrides for blog */
.prose a {
  @apply text-terracotta hover:text-terracotta-light transition-colors;
}

.prose code {
  font-family: "JetBrains Mono", monospace;
}
```

- [ ] **Step 3: pages/_document.tsx 업데이트**

```tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document(): JSX.Element {
  return (
    <Html lang="ko">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

- [ ] **Step 4: 빌드 확인**

```bash
npx next build 2>&1 | tail -20
```

Expected: 빌드 에러 없음 (컴포넌트 import 에러는 이후 태스크에서 해결)

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts styles/globals.css pages/_document.tsx
git commit -m "feat: new design system — terracotta palette, Space Grotesk/Inter fonts, Tailwind typography"
```

---

## Task 3: GSAP + Lenis 유틸 설정

**Files:**
- Create: `utils/gsap.ts`
- Create: `utils/lenis.ts`
- Modify: `pages/_app.tsx`

- [ ] **Step 1: utils/gsap.ts 생성**

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 2: utils/lenis.ts 생성**

```ts
import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "./gsap";

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}
```

Note: `gsap` import이 필요하므로 수정:

```ts
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}
```

- [ ] **Step 3: pages/_app.tsx에 Lenis 훅 추가**

```tsx
import type { AppProps } from "next/app";
import { ThemeProvider, LanguageProvider } from "../components/Components";
import { ToastProvider } from "../components/ui/Toast";
import { useLenis } from "../utils/lenis";
import "../styles/globals.css";
import "katex/dist/katex.min.css";

function AppContent({ Component, pageProps }: AppProps): JSX.Element {
  useLenis();

  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
}

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <AppContent Component={Component} pageProps={pageProps} />
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
```

- [ ] **Step 4: Commit**

```bash
git add utils/gsap.ts utils/lenis.ts pages/_app.tsx
git commit -m "feat: add GSAP ScrollTrigger + Lenis smooth scroll setup"
```

---

## Task 4: Logo 컴포넌트 재작성

**Files:**
- Rewrite: `components/ui/Logo.tsx`

- [ ] **Step 1: Logo.tsx 재작성**

```tsx
import React from "react";
import { useTheme } from "../features/ThemeContext";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const { theme } = useTheme();

  const dims = {
    sm: { icon: 28, fontSize: 20, gap: 8, height: 28 },
    md: { icon: 36, fontSize: 24, gap: 10, height: 36 },
    lg: { icon: 44, fontSize: 30, gap: 12, height: 44 },
  };

  const { icon, fontSize, gap, height } = dims[size];
  const rx = Math.round(icon * 0.25);
  const textColor = theme === "dark" ? "#f5ece6" : "#1a1a1a";
  const totalWidth = icon + gap + fontSize * 5;

  return (
    <svg
      width={totalWidth}
      height={height}
      viewBox={`0 0 ${totalWidth} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sungblab"
      role="img"
    >
      <rect width={icon} height={icon} rx={rx} fill="#c4704b" />
      <text
        x={icon / 2}
        y={icon / 2}
        dominantBaseline="central"
        textAnchor="middle"
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize={Math.round(icon * 0.55)}
        fontWeight="800"
        fill="#ffffff"
      >
        S
      </text>
      <text
        x={icon + gap}
        y={height * 0.72}
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize={fontSize}
        fontWeight="600"
        letterSpacing="-0.5"
        fill={textColor}
      >
        sungblab
      </text>
    </svg>
  );
};

export const LogoIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = "",
}) => {
  const rx = Math.round(size * 0.25);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sungblab icon"
      role="img"
    >
      <rect width={size} height={size} rx={rx} fill="#c4704b" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize={Math.round(size * 0.55)}
        fontWeight="800"
        fill="#ffffff"
      >
        S
      </text>
    </svg>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/Logo.tsx
git commit -m "feat: new S roundsquare logo with terracotta color"
```

---

## Task 5: Layout + Header + Footer 재작성

**Files:**
- Rewrite: `components/layout/Layout.tsx`
- Rewrite: `components/layout/Header.tsx`
- Rewrite: `components/layout/Footer.tsx`

- [ ] **Step 1: Layout.tsx 재작성**

```tsx
import React from "react";
import { useTheme } from "../features/ThemeContext";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`flex flex-col min-h-screen font-sans antialiased transition-colors duration-300 ${
        theme === "dark"
          ? "bg-warm-900 text-[#f5ece6]"
          : "bg-warm-50 text-warm-800"
      }`}
    >
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
```

- [ ] **Step 2: Header.tsx 재작성**

```tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../features/ThemeContext";
import { useLanguage } from "../features/LanguageContext";
import { Logo } from "../ui/Logo";

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, translate } = useLanguage();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  const navItems = [
    { href: "/", label: translate("nav.home") },
    { href: "/projects", label: translate("nav.projects") },
    { href: "/blog", label: translate("nav.blog") },
    { href: "/about", label: translate("nav.about") },
  ];

  const isActive = (href: string) =>
    href === "/" ? router.pathname === "/" : router.pathname.startsWith(href);

  const isDark = theme === "dark";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDark
              ? "bg-warm-900/80 backdrop-blur-xl border-b border-[#2a2a2a]"
              : "bg-warm-50/80 backdrop-blur-xl border-b border-warm-200"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" aria-label="Home">
            <Logo size="sm" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-terracotta"
                    : isDark
                      ? "text-[#888] hover:text-[#f5ece6]"
                      : "text-[#666] hover:text-warm-800"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-terracotta rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === "ko" ? "en" : "ko")}
              className={`text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${
                isDark
                  ? "text-[#888] hover:text-[#f5ece6] hover:bg-[#2a2a2a]"
                  : "text-[#666] hover:text-warm-800 hover:bg-warm-200"
              }`}
            >
              {language === "ko" ? "EN" : "KR"}
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-colors ${
                isDark
                  ? "text-[#888] hover:text-[#f5ece6] hover:bg-[#2a2a2a]"
                  : "text-[#666] hover:text-warm-800 hover:bg-warm-200"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`fixed inset-0 top-16 z-40 ${
              isDark ? "bg-warm-900/95" : "bg-warm-50/95"
            } backdrop-blur-xl`}
          >
            <nav className="flex flex-col items-center gap-8 pt-20">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-2xl font-heading font-bold ${
                    isActive(item.href)
                      ? "text-terracotta"
                      : isDark
                        ? "text-[#f5ece6]"
                        : "text-warm-800"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
```

- [ ] **Step 3: Footer.tsx 재작성**

```tsx
import React from "react";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { useTheme } from "../features/ThemeContext";
import { useLanguage } from "../features/LanguageContext";
import { Logo } from "../ui/Logo";

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { translate } = useLanguage();
  const isDark = theme === "dark";

  const navLinks = [
    { href: "/", label: translate("nav.home") },
    { href: "/projects", label: translate("nav.projects") },
    { href: "/blog", label: translate("nav.blog") },
    { href: "/about", label: translate("nav.about") },
  ];

  const socialLinks = [
    { href: "https://github.com/Sungblab", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer
      className={`border-t ${
        isDark ? "border-[#2a2a2a]" : "border-warm-200"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <Logo size="sm" />
            <p
              className={`mt-3 text-sm ${
                isDark ? "text-[#888]" : "text-[#666]"
              }`}
            >
              AI와 함께 만듭니다.
            </p>
          </div>

          <nav className="flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isDark
                    ? "text-[#888] hover:text-[#f5ece6]"
                    : "text-[#666] hover:text-warm-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-md transition-colors ${
                  isDark
                    ? "text-[#888] hover:text-[#f5ece6] hover:bg-[#2a2a2a]"
                    : "text-[#666] hover:text-warm-800 hover:bg-warm-200"
                }`}
                aria-label={link.label}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div
          className={`mt-8 pt-8 border-t text-sm text-center ${
            isDark
              ? "border-[#2a2a2a] text-[#555]"
              : "border-warm-200 text-[#999]"
          }`}
        >
          © {new Date().getFullYear()} sungblab
        </div>
      </div>
    </footer>
  );
};
```

- [ ] **Step 4: Commit**

```bash
git add components/layout/Layout.tsx components/layout/Header.tsx components/layout/Footer.tsx
git commit -m "feat: rewrite Layout/Header/Footer with terracotta theme and minimal design"
```

---

## Task 6: 홈페이지 섹션 — HeroSection

**Files:**
- Rewrite: `components/sections/HeroSection.tsx`

- [ ] **Step 1: HeroSection.tsx 재작성**

```tsx
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "../features/ThemeContext";
import { useLanguage } from "../features/LanguageContext";
import { gsap } from "../../utils/gsap";
import { ArrowDown } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const { translate } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-anim]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] ${
            isDark ? "bg-terracotta/10" : "bg-terracotta/5"
          }`}
        />
        <div
          className={`absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] ${
            isDark ? "bg-terracotta-pale/5" : "bg-terracotta-pale/10"
          }`}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1
          data-hero-anim
          className="font-heading text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          {translate("hero.title")}
        </h1>

        <p
          data-hero-anim
          className={`mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${
            isDark ? "text-[#888]" : "text-[#666]"
          }`}
        >
          {translate("hero.description")}
        </p>

        <div data-hero-anim className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="https://univmind.me"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-terracotta text-white rounded-lg font-medium text-sm hover:bg-terracotta-light transition-colors"
          >
            UnivMind 보기
          </Link>
          <Link
            href="/blog"
            className={`px-6 py-3 rounded-lg font-medium text-sm border transition-colors ${
              isDark
                ? "border-[#2a2a2a] text-[#f5ece6] hover:bg-[#1a1a1a]"
                : "border-warm-200 text-warm-800 hover:bg-white"
            }`}
          >
            {translate("hero.blog")}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero-anim
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ArrowDown
          size={20}
          className={isDark ? "text-[#555]" : "text-[#ccc]"}
        />
      </div>
    </section>
  );
};
```

- [ ] **Step 2: translations.ts에 새 hero 카피 추가**

`utils/translations.ts`의 `ko.hero`와 `en.hero` 업데이트:

```ts
// ko.hero에 추가/변경:
hero: {
  title: "AI와 함께 만듭니다",
  description: "중3 때 ChatGPT를 만나고, 18살부터 Claude와 바이브코딩. 지금은 AI 서비스를 직접 만들고 운영합니다.",
  blog: "블로그 읽기",
  // 기존 키 유지 (다른 페이지에서 참조할 수 있으므로)
},

// en.hero에 추가/변경:
hero: {
  title: "Building with AI",
  description: "Met ChatGPT in middle school, started vibe-coding with Claude at 18. Now I build and run AI services.",
  blog: "Read Blog",
},
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/HeroSection.tsx utils/translations.ts
git commit -m "feat: new HeroSection with GSAP text reveal and terracotta gradient"
```

---

## Task 7: UnivMindSection (신규)

**Files:**
- Create: `components/sections/UnivMindSection.tsx`

- [ ] **Step 1: UnivMindSection.tsx 생성**

```tsx
import React, { useEffect, useRef } from "react";
import { useTheme } from "../features/ThemeContext";
import { gsap, ScrollTrigger } from "../../utils/gsap";
import { ExternalLink } from "lucide-react";

export const UnivMindSection: React.FC = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-um-left]", {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from("[data-um-right]", {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    "멀티 AI 모델 통합 (Claude, Gemini, DeepSeek, Perplexity)",
    "대학생 맞춤 학습 도우미",
    "실시간 AI 채팅 인터페이스",
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text */}
          <div data-um-left>
            <span className="text-terracotta text-sm font-medium tracking-wide uppercase">
              Featured Project
            </span>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl font-bold tracking-tight">
              UnivMind
            </h2>
            <p
              className={`mt-4 text-base leading-relaxed ${
                isDark ? "text-[#888]" : "text-[#666]"
              }`}
            >
              대학생을 위한 AI 학습 플랫폼. 여러 AI 모델을 하나의 인터페이스에서
              사용할 수 있습니다.
            </p>

            <ul className="mt-6 space-y-3">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 text-sm ${
                    isDark ? "text-[#aaa]" : "text-[#555]"
                  }`}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="https://univmind.me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 bg-terracotta text-white rounded-lg font-medium text-sm hover:bg-terracotta-light transition-colors"
            >
              서비스 바로가기
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Browser mockup */}
          <div data-um-right>
            <div
              className={`rounded-xl overflow-hidden border ${
                isDark ? "border-[#2a2a2a]" : "border-warm-200"
              }`}
            >
              {/* Browser bar */}
              <div
                className={`flex items-center gap-2 px-4 py-3 ${
                  isDark ? "bg-[#1a1a1a]" : "bg-warm-100"
                }`}
              >
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div
                  className={`flex-1 text-center text-xs ${
                    isDark ? "text-[#555]" : "text-[#999]"
                  }`}
                >
                  univmind.me
                </div>
              </div>
              {/* Screenshot placeholder */}
              <div
                className={`aspect-[16/10] flex items-center justify-center ${
                  isDark
                    ? "bg-gradient-to-br from-[#1a1a1a] to-terracotta-dark"
                    : "bg-gradient-to-br from-warm-50 to-terracotta-bg"
                }`}
              >
                <span className="font-heading text-4xl font-bold text-terracotta/30">
                  UnivMind
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/UnivMindSection.tsx
git commit -m "feat: add UnivMind featured project section with scroll animations"
```

---

## Task 8: ProjectsSection + BlogPreviewSection + ContactSection

**Files:**
- Rewrite: `components/sections/BlogPreviewSection.tsx`
- Rewrite: `components/sections/ContactSection.tsx`
- Create or rewrite: `components/sections/ProjectsSection.tsx` (이전에 `FeaturedProjectsSection.tsx`를 대체)

- [ ] **Step 1: ProjectsSection.tsx 작성**

```tsx
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useTheme } from "../features/ThemeContext";
import { useLanguage } from "../features/LanguageContext";
import { gsap, ScrollTrigger } from "../../utils/gsap";
import { ArrowRight } from "lucide-react";
import type { Project } from "../../data/projects";

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
}) => {
  const { theme } = useTheme();
  const { translate, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-project-card]", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const displayProjects = projects.slice(0, 6);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-terracotta text-sm font-medium tracking-wide uppercase">
              Projects
            </span>
            <h2 className="mt-2 font-heading text-3xl md:text-4xl font-bold tracking-tight">
              {translate("projects.title")}
            </h2>
          </div>
          <Link
            href="/projects"
            className={`hidden md:flex items-center gap-1 text-sm font-medium transition-colors ${
              isDark
                ? "text-[#888] hover:text-terracotta"
                : "text-[#666] hover:text-terracotta"
            }`}
          >
            {translate("projects.viewAll") || "전체 보기"}
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-project-card
              whileHover={{ y: -4 }}
              className={`block rounded-xl overflow-hidden border transition-shadow hover:shadow-lg ${
                isDark
                  ? "bg-[#1a1a1a] border-[#2a2a2a]"
                  : "bg-white border-warm-200"
              }`}
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <Image
                  src={
                    typeof project.image === "string"
                      ? project.image
                      : project.image
                  }
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-base">
                  {project.title}
                </h3>
                <p
                  className={`mt-1.5 text-sm line-clamp-2 ${
                    isDark ? "text-[#888]" : "text-[#666]"
                  }`}
                >
                  {language === "en" && project.description_en
                    ? project.description_en
                    : project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className={`text-xs px-2 py-0.5 rounded ${
                        isDark
                          ? "bg-terracotta-dark text-terracotta-light"
                          : "bg-terracotta-bg text-terracotta"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-terracotta"
          >
            전체 보기
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: BlogPreviewSection.tsx 재작성**

```tsx
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useTheme } from "../features/ThemeContext";
import { useLanguage } from "../features/LanguageContext";
import { gsap } from "../../utils/gsap";
import { ArrowRight } from "lucide-react";
import type { Post } from "../../utils/mdx";

interface BlogPreviewSectionProps {
  posts: Post[];
}

export const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({
  posts,
}) => {
  const { theme } = useTheme();
  const { translate } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-blog-card]", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const displayPosts = posts.slice(0, 3);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-terracotta text-sm font-medium tracking-wide uppercase">
              Blog
            </span>
            <h2 className="mt-2 font-heading text-3xl md:text-4xl font-bold tracking-tight">
              {translate("blog.title")}
            </h2>
          </div>
          <Link
            href="/blog"
            className={`hidden md:flex items-center gap-1 text-sm font-medium transition-colors ${
              isDark
                ? "text-[#888] hover:text-terracotta"
                : "text-[#666] hover:text-terracotta"
            }`}
          >
            전체 보기
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayPosts.map((post) => (
            <motion.div key={post.slug} data-blog-card whileHover={{ y: -4 }}>
              <Link
                href={`/blog/${post.slug}`}
                className={`block rounded-xl p-6 border transition-shadow hover:shadow-lg h-full ${
                  isDark
                    ? "bg-[#1a1a1a] border-[#2a2a2a]"
                    : "bg-white border-warm-200"
                }`}
              >
                <span
                  className={`text-xs ${
                    isDark ? "text-[#555]" : "text-[#999]"
                  }`}
                >
                  {post.date}
                </span>
                <h3 className="mt-2 font-heading font-bold text-base line-clamp-2">
                  {post.title}
                </h3>
                <p
                  className={`mt-2 text-sm line-clamp-3 ${
                    isDark ? "text-[#888]" : "text-[#666]"
                  }`}
                >
                  {post.excerpt}
                </p>
                {post.category && (
                  <span
                    className={`inline-block mt-4 text-xs px-2 py-0.5 rounded ${
                      isDark
                        ? "bg-terracotta-dark text-terracotta-light"
                        : "bg-terracotta-bg text-terracotta"
                    }`}
                  >
                    {post.category}
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-terracotta"
          >
            전체 보기
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 3: ContactSection.tsx 재작성**

```tsx
import React, { useEffect, useRef } from "react";
import { useTheme } from "../features/ThemeContext";
import { useLanguage } from "../features/LanguageContext";
import { gsap } from "../../utils/gsap";
import { Github, Linkedin, Mail } from "lucide-react";

export const ContactSection: React.FC = () => {
  const { theme } = useTheme();
  const { translate } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-contact-anim]", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2
          data-contact-anim
          className="font-heading text-3xl md:text-4xl font-bold tracking-tight"
        >
          {translate("contact.title")}
        </h2>
        <p
          data-contact-anim
          className={`mt-4 text-base ${
            isDark ? "text-[#888]" : "text-[#666]"
          }`}
        >
          {translate("contact.description")}
        </p>

        <a
          data-contact-anim
          href="mailto:sungblab1119@gmail.com"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-terracotta text-white rounded-lg font-medium text-sm hover:bg-terracotta-light transition-colors"
        >
          <Mail size={16} />
          sungblab1119@gmail.com
        </a>

        <div data-contact-anim className="flex justify-center gap-4 mt-6">
          <a
            href="https://github.com/Sungblab"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-lg transition-colors ${
              isDark
                ? "text-[#888] hover:text-[#f5ece6] hover:bg-[#1a1a1a]"
                : "text-[#666] hover:text-warm-800 hover:bg-warm-100"
            }`}
            aria-label="GitHub"
          >
            <Github size={22} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-lg transition-colors ${
              isDark
                ? "text-[#888] hover:text-[#f5ece6] hover:bg-[#1a1a1a]"
                : "text-[#666] hover:text-warm-800 hover:bg-warm-100"
            }`}
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/ProjectsSection.tsx components/sections/BlogPreviewSection.tsx components/sections/ContactSection.tsx
git commit -m "feat: rewrite Projects/BlogPreview/Contact sections with GSAP animations"
```

---

## Task 9: 홈페이지 조립 + 파일 정리

**Files:**
- Modify: `pages/index.tsx`
- Modify: `components/Components.tsx`
- Delete: `components/ui/Button.tsx`, `components/ui/Card.tsx`, `components/ui/SocialButton.tsx`, `components/sections/SkillsSection.tsx`, `components/sections/FeaturedProjectsSection.tsx`

- [ ] **Step 1: pages/index.tsx 재작성**

```tsx
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Layout } from "../components/layout/Layout";
import { HeroSection } from "../components/sections/HeroSection";
import { UnivMindSection } from "../components/sections/UnivMindSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { BlogPreviewSection } from "../components/sections/BlogPreviewSection";
import { ContactSection } from "../components/sections/ContactSection";
import { SEO } from "../components/SEO";
import { getAllPosts, Post } from "../utils/mdx";
import { getGitHubRepos } from "../utils/github";
import type { Project } from "../data/projects";

interface HomeProps {
  posts: Post[];
  projects: Project[];
}

const Home: NextPage<HomeProps> = ({ posts, projects }) => {
  return (
    <Layout>
      <SEO />
      <HeroSection />
      <UnivMindSection />
      <ProjectsSection projects={projects} />
      <BlogPreviewSection posts={posts} />
      <ContactSection />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = getAllPosts().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let projects: Project[] = [];
  try {
    const repos = await getGitHubRepos("Sungblab", 100);
    projects = repos
      .filter((repo: any) => !repo.fork)
      .map((repo: any, index: number) => ({
        id: index,
        title: repo.name,
        description: repo.description || "",
        link: repo.html_url,
        image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
        technologies: [repo.language, ...(repo.topics || [])].filter(Boolean),
        date: repo.created_at?.split("T")[0] || "",
      }));
  } catch (error) {
    console.error("GitHub API error:", error);
  }

  return {
    props: { posts, projects },
    revalidate: 3600,
  };
};

export default Home;
```

- [ ] **Step 2: 사용하지 않는 파일 삭제**

```bash
rm -f components/ui/Button.tsx components/ui/Card.tsx components/ui/SocialButton.tsx
rm -f components/sections/SkillsSection.tsx components/sections/FeaturedProjectsSection.tsx
```

- [ ] **Step 3: Components.tsx 배럴 export 정리**

```tsx
export * from "./features/ThemeContext";
export * from "./features/LanguageContext";
export * from "./layout/Header";
export * from "./layout/Footer";
export * from "./layout/Layout";
export * from "./ui/Tag";
export * from "./features/ProjectCard";
export * from "./features/Comments";
export { default as ContentDisplay } from "./features/ContentDisplay";
```

- [ ] **Step 4: Commit**

```bash
git add pages/index.tsx components/Components.tsx
git add -u components/ui/Button.tsx components/ui/Card.tsx components/ui/SocialButton.tsx components/sections/SkillsSection.tsx components/sections/FeaturedProjectsSection.tsx
git commit -m "feat: assemble new homepage layout, remove unused components"
```

---

## Task 10: 서브 페이지 스타일 업데이트 — About

**Files:**
- Modify: `pages/about.tsx`

- [ ] **Step 1: about.tsx 재작성**

기존 로직 유지하면서 스타일과 구조 변경. 타임라인 추가, 스킬 뱃지 형태. 전체 코드:

```tsx
import React, { useEffect, useRef } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Layout } from "../components/layout/Layout";
import { SEO } from "../components/SEO";
import { useTheme } from "../components/features/ThemeContext";
import { useLanguage } from "../components/features/LanguageContext";
import { gsap } from "../utils/gsap";

const GiscusComponent = dynamic(() => import("../components/features/Comments"), {
  ssr: false,
});

const timeline = [
  { year: "2022", label: "ChatGPT 첫 만남", desc: "중3, AI의 가능성을 처음 느끼다" },
  { year: "2023", label: "바이브코딩 시작", desc: "Claude & Cursor로 본격 개발" },
  { year: "2024", label: "sungblab AI 런칭", desc: "교육용 멀티 AI 챗봇 서비스" },
  { year: "2025", label: "UnivMind 운영", desc: "대학생 AI 학습 플랫폼" },
];

const skills = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "Tailwind CSS", "MongoDB", "PostgreSQL", "LLM/NLP", "Claude API",
];

const About: NextPage = () => {
  const { theme } = useTheme();
  const { translate } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-about-anim]", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Layout>
      <SEO title="About" />
      <div ref={sectionRef} className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Profile */}
          <div data-about-anim className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-terracotta/30">
              <Image
                src="/img/sb.jpg"
                alt="Sungbin Kim"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold">
                {translate("about.name")}
              </h1>
              <p className={`text-sm ${isDark ? "text-[#888]" : "text-[#666]"}`}>
                AI Builder & Vibe Coder
              </p>
            </div>
          </div>

          {/* Intro */}
          <p
            data-about-anim
            className={`mt-8 text-base leading-relaxed ${
              isDark ? "text-[#aaa]" : "text-[#555]"
            }`}
          >
            {translate("about.intro1")}
          </p>

          {/* Timeline */}
          <div data-about-anim className="mt-12">
            <h2 className="font-heading text-xl font-bold mb-6">Journey</h2>
            <div className="space-y-6">
              {timeline.map((item) => (
                <div key={item.year} className="flex gap-4">
                  <span className="text-terracotta font-mono text-sm font-medium w-12 flex-shrink-0 pt-0.5">
                    {item.year}
                  </span>
                  <div
                    className={`border-l-2 pl-4 pb-2 ${
                      isDark ? "border-[#2a2a2a]" : "border-warm-200"
                    }`}
                  >
                    <h3 className="font-medium text-sm">{item.label}</h3>
                    <p
                      className={`text-sm mt-0.5 ${
                        isDark ? "text-[#888]" : "text-[#666]"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div data-about-anim className="mt-12">
            <h2 className="font-heading text-xl font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className={`text-sm px-3 py-1 rounded-lg ${
                    isDark
                      ? "bg-[#1a1a1a] text-[#aaa] border border-[#2a2a2a]"
                      : "bg-white text-[#555] border border-warm-200"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub Stats */}
          <div data-about-anim className="mt-12">
            <h2 className="font-heading text-xl font-bold mb-4">GitHub</h2>
            <div className="space-y-4">
              <img
                src={`https://ghchart.rshah.org/c4704b/Sungblab`}
                alt="GitHub contribution graph"
                className="w-full rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={`https://github-profile-summary-cards.vercel.app/api/cards/stats?username=Sungblab&theme=${isDark ? "github_dark" : "default"}`}
                  alt="GitHub stats"
                  className="w-full rounded-lg"
                />
                <img
                  src={`https://streak-stats.demolab.com?user=Sungblab&theme=${isDark ? "dark" : "default"}&hide_border=true`}
                  alt="GitHub streak"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Guestbook */}
          <div data-about-anim className="mt-16">
            <h2 className="font-heading text-xl font-bold mb-4">
              {translate("about.guestbookTitle")}
            </h2>
            <GiscusComponent />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
```

- [ ] **Step 2: Commit**

```bash
git add pages/about.tsx
git commit -m "feat: redesign About page with timeline, skill badges, terracotta theme"
```

---

## Task 11: 서브 페이지 스타일 업데이트 — Projects, Blog, Guestbook

**Files:**
- Modify: `pages/projects.tsx`
- Modify: `pages/blog/index.tsx`
- Modify: `pages/blog/[slug].tsx`
- Modify: `pages/guestbook.tsx`

- [ ] **Step 1: pages/projects.tsx 스타일 업데이트**

기존 로직(검색, 필터, getStaticProps) 유지. 컬러 클래스만 교체:
- `bg-gray-900` → `bg-warm-900`
- `bg-gray-800` → `bg-[#1a1a1a]`
- `bg-gray-50` → `bg-warm-50`
- `bg-white` → `bg-white`
- `text-gray-*` → 적절한 warm/테라코타 색상
- `purple-*` → `terracotta*`
- `indigo-*` → `terracotta*`
- `border-gray-700` → `border-[#2a2a2a]`
- `border-gray-200` → `border-warm-200`
- `framer-motion` import → `motion/react`
- `react-icons/*` → `lucide-react`
- AnimatedSection 인라인 정의 유지 (motion 사용)

`import { motion } from "framer-motion"` → `import { motion } from "motion/react"`

styled-components 제거 (inline Tailwind). spotlight effect 유지 but 색상 변경.

- [ ] **Step 2: pages/blog/index.tsx 스타일 업데이트**

같은 패턴: 컬러 클래스 교체 + import 경로 변경.

- `framer-motion` → `motion/react`
- `purple/indigo` → `terracotta`
- `gray-900/800/700` → `warm-900`/`[#1a1a1a]`/`[#2a2a2a]`
- `gray-50/100/200` → `warm-50`/`warm-100`/`warm-200`

- [ ] **Step 3: pages/blog/[slug].tsx 스타일 업데이트**

같은 패턴. 추가로:
- prose 링크 색상: `text-purple-*` → `text-terracotta`
- 읽기 진행바: `bg-purple-*` → `bg-terracotta`
- TOC active: `text-purple-*` → `text-terracotta`
- `framer-motion` → `motion/react`

- [ ] **Step 4: pages/guestbook.tsx 스타일 업데이트**

같은 컬러 패턴 교체.

- [ ] **Step 5: Commit**

```bash
git add pages/projects.tsx pages/blog/index.tsx pages/blog/[slug].tsx pages/guestbook.tsx
git commit -m "feat: update sub-pages with terracotta theme and motion imports"
```

---

## Task 12: MDXComponents + 남은 import 정리

**Files:**
- Modify: `components/MDXComponents.tsx` (blog/[slug]의 인라인 MDX 컴포넌트 스타일)
- Modify: any remaining files with old imports

- [ ] **Step 1: 모든 파일에서 framer-motion import 검색 및 교체**

```bash
grep -r "framer-motion" --include="*.tsx" --include="*.ts" -l
```

모든 파일에서 `from "framer-motion"` → `from "motion/react"` 교체.

- [ ] **Step 2: 모든 파일에서 react-icons import 검색 및 교체**

```bash
grep -r "react-icons" --include="*.tsx" --include="*.ts" -l
```

해당 아이콘을 lucide-react 등가물로 교체.

- [ ] **Step 3: 모든 파일에서 @heroicons import 검색 및 교체**

```bash
grep -r "@heroicons" --include="*.tsx" --include="*.ts" -l
```

lucide-react로 교체.

- [ ] **Step 4: 모든 파일에서 styled-components import 검색**

```bash
grep -r "styled-components" --include="*.tsx" --include="*.ts" -l
```

해당 컴포넌트를 Tailwind 인라인 스타일로 교체.

- [ ] **Step 5: 빌드 확인**

```bash
npx next build 2>&1 | tail -30
```

Expected: 빌드 성공. 에러 있으면 여기서 수정.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "fix: migrate all imports — motion/react, lucide-react, remove styled-components"
```

---

## Task 13: 최종 빌드 + 정리

**Files:**
- Modify: any files with build errors
- Delete: `style-test.html` (브레인스토밍 임시 파일)

- [ ] **Step 1: 클린 빌드**

```bash
npm run clean && npm run build 2>&1 | tail -40
```

Expected: 빌드 성공

- [ ] **Step 2: 임시 파일 정리**

```bash
rm -f style-test.html
```

- [ ] **Step 3: dev 서버로 시각 확인**

```bash
npm run dev
```

브라우저에서 http://localhost:3000 열어서 확인:
- 홈: Hero → UnivMind → Projects → Blog → Contact
- 다크/라이트 토글 동작
- 한/영 전환 동작
- 스무스 스크롤 동작
- 블로그 포스트 페이지 확인
- About 페이지 타임라인 확인

- [ ] **Step 4: 최종 Commit**

```bash
git add -A
git commit -m "chore: cleanup temp files, final build verification"
```
