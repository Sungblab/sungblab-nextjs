import React from "react";
import { useTheme } from "../features/ThemeContext";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const { theme } = useTheme();

  const iconSizes = {
    sm: 28,
    md: 34,
    lg: 40,
  };

  const textSizes = {
    sm: "text-xl",
    md: "text-2xl sm:text-3xl",
    lg: "text-3xl",
  };

  const iconSize = iconSizes[size];
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* S icon mark */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="10" fill="#a855f7" />
        <path
          d="M20 11c-4.5 0-7.5 2.2-7.5 5.5 0 3 2.5 4.5 6 5.2l2.5 0.5c2.5 0.5 3.5 1.5 3.5 3.3 0 2.3-2.5 4-6 4-4 0-6.5-2-7-4.5"
          stroke="#ffffff"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="27" cy="12.5" r="2" fill="#ffffff" opacity="0.6" />
      </svg>

      {/* Text */}
      <span
        className={`font-bold tracking-tighter ${textSizes[size]} ${textColor}`}
      >
        ungblab<span className="text-purple-500">.</span>
      </span>
    </span>
  );
};
