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

          <div data-um-right>
            <div
              className={`rounded-xl overflow-hidden border ${
                isDark ? "border-[#2a2a2a]" : "border-warm-200"
              }`}
            >
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
