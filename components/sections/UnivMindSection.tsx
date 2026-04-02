import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "../features/ThemeContext";
import { useLanguage } from "../features/LanguageContext";
import { gsap } from "../../utils/gsap";
import { ExternalLink } from "lucide-react";
import { translations } from "../../utils/translations";

export const UnivMindSection: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
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

  const t = translations[language].univmind as {
    tagline: string;
    description: string;
    features: string[];
    cta: string;
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid sm:grid-cols-2 gap-12 md:gap-16 items-center">
          <div data-um-left>
            <span className="text-terracotta text-sm font-medium tracking-wide uppercase">
              Featured Project
            </span>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl font-bold tracking-tight">
              UnivMind
            </h2>
            <p
              className={`mt-4 text-lg leading-relaxed ${
                isDark ? "text-warm-300" : "text-warm-700"
              }`}
            >
              {t.tagline}
            </p>
            <p
              className={`mt-2 text-sm leading-relaxed ${
                isDark ? "text-warm-500" : "text-warm-700"
              }`}
            >
              {t.description}
            </p>

            <ul className="mt-6 space-y-3">
              {t.features.map((feature, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 text-sm ${
                    isDark ? "text-warm-400" : "text-warm-600"
                  }`}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="https://univmind.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 bg-terracotta text-white rounded-lg font-medium text-sm hover:bg-terracotta-light transition-colors"
            >
              {t.cta}
              <ExternalLink size={14} />
            </a>
          </div>

          <div data-um-right>
            <div
              className={`rounded-xl overflow-hidden border shadow-lg ${
                isDark ? "border-warm-850" : "border-warm-200"
              }`}
            >
              {/* Browser bar */}
              <div
                className={`flex items-center gap-2 px-4 py-3 ${
                  isDark ? "bg-warm-800" : "bg-warm-100"
                }`}
              >
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div
                  className={`flex-1 text-center text-xs ${
                    isDark ? "text-warm-600" : "text-warm-500"
                  }`}
                >
                  univmind.net
                </div>
              </div>
              {/* Screenshot */}
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/univmind.png"
                  alt="UnivMind - AI 학습 플랫폼"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
