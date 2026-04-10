import React, { useState, useEffect } from "react";
import { useTheme } from "../features/ThemeContext";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dims = {
    sm: { icon: 28, fontSize: 20, gap: 8, height: 28 },
    md: { icon: 36, fontSize: 24, gap: 10, height: 36 },
    lg: { icon: 44, fontSize: 30, gap: 12, height: 44 },
  };

  const { icon, fontSize, gap, height } = dims[size];
  const rx = Math.round(icon * 0.25);
  const textColor = mounted && theme === "dark" ? "#f5ece6" : "#1a1a1a";
  const totalWidth = icon + gap + fontSize * 5;

  return (
    <svg
      width={totalWidth}
      height={height}
      viewBox={`0 0 ${totalWidth} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sungblab"
      role="img"
    >
      <rect width={icon} height={icon} rx={rx} fill="#c4704b" />
      <text
        x={icon / 2}
        y={icon / 2}
        dominantBaseline="central"
        textAnchor="middle"
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize={Math.round(icon * 0.55)}
        fontWeight="800"
        fill="#ffffff"
      >
        S
      </text>
      <text
        x={icon + gap}
        y={height * 0.72}
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize={fontSize}
        fontWeight="600"
        letterSpacing="-0.5"
        fill={textColor}
      >
        sungblab
      </text>
    </svg>
  );
};

export const LogoIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = "",
}) => {
  const rx = Math.round(size * 0.25);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sungblab icon"
      role="img"
    >
      <rect width={size} height={size} rx={rx} fill="#c4704b" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize={Math.round(size * 0.55)}
        fontWeight="800"
        fill="#ffffff"
      >
        S
      </text>
    </svg>
  );
};
