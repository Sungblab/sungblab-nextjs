import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "../features/ThemeContext";
import { Logo } from "../ui/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className={`border-t ${isDark ? "border-warm-850" : "border-warm-200"}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Logo size="sm" />
            <p className={`text-xs max-w-[200px] leading-relaxed ${isDark ? "text-warm-600" : "text-warm-500"}`}>
              Building the future with AI, one project at a time.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isDark
                    ? "text-warm-600 hover:text-warm-200"
                    : "text-warm-500 hover:text-warm-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Sungblab"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? "text-warm-600 hover:text-warm-100 hover:bg-warm-800"
                  : "text-warm-500 hover:text-warm-800 hover:bg-warm-100"
              }`}
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? "text-warm-600 hover:text-warm-100 hover:bg-warm-800"
                  : "text-warm-500 hover:text-warm-800 hover:bg-warm-100"
              }`}
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
            <a
              href="mailto:sungblab@gmail.com"
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? "text-warm-600 hover:text-warm-100 hover:bg-warm-800"
                  : "text-warm-500 hover:text-warm-800 hover:bg-warm-100"
              }`}
              aria-label="Email"
            >
              <Mail size={17} />
            </a>
          </div>
        </div>

        <div className={`mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 ${
          isDark ? "border-warm-850" : "border-warm-100"
        }`}>
          <span className={`text-xs ${isDark ? "text-warm-700" : "text-warm-400"}`}>
            © {new Date().getFullYear()} Sungblab. All rights reserved.
          </span>
          <span className={`text-xs ${isDark ? "text-warm-700" : "text-warm-400"}`}>
            Made with ❤️ & AI
          </span>
        </div>
      </div>
    </footer>
  );
};
