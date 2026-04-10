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
      className="relative min-h-screen min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute top-1/4 -left-1/4 w-[min(600px,80vw)] h-[min(600px,80vw)] rounded-full blur-[120px] ${
            isDark ? "bg-terracotta/10" : "bg-terracotta/5"
          }`}
        />
        <div
          className={`absolute bottom-1/4 -right-1/4 w-[min(500px,70vw)] h-[min(500px,70vw)] rounded-full blur-[120px] ${
            isDark ? "bg-terracotta-pale/5" : "bg-terracotta-pale/10"
          }`}
        />
      </div>

      <div className="w-full max-w-4xl mx-auto px-5 sm:px-6 text-center">
        {/* Eyebrow badge */}
        <div data-hero-anim className="inline-flex items-center gap-2 mb-6">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
            isDark
              ? "bg-terracotta/10 border-terracotta/30 text-terracotta-light"
              : "bg-terracotta-bg border-terracotta/20 text-terracotta"
          }`}>
            AI Builder & Vibe Coder
          </span>
        </div>

        <h1
          data-hero-anim
          className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] break-keep"
          suppressHydrationWarning
        >
          {translate("hero.title").split("AI").map((part, i, arr) =>
            i < arr.length - 1 ? (
              <React.Fragment key={i}>
                {part}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-terracotta to-terracotta-light">
                  AI
                </span>
              </React.Fragment>
            ) : (
              <React.Fragment key={i}>{part}</React.Fragment>
            )
          )}
        </h1>

        <p
          data-hero-anim
          className={`mt-6 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed break-keep ${
            isDark ? "text-warm-500" : "text-warm-700"
          }`}
        >
          {translate("hero.description").split("\n").map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>

        <div data-hero-anim className="mt-8 sm:mt-10 flex items-center justify-center gap-3 sm:gap-4">
          <Link
            href="https://univmind.net"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-6 py-3 bg-terracotta text-white rounded-xl font-medium text-sm hover:bg-terracotta-light transition-all duration-200 hover:shadow-lg hover:shadow-terracotta/20 hover:-translate-y-0.5"
          >
            UnivMind 보기
          </Link>
          <Link
            href="/blog"
            className={`px-6 py-3 rounded-xl font-medium text-sm border transition-all duration-200 hover:-translate-y-0.5 ${
              isDark
                ? "border-warm-850 text-warm-100 hover:bg-warm-800 hover:border-warm-700"
                : "border-warm-200 text-warm-800 hover:bg-white hover:shadow-md hover:border-warm-300"
            }`}
          >
            {translate("hero.blog")}
          </Link>
        </div>

        {/* Stats bar */}
        <div data-hero-anim className={`mt-12 flex items-center justify-center gap-8 text-sm ${isDark ? "text-warm-600" : "text-warm-500"}`}>
          <div className="flex flex-col items-center gap-0.5">
            <span className={`font-bold text-lg font-heading ${isDark ? "text-warm-200" : "text-warm-800"}`}>18+</span>
            <span>Projects</span>
          </div>
          <div className={`w-px h-8 ${isDark ? "bg-warm-800" : "bg-warm-200"}`} />
          <div className="flex flex-col items-center gap-0.5">
            <span className={`font-bold text-lg font-heading ${isDark ? "text-warm-200" : "text-warm-800"}`}>3+</span>
            <span>Years</span>
          </div>
          <div className={`w-px h-8 ${isDark ? "bg-warm-800" : "bg-warm-200"}`} />
          <div className="flex flex-col items-center gap-0.5">
            <span className={`font-bold text-lg font-heading ${isDark ? "text-warm-200" : "text-warm-800"}`}>AI-First</span>
            <span>Builder</span>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        data-hero-anim
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce motion-reduce:animate-none"
      >
        <ArrowDown
          size={20}
          className={isDark ? "text-warm-700" : "text-warm-400"}
        />
      </div>
    </section>
  );
};
