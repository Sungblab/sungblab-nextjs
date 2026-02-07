import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { Layout } from "../components/layout/Layout";
import { useTheme } from "../components/features/ThemeContext";
import { useLanguage } from "../components/features/LanguageContext";
import { AnimatedSection } from "../components/ui/AnimatedSection";
import Giscus from "@giscus/react";

const Guestbook: NextPage = () => {
  const { theme } = useTheme();
  const { translate, language } = useLanguage();

  return (
    <Layout>
      <Head>
        <title>{`${translate("guestbook.title")} | Sungblab`}</title>
        <meta
          name="description"
          content={translate("guestbook.metaDescription")}
        />
      </Head>

      <section className="py-20 px-4 min-h-screen relative">
        <div className="absolute inset-0">
            <div
              className={`absolute inset-0 ${
                theme === "dark" ? "bg-gray-900/90" : "bg-white/90"
              }`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[length:24px_24px]" />
        </div>
        
        <AnimatedSection className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                theme === "dark" ? "text-purple-300" : "text-purple-600"
              }`}
            >
              {translate("guestbook.title")}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className={`text-lg md:text-xl ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {translate("guestbook.description")}
            </motion.p>
          </div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`p-6 md:p-8 rounded-2xl backdrop-blur-sm border shadow-xl ${
               theme === "dark"
                ? "bg-gray-800/40 border-gray-700/50"
                : "bg-white/80 border-gray-200/50"
            }`}
          >
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
          </motion.div>
        </AnimatedSection>
      </section>
    </Layout>
  );
};

export default Guestbook;
