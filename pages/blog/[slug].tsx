import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Layout, useTheme } from "../../components/Components";
import Giscus from "@giscus/react";
import { useState, useEffect } from "react";
import Math from "../../components/Math";
import {
  FaArrowUp,
  FaArrowDown,
  FaCopy,
  FaShare,
  FaArrowLeft,
  FaListUl,
  FaBookmark,
} from "react-icons/fa";
import RelatedPosts from "../../components/blog/RelatedPosts";
import { getRelatedPosts } from "../../utils/postUtils";
import {
  getPostBySlug,
  getAllPosts,
  getPostFilePaths,
} from "../../utils/mdxUtils";
import { Post } from "../../types/post";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

interface BlogPostProps {
  frontMatter: {
    title: string;
    date: string;
    category: string;
  };
  mdxSource: MDXRemoteSerializeResult;
  toc: TocItem[];
  post: Post;
  relatedPosts: Post[];
  prevPost: Post | null;
  nextPost: Post | null;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const BlogContainer = styled.article`
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const BlogPost: NextPage<BlogPostProps> = ({
  frontMatter,
  mdxSource,
  toc,
  post,
  relatedPosts,
  prevPost,
  nextPost,
}) => {
  const { theme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [showToc, setShowToc] = useState(false);

  const generateId = (text: string) => {
    return text
      .toString()
      .replace(/[^가-힣a-zA-Z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
  };

  const scrollToHeader = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollButtons(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  const copyPostUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("게시글 주소가 클립보드에 복사되었습니다.");
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator
        .share({
          title: frontMatter.title,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      alert("공유 기능 지원되지 않는 브라우저입니다.");
    }
  };

  const MDXComponents = {
    Math,
    h1: (props: any) => {
      const id = generateId(props.children);
      return (
        <h1
          id={id}
          className={`text-3xl md:text-4xl font-bold mt-8 md:mt-12 mb-6 md:mb-8 tracking-tight ${
            theme === "dark" ? "text-gray-100" : "text-gray-900"
          }`}
          {...props}
        />
      );
    },
    h2: (props: any) => {
      const id = generateId(props.children);
      return (
        <h2
          id={id}
          className={`text-2xl md:text-3xl font-semibold mt-8 md:mt-10 mb-4 md:mb-6 tracking-tight ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
          {...props}
        />
      );
    },
    h3: (props: any) => (
      <h3
        className={`text-xl md:text-2xl font-medium mt-6 md:mt-8 mb-3 md:mb-4 tracking-tight ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
        {...props}
      />
    ),
    p: (props: any) => (
      <p
        className={`my-4 md:my-6 text-base md:text-lg leading-7 md:leading-8 ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
        {...props}
      />
    ),
    ul: (props: any) => (
      <ul
        className={`list-disc ml-6 my-4 space-y-1 ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
        {...props}
      />
    ),
    ol: (props: any) => (
      <ol
        className={`list-decimal ml-6 my-4 space-y-1 ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
        {...props}
      />
    ),
    li: (props: any) => <li className="pl-2">{props.children}</li>,
    a: (props: any) => (
      <a
        className={`font-medium underline decoration-2 underline-offset-2 transition-colors duration-200 ${
          theme === "dark"
            ? "text-blue-400 hover:text-blue-300"
            : "text-blue-600 hover:text-blue-800"
        }`}
        {...props}
      />
    ),
    code: (props: any) => (
      <code
        className={`rounded-md px-2 py-1 font-mono text-sm ${
          theme === "dark"
            ? "bg-gray-800 text-pink-300"
            : "bg-gray-100 text-pink-800"
        }`}
        {...props}
      />
    ),
    pre: (props: any) => (
      <pre
        className={`rounded-lg p-6 my-8 overflow-x-auto text-sm leading-6 ${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-gray-100 text-gray-800"
        } shadow-lg max-w-full`}
        {...props}
      />
    ),
    img: (props: any) => (
      <span className="block my-8">
        <Image
          {...props}
          width={800}
          height={600}
          style={{
            maxHeight: "600px",
            width: "auto",
            margin: "0 auto",
            objectFit: "contain",
          }}
          alt={props.alt || "blog image"}
          className="rounded-lg shadow-md mx-auto"
        />
      </span>
    ),
    blockquote: (props: any) => (
      <blockquote
        className={`border-l-4 border-blue-500 pl-4 italic my-6 ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
        {...props}
      />
    ),
    div: (props: any) => (
      <div
        className="max-w-full overflow-x-auto py-2 overflow-y-hidden scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
        {...props}
      />
    ),
  };

  return (
    <Layout>
      <Head>
        <title>{`${frontMatter.title} | Sungblab's Blog`}</title>
      </Head>
      <div
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

          <div className="container mx-auto py-12 relative">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 px-2 sm:px-4">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-12"
                >
                  <Link
                    href="/blog"
                    className={`inline-flex items-center mb-8 text-sm font-medium transition-all duration-300 group ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-purple-300"
                        : "text-gray-600 hover:text-purple-600"
                    }`}
                  >
                    <FaArrowLeft className="mr-2 transition-transform duration-300 group-hover:translate-x-[-4px]" />
                    블로그 목록으로 돌아가기
                  </Link>

                  <div className="space-y-6">
                    <h1
                      className={`text-3xl lg:text-4xl font-bold leading-tight tracking-tight ${
                        theme === "dark" ? "text-purple-300" : "text-purple-600"
                      }`}
                    >
                      {frontMatter.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4">
                      <span
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {frontMatter.date}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          theme === "dark"
                            ? "bg-gray-800/60 text-gray-300 border border-gray-700"
                            : "bg-gray-100/80 text-gray-700 border border-gray-200"
                        }`}
                      >
                        {frontMatter.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={copyPostUrl}
                        className={`inline-flex items-center px-4 py-2 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-purple-700 text-white border-purple-700 hover:bg-purple-800"
                            : "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                        } hover:shadow-xl`}
                      >
                        <FaCopy className="mr-2" /> URL 복사
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={sharePost}
                        className={`inline-flex items-center px-4 py-2 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-purple-700 text-white border-purple-700 hover:bg-purple-800"
                            : "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                        } hover:shadow-xl`}
                      >
                        <FaShare className="mr-2" /> 공유하기
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowToc(!showToc)}
                        className={`lg:hidden inline-flex items-center px-4 py-2 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-gray-800/40 text-gray-200 border-gray-700/50 hover:border-purple-700/50"
                            : "bg-white/80 text-gray-700 border-gray-200/50 hover:border-purple-300/50"
                        }`}
                      >
                        <FaListUl className="mr-2" /> 목차
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile TOC */}
                <AnimatePresence>
                  {showToc && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="lg:hidden mb-8"
                    >
                      <div
                        className={`rounded-xl p-6 ${
                          theme === "dark"
                            ? "bg-gray-800/40 border border-gray-700/50"
                            : "bg-white/80 border border-gray-200/50"
                        } backdrop-blur-sm`}
                      >
                        <h3
                          className={`text-lg font-semibold mb-4 flex items-center ${
                            theme === "dark"
                              ? "text-purple-300"
                              : "text-purple-600"
                          }`}
                        >
                          <FaListUl className="mr-2" />
                          목차
                        </h3>
                        <nav className="space-y-3">
                          {toc.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                scrollToHeader(item.id);
                                setShowToc(false);
                              }}
                              className={`
                                block w-full text-left transition-colors duration-200
                                ${
                                  item.level === 1
                                    ? `text-base font-medium ${
                                        theme === "dark"
                                          ? "hover:text-purple-300"
                                          : "hover:text-purple-600"
                                      }`
                                    : `text-sm pl-4 ${
                                        theme === "dark"
                                          ? "text-gray-400 hover:text-purple-300"
                                          : "text-gray-600 hover:text-purple-600"
                                      }`
                                }
                              `}
                            >
                              {item.text}
                            </button>
                          ))}
                        </nav>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.article
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`prose prose-lg max-w-none px-0 ${
                    theme === "dark" ? "prose-invert prose-dark" : "prose-light"
                  }`}
                >
                  <div
                    className={`rounded-xl p-2 sm:p-8 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <MDXRemote {...mdxSource} components={MDXComponents} />
                  </div>
                </motion.article>

                <div className="mt-12 mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prevPost && (
                      <Link
                        href={`/blog/${prevPost.slug}`}
                        className={`
                          group p-6 rounded-xl backdrop-blur-sm border
                          ${
                            theme === "dark"
                              ? "bg-gray-800/40 hover:bg-gray-800/60 border-gray-700/50 hover:border-purple-700/50"
                              : "bg-white/80 hover:bg-white border-gray-200/50 hover:border-purple-300/50"
                          }
                          transition-all duration-300 shadow-lg hover:shadow-xl
                        `}
                      >
                        <span
                          className={`text-sm mb-2 block ${
                            theme === "dark"
                              ? "text-purple-300"
                              : "text-purple-600"
                          }`}
                        >
                          이전 포스트
                        </span>
                        <h3
                          className={`
                          font-medium line-clamp-2 transition-colors duration-300
                          ${
                            theme === "dark"
                              ? "text-gray-200 group-hover:text-purple-300"
                              : "text-gray-800 group-hover:text-purple-600"
                          }
                        `}
                        >
                          {prevPost.frontmatter.title}
                        </h3>
                      </Link>
                    )}

                    {nextPost && (
                      <Link
                        href={`/blog/${nextPost.slug}`}
                        className={`
                          group p-6 rounded-xl backdrop-blur-sm border
                          ${
                            theme === "dark"
                              ? "bg-gray-800/40 hover:bg-gray-800/60 border-gray-700/50 hover:border-purple-700/50"
                              : "bg-white/80 hover:bg-white border-gray-200/50 hover:border-purple-300/50"
                          }
                          transition-all duration-300 shadow-lg hover:shadow-xl
                        `}
                      >
                        <span
                          className={`text-sm mb-2 block ${
                            theme === "dark"
                              ? "text-purple-300"
                              : "text-purple-600"
                          }`}
                        >
                          다음 포스트
                        </span>
                        <h3
                          className={`
                          font-medium line-clamp-2 transition-colors duration-300
                          ${
                            theme === "dark"
                              ? "text-gray-200 group-hover:text-purple-300"
                              : "text-gray-800 group-hover:text-purple-600"
                          }
                        `}
                        >
                          {nextPost.frontmatter.title}
                        </h3>
                      </Link>
                    )}
                  </div>
                </div>

                <div className="mt-16">
                  <div
                    className={`rounded-xl p-0 sm:p-8 backdrop-blur-sm border ${
                      theme === "dark"
                        ? "bg-gray-800/40 border-gray-700/50"
                        : "bg-white/80 border-gray-200/50"
                    } transition-all duration-300 shadow-lg`}
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
                      lang="ko"
                    />
                  </div>
                </div>
              </div>

              <div className="hidden lg:block lg:w-72 space-y-8">
                <div className="relative">
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={`sticky top-24 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <div
                      className={`rounded-xl p-6 backdrop-blur-sm border ${
                        theme === "dark"
                          ? "bg-gray-800/40 hover:bg-gray-800/60 border-gray-700/50 hover:border-purple-700/50"
                          : "bg-white/80 hover:bg-white border-gray-200/50 hover:border-purple-300/50"
                      } transition-all duration-300 shadow-lg mb-8`}
                    >
                      <h3
                        className={`text-lg font-semibold mb-4 flex items-center ${
                          theme === "dark"
                            ? "text-purple-300"
                            : "text-purple-600"
                        }`}
                      >
                        <FaListUl className="mr-2" />
                        목차
                      </h3>
                      <nav className="space-y-3">
                        {toc.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => scrollToHeader(item.id)}
                            className={`
                              block w-full text-left transition-colors duration-200
                              ${
                                item.level === 1
                                  ? `text-base font-medium ${
                                      theme === "dark"
                                        ? "hover:text-purple-300"
                                        : "hover:text-purple-600"
                                    }`
                                  : `text-sm pl-4 ${
                                      theme === "dark"
                                        ? "text-gray-400 hover:text-purple-300"
                                        : "text-gray-600 hover:text-purple-600"
                                    }`
                              }
                            `}
                          >
                            {item.text}
                          </button>
                        ))}
                      </nav>
                    </div>

                    <div
                      className={`rounded-xl p-6 backdrop-blur-sm border ${
                        theme === "dark"
                          ? "bg-gray-800/40 hover:bg-gray-800/60 border-gray-700/50 hover:border-purple-700/50"
                          : "bg-white/80 hover:bg-white border-gray-200/50 hover:border-purple-300/50"
                      } transition-all duration-300 shadow-lg`}
                    >
                      <h3
                        className={`text-lg font-semibold mb-4 flex items-center ${
                          theme === "dark"
                            ? "text-purple-300"
                            : "text-purple-600"
                        }`}
                      >
                        <FaBookmark className="mr-2" />
                        관련 포스트
                      </h3>
                      <div className="space-y-4">
                        {relatedPosts.slice(0, 3).map((post) => (
                          <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className={`
                              block group p-3 rounded-lg
                              ${
                                theme === "dark"
                                  ? "hover:bg-gray-700/50 hover:text-purple-300"
                                  : "hover:bg-gray-50/50 hover:text-purple-600"
                              }
                              transition-all duration-200
                            `}
                          >
                            <h4
                              className={`font-medium text-sm transition-colors duration-200 ${
                                theme === "dark"
                                  ? "group-hover:text-purple-300"
                                  : "group-hover:text-purple-600"
                              }`}
                            >
                              {post.frontmatter.title}
                            </h4>
                            <p
                              className={`text-xs mt-1 ${
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              {post.frontmatter.date}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress / 100 }}
          className={`fixed top-0 left-0 right-0 h-1 ${
            theme === "dark" ? "bg-purple-700" : "bg-purple-600"
          } transform origin-left z-50`}
        />

        {/* Scroll Buttons */}
        <AnimatePresence>
          {showScrollButtons && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 right-8 flex flex-col space-y-4"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                className={`p-3 rounded-xl backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-purple-700 text-white border-purple-700 hover:bg-purple-800"
                    : "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                }`}
              >
                <FaArrowUp />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToBottom}
                className={`p-3 rounded-xl backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-indigo-700 text-white border-indigo-700 hover:bg-indigo-800"
                    : "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
                }`}
              >
                <FaArrowDown />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filePaths = getPostFilePaths();

  const paths = filePaths.map((filePath) => ({
    params: { slug: filePath.replace(".mdx", "") },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({
  params,
}) => {
  const post = getPostBySlug(params?.slug as string);
  const mdxSource = await serialize(post.content);
  const posts = getAllPosts();

  // 현재 포스트의 인덱스 찾기
  const currentPostIndex = posts.findIndex((p) => p.slug === post.slug);

  // 이전/다음 포스트 가져오기
  const prevPost =
    currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null;
  const nextPost = currentPostIndex > 0 ? posts[currentPostIndex - 1] : null;

  // TOC 생성 로직...
  const generateId = (text: string) => {
    return text
      .toString()
      .replace(/[^가-힣a-zA-Z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
  };

  const toc = post.content
    .split("\n")
    .filter((line) => line.startsWith("#") || line.startsWith("##"))
    .filter((line) => !line.startsWith("###"))
    .map((line) => {
      const level = line.split(" ")[0].length;
      const text = line.replace(/^#+\s/, "");
      const id = generateId(text);
      return { id, text, level };
    });

  const relatedPosts = getRelatedPosts(post, posts);

  return {
    props: {
      frontMatter: {
        title: post.frontmatter.title,
        date: post.frontmatter.date,
        category: post.frontmatter.category,
      },
      mdxSource,
      toc,
      post,
      relatedPosts,
      prevPost,
      nextPost,
    },
  };
};

export default BlogPost;
