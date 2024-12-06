import { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import {
  Layout,
  Card,
  SocialButton,
  ThemeProvider,
  useTheme,
} from "../components/Components";
import { projects } from "../data/projects";
import Image from "next/image";
import profilePic from "../img/sb.jpg";
import { FaInstagram, FaGithub, FaYoutube } from "react-icons/fa";
import styled from "styled-components";

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

interface ThemeType {
  colors: {
    background: string;
  };
}

const HeroSection = styled.section<{ theme: ThemeType }>`
  background: ${({ theme }) => theme?.colors?.background || "#FFFFFF"};
  padding: 4rem 0;
  text-align: center;
`;

const StyledProjectCard = styled(Card)<{ theme: ThemeType }>`
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

      <main className="min-h-screen">
        <section className="relative min-h-[70vh] py-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-blue-500/10" />
          <AnimatedSection>
            <div className="text-center space-y-4 relative z-10">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <Image
                  src={profilePic}
                  alt="Sungblab's profile"
                  fill
                  className="rounded-full ring-4 ring-purple-500 shadow-xl object-cover"
                  priority
                />
              </div>
              <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 py-2 leading-normal">
                Sungblab
              </h1>
              <p
                className={`text-2xl ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Web & Python Developer
              </p>
              <div className="flex gap-4 justify-center">
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
          </AnimatedSection>
        </section>

        <section className="py-24 px-4">
          <AnimatedSection>
            <div className="max-w-6xl mx-auto">
              <div className="relative">
                <h2 className="text-4xl font-bold text-center mb-16 py-2">
                  <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 inline-block leading-relaxed">
                    Technologies & Tools
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {skillCategories.map((category) => (
                  <div
                    key={category.name}
                    className={`p-8 rounded-xl transform hover:scale-105 transition-all duration-300 h-full min-h-[200px] ${
                      theme === "dark"
                        ? "bg-gray-800/50 hover:bg-gray-700/50"
                        : "bg-white hover:shadow-2xl"
                    }`}
                  >
                    <h3
                      className={`text-xl font-semibold mb-6 ${
                        theme === "dark" ? "text-purple-400" : "text-purple-600"
                      }`}
                    >
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-3 overflow-visible">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-4 py-2 rounded-full text-sm ${
                            theme === "dark"
                              ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          } transition-colors duration-200`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>

        <section className="py-24 px-4 bg-gradient-to-b from-transparent to-purple-500/5">
          <AnimatedSection>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16 py-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.slice(0, 4).map((project) => (
                  <StyledProjectCard
                    key={project.id}
                    className={`group p-6 rounded-xl ${
                      theme === "dark" ? "bg-gray-800/50" : "bg-white"
                    } shadow-xl hover:shadow-2xl transition-all duration-300`}
                  >
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    <p
                      className={`mb-4 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 rounded-full text-sm ${
                            theme === "dark"
                              ? "bg-gray-700 text-gray-200"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </StyledProjectCard>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/projects"
                  className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  View All Projects
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </section>

        <section className="py-24 px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                Get in Touch
              </h2>
              <p
                className={`text-xl mb-8 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                고등학생 주니어 개발자입니다. 언제든지 연락주세!
              </p>
              <div
                className={`p-8 rounded-xl ${
                  theme === "dark" ? "bg-gray-800/50" : "bg-white"
                } shadow-xl`}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">
                      Contact Info
                    </h3>
                    <p className="mb-2">
                      <a
                        href="mailto:ksb19558@naver.com"
                        className="text-blue-500 hover:underline"
                      >
                        ksb19558@naver.com
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">
                      Social Media
                    </h3>
                    <div className="flex justify-center gap-4">
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
      </main>
    </Layout>
  );
};

export default Home;
