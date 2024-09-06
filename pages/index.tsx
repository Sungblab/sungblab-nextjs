import { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { Layout, ProjectCard, SocialButton } from "../components/Components";
import { projects, Project } from "../data/projects";
import Image from "next/image";
import profilePic from "../img/sb.jpg";

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "HTML/CSS", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "Tailwind css", level: 90 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 90 },
      { name: "Flask", level: 80 },
      { name: "Express.js", level: 85 },
    ],
  },
  {
    name: "Database",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "sqllite3", level: 85 },
      { name: "PostgreSQL", level: 75 },
    ],
  },
  {
    name: "DevOps & Tools",
    skills: [
      { name: "Github", level: 90 },
      { name: "Vercel", level: 70 },
      { name: "Cloudtype", level: 75 },
    ],
  },
];

const SkillBar: React.FC<{ skill: string; level: number }> = ({
  skill,
  level,
}) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-base font-medium text-blue-700">{skill}</span>
      <span className="text-sm font-medium text-blue-700">{level}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <motion.div
        className="bg-blue-600 h-2.5 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  </div>
);

const SkillCategory: React.FC<{
  category: { name: string; skills: { name: string; level: number }[] };
}> = ({ category }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-4 text-gray-800">
      {category.name}
    </h3>
    {category.skills.map((skill) => (
      <SkillBar key={skill.name} skill={skill.name} level={skill.level} />
    ))}
  </div>
);

const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = {}
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};

const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isVisible) {
      controls.start("visible");
    }
  }, [isVisible, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
    >
      {children}
    </motion.div>
  );
};

const Home: NextPage = () => {
  const skillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        staggerChildren: 0.2,
      },
    },
  };

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
      </Head>

      <main className="mt-0 container mx-auto px-4 py-8 bg-white rounded-lg shadow-md my-8">
        <AnimatedSection>
          <section className="mb-4 text-center flex flex-col items-center relative">
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
              <div className="mb-4 relative w-48 h-48">
                <Image
                  src={profilePic}
                  alt="Sungblab's profile"
                  width={500}
                  height={300}
                  className="rounded-full border-4 border-purple-600 shadow-lg"
                />
              </div>
              <div className="p-6 rounded-lg backdrop-filter backdrop-blur-md max-w-3xl w-full">
                <h1 className="text-5xl py-1 font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Welcome to Sungblab's World
                </h1>
                <p className="text-xl font-bold text-black text-shadow">
                  Full-stack Developer | Python Developer
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
              Archiving
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ArchiveCard
                title="GitHub"
                description={`제 깃허브 저장소 입니다. 중학교 2학년 시절부터 꾸준히 commit 과 fetch, publish가 이루어진 곳입니다.`}
                link="https://github.com/Kimsungbin1"
                icon=""
              />
              <ArchiveCard
                title="YouTube"
                description={`제 유튜브 채널입니다. 주로 쓰는 플랫폼은 아니지만 가끔 영상으로 올리는 프로젝트가 있습니다.`}
                link="https://www.youtube.com/@sungbing1119"
                icon=""
              />
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skillCategories.map((category) => (
                <SkillCategory key={category.name} category={category} />
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
              Projects
            </h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={projectVariants}
              initial="hidden"
              animate="visible"
            >
              {projects.slice(0, 4).map((project) => (
                <motion.div key={project.id} variants={projectVariants}>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                  />
                </motion.div>
              ))}
            </motion.div>
            <div className="text-center mt-8">
              <Link
                href="/projects"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-500 transition-colors shadow-md hover:shadow-lg"
              >
                View All Projects
              </Link>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
              Get in Touch
            </h2>
            <div className="max-w-2xl mx-auto bg-white p-8 ">
              <p className="text-center mb-6 text-gray-700 text-lg">
                저는 동료 개발자, 잠재 고객 또는 웹 개발 및 기술에 관심이 있는
                모든 분들과 소통하는 것을 언제나 기쁘게 생각합니다. 프로젝트를
                구상 중이거나 공동 작업을 하고 싶거나 그냥 인사만 하고
                싶으시다면 언제든지 연락주세요!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Contact Information
                  </h3>
                  <p className="mb-2">
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:ksb19558@naver.com"
                      className="text-blue-600 hover:underline"
                    >
                      ksb19558@naver.com
                    </a>
                  </p>
                  <p>
                    <strong>IG:</strong> Kimsungbin1119
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Social Media
                  </h3>
                  <div className="flex flex-col space-y-2">
                    <SocialButton
                      href="https://www.instagram.com/kimsungbin1119/"
                      icon="instagram"
                      label="Instagram"
                    />
                    <SocialButton
                      href="https://github.com/Kimsungbin1"
                      icon="github"
                      label="GitHub"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>
    </Layout>
  );
};

interface ArchiveCardProps {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}

const ArchiveCard: React.FC<ArchiveCardProps> = ({
  title,
  description,
  link,
  icon,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-2xl font-semibold mb-3 flex items-center">
        <span className="mr-2">{icon}</span>
        <span>{title}</span>
      </h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        Visit {title} Profile &rarr;
      </a>
    </div>
  );
};

export default Home;
