import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../features/ThemeContext";
import { useLanguage } from "../features/LanguageContext";
import { Logo } from "../ui/Logo";

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, translate } = useLanguage();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape key to close mobile menu
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    },
    [mobileOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const navItems = [
    { href: "/", label: translate("nav.home") },
    { href: "/projects", label: translate("nav.projects") },
    { href: "/blog", label: translate("nav.blog") },
    { href: "/about", label: translate("nav.about") },
  ];

  const isActive = (href: string) =>
    href === "/" ? router.pathname === "/" : router.pathname.startsWith(href);

  const isDark = theme === "dark";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDark
              ? "bg-warm-900/80 backdrop-blur-xl border-b border-warm-850"
              : "bg-warm-50/80 backdrop-blur-xl border-b border-warm-200"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" aria-label="Home">
            <Logo size="sm" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-terracotta"
                    : isDark
                      ? "text-warm-500 hover:text-warm-100"
                      : "text-warm-700 hover:text-warm-800"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-terracotta rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              aria-label={language === "ko" ? "Switch to English" : "한국어로 전환"}
              className={`text-xs font-medium min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md transition-colors ${
                isDark
                  ? "text-warm-500 hover:text-warm-100 hover:bg-warm-850"
                  : "text-warm-700 hover:text-warm-800 hover:bg-warm-200"
              }`}
            >
              {language === "ko" ? "EN" : "KR"}
            </button>

            <button
              onClick={toggleTheme}
              className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md transition-colors ${
                isDark
                  ? "text-warm-500 hover:text-warm-100 hover:bg-warm-850"
                  : "text-warm-700 hover:text-warm-800 hover:bg-warm-200"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`fixed inset-0 top-16 z-40 ${
              isDark ? "bg-warm-900/95" : "bg-warm-50/95"
            } backdrop-blur-xl`}
          >
            <nav className="flex flex-col items-center gap-8 pt-20" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-2xl font-heading font-bold ${
                    isActive(item.href)
                      ? "text-terracotta"
                      : isDark
                        ? "text-warm-100"
                        : "text-warm-800"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
