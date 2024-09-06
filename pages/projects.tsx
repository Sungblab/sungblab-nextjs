import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, useTheme } from "../components/Components";
import { projects, Project } from "../data/projects";

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
      className={`rounded-lg shadow-md overflow-hidden ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="w-full h-72 object-cover"
        />
      </motion.div>
      <div className="p-4">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-xl font-semibold mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`mb-4 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {technologies.map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.1 }}
              className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                theme === "dark"
                  ? "bg-blue-900 text-blue-200"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-sm mb-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {date}
        </motion.p>
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className={`inline-block hover:underline transition duration-300 ${
            theme === "dark"
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-800"
          }`}
        >
          프로젝트 보기 →
        </motion.a>
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
        <title>Sungblab</title>
        <meta
          name="description"
          content="Sungblab의 웹 개발 프로젝트 쇼케이스"
        />
      </Head>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`container mx-auto px-4 py-8 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`text-4xl font-bold mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Projects
        </motion.h1>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <input
            type="text"
            placeholder="프로젝트 또는 기술 검색..."
            className={`w-full p-2 border rounded ${
              theme === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-800 border-gray-300"
            }`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </motion.div>
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`text-center mt-8 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            검색 결과가 없습니다. 다른 키워드로 시도해 보세요.
          </motion.p>
        )}
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
