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
      primary: "#7C3AED",
      secondary: "#A78BFA",
      border: "#E2E8F0",
      accent: "#4F46E5",
    },
    dark: {
      background: "#1A202C",
      primary: "#9F7AEA",
      secondary: "#6B46C1",
      border: "#2D3748",
      accent: "#818CF8",
    },
  };

  const contextValue = {
    theme,
    toggleTheme: () =>
      setTheme((prev) => (prev === "light" ? "dark" : "light")),
    colors: colors[theme],
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
