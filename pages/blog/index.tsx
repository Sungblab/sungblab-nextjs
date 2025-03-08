import { GetStaticProps, NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, useTheme, Card } from "../../components/Components";
import BlogPostCard from "../../components/blog/BlogPostCard";
import BlogSearch from "../../components/blog/BlogSearch";
import BlogCategories from "../../components/blog/BlogCategories";
import SEO from "../../components/SEO";
import { Post } from "../../types/post";
import { getAllPosts } from "../../utils/mdxUtils";
import styled from "styled-components";
import { stripMarkdown } from "../../utils/textUtils";

interface BlogPageProps {
  posts: Post[];
}

const POSTS_PER_PAGE = 10;

const categories = [
  { id: "all", label: "전체" },
  { id: "develop", label: "개발" },
  { id: "AI", label: "인공지능" },
  { id: "others", label: "기타" },
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

const BlogCard = styled(Card)<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.background};
  margin-bottom: 1.5rem;
`;

const BlogPage: NextPage<BlogPageProps> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const { theme } = useTheme();

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
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
        title="Blog | Sungblab"
        description="Sungblab의 개발 블로그 - 웹 개발, AI, 그리고 기술 이야기"
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`min-h-screen ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0">
            <div
              className={`absolute inset-0 ${
                theme === "dark" ? "bg-gray-900/90" : "bg-white/90"
              }`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[length:24px_24px]" />
          </div>

          <div className="container mx-auto px-4 py-12 relative">
            <AnimatedSection>
              {/* 헤더 섹션 */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h1
                  className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
                    theme === "dark" ? "text-purple-300" : "text-purple-600"
                  }`}
                >
                  Blog
                </h1>
                <p
                  className={`text-lg ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  개발과 기술에 대한 이야기를 공유합니다
                </p>
              </motion.div>

              {/* 검색 및 필터 섹션 */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8 space-y-6"
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

              {/* 블로그 포스트 그리드 */}
              <AnimatePresence mode="wait">
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {currentPosts.map((post, index) => (
                    <BlogPostCard
                      key={post.slug}
                      post={post}
                      theme={theme}
                      index={index}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex justify-center mt-12"
                >
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <button
                          key={number}
                          onClick={() => handlePageChange(number)}
                          className={`px-4 py-2 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                            currentPage === number
                              ? theme === "dark"
                                ? "bg-purple-700 text-white border-purple-700"
                                : "bg-purple-600 text-white border-purple-600"
                              : theme === "dark"
                              ? "bg-gray-800/40 hover:bg-gray-800/60 border-gray-700/50 hover:border-purple-700/50 text-gray-300"
                              : "bg-white/80 hover:bg-white border-gray-200/50 hover:border-purple-300/50 text-gray-600"
                          }`}
                        >
                          {number}
                        </button>
                      )
                    )}
                  </div>
                </motion.div>
              )}

              {/* 검색 결과 없음 메시지 */}
              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p
                    className={`text-xl mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    검색 결과가 없습니다
                  </p>
                  <p
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }
                  >
                    다른 키워드로 검색해보세요
                  </p>
                </motion.div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </motion.main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};

export default BlogPage;
