import React, { useEffect, useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { Layout } from "../components/layout/Layout";
import SEO from "../components/SEO";
import { useTheme } from "../components/features/ThemeContext";
import { useLanguage } from "../components/features/LanguageContext";
import { gsap } from "../utils/gsap";

const timeline = [
  {
    year: "2022",
    label: "ChatGPT 첫 만남",
    desc: "중3, AI의 가능성을 처음 느끼다",
    emoji: "🤖",
  },
  {
    year: "2023",
    label: "바이브코딩 시작",
    desc: "Claude & Cursor로 본격 개발",
    emoji: "⚡",
  },
  {
    year: "2024",
    label: "sungblab AI 런칭",
    desc: "교육용 멀티 AI 챗봇 서비스",
    emoji: "🚀",
  },
  {
    year: "2025",
    label: "UnivMind 운영",
    desc: "대학생 AI 학습 플랫폼",
    emoji: "🎓",
  },
];

const skillGroups = [
  {
    label: "Frontend",
    color: "blue" as const,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    color: "green" as const,
    skills: ["Node.js", "Python", "MongoDB", "PostgreSQL"],
  },
  {
    label: "AI / ML",
    color: "orange" as const,
    skills: ["LLM/NLP", "Claude API", "OpenAI API", "Prompt Engineering"],
  },
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
      <SEO title={`About | Sungblab`} description={translate("about.intro1")} />
      <div ref={sectionRef} className="pt-32 sm:pt-40 pb-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">

          {/* Profile Hero */}
          <div data-about-anim className={`relative rounded-2xl p-8 sm:p-10 mb-12 overflow-hidden ${
            isDark ? "bg-warm-800/50 border border-warm-850" : "bg-white border border-warm-200 shadow-sm"
          }`}>
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-terracotta/5 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-8">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-terracotta to-terracotta-pale opacity-40 blur-sm" />
                <div className="relative w-28 h-28 rounded-full overflow-hidden ring-2 ring-terracotta/30">
                  <Image
                    src="/images/sb.jpg"
                    alt="Sungbin Kim"
                    width={112}
                    height={112}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="text-center sm:text-left">
                <h1 className={`font-heading text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                  isDark ? "from-warm-100 to-terracotta-light" : "from-warm-900 to-terracotta"
                }`}>
                  {translate("about.name")}
                </h1>
                <p className={`mt-1.5 text-sm font-medium ${isDark ? "text-warm-500" : "text-warm-600"}`}>
                  AI Builder & Vibe Coder
                </p>
                <p className={`mt-4 text-sm leading-relaxed ${isDark ? "text-warm-400" : "text-warm-600"}`}>
                  {translate("about.intro1")}
                </p>

                {/* Quick links */}
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-5">
                  <a
                    href="https://github.com/Sungblab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors ${
                      isDark
                        ? "border-warm-850 text-warm-400 hover:text-warm-100 hover:border-warm-700"
                        : "border-warm-200 text-warm-600 hover:text-warm-900 hover:border-warm-300"
                    }`}
                  >
                    GitHub
                  </a>
                  <a
                    href="mailto:sungblab@gmail.com"
                    className="text-xs px-3 py-1.5 rounded-lg font-medium bg-terracotta text-white hover:bg-terracotta-light transition-colors"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className={`relative mt-8 pt-6 border-t flex items-center justify-around sm:justify-start sm:gap-12 ${
              isDark ? "border-warm-850" : "border-warm-100"
            }`}>
              {[
                { value: "18+", label: "Projects" },
                { value: "3+", label: "Years" },
                { value: "2026", label: "Current" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className={`font-heading font-bold text-xl ${isDark ? "text-warm-100" : "text-warm-900"}`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs mt-0.5 ${isDark ? "text-warm-600" : "text-warm-500"}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div data-about-anim className="mt-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">Journey</h2>
            <div className="relative">
              {/* Vertical line */}
              <div className={`absolute left-[22px] top-2 bottom-2 w-px ${isDark ? "bg-warm-850" : "bg-warm-200"}`} />

              <div className="space-y-8">
                {timeline.map((item, idx) => (
                  <div key={item.year} className="relative flex gap-6 pl-2">
                    {/* Dot + emoji */}
                    <div className="relative flex-shrink-0 w-11 h-11 flex items-center justify-center">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center text-lg border-2 z-10 relative ${
                        idx === timeline.length - 1
                          ? "bg-terracotta border-terracotta text-white shadow-lg shadow-terracotta/30"
                          : isDark
                          ? "bg-warm-800 border-warm-700"
                          : "bg-white border-warm-200 shadow-sm"
                      }`}>
                        {item.emoji}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 pb-2 pt-1.5`}>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-terracotta font-mono text-xs font-bold tracking-wider">
                          {item.year}
                        </span>
                        <h3 className={`font-semibold text-sm ${isDark ? "text-warm-200" : "text-warm-800"}`}>
                          {item.label}
                        </h3>
                      </div>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-warm-500" : "text-warm-600"}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills — grouped */}
          <div data-about-anim className="mt-14">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">Skills</h2>
            <div className="space-y-6">
              {skillGroups.map((group) => {
                const colorMap = {
                  blue: {
                    label: isDark ? "text-blue-400" : "text-blue-600",
                    tag: isDark
                      ? "bg-blue-500/10 text-blue-300 border-blue-500/20"
                      : "bg-blue-50 text-blue-700 border-blue-100",
                  },
                  green: {
                    label: isDark ? "text-emerald-400" : "text-emerald-600",
                    tag: isDark
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                      : "bg-emerald-50 text-emerald-700 border-emerald-100",
                  },
                  orange: {
                    label: isDark ? "text-terracotta-light" : "text-terracotta",
                    tag: isDark
                      ? "bg-terracotta/10 text-terracotta-light border-terracotta/20"
                      : "bg-terracotta-bg text-terracotta border-terracotta/20",
                  },
                };
                const c = colorMap[group.color];
                return (
                  <div key={group.label}>
                    <span className={`text-xs font-bold uppercase tracking-widest ${c.label}`}>
                      {group.label}
                    </span>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`text-sm px-3 py-1 rounded-lg border ${c.tag}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* GitHub Stats */}
          <div data-about-anim className="mt-14">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">GitHub</h2>
            <div className={`rounded-2xl p-6 border space-y-4 ${
              isDark ? "bg-warm-800/30 border-warm-850" : "bg-white border-warm-200 shadow-sm"
            }`}>
              <img
                src="https://ghchart.rshah.org/c4704b/Sungblab"
                alt="GitHub contribution graph for Sungblab"
                width={800}
                height={128}
                loading="lazy"
                className="w-full rounded-lg"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <img
                  src={`https://github-profile-summary-cards.vercel.app/api/cards/stats?username=Sungblab&theme=${
                    isDark ? "github_dark" : "default"
                  }`}
                  alt="GitHub stats for Sungblab"
                  width={400}
                  height={200}
                  loading="lazy"
                  className="w-full rounded-lg"
                />
                <img
                  src={`https://streak-stats.demolab.com?user=Sungblab&theme=${
                    isDark ? "dark" : "default"
                  }&hide_border=true`}
                  alt="GitHub streak stats for Sungblab"
                  width={400}
                  height={200}
                  loading="lazy"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default About;
