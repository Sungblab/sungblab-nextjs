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
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <div className={`relative rounded-2xl p-10 sm:p-14 text-center overflow-hidden ${
          isDark
            ? "bg-warm-800/50 border border-warm-850"
            : "bg-white border border-warm-200 shadow-sm"
        }`}>
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(196,112,75,0.06)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(196,112,75,0.04)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 ${
              isDark ? "text-terracotta-light/70" : "text-terracotta/70"
            }`}>
              Contact
            </span>
            <h2
              data-contact-anim
              className="font-heading text-3xl md:text-4xl font-bold tracking-tight"
            >
              {translate("contact.title")}
            </h2>
            <p
              data-contact-anim
              className={`mt-4 text-base max-w-md mx-auto ${
                isDark ? "text-warm-500" : "text-warm-600"
              }`}
            >
              {translate("contact.description")}
            </p>

            <a
              data-contact-anim
              href="mailto:sungblab@gmail.com"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-terracotta text-white rounded-xl font-medium text-sm hover:bg-terracotta-light transition-all duration-200 hover:shadow-lg hover:shadow-terracotta/20 hover:-translate-y-0.5"
            >
              <Mail size={16} />
              sungblab@gmail.com
            </a>

            <div data-contact-anim className={`flex justify-center gap-2 mt-6 pt-6 border-t ${isDark ? "border-warm-850" : "border-warm-100"}`}>
              <a
                href="https://github.com/Sungblab"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark
                    ? "text-warm-500 hover:text-warm-100 hover:bg-warm-700"
                    : "text-warm-600 hover:text-warm-900 hover:bg-warm-100"
                }`}
                aria-label="GitHub"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark
                    ? "text-warm-500 hover:text-warm-100 hover:bg-warm-700"
                    : "text-warm-600 hover:text-warm-900 hover:bg-warm-100"
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
