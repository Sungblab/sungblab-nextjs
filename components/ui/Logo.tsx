import React from "react";
import { useTheme } from "../features/ThemeContext";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const { theme } = useTheme();

  const dims = {
    sm: { width: 130, height: 32, fontSize: 26, dotR: 3.5, dotCx: 122, dotCy: 27 },
    md: { width: 160, height: 40, fontSize: 32, dotR: 4, dotCx: 150, dotCy: 34 },
    lg: { width: 190, height: 48, fontSize: 38, dotR: 5, dotCx: 178, dotCy: 40 },
  };

  const { width, height, fontSize, dotR, dotCx, dotCy } = dims[size];
  const textColor = theme === "dark" ? "#ffffff" : "#111827";

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sungblab"
      role="img"
    >
      <text
        x="0"
        y={height * 0.78}
        fontFamily="'Outfit', system-ui, -apple-system, sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing="-1"
        fill={textColor}
      >
        Sungblab
      </text>
      <circle cx={dotCx} cy={dotCy} r={dotR} fill="#a855f7" />
    </svg>
  );
};

/** Standalone S icon mark for favicon / tab icon */
export const LogoIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sungblab icon"
      role="img"
    >
      <rect width="40" height="40" rx="10" fill="#a855f7" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontFamily="'Outfit', system-ui, sans-serif"
        fontSize="26"
        fontWeight="800"
        fill="#ffffff"
      >
        S
      </text>
    </svg>
  );
};
