import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "motion/react";
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

      <section className="pt-32 sm:pt-40 pb-24 px-5 sm:px-6 min-h-screen relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,112,75,0.05)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(196,112,75,0.04)_0%,transparent_50%)] pointer-events-none" />

        <div className="max-w-3xl mx-auto relative">
          {/* Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 ${
              theme === "dark" ? "text-terracotta-light/70" : "text-terracotta/70"
            }`}>
              Guestbook
            </span>
            <h1
              className={`font-heading text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
                theme === "dark"
                  ? "from-warm-100 to-terracotta-light"
                  : "from-warm-900 to-terracotta"
              }`}
            >
              {translate("guestbook.title")}
            </h1>
            <p className={`text-base md:text-lg max-w-md mx-auto leading-relaxed ${
              theme === "dark" ? "text-warm-500" : "text-warm-600"
            }`}>
              {translate("guestbook.description")}
            </p>
          </motion.div>

          {/* Giscus card */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className={`rounded-2xl border overflow-hidden ${
              theme === "dark"
                ? "bg-warm-800/40 border-warm-850"
                : "bg-white border-warm-200 shadow-sm"
            }`}
          >
            <div className="h-1 w-full bg-gradient-to-r from-terracotta to-terracotta-light" />
            <div className="p-6 md:p-8">
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
        </div>
      </section>
    </Layout>
  );
};

export default Guestbook;
