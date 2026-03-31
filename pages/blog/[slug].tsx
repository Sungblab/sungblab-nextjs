import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Layout, useTheme, useLanguage } from "../../components/Components";
import React, { useMemo, useState, useEffect } from "react";

const Math = dynamic(() => import("../../components/Math"), { ssr: false });
const Giscus = dynamic(() => import("@giscus/react"), { ssr: false });
import {
  ArrowUp,
  ArrowDown,
  Copy,
  Share2,
  ArrowLeft,
  List,
  Bookmark,
} from "lucide-react";
import { getRelatedPosts } from "../../utils/postUtils";
import {
  getPostBySlug,
  getAllPosts,
  getPostFilePaths,
} from "../../utils/mdxUtils";
import { Post } from "../../types/post";
import { motion, AnimatePresence } from "motion/react";
import { generateId } from "../../utils/generateId";
import { useToast } from "../../components/ui/Toast";

interface BlogPostProps {
  frontMatter: {
    title: string;
    date: string;
    category: string;
    description?: string | null;
    thumbnail?: string | null;
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

const BlogPost: NextPage<BlogPostProps> = ({
  frontMatter,
  mdxSource,
  toc,
  relatedPosts,
  prevPost,
  nextPost,
}) => {
  const { theme } = useTheme();
  const { translate, language } = useLanguage();
  const { showToast } = useToast();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [showToc, setShowToc] = useState(false);

  const scrollToHeader = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = (): void => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollButtons(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return (): void => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (): void =>
    window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = (): void =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  const copyPostUrl = (): void => {
    navigator.clipboard.writeText(window.location.href);
    showToast(translate("blog.urlCopied"), "success");
  };

  const sharePost = (): void => {
    if (navigator.share) {
      navigator
        .share({ title: frontMatter.title, url: window.location.href })
        .catch(console.error);
    } else {
      showToast(translate("blog.shareNotSupported"), "info");
    }
  };

  // MDXComponents를 useMemo로 감싸 매 렌더링 시 새 객체 생성 방지
  const MDXComponents = useMemo(
    () => ({
      Math,
      h1: (props: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element => {
        const id = generateId(String(props.children || ""));
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
      h2: (props: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element => {
        const id = generateId(String(props.children || ""));
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
      h3: (props: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element => (
        <h3
          className={`text-xl md:text-2xl font-medium mt-6 md:mt-8 mb-3 md:mb-4 tracking-tight ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
          {...props}
        />
      ),
      p: (props: React.HTMLAttributes<HTMLParagraphElement>): JSX.Element => (
        <p
          className={`my-4 md:my-6 text-base md:text-lg leading-7 md:leading-8 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
          {...props}
        />
      ),
      ul: (props: React.HTMLAttributes<HTMLUListElement>): JSX.Element => (
        <ul
          className={`list-disc ml-6 my-4 space-y-1 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
          {...props}
        />
      ),
      ol: (props: React.HTMLAttributes<HTMLOListElement>): JSX.Element => (
        <ol
          className={`list-decimal ml-6 my-4 space-y-1 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
          {...props}
        />
      ),
      li: (props: React.HTMLAttributes<HTMLLIElement>): JSX.Element => (
        <li className="pl-2">{props.children}</li>
      ),
      a: (
        props: React.AnchorHTMLAttributes<HTMLAnchorElement>
      ): JSX.Element => (
        <a
          className={`font-medium underline decoration-2 underline-offset-2 transition-colors duration-200 ${
            theme === "dark"
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-800"
          }`}
          {...props}
        />
      ),
      code: (props: React.HTMLAttributes<HTMLElement>): JSX.Element => (
        <code
          className={`rounded-md px-2 py-1 font-mono text-sm ${
            theme === "dark"
              ? "bg-gray-800 text-pink-300"
              : "bg-gray-100 text-pink-800"
          }`}
          {...props}
        />
      ),
      pre: (props: React.HTMLAttributes<HTMLPreElement>): JSX.Element => (
        <pre
          className={`rounded-lg p-6 my-8 overflow-x-auto text-sm leading-6 ${
            theme === "dark"
              ? "bg-gray-800 text-gray-200"
              : "bg-gray-100 text-gray-800"
          } shadow-lg max-w-full`}
          {...props}
        />
      ),
      img: (
        props: React.ImgHTMLAttributes<HTMLImageElement> & { src?: string }
      ): JSX.Element => (
        <span className="block my-8">
          <Image
            width={800}
            height={600}
            style={{
              maxHeight: "600px",
              width: "auto",
              margin: "0 auto",
              objectFit: "contain",
            }}
            src={props.src || ""}
            alt={props.alt || "blog image"}
            className="rounded-lg shadow-md mx-auto"
          />
        </span>
      ),
      blockquote: (
        props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>
      ): JSX.Element => (
        <blockquote
          className={`border-l-4 border-terracotta-500 pl-4 italic my-6 ${
            theme === "dark" ? "text-[#888]" : "text-[#666]"
          }`}
          {...props}
        />
      ),
      table: (
        props: React.TableHTMLAttributes<HTMLTableElement>
      ): JSX.Element => (
        <div className="overflow-x-auto my-6">
          <table
            className={`min-w-full text-sm border-collapse ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
            {...props}
          />
        </div>
      ),
      th: (
        props: React.ThHTMLAttributes<HTMLTableCellElement>
      ): JSX.Element => (
        <th
          className={`px-4 py-2 text-left font-semibold border-b ${
            theme === "dark"
              ? "border-gray-700 text-gray-200"
              : "border-gray-300 text-gray-800"
          }`}
          {...props}
        />
      ),
      td: (
        props: React.TdHTMLAttributes<HTMLTableCellElement>
      ): JSX.Element => (
        <td
          className={`px-4 py-2 border-b ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}
          {...props}
        />
      ),
    }),
    [theme]
  );

  const ogDescription =
    frontMatter.description || `${frontMatter.title} - Sungblab Blog`;
  const postUrl = `https://sungblab.com/blog/${encodeURIComponent(frontMatter.title)}`;

  return (
    <Layout>
      <Head>
        <title>{`${frontMatter.title} | Sungblab`}</title>
        <meta name="description" content={ogDescription} />
        <meta property="og:title" content={`${frontMatter.title} | Sungblab`} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:site_name" content="Sungblab" />
        {frontMatter.thumbnail && (
          <meta property="og:image" content={frontMatter.thumbnail} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontMatter.title} />
        <meta name="twitter:description" content={ogDescription} />
        {frontMatter.thumbnail && (
          <meta name="twitter:image" content={frontMatter.thumbnail} />
        )}
      </Head>

      <div
        className={`min-h-screen ${
          theme === "dark" ? "bg-[#0f0f0f]" : "bg-warm-50"
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0">
            <div
              className={`absolute inset-0 ${
                theme === "dark" ? "bg-[#0f0f0f]/90" : "bg-white/90"
              }`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,84,56,0.03)_1px,transparent_1px)] bg-[length:24px_24px]" />
          </div>

          <div className="container mx-auto px-4 pt-40 pb-12 relative">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1 lg:w-[calc(100%-20rem)]">
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
                        ? "text-[#888] hover:text-terracotta-300"
                        : "text-[#666] hover:text-terracotta-600"
                    }`}
                  >
                    <ArrowLeft className="mr-2 w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    {translate("blog.backToBlog")}
                  </Link>

                  <div className="space-y-6">
                    <h1
                      className={`text-3xl lg:text-4xl font-bold leading-tight tracking-tight ${
                        theme === "dark" ? "text-terracotta-300" : "text-terracotta-700"
                      }`}
                    >
                      {frontMatter.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4">
                      <span
                        className={`text-sm ${
                          theme === "dark" ? "text-[#888]" : "text-[#666]"
                        }`}
                      >
                        {frontMatter.date}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          theme === "dark"
                            ? "bg-terracotta-900/30 text-terracotta-300 border border-terracotta-700/50"
                            : "bg-terracotta-100/50 text-terracotta-700 border border-terracotta-200"
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
                        className={`inline-flex items-center px-4 py-2 rounded-xl backdrop-blur-sm border transition-all duration-300 text-sm ${
                          theme === "dark"
                            ? "bg-[#1a1a1a]/60 text-[#f5ece6] border-[#2a2a2a]/50 hover:border-terracotta-700/50"
                            : "bg-white/80 text-warm-800 border-warm-200/50 hover:border-terracotta-300/50"
                        } hover:shadow-lg`}
                      >
                        <Copy className="mr-2 w-4 h-4" /> {translate("blog.copyUrl")}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={sharePost}
                        className={`inline-flex items-center px-4 py-2 rounded-xl backdrop-blur-sm border transition-all duration-300 text-sm ${
                          theme === "dark"
                            ? "bg-[#1a1a1a]/60 text-[#f5ece6] border-[#2a2a2a]/50 hover:border-terracotta-700/50"
                            : "bg-white/80 text-warm-800 border-warm-200/50 hover:border-terracotta-300/50"
                        } hover:shadow-lg`}
                      >
                        <Share2 className="mr-2 w-4 h-4" /> {translate("blog.share")}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(): void => setShowToc(!showToc)}
                        className={`lg:hidden inline-flex items-center px-4 py-2 rounded-xl backdrop-blur-sm border transition-all duration-300 text-sm ${
                          theme === "dark"
                            ? "bg-[#1a1a1a]/60 text-[#f5ece6] border-[#2a2a2a]/50 hover:border-terracotta-700/50"
                            : "bg-white/80 text-warm-800 border-warm-200/50 hover:border-terracotta-300/50"
                        }`}
                      >
                        <List className="mr-2 w-4 h-4" /> {translate("blog.toc")}
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
                      className="lg:hidden mb-8 overflow-hidden"
                    >
                      <div
                        className={`rounded-xl p-6 ${
                          theme === "dark"
                            ? "bg-[#1a1a1a]/40 border border-[#2a2a2a]/50"
                            : "bg-white/80 border border-warm-200/50"
                        } backdrop-blur-sm`}
                      >
                        <h3
                          className={`text-lg font-semibold mb-4 flex items-center ${
                            theme === "dark"
                              ? "text-terracotta-300"
                              : "text-terracotta-600"
                          }`}
                        >
                          <List className="mr-2 w-4 h-4" />
                          {translate("blog.toc")}
                        </h3>
                        <nav className="space-y-3">
                          {toc.map(
                            (item: TocItem): JSX.Element => (
                              <button
                                key={item.id}
                                onClick={(): void => {
                                  scrollToHeader(item.id);
                                  setShowToc(false);
                                }}
                                className={`block w-full text-left transition-colors duration-200 ${
                                  item.level === 1
                                    ? `text-base font-medium ${
                                        theme === "dark"
                                          ? "text-[#f5ece6] hover:text-terracotta-300"
                                          : "text-warm-800 hover:text-terracotta-600"
                                      }`
                                    : `text-sm pl-4 ${
                                        theme === "dark"
                                          ? "text-[#888] hover:text-terracotta-300"
                                          : "text-[#666] hover:text-terracotta-600"
                                      }`
                                }`}
                              >
                                {item.text}
                              </button>
                            )
                          )}
                        </nav>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Article Body */}
                <motion.article
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`prose prose-lg max-w-none ${
                    theme === "dark"
                      ? "prose-invert prose-p:text-[#ccc] prose-headings:text-[#f5ece6] prose-strong:text-white"
                      : "prose-p:text-[#444] prose-headings:text-warm-900 prose-strong:text-warm-900"
                  }`}
                >
                  <div
                    className={`rounded-2xl p-6 sm:p-10 backdrop-blur-md border shadow-xl ${
                      theme === "dark"
                        ? "bg-[#1a1a1a]/40 border-[#2a2a2a]/50"
                        : "bg-white/60 border-warm-200/50"
                    }`}
                  >
                    <MDXRemote {...mdxSource} components={MDXComponents} />
                  </div>
                </motion.article>

                {/* Prev / Next Navigation */}
                <div className="mt-12 mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prevPost && (
                      <Link
                        href={`/blog/${prevPost.slug}`}
                        className={`group p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 shadow-lg hover:shadow-xl ${
                          theme === "dark"
                            ? "bg-[#1a1a1a]/40 hover:bg-[#1a1a1a]/60 border-[#2a2a2a]/50 hover:border-terracotta-700/50"
                            : "bg-white/80 hover:bg-white border-warm-200/50 hover:border-terracotta-300/50"
                        }`}
                      >
                        <span
                          className={`text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1 ${
                            theme === "dark"
                              ? "text-terracotta-400"
                              : "text-terracotta-600"
                          }`}
                        >
                          <ArrowLeft className="w-3 h-3" />
                          {translate("blog.prevPost")}
                        </span>
                        <h3
                          className={`font-medium line-clamp-2 transition-colors duration-300 ${
                            theme === "dark"
                              ? "text-[#f5ece6] group-hover:text-terracotta-300"
                              : "text-warm-800 group-hover:text-terracotta-600"
                          }`}
                        >
                          {prevPost.frontmatter.title}
                        </h3>
                      </Link>
                    )}

                    {nextPost && (
                      <Link
                        href={`/blog/${nextPost.slug}`}
                        className={`group p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 shadow-lg hover:shadow-xl ${
                          theme === "dark"
                            ? "bg-[#1a1a1a]/40 hover:bg-[#1a1a1a]/60 border-[#2a2a2a]/50 hover:border-terracotta-700/50"
                            : "bg-white/80 hover:bg-white border-warm-200/50 hover:border-terracotta-300/50"
                        } ${!prevPost ? "md:col-start-2" : ""}`}
                      >
                        <span
                          className={`text-xs font-semibold uppercase tracking-wider mb-2 flex items-center justify-end gap-1 ${
                            theme === "dark"
                              ? "text-terracotta-400"
                              : "text-terracotta-600"
                          }`}
                        >
                          {translate("blog.nextPost")}
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                        <h3
                          className={`font-medium line-clamp-2 text-right transition-colors duration-300 ${
                            theme === "dark"
                              ? "text-[#f5ece6] group-hover:text-terracotta-300"
                              : "text-warm-800 group-hover:text-terracotta-600"
                          }`}
                        >
                          {nextPost.frontmatter.title}
                        </h3>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Comments */}
                <div className="mt-8">
                  <div
                    className={`rounded-xl p-0 sm:p-8 backdrop-blur-sm border ${
                      theme === "dark"
                        ? "bg-[#1a1a1a]/40 border-[#2a2a2a]/50"
                        : "bg-white/80 border-warm-200/50"
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
                      lang={language === "ko" ? "ko" : "en"}
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="hidden lg:block lg:w-72 space-y-8">
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={`sticky top-24 ${
                    theme === "dark" ? "text-[#ccc]" : "text-[#444]"
                  }`}
                >
                  {/* TOC */}
                  {toc.length > 0 && (
                    <div
                      className={`rounded-xl p-6 backdrop-blur-sm border ${
                        theme === "dark"
                          ? "bg-[#1a1a1a]/40 border-[#2a2a2a]/50"
                          : "bg-white/80 border-warm-200/50"
                      } transition-all duration-300 shadow-lg mb-8`}
                    >
                      <h3
                        className={`text-lg font-semibold mb-4 flex items-center ${
                          theme === "dark"
                            ? "text-terracotta-300"
                            : "text-terracotta-600"
                        }`}
                      >
                        <List className="mr-2 w-4 h-4" />
                        {translate("blog.toc")}
                      </h3>
                      <nav className="space-y-2">
                        {toc.map(
                          (item: TocItem): JSX.Element => (
                            <button
                              key={item.id}
                              onClick={(): void => scrollToHeader(item.id)}
                              className={`block w-full text-left transition-colors duration-200 rounded px-2 py-1 ${
                                item.level === 1
                                  ? `text-sm font-medium ${
                                      theme === "dark"
                                        ? "text-[#f5ece6] hover:text-terracotta-300 hover:bg-[#2a2a2a]/30"
                                        : "text-warm-800 hover:text-terracotta-600 hover:bg-terracotta-50"
                                    }`
                                  : `text-xs pl-4 ${
                                      theme === "dark"
                                        ? "text-[#888] hover:text-terracotta-300 hover:bg-[#2a2a2a]/30"
                                        : "text-[#888] hover:text-terracotta-600 hover:bg-terracotta-50"
                                    }`
                              }`}
                            >
                              {item.text}
                            </button>
                          )
                        )}
                      </nav>
                    </div>
                  )}

                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <div
                      className={`rounded-xl p-6 backdrop-blur-sm border ${
                        theme === "dark"
                          ? "bg-[#1a1a1a]/40 border-[#2a2a2a]/50"
                          : "bg-white/80 border-warm-200/50"
                      } transition-all duration-300 shadow-lg`}
                    >
                      <h3
                        className={`text-lg font-semibold mb-4 flex items-center ${
                          theme === "dark"
                            ? "text-terracotta-300"
                            : "text-terracotta-600"
                        }`}
                      >
                        <Bookmark className="mr-2 w-4 h-4" />
                        {translate("blog.relatedPosts")}
                      </h3>
                      <div className="space-y-3">
                        {relatedPosts.slice(0, 3).map(
                          (post: Post): JSX.Element => (
                            <Link
                              key={post.slug}
                              href={`/blog/${post.slug}`}
                              className={`block group p-3 rounded-lg transition-all duration-200 ${
                                theme === "dark"
                                  ? "hover:bg-[#2a2a2a]/50"
                                  : "hover:bg-warm-50"
                              }`}
                            >
                              <h4
                                className={`font-medium text-sm transition-colors duration-200 ${
                                  theme === "dark"
                                    ? "text-[#ccc] group-hover:text-terracotta-300"
                                    : "text-[#444] group-hover:text-terracotta-600"
                                }`}
                              >
                                {post.frontmatter.title}
                              </h4>
                              <p
                                className={`text-xs mt-1 ${
                                  theme === "dark"
                                    ? "text-[#888]"
                                    : "text-[#888]"
                                }`}
                              >
                                {post.frontmatter.date}
                              </p>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Reading Progress Bar */}
        <motion.div
          style={{ scaleX: scrollProgress / 100 }}
          className={`fixed top-0 left-0 right-0 h-[3px] ${
            theme === "dark"
              ? "bg-gradient-to-r from-terracotta-600 to-terracotta-400"
              : "bg-gradient-to-r from-terracotta-500 to-terracotta-300"
          } transform origin-left z-50`}
        />

        {/* Scroll Buttons */}
        <AnimatePresence>
          {showScrollButtons && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 right-8 flex flex-col space-y-3"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                aria-label="맨 위로"
                className={`p-3 rounded-xl backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-[#1a1a1a]/80 text-[#f5ece6] border-[#2a2a2a] hover:border-terracotta-700"
                    : "bg-white/80 text-warm-800 border-warm-200 hover:border-terracotta-300"
                }`}
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToBottom}
                aria-label="맨 아래로"
                className={`p-3 rounded-xl backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-[#1a1a1a]/80 text-[#f5ece6] border-[#2a2a2a] hover:border-terracotta-700"
                    : "bg-white/80 text-warm-800 border-warm-200 hover:border-terracotta-300"
                }`}
              >
                <ArrowDown className="w-4 h-4" />
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
  const paths = filePaths.map((filePath: string) => ({
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

  const currentPostIndex = posts.findIndex(
    (p: Post): boolean => p.slug === post.slug
  );

  const prevPost =
    currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null;
  const nextPost = currentPostIndex > 0 ? posts[currentPostIndex - 1] : null;

  // generateId를 공유 유틸리티에서 가져와 컴포넌트와 동일한 로직으로 TOC 생성
  const toc: TocItem[] = post.content
    .split("\n")
    .filter(
      (line: string): boolean =>
        (line.startsWith("#") || line.startsWith("##")) &&
        !line.startsWith("###")
    )
    .map(
      (line: string): TocItem => {
        const level = line.split(" ")[0].length;
        const text = line.replace(/^#+\s/, "");
        const id = generateId(text);
        return { id, text, level };
      }
    );

  const relatedPosts = getRelatedPosts(post, posts);

  return {
    props: {
      frontMatter: {
        title: post.frontmatter.title,
        date: post.frontmatter.date,
        category: post.frontmatter.category,
        description: post.frontmatter.description || null,
        thumbnail: post.frontmatter.thumbnail || null,
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
