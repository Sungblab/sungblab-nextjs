import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../features/ThemeContext";
import { useLanguage } from "../features/LanguageContext";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, translate } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const navItems = ["Home", "Projects", "Blog", "About"];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === "dark"
            ? "bg-gray-900/80 backdrop-blur-md border-b border-gray-800"
            : "bg-white/80 backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="relative group z-50">
            <span
              className={`text-2xl sm:text-3xl font-bold tracking-tighter ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Sungblab<span className="text-purple-500">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <div
              className={`flex items-center px-2 py-1 rounded-full ${
                theme === "dark"
                  ? "bg-gray-800/50 border border-gray-700/50"
                  : "bg-white/50 border border-gray-200/50"
              } backdrop-blur-sm`}
            >
              {navItems.map((item) => {
                const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                const isActive = router.pathname === path;
                const label = translate(`nav.${item.toLowerCase()}`);

                return (
                  <Link
                    key={item}
                    href={path}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                      isActive
                        ? theme === "dark"
                          ? "text-white"
                          : "text-gray-900"
                        : theme === "dark"
                        ? "text-gray-400 hover:text-gray-200"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className={`absolute inset-0 rounded-full ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                        }`}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Theme Toggle & Language Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 rounded-full backdrop-blur-md transition-colors duration-300 text-sm font-medium ${
                theme === "dark"
                  ? "bg-gray-800/50 text-gray-200 hover:bg-gray-700/50"
                  : "bg-white/50 text-gray-700 hover:bg-gray-100/50"
              }`}
            >
              {language === "ko" ? "EN" : "KR"}
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2.5 rounded-full backdrop-blur-md transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-800/50 text-yellow-400 hover:bg-gray-700/50"
                  : "bg-white/50 text-gray-600 hover:bg-gray-100/50"
              }`}
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className={`md:hidden overflow-hidden ${
              theme === "dark"
                ? "bg-gray-900/95 border-b border-gray-800"
                : "bg-white/95 border-b border-gray-200"
            } backdrop-blur-xl`}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {translate(`nav.${item.toLowerCase()}`)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
