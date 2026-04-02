import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useTheme } from "../features/ThemeContext";
import { useLanguage } from "../features/LanguageContext";
import { gsap } from "../../utils/gsap";
import { ArrowRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  description_en?: string;
  link: string;
  image: any;
  technologies: string[];
  date: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
}) => {
  const { theme } = useTheme();
  const { translate, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-project-card]", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const displayProjects = projects.slice(0, 6);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-terracotta text-sm font-medium tracking-wide uppercase">
              Projects
            </span>
            <h2 className="mt-2 font-heading text-3xl md:text-4xl font-bold tracking-tight">
              {translate("projects.title")}
            </h2>
          </div>
          <Link
            href="/projects"
            className={`hidden md:flex items-center gap-1 text-sm font-medium transition-colors ${
              isDark
                ? "text-warm-500 hover:text-terracotta"
                : "text-warm-700 hover:text-terracotta"
            }`}
          >
            {translate("projects.viewAll")}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-project-card
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`block rounded-xl overflow-hidden border transition-shadow hover:shadow-lg ${
                isDark
                  ? "bg-warm-800 border-warm-850"
                  : "bg-white border-warm-200"
              }`}
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                {typeof project.image === "string" ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-base truncate">
                  {project.title}
                </h3>
                <p
                  className={`mt-1.5 text-sm line-clamp-2 ${
                    isDark ? "text-warm-500" : "text-warm-700"
                  }`}
                >
                  {language === "en" && project.description_en
                    ? project.description_en
                    : project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className={`text-xs px-2 py-0.5 rounded ${
                        isDark
                          ? "bg-terracotta-dark text-terracotta-light"
                          : "bg-terracotta-bg text-terracotta"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-terracotta"
          >
            {translate("projects.viewAll")}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};
