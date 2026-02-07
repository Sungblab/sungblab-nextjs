import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../components/features/ThemeContext";
import { useLanguage } from "../../components/features/LanguageContext";
import { AnimatedSection } from "../../components/ui/AnimatedSection";
import Typewriter from "typewriter-effect";

export const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const { translate } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob ${
            theme === "dark" ? "bg-purple-900" : "bg-purple-200"
          }`}
        />
        <div
          className={`absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000 ${
            theme === "dark" ? "bg-indigo-900" : "bg-indigo-200"
          }`}
        />
        <div
          className={`absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-4000 ${
            theme === "dark" ? "bg-blue-900" : "bg-blue-200"
          }`}
        />
        {/* Grid Pattern Overlay */}
        <div
          className={`absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20`}
        />
      </div>

      <AnimatedSection className="relative z-10 px-4 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative inline-block"
        >
          <span
            className={`absolute -top-6 -right-8 px-3 py-1 text-xs font-bold rounded-full transform rotate-12 shadow-lg hidden sm:block ${
              theme === "dark"
                ? "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20"
                : "bg-yellow-101 text-yellow-600 border border-yellow-200"
            }`}
          >
            {translate("hero.openToWork")}
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-tight mb-6">
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${
                theme === "dark"
                  ? "from-white via-purple-200 to-indigo-200"
                  : "from-gray-900 via-purple-800 to-indigo-800"
              } animate-gradient-x`}
            >
              {translate("hero.titlePrefix")}
            </span>
            <br />
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${
                theme === "dark"
                  ? "from-purple-400 via-pink-400 to-indigo-400"
                  : "from-purple-600 via-pink-600 to-indigo-600"
              } animate-gradient-x min-h-[1.2em] inline-block`}
            >
              <Typewriter
                options={{
                  strings: translate("hero.typewriter") as unknown as string[],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  delay: 80,
                }}
              />
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={`text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed mb-12 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {translate("hero.introduction").split('\n').map((line: string, i: number): JSX.Element => (
            <React.Fragment key={i}>
              {line}
              <br className="hidden sm:block" />
            </React.Fragment>
          ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <MagneticButton>
            <Link
              href="/projects"
              className={`relative px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden group inline-flex items-center gap-2 ${
                theme === "dark"
                  ? "bg-white text-gray-900 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "bg-gray-900 text-white shadow-[0_0_20px_rgba(0,0,0,0.2)]"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {translate("hero.viewProjects")}
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </span>
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} />
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link
              href="/about"
              className={`relative px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 border-2 inline-block ${
                theme === "dark"
                  ? "border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white hover:bg-gray-800/50"
                  : "border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {translate("hero.aboutMe")}
            </Link>
          </MagneticButton>
        </motion.div>
      </AnimatedSection>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 1, 
          duration: 1,
          y: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-none"
      >
          <div className={`w-[1px] h-12 bg-gradient-to-b ${theme === 'dark' ? 'from-purple-500/50 to-transparent' : 'from-purple-600/50 to-transparent'}`} />
      </motion.div>

    </section>
  );
};

const MagneticButton = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>): void => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = (): void => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};
