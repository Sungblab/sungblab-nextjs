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

  const navLinks = [
    { href: "/", label: translate("nav.home") },
    { href: "/projects", label: translate("nav.projects") },
    { href: "/blog", label: translate("nav.blog") },
    { href: "/about", label: translate("nav.about") },
  ];

  const socialLinks = [
    { href: "https://github.com/Sungblab", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer
      className={`border-t ${
        isDark ? "border-[#2a2a2a]" : "border-warm-200"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <Logo size="sm" />
            <p
              className={`mt-3 text-sm ${
                isDark ? "text-[#888]" : "text-[#666]"
              }`}
            >
              AI와 함께 만듭니다.
            </p>
          </div>

          <nav className="flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isDark
                    ? "text-[#888] hover:text-[#f5ece6]"
                    : "text-[#666] hover:text-warm-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-md transition-colors ${
                  isDark
                    ? "text-[#888] hover:text-[#f5ece6] hover:bg-[#2a2a2a]"
                    : "text-[#666] hover:text-warm-800 hover:bg-warm-200"
                }`}
                aria-label={link.label}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div
          className={`mt-8 pt-8 border-t text-sm text-center ${
            isDark
              ? "border-[#2a2a2a] text-[#555]"
              : "border-warm-200 text-[#999]"
          }`}
        >
          © {new Date().getFullYear()} sungblab
        </div>
      </div>
    </footer>
  );
};
