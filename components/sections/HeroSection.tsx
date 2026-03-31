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
          {translate("hero.description").split("\n").map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>

        <div data-hero-anim className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="https://univmind.net"
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
