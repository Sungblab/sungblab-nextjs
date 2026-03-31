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
