import React from "react";
import { Github, Linkedin } from "lucide-react";
import { useTheme } from "../features/ThemeContext";
import { Logo } from "../ui/Logo";

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className={`border-t ${isDark ? "border-warm-850" : "border-warm-200"}`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo size="sm" />

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Sungblab"
            target="_blank"
            rel="noopener noreferrer"
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded transition-colors ${
              isDark
                ? "text-warm-600 hover:text-warm-100"
                : "text-warm-500 hover:text-warm-800"
            }`}
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded transition-colors ${
              isDark
                ? "text-warm-600 hover:text-warm-100"
                : "text-warm-500 hover:text-warm-800"
            }`}
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <span
            className={`text-xs ${isDark ? "text-warm-600" : "text-warm-500"}`}
          >
            Made by Sungbin · © {new Date().getFullYear()} sungblab
          </span>
        </div>
      </div>
    </footer>
  );
};
