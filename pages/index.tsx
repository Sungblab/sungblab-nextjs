import { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  Layout,
  Card,
  SocialButton,
  ThemeProvider,
  useTheme,
} from "../components/Components";
import { projects } from "../data/projects";
import Image, { StaticImageData } from "next/image";
import profilePic from "../img/sb.jpg";
import { FaInstagram, FaGithub, FaYoutube } from "react-icons/fa";
import styled from "styled-components";
import { Project } from "../data/projects";

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

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories = [
  {
    name: "Frontend",
    skills: ["React", "HTML/CSS", "JavaScript", "Tailwind CSS"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Python", "Flask", "Express.js"],
  },
  {
    name: "Database",
    skills: ["MongoDB", "SQLite", "PostgreSQL"],
  },
  {
    name: "DevOps & Tools",
    skills: ["GitHub", "Vercel", "Cloudtype"],
  },
];

interface ThemeType {
  colors: {
    background: string;
  };
}

const StyledProjectCard = styled(Card)<{
  theme: { colors: { background: string } };
}>`
  background: ${({ theme }) => theme?.colors?.background || "#FFFFFF"};
  margin-bottom: 2rem;
`;

const Home: NextPage = () => {
  const { theme } = useTheme();

  return (
    <Layout>
      <Head>
        <title>Sungblab</title>
        <meta
          name="description"
          content="Sungblab's innovative portfolio showcasing web development prowess and creativity"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="keywords"
          content="web development, technology, blog, coding, portfolio"
        />
        <meta property="og:title" content="Sungblab" />
        <meta
          property="og:description"
          content="Explore web development and technology insights"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sungblab.vercel.app/" />
        <meta
          name="google-site-verification"
          content="PxfmFDZIIiYW7qK7pk6s17rsBKYeI43cV5s15D5D5Yo"
        />
        <meta
          name="naver-site-verification"
          content="60a035a882f7831c7dcca834bf7815344cf4ffa8"
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
        {/* Hero Section */}
        <section className="relative min-h-[90vh] py-8 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-blue-500/5 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
          </div>
          <AnimatedSection>
            <div className="text-center space-y-6 relative z-10 px-4">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-44 h-44 mx-auto mb-6"
              >
                <Image
                  src={profilePic}
                  alt="Sungblab's profile"
                  fill
                  className="rounded-full ring-4 ring-purple-500/50 shadow-2xl object-cover"
                  priority
                />
                <div className="absolute -inset-0.5 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300" />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-size-200 animate-gradient py-2 leading-tight">
                  Sungblab
                </h1>
                <p
                  className={`text-xl sm:text-2xl md:text-3xl mt-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  } font-light`}
                >
                  Web & Python Developer
                </p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="flex gap-4 justify-center">
                  <SocialButton
                    href="https://github.com/Sungblab"
                    icon="github"
                    label="GitHub"
                    className="transform hover:scale-110 transition-transform"
                  />
                  <SocialButton
                    href="https://www.instagram.com/kimsungbin1119/"
                    icon="instagram"
                    label="Instagram"
                    className="transform hover:scale-110 transition-transform"
                  />
                </div>
                <Link
                  href="/blog"
                  className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-600 to-blue-500 group-hover:translate-x-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full">
                    Visit Blog
                  </span>
                  <span className="relative invisible">Visit Blog</span>
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </section>

        {/* Technologies Section */}
        <section className="py-20 sm:py-24 md:py-32 px-4 relative">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-blue-500/5 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
          </div>
          <AnimatedSection>
            <div className="max-w-6xl mx-auto relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold inline-block">
                  <span className="relative">
                    <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-size-200 animate-gradient">
                      Technologies & Tools
                    </span>
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 transform scale-x-0 transition-transform group-hover:scale-x-100" />
                  </span>
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                {skillCategories.map((category: SkillCategory, idx: number) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <div
                      className={`group p-6 rounded-2xl backdrop-blur-sm border border-transparent ${
                        theme === "dark"
                          ? "bg-gray-800/40 hover:bg-gray-800/60 hover:border-purple-500/30"
                          : "bg-white/80 hover:bg-white hover:border-purple-500/30"
                      } transition-all duration-300 h-full relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <h3
                        className={`text-lg md:text-xl font-bold mb-4 ${
                          theme === "dark"
                            ? "text-purple-400"
                            : "text-purple-600"
                        }`}
                      >
                        {category.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill: string) => (
                          <span
                            key={skill}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                              theme === "dark"
                                ? "bg-gray-700/50 text-gray-200 hover:bg-gray-600/50"
                                : "bg-gray-100/80 text-gray-800 hover:bg-gray-200/80"
                            } transition-colors duration-200 cursor-default`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Featured Projects Section */}
        <section className="py-24 px-4 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.05)_1px,transparent_1px)] bg-[length:32px_32px]" />
          <AnimatedSection>
            <div className="max-w-6xl mx-auto relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold inline-block">
                  <span className="relative">
                    <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-size-200 animate-gradient">
                      Featured Projects
                    </span>
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 transform scale-x-0 transition-transform group-hover:scale-x-100" />
                  </span>
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.slice(0, 4).map((project: Project, idx: number) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <div
                      className={`group p-6 rounded-2xl backdrop-blur-sm border border-transparent ${
                        theme === "dark"
                          ? "bg-gray-800/40 hover:bg-gray-800/60 hover:border-purple-500/30"
                          : "bg-white/80 hover:bg-white hover:border-purple-500/30"
                      } transition-all duration-300 h-full relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-500 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p
                          className={`mb-4 line-clamp-2 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech: string) => (
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
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center mt-12"
              >
                <Link
                  href="/projects"
                  className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-600 to-blue-500 group-hover:translate-x-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full">
                    View All Projects
                  </span>
                  <span className="relative invisible">View All Projects</span>
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </section>

        {/* Contact Section */}
        <section className="py-16 sm:py-24 px-4 overflow-hidden relative">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-blue-500/5 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
          </div>
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center relative">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-size-200 animate-gradient">
                Get in Touch
              </h2>
              <p
                className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto line-clamp-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                고등학생 주니어 개발자입니다. 언든지 연락주세요!
              </p>
              <div
                className={`p-4 sm:p-6 md:p-8 rounded-2xl backdrop-blur-sm border border-transparent ${
                  theme === "dark"
                    ? "bg-gray-800/40 hover:bg-gray-800/60 hover:border-purple-500/30"
                    : "bg-white/80 hover:bg-white hover:border-purple-500/30"
                } transition-all duration-300 shadow-xl max-w-3xl mx-auto overflow-hidden`}
              >
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="text-center md:text-left">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 truncate">
                      Contact Info
                    </h3>
                    <p className="mb-2">
                      <a
                        href="mailto:sungblab@gmail.com"
                        className="text-blue-500 hover:underline text-sm sm:text-base inline-flex items-center justify-center md:justify-start gap-2 transition-colors duration-200 hover:text-blue-600 truncate max-w-full"
                      >
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="truncate">sungblab@gmail.com</span>
                      </a>
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 truncate">
                      Social Media
                    </h3>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
                      <SocialButton
                        href="https://github.com/Sungblab"
                        icon="github"
                        label="GitHub"
                      />
                      <SocialButton
                        href="https://www.instagram.com/kimsungbin1119/"
                        icon="instagram"
                        label="Instagram"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </motion.main>
    </Layout>
  );
};

export default Home;
