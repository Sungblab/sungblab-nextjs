import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Layout, useTheme } from "../../components/Components";
import Giscus from "@giscus/react";
import { useState, useEffect } from "react";
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
import { motion } from "framer-motion";
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
    h1: (props: any) => (
      <h1
        className={`text-4xl font-bold mt-10 mb-6 ${
          theme === "dark" ? "text-gray-200" : "text-gray-800"
        }`}
        {...props}
      />
    ),
    h2: (props: any) => (
      <h2
        className={`text-3xl font-semibold mt-8 mb-4 ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
        {...props}
      />
    ),
    h3: (props: any) => (
      <h3
        className={`text-2xl font-medium mt-6 mb-3 ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
        {...props}
      />
    ),
    p: (props: any) => (
      <p
        className={`my-4 leading-relaxed ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
        {...props}
      />
    ),
    ul: (props: any) => (
      <ul
        className={`list-disc list-inside my-6 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
        {...props}
      />
    ),
    ol: (props: any) => (
      <ol
        className={`list-decimal list-inside my-6 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
        {...props}
      />
    ),
    li: (props: any) => <li className="my-2" {...props} />,
    a: (props: any) => (
      <a
        className={`hover:underline ${
          theme === "dark" ? "text-blue-400" : "text-blue-600"
        }`}
        {...props}
      />
    ),
    code: (props: any) => (
      <code
        className={`rounded px-2 py-1 font-mono text-sm ${
          theme === "dark"
            ? "bg-gray-700 text-pink-300"
            : "bg-gray-100 text-pink-500"
        }`}
        {...props}
      />
    ),
    pre: (props: any) => (
      <pre
        className={`rounded p-4 overflow-x-auto my-6 text-sm ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
        {...props}
      />
    ),
    img: (props: any) => (
      <span className="block my-8">
        <Image
          {...props}
          width={1000}
          height={400}
          objectFit="cover"
          alt={props.alt || "blog image"}
          className="rounded-lg shadow-md"
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
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <Link
                  href="/blog"
                  className={`inline-flex items-center mb-8 text-sm font-medium transition-colors duration-200 ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <FaArrowLeft className="mr-2" /> 블로그 목록으로 돌아가기
                </Link>

                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h1
                      className={`text-4xl font-bold mb-4 ${
                        theme === "dark" ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {frontMatter.title}
                    </h1>
                    <div className="flex items-center space-x-4 mb-6">
                      <span
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {frontMatter.date}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          theme === "dark"
                            ? "bg-gray-800 text-gray-300"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {frontMatter.category}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={copyPostUrl}
                        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600"
                      >
                        <FaCopy className="mr-2" /> URL 복사
                      </button>
                      <button
                        onClick={sharePost}
                        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 bg-teal-500 text-white hover:bg-teal-600"
                      >
                        <FaShare className="mr-2" /> 공유하기
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.article
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`prose prose-lg ${
                  theme === "dark" ? "prose-invert prose-dark" : "prose-light"
                }`}
              >
                <MDXRemote {...mdxSource} components={MDXComponents} />
              </motion.article>

              <div className="mt-12 mb-16 grid grid-cols-1 md:grid-cols-2 gap-4">
                {prevPost && (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className={`
                      group p-4 rounded-lg transition-all duration-200
                      ${
                        theme === "dark"
                          ? "bg-gray-800 hover:bg-gray-700"
                          : "bg-white hover:bg-gray-50"
                      }
                      shadow-lg
                    `}
                  >
                    <span className="text-sm text-blue-500 mb-2 block">
                      이전 포스트
                    </span>
                    <h3
                      className={`
                      font-medium line-clamp-2
                      ${theme === "dark" ? "text-gray-200" : "text-gray-800"}
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
                      group p-4 rounded-lg transition-all duration-200 text-right
                      ${
                        theme === "dark"
                          ? "bg-gray-800 hover:bg-gray-700"
                          : "bg-white hover:bg-gray-50"
                      }
                      shadow-lg
                    `}
                  >
                    <span className="text-sm text-blue-500 mb-2 block">
                      다음 포스트
                    </span>
                    <h3
                      className={`
                      font-medium line-clamp-2
                      ${theme === "dark" ? "text-gray-200" : "text-gray-800"}
                    `}
                    >
                      {nextPost.frontmatter.title}
                    </h3>
                  </Link>
                )}
              </div>

              <div className="mt-16">
                <Giscus
                  repo="Kimsungbin1/sungblab-nextjs"
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
                    className={`rounded-lg p-6 ${
                      theme === "dark" ? "bg-gray-800" : "bg-white"
                    } shadow-lg mb-8`}
                  >
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <FaListUl className="mr-2" />
                      목차
                    </h3>
                    <nav className="space-y-2">
                      {toc.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`
                            block text-sm hover:text-blue-500 transition-colors duration-200
                            ${
                              item.level === 1
                                ? "font-medium"
                                : "text-sm opacity-90"
                            }
                            ${
                              item.level === 1
                                ? "pl-0"
                                : `pl-${(item.level - 1) * 4}`
                            }
                          `}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>

                  <div
                    className={`rounded-lg p-6 ${
                      theme === "dark" ? "bg-gray-800" : "bg-white"
                    } shadow-lg`}
                  >
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <FaBookmark className="mr-2" />
                      관련 포스트
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.slice(0, 3).map((post) => (
                        <Link
                          key={post.slug}
                          href={`/blog/${post.slug}`}
                          className={`
                            block group
                            ${
                              theme === "dark"
                                ? "hover:bg-gray-700"
                                : "hover:bg-gray-50"
                            }
                            p-3 rounded-lg transition-colors duration-200
                          `}
                        >
                          <h4 className="font-medium text-sm group-hover:text-blue-500 transition-colors duration-200">
                            {post.frontmatter.title}
                          </h4>
                          <p className="text-xs mt-1 opacity-75">
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

        <div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500"
          style={{ width: `${scrollProgress}%` }}
        />

        {showScrollButtons && (
          <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={scrollToTop}
              className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg"
            >
              <FaArrowUp />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={scrollToBottom}
              className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg"
            >
              <FaArrowDown />
            </motion.button>
          </div>
        )}
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
  const toc = post.content
    .split("\n")
    .filter((line) => line.startsWith("#"))
    .map((line) => {
      const level = line.split(" ")[0].length;
      const text = line.replace(/^#+\s/, "");
      const id = text.toLowerCase().replace(/\s/g, "-");
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
