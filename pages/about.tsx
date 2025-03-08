import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { Layout, SocialButton, useTheme } from "../components/Components";
import { FaDownload } from "react-icons/fa";

const AboutPage: NextPage = () => {
  const { theme } = useTheme();

  // 애니메이션 변수
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Layout>
      <Head>
        <title>About Me | Sungblab</title>
        <meta name="description" content="Sungblab의 소개 페이지입니다." />
        <meta property="og:title" content="About Me | Sungblab" />
        <meta
          property="og:description"
          content="Sungblab의 소개 페이지입니다."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sungblab.com/about" />
      </Head>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 프로필 섹션 */}
          <motion.div
            className={`col-span-1 ${
              theme === "dark" ? "bg-gray-800/60" : "bg-white"
            } rounded-2xl p-6 shadow-xl backdrop-blur-sm border ${
              theme === "dark" ? "border-gray-700/50" : "border-gray-200/50"
            }`}
            variants={itemVariants}
          >
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-6 overflow-hidden rounded-full border-4 border-purple-500 shadow-lg">
                <Image
                  src="/images/sb.jpg"
                  alt="Profile"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <h1
                className={`text-3xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                김성빈
              </h1>
              <p
                className={`text-lg mb-4 ${
                  theme === "dark" ? "text-purple-300" : "text-purple-600"
                }`}
              >
                풀스택 개발자 & AI 입코더
              </p>
              <div className="flex items-center mb-4">
                <span
                  className={`${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  sungblab@gmail.com{" "}
                </span>
              </div>
              <div className="flex space-x-3 mb-6">
                <SocialButton
                  href="https://github.com/sungblab"
                  icon="github"
                  label="GitHub"
                />
              </div>
            </div>
          </motion.div>

          {/* 소개 및 정보 섹션 */}
          <motion.div
            className={`col-span-1 md:col-span-2 ${
              theme === "dark" ? "bg-gray-800/60" : "bg-white"
            } rounded-2xl p-8 shadow-xl backdrop-blur-sm border ${
              theme === "dark" ? "border-gray-700/50" : "border-gray-200/50"
            }`}
            variants={itemVariants}
          >
            <h2
              className={`text-3xl font-bold mb-6 ${
                theme === "dark" ? "text-purple-300" : "text-purple-600"
              }`}
            >
              안녕하세요! 👋
            </h2>
            <div
              className={`space-y-6 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <p className="text-lg leading-relaxed">
                저는 AI에 관심이 많은 열정적인 풀스택 개발자입니다. 프론트엔드와
                백엔드 기술 모두에 능숙하며, 현재는 인공지능 분야를 탐구하고
                있습니다. 효율적이고 사용자 친화적인 웹 애플리케이션을 만들고 AI
                기능을 프로젝트에 통합하는 것이 제 목표입니다.
              </p>
              <p className="text-lg leading-relaxed">
                React, Node.js, Python을 주로 사용하며, 데이터베이스로는
                MongoDB, SQLite, PostgreSQL을 활용합니다. 최근에는 TensorFlow와
                PyTorch를 학습하며 AI와 머신러닝 기술을 익히고 있습니다.
              </p>
              <p className="text-lg leading-relaxed">
                새로운 기술을 배우고 적용하는 것을 좋아하며, 특히 자연어
                처리(NLP)와 고급 AI 및 머신러닝 기술에 관심이 많습니다.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* 기술 스택 섹션 */}
        <motion.div
          className={`mt-8 ${
            theme === "dark" ? "bg-gray-800/60" : "bg-white"
          } rounded-2xl p-8 shadow-xl backdrop-blur-sm border ${
            theme === "dark" ? "border-gray-700/50" : "border-gray-200/50"
          }`}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2
            className={`text-2xl font-bold mb-6 ${
              theme === "dark" ? "text-purple-300" : "text-purple-600"
            }`}
          >
            기술 스택
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "React", level: 90 },
              { name: "JavaScript", level: 85 },
              { name: "HTML/CSS", level: 90 },
              { name: "Tailwind CSS", level: 85 },
              { name: "Node.js", level: 80 },
              { name: "Python", level: 85 },
              { name: "MongoDB", level: 75 },
              { name: "PostgreSQL", level: 70 },
              { name: "TensorFlow", level: 65 },
              { name: "PyTorch", level: 60 },
              { name: "Pandas", level: 75 },
              { name: "NumPy", level: 70 },
            ].map((skill) => (
              <div key={skill.name} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span
                    className={`font-medium ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {skill.name}
                  </span>
                  <span
                    className={`${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div
                  className={`w-full h-2 rounded-full ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <motion.div
                    className="h-2 rounded-full bg-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* GitHub 통계 섹션 */}
        <motion.div
          className={`mt-8 ${
            theme === "dark" ? "bg-gray-800/60" : "bg-white"
          } rounded-2xl p-8 shadow-xl backdrop-blur-sm border ${
            theme === "dark" ? "border-gray-700/50" : "border-gray-200/50"
          }`}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2
            className={`text-2xl font-bold mb-6 ${
              theme === "dark" ? "text-purple-300" : "text-purple-600"
            }`}
          >
            GitHub 통계
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div
              className={`w-full md:w-1/2 overflow-hidden rounded-xl ${
                theme === "dark" ? "bg-gray-700/50" : "bg-gray-100"
              } p-4`}
            >
              <img
                src="https://github-readme-stats.vercel.app/api?username=sungblab&show_icons=true&theme=radical"
                alt="GitHub Stats"
                className="w-full h-auto"
              />
            </div>
            <div
              className={`w-full md:w-1/2 overflow-hidden rounded-xl ${
                theme === "dark" ? "bg-gray-700/50" : "bg-gray-100"
              } p-4`}
            >
              <img
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=sungblab&layout=compact&theme=radical"
                alt="Top Languages"
                className="w-full h-auto"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AboutPage;
