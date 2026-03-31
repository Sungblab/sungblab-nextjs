import React, { useState, createContext, useContext } from "react";

// Theme Context Interface
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

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;
      return savedTheme || "light";
    }
    return "light";
  });

  const colors = {
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

  const contextValue = {
    theme,
    toggleTheme: (): void =>
      setTheme((prev: "light" | "dark"): "light" | "dark" => (prev === "light" ? "dark" : "light")),
    colors: colors[theme],
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
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
