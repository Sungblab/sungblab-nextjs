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
        <h1
          data-hero-anim
          className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] break-keep"
        >
          {translate("hero.title")}
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
            className="px-5 sm:px-6 py-3 bg-terracotta text-white rounded-lg font-medium text-sm hover:bg-terracotta-light transition-colors"
          >
            UnivMind 보기
          </Link>
          <Link
            href="/blog"
            className={`px-5 sm:px-6 py-3 rounded-lg font-medium text-sm border transition-colors ${
              isDark
                ? "border-warm-850 text-warm-100 hover:bg-warm-800"
                : "border-warm-200 text-warm-800 hover:bg-white"
            }`}
          >
            {translate("hero.blog")}
          </Link>
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
