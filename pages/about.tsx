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
  },
  {
    year: "2023",
    label: "바이브코딩 시작",
    desc: "Claude & Cursor로 본격 개발",
  },
  {
    year: "2024",
    label: "sungblab AI 런칭",
    desc: "교육용 멀티 AI 챗봇 서비스",
  },
  {
    year: "2025",
    label: "UnivMind 운영",
    desc: "대학생 AI 학습 플랫폼",
  },
];

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Tailwind CSS",
  "MongoDB",
  "PostgreSQL",
  "LLM/NLP",
  "Claude API",
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
      <div ref={sectionRef} className="pt-32 sm:pt-40 pb-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          {/* Profile */}
          <div data-about-anim className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-terracotta/30">
              <Image
                src="/images/sb.jpg"
                alt="Sungbin Kim"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold">
                {translate("about.name")}
              </h1>
              <p
                className={`text-sm ${
                  isDark ? "text-warm-500" : "text-warm-700"
                }`}
              >
                AI Builder & Vibe Coder
              </p>
            </div>
          </div>

          {/* Intro */}
          <p
            data-about-anim
            className={`mt-8 text-base leading-relaxed ${
              isDark ? "text-warm-400" : "text-warm-600"
            }`}
          >
            {translate("about.intro1")}
          </p>

          {/* Timeline */}
          <div data-about-anim className="mt-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">Journey</h2>
            <div className="space-y-6">
              {timeline.map((item) => (
                <div key={item.year} className="flex gap-4">
                  <span className="text-terracotta font-mono text-sm font-medium w-12 flex-shrink-0 pt-0.5">
                    {item.year}
                  </span>
                  <div
                    className={`border-l-2 pl-4 pb-2 ${
                      isDark ? "border-warm-850" : "border-warm-200"
                    }`}
                  >
                    <h3 className="font-medium text-sm">{item.label}</h3>
                    <p
                      className={`text-sm mt-0.5 ${
                        isDark ? "text-warm-500" : "text-warm-700"
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
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className={`text-sm px-3 py-1 rounded-lg ${
                    isDark
                      ? "bg-warm-800 text-warm-400 border border-warm-850"
                      : "bg-white text-warm-600 border border-warm-200"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub Stats */}
          <div data-about-anim className="mt-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">GitHub</h2>
            <div className="space-y-4">
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
