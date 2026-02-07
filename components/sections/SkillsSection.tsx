import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../components/features/ThemeContext";
import { useLanguage } from "../../components/features/LanguageContext";
import { AnimatedSection } from "../../components/ui/AnimatedSection";

const skillCategories = [
  {
    id: "frontend",
    skills: ["React", "HTML/CSS", "JavaScript", "Tailwind CSS"],
  },
  {
    id: "backend",
    skills: ["Node.js", "Python", "Flask", "Express.js"],
  },
  {
    id: "database",
    skills: ["MongoDB", "SQLite", "PostgreSQL"],
  },
  {
    id: "devops",
    skills: ["GitHub", "Vercel", "Cloudtype"],
  },
];

export const SkillsSection: React.FC = () => {
  const { theme } = useTheme();
  const { translate } = useLanguage();

  return (
    <section className="py-24 px-4 relative">
       {/* Background Decoration */}
       <div className={`absolute left-0 top-1/2 w-full h-[1px] -translate-y-1/2 opacity-20 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-purple-500 to-transparent' : 'bg-gradient-to-r from-transparent via-purple-300 to-transparent'}`} />

      <AnimatedSection>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {translate("skills.title")}
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {translate("skills.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, idx) => (
              <SpotlightCard key={category.id} category={category} idx={idx} theme={theme} translate={translate} />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

const SpotlightCard = ({ category, idx, theme, translate }: { category: any; idx: number; theme: string; translate: any }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className={`relative group p-8 rounded-3xl border transition-all duration-300 overflow-hidden ${
        theme === "dark"
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-100 shadow-lg"
      }`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${theme === 'dark' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(168, 85, 247, 0.1)'}, transparent 40%)`,
        }}
      />
      
      {/* Content */}
      <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 relative z-10 ${
        theme === "dark" ? "text-gray-100" : "text-gray-900"
      }`}>
        <span className={`w-2 h-8 rounded-full ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-600'}`} />
        {translate(`skills.categories.${category.id}`)}
      </h3>

      <ul className="space-y-3 relative z-10">
        {category.skills.map((skill: any) => (
          <li key={skill} className="flex items-center gap-3">
            <div className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-gray-600 group-hover:bg-purple-400' : 'bg-gray-300 group-hover:bg-purple-500'} transition-colors duration-300`} />
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-600 group-hover:text-gray-900'} transition-colors duration-300`}>
              {skill}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
