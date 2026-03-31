import React from "react";
import { useTheme } from "../features/ThemeContext";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`flex flex-col min-h-screen font-sans antialiased transition-colors duration-300 ${
        theme === "dark"
          ? "bg-warm-900 text-[#f5ece6]"
          : "bg-warm-50 text-warm-800"
      }`}
    >
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
