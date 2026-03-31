import { GetStaticProps, NextPage } from "next";
import { Layout } from "../components/layout/Layout";
import { HeroSection } from "../components/sections/HeroSection";
import { UnivMindSection } from "../components/sections/UnivMindSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { BlogPreviewSection } from "../components/sections/BlogPreviewSection";
import { ContactSection } from "../components/sections/ContactSection";
import SEO from "../components/SEO";
import { getAllPosts } from "../utils/mdxUtils";
import { getGitHubRepos } from "../utils/github";
import { useLanguage } from "../components/features/LanguageContext";

interface HomeProps {
  posts: any[];
  projects: any[];
}

const Home: NextPage<HomeProps> = ({ posts, projects }) => {
  const { translate } = useLanguage();

  return (
    <Layout>
      <SEO
        title="Sungblab"
        description={translate("home.metaDescription")}
        keywords={["web development", "technology", "blog", "coding", "portfolio", "full-stack"]}
      />
      <HeroSection />
      <UnivMindSection />
      <ProjectsSection projects={projects} />
      <BlogPreviewSection posts={posts} />
      <ContactSection />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = getAllPosts().sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );

  let projects: any[] = [];
  try {
    const repos = await getGitHubRepos("Sungblab", 100);
    projects = repos
      .filter((repo: any) => !repo.fork)
      .map((repo: any, index: number) => ({
        id: index,
        title: repo.name,
        description: repo.description || "",
        link: repo.html_url,
        image: `https://opengraph.githubassets.com/1/${repo.full_name || `Sungblab/${repo.name}`}`,
        technologies: [repo.language, ...(repo.topics || [])].filter(Boolean),
        date: repo.created_at?.split("T")[0] || "",
      }));
  } catch (error) {
    console.error("GitHub API error:", error);
  }

  return {
    props: { posts, projects },
    revalidate: 3600,
  };
};

export default Home;
