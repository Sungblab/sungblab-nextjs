import { GetStaticProps, NextPage } from "next";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layout, useTheme, useLanguage } from "../../components/Components";
import BlogPostCard from "../../components/blog/BlogPostCard";
import BlogSearch from "../../components/blog/BlogSearch";
import BlogCategories from "../../components/blog/BlogCategories";
import SEO from "../../components/SEO";
import { Post } from "../../types/post";
import { getAllPosts } from "../../utils/mdxUtils";
import { stripMarkdown } from "../../utils/textUtils";

interface BlogPageProps {
  posts: Post[];
}

const POSTS_PER_PAGE = 10;


const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};


const BlogPage: NextPage<BlogPageProps> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const { theme } = useTheme();
  const { translate } = useLanguage();
  const isDark = theme === "dark";

  const categories = [
    { id: "all", label: translate("blog.categories.all") },
    { id: "develop", label: translate("blog.categories.develop") },
    { id: "AI", label: translate("blog.categories.AI") },
    { id: "others", label: translate("blog.categories.others") },
  ];

  useEffect((): void => {
    const filtered = posts.filter(
      (post: Post): boolean =>
        (selectedCategory === "all" ||
          post.frontmatter.category.toLowerCase() ===
            selectedCategory.toLowerCase()) &&
        (post.frontmatter.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          stripMarkdown(post.excerpt)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, posts]);

  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <SEO
        title={`${translate("blog.title")} | Sungblab`}
        description={translate("blog.description")}
      />

      <div
        className={`min-h-screen min-h-[100svh] ${
          isDark ? "bg-warm-950" : "bg-warm-50"
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0">
            <div
              className={`absolute inset-0 ${
                isDark ? "bg-warm-950/90" : "bg-white/90"
              }`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,84,56,0.03)_1px,transparent_1px)] bg-[length:24px_24px]" />
          </div>

          <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-32 sm:pt-40 pb-12 relative">
            <AnimatedSection>
              {/* Header */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h1
                  className={`font-heading text-4xl md:text-6xl font-bold mb-6 pb-2 bg-clip-text text-transparent bg-gradient-to-r ${
                    isDark
                    ? "from-white via-terracotta-pale to-terracotta-light"
                    : "from-warm-900 via-terracotta-dark to-terracotta"
                  }`}
                >
                  {translate("blog.title")}
                </h1>
                <p
                  className={`text-lg md:text-xl max-w-2xl mx-auto ${
                    isDark ? "text-warm-400" : "text-warm-700"
                  }`}
                >
                  {translate("blog.description")}
                </p>
              </motion.div>

              {/* Search & Filter */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12 space-y-8"
              >
                <div className="max-w-xl mx-auto">
                  <BlogSearch
                    searchTerm={searchTerm}
                    onSearch={setSearchTerm}
                    theme={theme}
                  />
                </div>
                <BlogCategories
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                  theme={theme}
                />
              </motion.div>

              {/* Blog Post Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {currentPosts.map((post: Post, index: number): JSX.Element => (
                    <BlogPostCard
                      key={post.slug}
                      post={post}
                      theme={theme}
                      index={index}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex justify-center mt-12"
                >
                  <nav aria-label="Pagination" className="flex gap-2">
                    {Array.from({ length: totalPages }, (_: unknown, i: number): number => i + 1).map(
                      (number: number): JSX.Element => (
                        <button
                          key={number}
                          onClick={(): void => handlePageChange(number)}
                          aria-label={`Page ${number}`}
                          aria-current={currentPage === number ? "page" : undefined}
                          className={`min-w-[44px] min-h-[44px] px-4 py-2 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                            currentPage === number
                              ? "bg-terracotta text-white border-terracotta"
                              : isDark
                              ? "bg-warm-800/40 hover:bg-warm-800/60 border-warm-850/50 hover:border-terracotta/50 text-warm-300"
                              : "bg-white/80 hover:bg-white border-warm-200/50 hover:border-terracotta/50 text-warm-700"
                          }`}
                        >
                          {number}
                        </button>
                      )
                    )}
                  </nav>
                </motion.div>
              )}

              {/* No results */}
              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p
                    className={`text-xl mb-2 ${
                      isDark ? "text-warm-300" : "text-warm-700"
                    }`}
                  >
                    {translate("blog.noResults")}
                  </p>
                  <p className="text-warm-500">
                    {translate("blog.tryDifferent")}
                  </p>
                </motion.div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
    revalidate: 3600,
  };
};

export default BlogPage;
