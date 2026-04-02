import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layout, useTheme, useLanguage } from "../components/Components";
import { Project } from "../data/projects";
import { getGitHubRepos, GitHubRepo } from "../utils/github";

const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

const ProjectCard: React.FC<Project> = ({
  title,
  description,
  description_en,
  link,
  image,
  technologies,
  date,
}) => {
  const { theme } = useTheme();
  const { translate, language } = useLanguage();
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const isDark = theme === "dark";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = (): void => setOpacity(1);
  const handleMouseLeave = (): void => setOpacity(0);

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex flex-col h-full rounded-3xl border transition-all duration-300 overflow-hidden ${
        isDark
          ? "bg-warm-950 border-warm-800"
          : "bg-white border-warm-100 shadow-xl"
      }`}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${
            isDark ? 'rgba(196, 110, 80, 0.15)' : 'rgba(168, 84, 56, 0.1)'
          }, transparent 40%)`,
        }}
      />

      {/* Image Section */}
      <div className={`relative h-48 w-full overflow-hidden p-4 ${isDark ? "bg-warm-800/50" : "bg-warm-100"}`}>
        {/* Blurred backdrop for image */}
        <div
           className={`absolute inset-0 bg-center bg-cover blur-xl ${isDark ? "opacity-30" : "opacity-50"}`}
           style={{ backgroundImage: `url(${typeof image === 'string' ? image : image.src})` }}
        />
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="relative w-full h-full object-contain rounded-lg shadow-sm z-20"
        />
      </div>

      {/* Content Section */}
      <div className="relative flex-1 p-6 flex flex-col z-20">
        <div className="flex justify-between items-start mb-4">
           <h2 className={`text-2xl font-bold tracking-tight truncate max-w-[70%] ${
             isDark ? "text-white" : "text-warm-900"
           }`}>
             {title}
           </h2>
           <span className={`text-xs font-mono px-2 py-1 rounded-md ${
             isDark ? "bg-warm-800 text-warm-500" : "bg-warm-100 text-warm-700"
           }`}>
             {date}
           </span>
        </div>

        <p className={`flex-1 text-sm leading-relaxed mb-6 line-clamp-3 ${
          isDark ? "text-warm-500" : "text-warm-700"
        }`}>
          {language === 'en' && description_en ? description_en : description}
        </p>

        <div className="space-y-6 mt-auto">
          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 4).map((tech: string): JSX.Element => (
              <span
                key={tech}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${
                  isDark
                    ? "bg-warm-800 text-terracotta-light border border-warm-850"
                    : "bg-terracotta-bg text-terracotta border border-terracotta-bg"
                }`}
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
               <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-warm-500">
                 +{technologies.length - 4}
               </span>
            )}
          </div>

          {/* Action Button */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full text-center py-3 rounded-xl font-bold transition-all duration-300 ${
              isDark
                ? "bg-white text-black hover:bg-warm-200"
                : "bg-warm-800 text-white hover:bg-warm-900"
            }`}
          >
            {translate("projects.visit")} →
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: NextPage<{ projects: Project[] }> = ({ projects }) => {
  const [filter, setFilter] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const { theme } = useTheme();
  const { translate } = useLanguage();
  const isDark = theme === "dark";

  useEffect((): void => {
    const filtered = projects.filter(
      (project: Project): boolean =>
        project.title.toLowerCase().includes(filter.toLowerCase()) ||
        project.description.toLowerCase().includes(filter.toLowerCase()) ||
        project.technologies.some((tech: string): boolean =>
          tech.toLowerCase().includes(filter.toLowerCase())
        )
    );
    setFilteredProjects(filtered);
  }, [filter, projects]);

  return (
    <Layout>
      <Head>
        <title>{`${translate("projects.title")} | Sungblab`}</title>
        <meta
          name="description"
          content={translate("projects.description")}
        />
      </Head>
      <div
        className={`min-h-screen min-h-[100svh] ${
          isDark ? "bg-warm-950" : "bg-warm-50"
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0">
            <div
              className={`absolute inset-0 ${
                isDark ? "bg-warm-950/90" : "bg-white/90"
              }`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,84,56,0.03)_1px,transparent_1px)] bg-[length:24px_24px]" />
          </div>

          <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-32 sm:pt-40 pb-12 relative">
            <AnimatedSection>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h1
                  className={`font-heading text-4xl md:text-6xl font-bold mb-6 pb-2 bg-clip-text text-transparent bg-gradient-to-r ${
                    isDark
                    ? "from-white via-terracotta-pale to-terracotta-light"
                    : "from-warm-900 via-terracotta-dark to-terracotta"
                  }`}
                >
                  {translate("projects.title")}
                </h1>
                <p
                  className={`text-lg md:text-xl max-w-2xl mx-auto ${
                    isDark ? "text-warm-400" : "text-warm-700"
                  }`}
                >
                  {translate("projects.description")}
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-2xl mx-auto mb-16"
              >
                <div className={`relative group p-1 rounded-2xl transition-all duration-300 ${
                  isDark
                  ? "bg-gradient-to-br from-warm-800 to-warm-950 focus-within:from-terracotta-dark/50 focus-within:to-warm-950"
                  : "bg-gradient-to-br from-white to-warm-50 shadow-xl focus-within:shadow-2xl focus-within:shadow-terracotta-pale"
                }`}>
                  <input
                    type="text"
                    placeholder={translate("projects.searchPlaceholder")}
                    className={`w-full p-5 pl-6 pr-14 text-lg rounded-xl border-2 transition-all duration-300 ${
                      isDark
                        ? "bg-warm-950 text-white border-transparent focus:border-terracotta/50 placeholder-warm-500"
                        : "bg-white text-warm-900 border-transparent focus:border-terracotta-pale placeholder-warm-500"
                    } focus:outline-none`}
                    value={filter}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFilter(e.target.value)}
                  />
                  <div className={`absolute right-5 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                      isDark ? "bg-warm-800/50 text-warm-500" : "bg-warm-100 text-warm-500"
                  }`}>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              <AnimatePresence>
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.map((project: Project): JSX.Element => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mt-12"
                >
                  <p
                    className={`text-xl ${
                      isDark ? "text-warm-300" : "text-warm-700"
                    }`}
                  >
                    {translate("projects.noResults")}
                  </p>
                  <p className="mt-2 text-warm-500">
                    {translate("projects.tryDifferent")}
                  </p>
                  <button
                    onClick={(): void => setFilter("")}
                    className={`mt-6 px-6 py-2 rounded-full border-2 ${
                      isDark
                        ? "border-terracotta text-terracotta-light hover:bg-terracotta-dark/20"
                        : "border-terracotta text-terracotta hover:bg-terracotta-bg"
                    } transition-colors duration-300`}
                  >
                    {translate("projects.viewAll")}
                  </button>
                </motion.div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Fetch GitHub Repos
  const repos = await getGitHubRepos("Sungblab", 100);

  // Transform to Project format
  const githubProjects: Project[] = repos
    .filter((repo: GitHubRepo): boolean => !repo.fork)
    .map((repo: GitHubRepo): Project => ({
      id: repo.id,
      title: repo.name,
      description: repo.description || "", // Empty string if no description
      link: repo.html_url,
      // Use GitHub Open Graph image service for dynamic preview
      image: `https://opengraph.githubassets.com/1/Sungblab/${repo.name}`,
      technologies: [repo.language, ...(repo.topics || [])].filter(Boolean),
      date: repo.updated_at.split('T')[0], // Format date YYYY-MM-DD
    }));

  return {
    props: {
        projects: githubProjects,
    },
    revalidate: 3600,
  };
};

export default Projects;
