import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Layout, useTheme } from "../../components/Components";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Giscus from "@giscus/react";
import { useState, useEffect } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaCopy,
  FaShare,
  FaArrowLeft,
} from "react-icons/fa";

interface BlogPostProps {
  frontMatter: {
    title: string;
    date: string;
  };
  mdxSource: MDXRemoteSerializeResult;
  toc: TocItem[];
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const BlogPost: NextPage<BlogPostProps> = ({ frontMatter, mdxSource, toc }) => {
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
      alert("공유 기능이 지원되지 않는 브라우저입니다.");
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
        className={`container mx-auto px-4 sm:px-6 lg:px-4 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <article
          className={`prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto rounded-lg shadow-md p-4 sm:p-6 lg:p-8 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h1
            className={`text-3xl sm:text-4xl font-bold mb-2 ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            {frontMatter.title}
          </h1>
          <p
            className={`mb-4 sm:mb-6 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {frontMatter.date}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
            <Link
              href="/blog"
              className={`flex items-center text-white px-3 py-2 rounded-md transition-colors duration-200 text-sm sm:text-base ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              <FaArrowLeft className="mr-2" /> 목록
            </Link>
            <button
              onClick={copyPostUrl}
              className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm sm:text-base"
            >
              <FaCopy className="mr-2" /> 복사
            </button>
            <button
              onClick={sharePost}
              className="flex items-center bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 text-sm sm:text-base"
            >
              <FaShare className="mr-2" /> 공유
            </button>
          </div>
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </article>
        <div className="mt-6">
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
      <div
        className="fixed top-0 left-0 h-1 bg-blue-500"
        style={{ width: `${scrollProgress}%` }}
      />
      {showScrollButtons && (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 flex flex-col space-y-2 sm:space-y-4">
          <button
            onClick={scrollToTop}
            className="bg-blue-500 text-white p-2 sm:p-3 rounded-full hover:bg-blue-600 transition-colors duration-200 shadow-lg"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>
          <button
            onClick={scrollToBottom}
            className="bg-blue-500 text-white p-2 sm:p-3 rounded-full hover:bg-blue-600 transition-colors duration-200 shadow-lg"
            aria-label="Scroll to bottom"
          >
            <FaArrowDown />
          </button>
        </div>
      )}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(".mdx", "") },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({
  params,
}) => {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filePath = path.join(postsDirectory, `${params?.slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content);

  // Extract TOC from content
  const toc = content
    .split("\n")
    .filter((line) => line.startsWith("#"))
    .map((line) => {
      const level = line.split(" ")[0].length;
      const text = line.replace(/^#+\s/, "");
      const id = text.toLowerCase().replace(/\s/g, "-");
      return { id, text, level };
    });

  return {
    props: {
      frontMatter: {
        title: data.title as string,
        date: data.date as string,
        category: data.category as string,
      },
      mdxSource,
      toc,
    },
  };
};

export default BlogPost;
