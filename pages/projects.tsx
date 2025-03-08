import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, useTheme } from "../components/Components";
import { projects, Project } from "../data/projects";

const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

const ProjectCard: React.FC<Project> = ({
  title,
  description,
  link,
  image,
  technologies,
  date,
}) => {
  const { theme } = useTheme();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className={`group p-6 rounded-2xl backdrop-blur-sm border ${
        theme === "dark"
          ? "bg-gray-800/40 hover:bg-gray-800/60 border-gray-700/50 hover:border-purple-700/50"
          : "bg-white/80 hover:bg-white border-gray-200/50 hover:border-purple-300/50"
      } transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl`}
    >
      <div className="relative h-56 overflow-hidden rounded-xl mb-6">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            theme === "dark" ? "from-gray-900/80" : "from-gray-800/50"
          } to-transparent`}
        />
      </div>
      <div className="relative">
        <h2
          className={`text-2xl font-bold mb-3 ${
            theme === "dark"
              ? "text-gray-100 group-hover:text-purple-300"
              : "text-gray-800 group-hover:text-purple-600"
          } transition-colors duration-300`}
        >
          {title}
        </h2>
        <p
          className={`mb-4 line-clamp-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                theme === "dark"
                  ? "bg-gray-700/50 text-gray-200"
                  : "bg-gray-100/80 text-gray-800"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {date}
          </p>
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition duration-300 ease-out border-2 rounded-full shadow-md ${
              theme === "dark"
                ? "border-purple-500 text-purple-300"
                : "border-purple-500 text-purple-600"
            }`}
          >
            <span
              className={`absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full ${
                theme === "dark" ? "bg-purple-700" : "bg-purple-600"
              } group-hover:translate-x-0`}
            >
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full">
              프로젝트 보기
            </span>
            <span className="relative invisible">프로젝트 보기</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: NextPage<{ projects: Project[] }> = ({ projects }) => {
  const [filter, setFilter] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const { theme } = useTheme();

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(filter.toLowerCase()) ||
        project.description.toLowerCase().includes(filter.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(filter.toLowerCase())
        )
    );
    setFilteredProjects(filtered);
  }, [filter, projects]);

  return (
    <Layout>
      <Head>
        <title>Projects | Sungblab</title>
        <meta
          name="description"
          content="Sungblab의 웹 개발 프로젝트 쇼케이스"
        />
      </Head>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`min-h-screen ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0">
            <div
              className={`absolute inset-0 ${
                theme === "dark" ? "bg-gray-900/90" : "bg-white/90"
              }`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[length:24px_24px]" />
          </div>

          <div className="container mx-auto px-4 py-12 relative">
            <AnimatedSection>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h1
                  className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
                    theme === "dark" ? "text-purple-300" : "text-purple-600"
                  }`}
                >
                  My Projects
                </h1>
                <p
                  className={`text-lg ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  개발한 프로젝트들을 소개합니다
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-xl mx-auto mb-12"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="프로젝트 또는 기술 검색..."
                    className={`w-full p-4 pr-12 rounded-xl border ${
                      theme === "dark"
                        ? "bg-gray-800/50 text-white border-gray-700 placeholder-gray-400 focus:border-purple-700/50"
                        : "bg-white/80 text-gray-800 border-gray-200 placeholder-gray-400 focus:border-purple-300/50"
                    } focus:outline-none focus:ring-2 ${
                      theme === "dark"
                        ? "focus:ring-purple-700/30"
                        : "focus:ring-purple-500/30"
                    } backdrop-blur-sm transition-all duration-300`}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
                  <svg
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      theme === "dark" ? "text-purple-300" : "text-purple-500"
                    }`}
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
              </motion.div>

              <AnimatePresence>
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.map((project, index) => (
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
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    검색 결과가 없습니다
                  </p>
                  <p
                    className={`mt-2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    다른 키워드로 검색해보세요
                  </p>
                  <button
                    onClick={() => setFilter("")}
                    className={`mt-6 px-6 py-2 rounded-full border-2 ${
                      theme === "dark"
                        ? "border-purple-500 text-purple-300 hover:bg-purple-900/20"
                        : "border-purple-500 text-purple-600 hover:bg-purple-50"
                    } transition-colors duration-300`}
                  >
                    모든 프로젝트 보기
                  </button>
                </motion.div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </motion.main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      projects,
    },
  };
};

export default Projects;
