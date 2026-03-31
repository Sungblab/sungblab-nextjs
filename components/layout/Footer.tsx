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
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo size="sm" />
          <span className={`text-xs ${isDark ? "text-[#555]" : "text-[#999]"}`}>
            © {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex items-center gap-5">
            {[
              { href: "/projects", label: translate("nav.projects") },
              { href: "/blog", label: translate("nav.blog") },
              { href: "/about", label: translate("nav.about") },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs transition-colors ${
                  isDark
                    ? "text-[#666] hover:text-[#f5ece6]"
                    : "text-[#999] hover:text-warm-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Sungblab"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1.5 rounded transition-colors ${
                isDark
                  ? "text-[#666] hover:text-[#f5ece6]"
                  : "text-[#999] hover:text-warm-800"
              }`}
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1.5 rounded transition-colors ${
                isDark
                  ? "text-[#666] hover:text-[#f5ece6]"
                  : "text-[#999] hover:text-warm-800"
              }`}
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
