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

  return (
    <footer
      className={`border-t ${isDark ? "border-[#2a2a2a]" : "border-warm-200"}`}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Logo size="sm" />
            <p
              className={`mt-4 text-sm leading-relaxed ${
                isDark ? "text-[#888]" : "text-[#666]"
              }`}
            >
              AI와 함께 만듭니다.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://github.com/Sungblab"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? "text-[#666] hover:text-[#f5ece6] hover:bg-[#1a1a1a]"
                    : "text-[#999] hover:text-warm-800 hover:bg-warm-100"
                }`}
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? "text-[#666] hover:text-[#f5ece6] hover:bg-[#1a1a1a]"
                    : "text-[#999] hover:text-warm-800 hover:bg-warm-100"
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className={`text-xs font-semibold uppercase tracking-widest mb-4 ${
                isDark ? "text-[#555]" : "text-[#bbb]"
              }`}
            >
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: "/", label: translate("nav.home") },
                { href: "/projects", label: translate("nav.projects") },
                { href: "/blog", label: translate("nav.blog") },
                { href: "/about", label: translate("nav.about") },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors w-fit ${
                    isDark
                      ? "text-[#888] hover:text-[#f5ece6]"
                      : "text-[#666] hover:text-warm-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4
              className={`text-xs font-semibold uppercase tracking-widest mb-4 ${
                isDark ? "text-[#555]" : "text-[#bbb]"
              }`}
            >
              Contact
            </h4>
            <a
              href="mailto:sungblab@gmail.com"
              className={`text-sm transition-colors ${
                isDark
                  ? "text-[#888] hover:text-terracotta"
                  : "text-[#666] hover:text-terracotta"
              }`}
            >
              sungblab@gmail.com
            </a>
            <a
              href="https://univmind.net"
              target="_blank"
              rel="noopener noreferrer"
              className={`block mt-2.5 text-sm transition-colors ${
                isDark
                  ? "text-[#888] hover:text-terracotta"
                  : "text-[#666] hover:text-terracotta"
              }`}
            >
              univmind.net
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={`mt-12 pt-6 border-t text-xs text-center ${
            isDark
              ? "border-[#2a2a2a] text-[#444]"
              : "border-warm-200 text-[#bbb]"
          }`}
        >
          © {new Date().getFullYear()} sungblab. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
