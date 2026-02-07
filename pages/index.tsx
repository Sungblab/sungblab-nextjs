import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { Layout } from "../components/layout/Layout";
import { useTheme } from "../components/features/ThemeContext";
import { useLanguage } from "../components/features/LanguageContext";
import { getAllPosts } from "../utils/mdxUtils";
import { Post } from "../types/post";

// Sections
import { HeroSection } from "../components/sections/HeroSection";
import { BlogPreviewSection } from "../components/sections/BlogPreviewSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { FeaturedProjectsSection } from "../components/sections/FeaturedProjectsSection";
import { ContactSection } from "../components/sections/ContactSection";

import { getGitHubRepos } from "../utils/github";
import { Project } from "../data/projects";

interface HomeProps {
  posts: Post[];
  projects: Project[];
}

const Home: NextPage<HomeProps> = ({ posts, projects }) => {
  const { theme } = useTheme();
  const { translate } = useLanguage();

  return (
    <Layout>
      <Head>
        <title>{translate("home.title")}</title>
        <meta
          name="description"
          content={translate("home.description")}
        />
        <meta
          name="keywords"
          content="web development, technology, blog, coding, portfolio, full-stack"
        />
        <meta property="og:title" content="Sungblab" />
        <meta
          property="og:description"
          content={translate("home.metaDescription")}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sungblab.vercel.app/" />
        {/* Verification meta tags preserved */}
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
        className={`min-h-screen font-sans ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <HeroSection />
        <BlogPreviewSection posts={posts} />
        <SkillsSection />
        <FeaturedProjectsSection projects={projects} />
        <ContactSection />
      </motion.main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  // Sort by date (descending)
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });

  // Fetch GitHub Repos
  const repos = await getGitHubRepos("Sungblab");
  
  // Transform to Project format
  // Transform to Project format
  const githubProjects: Project[] = repos
    .filter((repo: any) => !repo.fork) // Keep filtering out forks if desired, or remove this line too if you want forks. Usually forks are not main projects. Let's keep fork filter but remove description filter.
    .map((repo: any) => ({
      id: repo.id,
      title: repo.name,
      description: repo.description || "", // Empty string if no description
      link: repo.html_url,
      // Use GitHub Open Graph image service for dynamic preview
      image: `https://opengraph.githubassets.com/1/Sungblab/${repo.name}`,
      technologies: [repo.language, ...(repo.topics || [])].filter(Boolean),
      date: repo.updated_at,
    }));

  return {
    props: {
      posts: sortedPosts,
      projects: githubProjects,
    },
    // Revalidate every hour
    revalidate: 3600,
  };
};

export default Home;
