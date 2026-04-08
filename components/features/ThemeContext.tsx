import React, { useState, useEffect, createContext, useContext } from "react";

export interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  colors: {
    background: string;
    primary: string;
    secondary: string;
    border: string;
    accent: string;
  };
}

export interface ThemeType {
  colors: {
    background: string;
    primary: string;
    secondary: string;
    border: string;
    accent: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const colorMap = {
  light: {
    background: "#FFFFFF",
    primary: "#A85438",
    secondary: "#C46E50",
    border: "#e8ddd8",
    accent: "#8B4513",
  },
  dark: {
    background: "#0f0f0f",
    primary: "#C46E50",
    secondary: "#A85438",
    border: "#2a2a2a",
    accent: "#D4886A",
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Read stored theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  // Persist theme changes and sync HTML class
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
        root.style.backgroundColor = "#0f0f0f";
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.style.backgroundColor = "#faf7f5";
        root.style.colorScheme = "light";
      }
    }
  }, [theme, mounted]);

  const toggleTheme = (): void =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
    colors: colorMap[theme],
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <div style={mounted ? undefined : { visibility: "hidden" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
