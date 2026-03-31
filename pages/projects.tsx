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
      className={`group relative flex flex-col h-full rounded-3xl border transition-all duration-300 overflow-hidden ${
        theme === "dark"
          ? "bg-[#0f0f0f] border-[#1a1a1a]"
          : "bg-white border-warm-100 shadow-xl"
      }`}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${
            theme === 'dark' ? 'rgba(196, 110, 80, 0.15)' : 'rgba(168, 84, 56, 0.1)'
          }, transparent 40%)`,
        }}
      />

      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800/50 p-4">
        {/* Blurred backdrop for image */}
        <div 
           className="absolute inset-0 bg-center bg-cover blur-xl opacity-50 dark:opacity-30"
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
             theme === "dark" ? "text-white" : "text-warm-900"
           }`}>
             {title}
           </h2>
           <span className={`text-xs font-mono px-2 py-1 rounded-md ${
             theme === "dark" ? "bg-[#1a1a1a] text-[#888]" : "bg-warm-100 text-[#666]"
           }`}>
             {date}
           </span>
        </div>
        
        <p className={`flex-1 text-sm leading-relaxed mb-6 line-clamp-3 ${
          theme === "dark" ? "text-[#888]" : "text-[#666]"
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
                  theme === "dark"
                    ? "bg-[#1a1a1a] text-terracotta-light border border-[#2a2a2a]"
                    : "bg-terracotta-bg text-terracotta border border-terracotta-bg"
                }`}
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
               <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                 theme === "dark" ? "text-[#888]" : "text-[#888]"
               }`}>
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
              theme === "dark"
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
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
        className={`min-h-screen ${
          theme === "dark" ? "bg-[#0f0f0f]" : "bg-warm-50"
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0">
            <div
              className={`absolute inset-0 ${
                theme === "dark" ? "bg-[#0f0f0f]/90" : "bg-white/90"
              }`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,84,56,0.03)_1px,transparent_1px)] bg-[length:24px_24px]" />
          </div>

          <div className="container mx-auto px-4 pt-40 pb-12 relative">
            <AnimatedSection>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h1
                  className={`text-4xl md:text-6xl font-bold mb-6 pb-2 bg-clip-text text-transparent bg-gradient-to-r ${
                    theme === "dark"
                    ? "from-white via-terracotta-pale to-terracotta-light"
                    : "from-warm-900 via-terracotta-dark to-terracotta"
                  }`}
                >
                  {translate("projects.title")}
                </h1>
                <p
                  className={`text-lg md:text-xl max-w-2xl mx-auto ${
                    theme === "dark" ? "text-[#bbb]" : "text-[#444]"
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
                  theme === "dark"
                  ? "bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] focus-within:from-terracotta-dark/50 focus-within:to-[#0f0f0f]"
                  : "bg-gradient-to-br from-white to-warm-50 shadow-xl focus-within:shadow-2xl focus-within:shadow-terracotta-pale"
                }`}>
                  <input
                    type="text"
                    placeholder={translate("projects.searchPlaceholder")}
                    className={`w-full p-5 pl-6 pr-14 text-lg rounded-xl border-2 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-[#0f0f0f] text-white border-transparent focus:border-terracotta/50 placeholder-[#888]"
                        : "bg-white text-warm-900 border-transparent focus:border-terracotta-pale placeholder-[#888]"
                    } focus:outline-none`}
                    value={filter}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFilter(e.target.value)}
                  />
                  <div className={`absolute right-5 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                      theme === "dark" ? "bg-[#1a1a1a]/50 text-[#888]" : "bg-warm-100 text-[#888]"
                  }`}>
                    <svg
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
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                      theme === "dark" ? "text-[#ccc]" : "text-[#666]"
                    }`}
                  >
                    {translate("projects.noResults")}
                  </p>
                  <p
                    className={`mt-2 ${
                      theme === "dark" ? "text-[#888]" : "text-[#888]"
                    }`}
                  >
                    {translate("projects.tryDifferent")}
                  </p>
                  <button
                    onClick={(): void => setFilter("")}
                    className={`mt-6 px-6 py-2 rounded-full border-2 ${
                      theme === "dark"
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
