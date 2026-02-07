import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { Layout, SocialButton, useTheme, useLanguage } from "../components/Components";
import { FaDownload } from "react-icons/fa";
import Giscus from "@giscus/react";
import { AnimatedSection } from "../components/ui/AnimatedSection";

const AboutPage: NextPage = () => {
  const { theme } = useTheme();
  const { translate, language } = useLanguage();

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
        <title>{`${translate("about.title")} | Sungblab`}</title>
        <meta name="description" content={translate("about.intro1")} />
        <meta property="og:title" content={`${translate("about.title")} | Sungblab`} />
        <meta
          property="og:description"
          content={translate("about.intro1")}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sungblab.com/about" />
      </Head>

      <div className="container mx-auto px-4 pt-40 pb-12 max-w-5xl">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 프로필 섹션 */}
          <motion.div
            className={`col-span-1 flex flex-col items-center justify-center text-center ${
              theme === "dark" 
              ? "bg-gray-800/40 border-gray-700/50" 
              : "bg-white/60 border-gray-200/50"
            } rounded-3xl p-8 shadow-xl backdrop-blur-md border transition-all hover:shadow-2xl`}
            variants={itemVariants}
          >
            <div className="relative w-48 h-48 mb-6 group">
               <div className={`absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 ${
                 theme === 'dark' ? 'bg-purple-600' : 'bg-purple-400'
               }`} />
              <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-white/20 shadow-2xl">
                <Image
                  src="/images/sb.jpg"
                  alt="Profile"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            
            <h1
              className={`text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${
                theme === "dark" 
                ? "from-white via-purple-200 to-purple-400" 
                : "from-gray-900 via-purple-800 to-purple-600"
              }`}
            >
              {translate("about.name")}
            </h1>
            <p
              className={`text-lg font-medium mb-6 ${
                theme === "dark" ? "text-purple-300" : "text-purple-600"
              }`}
            >
              {translate("about.role")}
            </p>
            
            <div className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-full ${
               theme === "dark" ? "bg-gray-700/50 text-gray-300" : "bg-gray-100 text-gray-600"
            }`}>
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
               <span className="text-sm">sungblab@gmail.com</span>
            </div>

            <div className="flex space-x-3">
              <SocialButton
                href="https://github.com/sungblab"
                icon="github"
                label="GitHub"
              />
            </div>
          </motion.div>

          {/* 소개 및 정보 섹션 */}
          <motion.div
            className={`col-span-1 md:col-span-2 ${
              theme === "dark" 
              ? "bg-gray-800/40 border-gray-700/50" 
              : "bg-white/60 border-gray-200/50"
            } rounded-3xl p-8 shadow-xl backdrop-blur-md border flex flex-col justify-center`}
            variants={itemVariants}
          >
            <h2
              className={`text-3xl font-bold mb-8 flex items-center gap-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="text-4xl">👋</span> {translate("about.greeting")}
            </h2>
            <div
              className={`space-y-6 text-lg leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <p>
                {translate("about.intro1")}
              </p>
              <p>
                {translate("about.intro2")}
              </p>
              <p>
                {translate("about.intro3")}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* GitHub 통계 섹션 */}
        <motion.div
          className={`mt-8 ${
            theme === "dark" 
            ? "bg-gray-800/40 border-gray-700/50" 
            : "bg-white/60 border-gray-200/50"
          } rounded-3xl p-8 shadow-xl backdrop-blur-md border`}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2
            className={`text-2xl font-bold mb-8 flex items-center gap-3 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            <span className="text-3xl">📊</span> GitHub Stats
          </h2>
          
          <div className="space-y-8">
            {/* Contribution Graph */}
            <div className={`overflow-hidden rounded-2xl p-4 transition-transform duration-300 hover:scale-[1.01] ${
              theme === "dark" ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200 shadow-sm"
            }`}>
              <img
                src={`https://ghchart.rshah.org/${theme === 'dark' ? 'a855f7' : '7e22ce'}/sungblab`}
                alt="GitHub Contribution Graph"
                className="w-full h-auto"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <div className={`overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.02] ${
                  theme === "dark" ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200 shadow-sm"
                }`}>
                  <img
                    src={`https://github-profile-summary-cards.vercel.app/api/cards/stats?username=sungblab&theme=${theme === 'dark' ? 'radical' : 'default'}`}
                    alt="GitHub Stats"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="group">
                <div className={`overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.02] ${
                  theme === "dark" ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200 shadow-sm"
                }`}>
                  <img
                    src={`https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=sungblab&theme=${theme === 'dark' ? 'radical' : 'default'}`}
                    alt="Top Languages"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Streak Stats */}
            <div className="group">
              <div className={`overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.01] ${
                theme === "dark" ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200 shadow-sm"
              }`}>
                <img
                  src={`https://streak-stats.demolab.com/?user=sungblab&theme=${theme === 'dark' ? 'radical' : 'default'}&background=00000000&hide_border=true&stroke=${theme === 'dark' ? 'a855f7' : '7e22ce'}`}
                  alt="GitHub Streak"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 방명록 (Guestbook) 섹션 */}
        <AnimatedSection className="mt-12">
           <motion.div
            className={`${
              theme === "dark" 
              ? "bg-gray-800/40 border-gray-700/50" 
              : "bg-white/60 border-gray-200/50"
            } rounded-3xl p-8 shadow-xl backdrop-blur-md border`}
          >
             <h2
              className={`text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r ${
                theme === "dark" 
                ? "from-white via-purple-200 to-purple-400" 
                : "from-gray-900 via-purple-800 to-purple-600"
              }`}
            >
              {translate("about.guestbookTitle")}
            </h2>
            <p className={`text-center mb-10 text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {translate("about.guestbookSubtitle")}
            </p>
            <div className={`rounded-2xl p-4 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50/50'}`}>
              <Giscus
                repo="Sungblab/sungblab-nextjs"
                repoId="R_kgDOMs0-6A"
                category="Announcements" 
                categoryId="DIC_kwDOMs0-6M4CiQTH"
                mapping="pathname"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={theme === "dark" ? "dark" : "light"}
                lang={language === "ko" ? "ko" : "en"}
                loading="lazy"
              />
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default AboutPage;
