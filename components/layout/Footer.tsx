import React from "react";
import { Github, Linkedin } from "lucide-react";
import { useTheme } from "../features/ThemeContext";
import { Logo } from "../ui/Logo";

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className={`border-t ${isDark ? "border-[#2a2a2a]" : "border-warm-200"}`}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo size="sm" />

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Sungblab"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-1.5 rounded transition-colors ${
              isDark
                ? "text-[#555] hover:text-[#f5ece6]"
                : "text-[#bbb] hover:text-warm-800"
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
                ? "text-[#555] hover:text-[#f5ece6]"
                : "text-[#bbb] hover:text-warm-800"
            }`}
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <span
            className={`text-xs ${isDark ? "text-[#444]" : "text-[#ccc]"}`}
          >
            © {new Date().getFullYear()} sungblab
          </span>
        </div>
      </div>
    </footer>
  );
};
